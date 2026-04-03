/* React */
import { useContext, useEffect } from 'react';
import { produce, Draft } from 'immer';

/* Local styles */
import './styles/play.scss';

/* Local scripts */
import { useReactQuery } from '../../_config/scripts/hooks';
import { difficulty } from './scripts/difficulty';
import { categories } from './scripts/categories';

/* Local components */
import { Context } from '../../context/Context';

export const Play = () => {
	const context = useContext(Context);
	const settings = context.game.settings;
	const showSettings = !settings.category && !settings.difficulty ? true : false;

	return <div className="play spacing-reset">{showSettings ? <Settings /> : <Round />}</div>;
};

export const Round = () => {
	const context = useContext(Context);
	console.log('in round', context.game);
	let game = context.game;
	let { current, rounds, settings } = game;
	const setGame = context.setGame;
	const currentRound = rounds[`${current.round}`];
	const questionId = currentRound.id as string;

	// Set up pixel includes (default difficulty is "medium")
	let includePixels = [0, 2, 4];
	if (settings.difficulty == 'hard') {
		includePixels = [0];
	} else if (settings.difficulty == 'easy') {
		includePixels = [0, 1, 2, 3, 4];
	}

	// Use custom hook to get answers
	const [answersData, answersStatus] = useReactQuery(current.guess as string, questionId, 'answers') as AnswersRequestType;
	const answersComplete = (!answersStatus.pending && answersStatus.success) || answersStatus.fetched ? true : false;

	useEffect(() => {
		// If an answer has been returned, update data
		if (answersComplete && answersData) {
			// Set status
			const status = answersData.success ? 'correct' : 'incorrect';

			// Update round status
			let roundStatus: RoundType['status'] = 'pending';
			if (status == 'incorrect' && currentRound.guesses > 2) {
				roundStatus = 'failed';
			} else if (status == 'correct') {
				roundStatus = 'complete';
			}

			// Update point value
			let points = currentRound.points;
			if (roundStatus == 'pending' && currentRound.guesses < 3) {
				points = currentRound.points - 10;
			} else if (roundStatus == 'failed') {
				points = 0;
			}

			// Update total points
			const pointsTotal = roundStatus != 'pending' ? current.points + points : current.points;

			// Update game
			setGame(
				produce((draft: Draft<GameType>) => {
					draft.current.points = pointsTotal;
					draft.current.status = status;
					draft.rounds[`${current.round}`].status = roundStatus;
					draft.rounds[`${current.round}`].points = points;
				}),
			);
		}
	}, [answersData]);

	return (
		<>
			<h2>Round {current.round.replace('round', '')}</h2>

			{currentRound && currentRound.values.length !== 0 ? (
				<>
					<div className="pixels">
						<div className="row row-fit row-nowrap row-align-items-center row-spacing-10">
							{currentRound.values.map((value, index) => {
								return (
									<div className="column" key={`${currentRound}-${index}`}>
										{value.map((color, colorIndex) => {
											return includePixels.includes(colorIndex) ? (
												<div className="pixel-block" style={{ backgroundColor: color }} key={color}></div>
											) : null;
										})}
									</div>
								);
							})}
						</div>
					</div>

					{{
						complete: <RoundComplete />,
						failed: <RoundFailed />,
					}[currentRound.status as string] || <RoundPending />}
				</>
			) : null}
		</>
	);
};

export const RoundPending = () => {
	const context = useContext(Context);
	let game = context.game;
	let { current, rounds } = game;
	const setGame = context.setGame;
	const currentRound = rounds[`${current.round}`];
	const questionId = currentRound.id as string;

	// Submit guess
	const submitGuess = async (e: EventsType) => {
		e.preventDefault();

		// Get form data
		const formData = new FormData(e.target);
		const guess = formData.get('guess') as string;

		// Update game (only if there is a guess and it's not the previous guess)
		if (guess && guess != current.guess) {
			setGame(
				produce((draft: Draft<GameType>) => {
					draft.current.guess = guess;
					draft.rounds[`${current.round}`].guesses = currentRound.guesses + 1;
				}),
			);
		}
	};

	return (
		<>
			<form onSubmit={(e) => submitGuess(e)}>
				<input id={questionId} name="guess" type="text" placeholder="Enter your guess" />
				<button type="submit">Submit</button>

				{current.status === 'correct' && <p>🎉 You got it!</p>}
				{current.status === 'incorrect' && <p>❌ Try again!</p>}
			</form>
		</>
	);
};

export const RoundComplete = () => {
	return <p>🎉 You got it!</p>;
};

export const RoundFailed = () => {
	return <p>❌ Out of guesses!</p>;
};

export const Settings = () => {
	let context = useContext(Context);
	const setGame = context.setGame;

	// Submit guess and update state to trigger request
	const submitSettings = async (e: EventsType) => {
		e.preventDefault();

		// Get form data
		const formData = new FormData(e.target);
		const difficultyValue = formData.get('difficulty') as string;
		const categoryValue = formData.get('category') as string;

		if (difficultyValue && categoryValue) {
			// Get questions for round from matching categories
			const roundQuestions = categories.filter((category) => category.value === categoryValue).flatMap((category) => category.values);

			// Shuffle questions (using the Fisher-Yates algorithm)
			const shuffleQuestions = (array: CategoryListType) => {
				for (let i = array.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[array[i], array[j]] = [array[j], array[i]];
				}
				return array;
			};

			// Use function to shuffle questions
			const shuffledQuestions = shuffleQuestions([...roundQuestions]);

			// Select five questions
			const selectedQuestions = shuffledQuestions.slice(0, 5);

			// Update round
			const updateRound = (draft: Draft<GameType>, round: number) => {
				const roundKey = `round${round}` as keyof GameType['rounds'];
				draft.rounds[roundKey] = {
					...draft.rounds[roundKey],
					...selectedQuestions[round - 1],
				};
			};

			// Update game
			setGame(
				produce((draft: Draft<GameType>) => {
					draft.settings.category = categoryValue;
					draft.settings.difficulty = difficultyValue;
					updateRound(draft, 1);
					updateRound(draft, 2);
					updateRound(draft, 3);
					updateRound(draft, 4);
					updateRound(draft, 5);
				}),
			);
		}
	};

	return (
		<>
			<h2>Choose game settings</h2>

			<form onSubmit={(e) => submitSettings(e)}>
				<select name="difficulty" defaultValue="medium">
					{difficulty.map((diff) => {
						return (
							<option value={diff.value} key={diff.value}>
								{diff.name}
							</option>
						);
					})}
				</select>

				<select name="category" defaultValue={categories[0].value}>
					{categories.map((category) => {
						return (
							<option value={category.value} key={category.value}>
								{category.name}
							</option>
						);
					})}
				</select>

				<button type="submit">Submit</button>
			</form>
		</>
	);
};
