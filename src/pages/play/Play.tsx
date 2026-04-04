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

export const Points = () => {
	const context = useContext(Context);
	const { game } = context;
	const { current, rounds } = game;
	const currentRound = rounds[`${current.round}`];

	return (
		<div className="points">
			{current.round != 'round6' ? (
				<p>
					<strong>Current round:</strong> {currentRound.points}
				</p>
			) : null}

			<p>
				<strong>Game total:</strong> {current.points}
			</p>
		</div>
	);
};

export const Status = (props: ObjectPrimitiveProps) => {
	const status = props.status;

	// Determine status message
	let message = '🎉 You got it!';
	if (status == 'incorrect') {
		message = '❌ Try again!';
	} else if (status == 'failed') {
		message = '❌ Out of guesses!';
	}

	return <div className="status">{message}</div>;
};

export const Round = () => {
	const context = useContext(Context);
	const { game, setGame } = context;
	const { current, rounds, settings } = game;
	const currentRound = rounds[`${current.round}`];
	const title = currentRound.status == 'game end' ? `Game Over` : `Round ${current.round.replace('round', '')}`;

	// Set up pixel includes (default difficulty is "medium")
	let includePixels = [0, 2, 4];
	if (settings.difficulty == 'hard') {
		includePixels = [0];
	} else if (settings.difficulty == 'easy') {
		includePixels = [0, 1, 2, 3, 4];
	}

	// Reset game
	const resetGame = () => {
		setGame(context.gameDefault);
	};

	return (
		<div className={`round ${current.round}`}>
			<h2>{title}</h2>

			<Points />

			{currentRound.status == 'game end' ? (
				<>
					<button className="new-game" type="button" onClick={() => resetGame()}>
						New Game?
					</button>
				</>
			) : (
				<>
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
								complete: <Status status={'complete'} />,
								failed: <Status status={'failed'} />,
							}[currentRound.status as string] || <Guess />}
						</>
					) : null}

					<Pagination />
				</>
			)}
		</div>
	);
};

export const Guess = () => {
	const context = useContext(Context);
	const { game, setGame } = context;
	const { current, rounds } = game;
	const currentRound = rounds[`${current.round}`];
	const questionId = currentRound.id as string;
	const hintsLength = currentRound.hints.length;
	const hintId = `${questionId}-h${hintsLength + 1}`;
	const hasHints = hintsLength < 3 ? true : false;

	// Use custom hook to get hints
	const [hintsData, hintsRefetch, hintsStatus] = useReactQuery('hints', hintId) as HintsRequestType;
	const hintsComplete = (!hintsStatus.pending && hintsStatus.success) || hintsStatus.fetched ? true : false;

	useEffect(() => {
		if (hintsComplete && hintsData) {
			// Update game when hints are fetched
			setGame(
				produce((draft: Draft<GameType>) => {
					draft.rounds[`${current.round}`].hints = currentRound.hints.concat([hintsData.message]);
					draft.rounds[`${current.round}`].points = currentRound.points - 10;
				}),
			);
		}
	}, [hintsData]);

	// Get hint by using refetch
	const getHint = () => {
		if (hasHints) {
			hintsRefetch();
		} else {
			return null;
		}
	};

	// Use custom hook to get answers
	const [answersData, answersRefetch, answersStatus] = useReactQuery('answers', questionId, current.guess as string) as AnswersRequestType;
	const answersComplete = (!answersStatus.pending && answersStatus.success) || answersStatus.fetched ? true : false;

	// Submit guess
	const submitGuess = (e: EventsType) => {
		e.preventDefault();

		// Get form data
		const formData = new FormData(e.target);
		const guessData = formData.get('guess') as string;

		// Update game (only if there is a guess and it's not the same as previous guess)
		if (guessData && guessData != current.guess) {
			setGame(
				produce((draft: Draft<GameType>) => {
					draft.current.guess = guessData;
					draft.rounds[`${current.round}`].guesses = currentRound.guesses + 1;
				}),
			);
		}
	};

	useEffect(() => {
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

			// Deduct 10 for each wrong guess; 0 if failed; no deduction for correct
			let points = currentRound.points;
			if (roundStatus == 'failed') {
				points = 0;
			} else if (status == 'incorrect') {
				points = currentRound.points - 10;
			}

			// Update game settings when guess is submitted
			setGame(
				produce((draft: Draft<GameType>) => {
					draft.current.status = status;
					draft.current.points = roundStatus != 'pending' ? current.points + points : current.points;
					draft.rounds[`${current.round}`].points = points;
					draft.rounds[`${current.round}`].status = roundStatus;
				}),
			);
		}
	}, [answersData]);

	return (
		<>
			{current.status == 'incorrect' ? <Status status={'incorrect'} /> : null}

			<form className="guess form" onSubmit={(e) => submitGuess(e)}>
				<div className="guess-field form-field">
					<input id={questionId} name="guess" type="text" placeholder="Enter your guess" />
				</div>

				<div className="guess-actions form-actions">
					<button className="guess-submit" type="submit">
						Submit
					</button>

					<button className="guess-hint" type="button" onClick={() => getHint()} disabled={!hasHints}>
						Get Hint
					</button>
				</div>
			</form>

			{currentRound.hints.length !== 0 ? (
				<div className="hints">
					{currentRound.hints.map((hint) => (
						<p key={hint}>{hint}</p>
					))}
				</div>
			) : null}
		</>
	);
};

