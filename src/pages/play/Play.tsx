/* React */
import { useContext, useEffect, useState } from 'react';

/* Local styles */
import './styles/play.scss';

/* Local scripts */
import { useReactQuery } from '../../_config/scripts/hooks';
import { CategoryType } from './scripts/play-types';
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
	console.log('in round', context);
	let game = context.game;
	let { settings, rounds } = game;
	const setGame = context.setGame;
	const currentRound = rounds[`${settings.currentRound}`];
	const questionId = currentRound.id as string;

	// Set up pixel includes (default difficulty is "medium")
	let includePixels = [0, 2, 4];
	if (settings.difficulty == 'hard') {
		includePixels = [0];
	} else if (settings.difficulty == 'easy') {
		includePixels = [0, 1, 2, 3, 4];
	}

	// Create guess and status
	let [guess, setGuess] = useState('');
	let [status, setStatus] = useState('idle');

	// Use custom hook to get answers
	const [answersData, answersStatus] = useReactQuery(guess, questionId, 'answers') as AnswersRequestType;
	const answersComplete = (!answersStatus.pending && answersStatus.success) || answersStatus.fetched ? true : false;

	// Submit guess
	const submitGuess = async (e: EventsType) => {
		e.preventDefault();

		// Update state to trigger request
		const formData = new FormData(e.target);
		guess = formData.get('guess') as string;
		setGuess(guess);

		// Update number of guesses
		game = {
			...game,
			rounds: {
				...rounds,
				[`${settings.currentRound}`]: {
					...currentRound,
					guesses: currentRound.guesses + 1,
				},
			},
		};
		setGame(game);
	};

	useEffect(() => {
		// If an answer has been returned, update status
		if (answersComplete && answersData) {
			status = answersData.success ? 'correct' : 'incorrect';
			setStatus(status);

			// Update round status
			let roundStatus = 'pending';
			if (status == 'incorrect' && currentRound.guesses > 2) {
				roundStatus = 'failed';
			} else if (status == 'correct') {
				roundStatus = 'complete';
			}

			// Update game with new round status
			game = {
				...game,
				rounds: {
					...rounds,
					[`${settings.currentRound}`]: {
						...currentRound,
						status: roundStatus,
					},
				},
			};
			setGame(game);
		}
	}, [answersData]);

	return (
		<>
			<h2>Round {settings.currentRound.replace('round', '')}</h2>

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

					{currentRound.status == 'pending' ? (
						<form onSubmit={(e) => submitGuess(e)}>
							<input id={questionId} name="guess" type="text" placeholder="Enter your guess" />
							<button type="submit">Submit</button>

							{status === 'correct' && <p>🎉 You got it!</p>}
							{status === 'incorrect' && <p>❌ Try again!</p>}
						</form>
					) : currentRound.status == 'complete' ? (
						<p>You got it!</p>
					) : (
						<p>Out of guesses!</p>
					)}
				</>
			) : null}
		</>
	);
};

export const Settings = () => {
	let context = useContext(Context);
	let game = context.game;
	const setGame = context.setGame;

	// Submit guess and update state to trigger request
	const submitSettings = async (e: EventsType) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const difficultyValue = formData.get('difficulty');
		const categoryValue = formData.get('category');

		// Set new game settings
		const settings = {
			...game.settings,
			difficulty: difficultyValue as string,
			category: categoryValue as string,
		};

		// Get questions for round from matching categories
		const roundQuestions = categories.filter((category) => category.value === categoryValue).flatMap((category) => category.values);

		// Shuffle questions (using the Fisher-Yates algorithm)
		const shuffleQuestions = (array: CategoryType) => {
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

		// Create game rounds
		const rounds = {
			round1: {
				...game.rounds.round1,
				...selectedQuestions[0],
			},
			round2: {
				...game.rounds.round2,
				...selectedQuestions[1],
			},
			round3: {
				...game.rounds.round3,
				...selectedQuestions[2],
			},
			round4: {
				...game.rounds.round4,
				...selectedQuestions[3],
			},
			round5: {
				...game.rounds.round5,
				...selectedQuestions[4],
			},
		};

		// Update state
		game = {
			...game,
			settings: settings,
			rounds: rounds,
		};
		setGame(game);
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