export const Pagination = () => {
	const context = useContext(Context);
	const { game, setGame } = context;
	const { current, rounds } = game;
	const currentRound = rounds[`${current.round}`];
	const roundNumber: number = parseInt(current.round.replace('round', ''));
	const hasPrevious = current.round != 'round1' ? true : false;
	const hasNext = currentRound.status != 'pending' && current.round != 'round6' ? true : false;

	const goToRound = (direction: string) => {
		if (hasPrevious && direction == 'previous') {
			const previousRound = `round${roundNumber - 1}` as keyof GameType['rounds'];
			const previousRoundData = game.rounds[previousRound];
			const status = previousRoundData.status == 'complete' ? 'correct' : 'incorrect';

			// Update game
			setGame(
				produce((draft: Draft<GameType>) => {
					draft.current.guess = status;
					draft.current.round = previousRound;
					draft.current.status = status;
				}),
			);
		} else if (hasNext && direction == 'next') {
			const nextRound = `round${roundNumber + 1}` as keyof GameType['rounds'];

			// Update game
			setGame(
				produce((draft: Draft<GameType>) => {
					draft.current.guess = false;
					draft.current.round = nextRound;
					draft.current.status = 'pending';
				}),
			);
		} else {
			return false;
		}
	};

	return (
		<div className="pagination">
			<button className="pagination-previous" type="button" onClick={() => goToRound('previous')} disabled={!hasPrevious}>
				Previous
			</button>

			<button className="pagination-next" type="button" onClick={() => goToRound('next')} disabled={!hasNext}>
				Next
			</button>
		</div>
	);
};

export const Settings = () => {
	const context = useContext(Context);
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
			<h2>Choose settings</h2>

			<form className="settings form" onSubmit={(e) => submitSettings(e)}>
				<div className="settings-select form-field">
					<label htmlFor="settings-difficulty">Difficuly:</label>

					<select id="settings-difficulty" name="difficulty" defaultValue="medium">
						{difficulty.map((diff) => {
							return (
								<option value={diff.value} key={diff.value}>
									{diff.name}
								</option>
							);
						})}
					</select>
				</div>

				<div className="settings-select form-field">
					<label htmlFor="settings-category">Category:</label>

					<select id="settings-category" name="category" defaultValue={categories[0].value}>
						{categories.map((category) => {
							return (
								<option value={category.value} key={category.value}>
									{category.name}
								</option>
							);
						})}
					</select>
				</div>

				<div className="settings-actions form-actions">
					<button type="submit">Submit</button>
				</div>
			</form>
		</>
	);
};
