/* React */
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { produce, Draft } from 'immer';

/* Local styles */
import './styles/play.scss';

/* Local scripts */
import { useReactQuery } from '../../_config/scripts/hooks';
import { difficulty } from './scripts/difficulty';
import { categories } from './scripts/categories';

/* Local components */
import { Context } from '../../context/Context';
import { Block, Button, Form, FormActions, FormField, FormFieldWrapper } from '../../components/blocks/Blocks';

export const Play = () => {
	const context = useContext(Context);
	const settings = context.game.settings;
	const showSettings = !settings.category && !settings.difficulty ? true : false;

	return <div className="play spacing-reset">{showSettings ? <Settings /> : <Round />}</div>;
};

export const Round = () => {
	const context = useContext(Context);
	const { game, setGame } = context;
	const { current, rounds, settings } = game;
	const currentRound = rounds[`${current.round}`];
	const title = currentRound.status == 'game end' ? `Game Over` : `Round ${current.round.replace('round', '')}`;
	let [cookies, setCookie] = useCookies(['scoreboard']);

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

	// Set score
	const setScore = () => {
		if (!current.scoreLogged) {
			// Get details for score
			const today = new Date().toISOString().split('T')[0];
			const category = categories.filter((cat) => cat.value == settings.category).pop();

			// Check current and new score cookie
			const currentScoreboard = cookies?.scoreboard ? cookies.scoreboard : '';
			const newScore = `${current.points};${today};${category ? category.name : 'None.'}`;

			// Update scoreboard cookie
			const updatedScoreboard = currentScoreboard ? `${currentScoreboard}|${newScore}` : newScore;
			setCookie('scoreboard', updatedScoreboard);

			// Update score logged
			setGame(
				produce((draft: Draft<GameType>) => {
					draft.current.scoreLogged = true;
				}),
			);
		}
	};

	return (
		<div className={`round ${current.round}`}>
			<h2>{title}</h2>

			<Points />

			{currentRound.status == 'game end' ? (
				<div className="game-end flex-nowrap flex-align-items-center flex-justify-content-center">
					<Button onClick={() => resetGame()}>New Game?</Button>

					<Button onClick={() => setScore()} disabled={current.scoreLogged}>
						Log Score
					</Button>
				</div>
			) : (
				<>
					{currentRound && currentRound.values.length !== 0 ? (
						<>
							<div className="pixels">
								<div className="row row-fit row-nowrap row-align-items-center row-justify-content-center row-spacing-10">
									{currentRound.values.map((value, index) => {
										return (
											<div className="column" key={`${currentRound}-${index}`}>
												{value.map((color, colorIndex) => {
													return includePixels.includes(colorIndex) ? (
														<div
															className="pixel-block"
															style={{ backgroundColor: color }}
															key={`${color}-${colorIndex}`}
														></div>
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

export const Settings = () => {
	const context = useContext(Context);
	const setGame = context.setGame;
	const [descriptions, setDescriptions] = useState({
		difficulty: difficulty[1].description,
		categories: categories[0].description,
	});

	// Update descriptions on select change
	const updateDescriptions = (e: ChangeEvent<HTMLSelectElement>, key: string) => {
		// Get array for descriptions
		let descriptionsList = [] as DifficultyListType | CategoriesListType;
		if (key == 'difficulty') {
			descriptionsList = difficulty;
		} else if (key == 'categories') {
			descriptionsList = categories;
		}

		// Set description
		setDescriptions({
			...descriptions,
			[key]: descriptionsList[e.target.selectedIndex].description,
		});
	};

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

			<Form className={'settings'} onSubmit={(e) => submitSettings(e)}>
				<FormField className={'settings-select'} id={'settings-difficulty'} label={'Difficulty'} description={descriptions.difficulty}>
					<FormFieldWrapper hasSelect={true}>
						<select
							id="settings-difficulty"
							name="difficulty"
							defaultValue={difficulty[1].value}
							onChange={(e) => updateDescriptions(e, 'difficulty')}
						>
							{difficulty.map((diff) => {
								return (
									<option value={diff.value} key={diff.value}>
										{diff.name}
									</option>
								);
							})}
						</select>
					</FormFieldWrapper>
				</FormField>

				<FormField className={'settings-select'} id={'settings-category'} label={'Category'} description={descriptions.categories}>
					<FormFieldWrapper hasSelect={true}>
						<select id="settings-category" name="category" defaultValue={categories[0].value}>
							{categories.map((category) => {
								return (
									<option value={category.value} key={category.value}>
										{category.name}
									</option>
								);
							})}
						</select>
					</FormFieldWrapper>
				</FormField>

				<FormActions className={'settings-actions'}>
					<Button>Submit</Button>
				</FormActions>
			</Form>
		</>
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
	const [answersData, _answersRefetch, answersStatus] = useReactQuery('answers', questionId, current.guess as string) as AnswersRequestType;
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

			<Form className={'guess'} onSubmit={(e) => submitGuess(e)}>
				<FormField className={'guess-field'}>
					<FormFieldWrapper hasSelect={false}>
						<input id={questionId} name="guess" type="text" placeholder="Guess the pixels." />
					</FormFieldWrapper>

					<Button className="guess-submit">Submit</Button>

					<Button className="guess-hint" onClick={() => getHint()} disabled={!hasHints}>
						Get Hint
					</Button>
				</FormField>
			</Form>

			{currentRound.hints.length !== 0 ? (
				<div className="hints">
					<Block>
						{currentRound.hints.map((hint) => (
							<p key={hint}>{hint}</p>
						))}
					</Block>
				</div>
			) : null}
		</>
	);
};

export const Points = () => {
	const context = useContext(Context);
	const { game } = context;
	const { current, rounds } = game;
	const currentRound = rounds[`${current.round}`];

	return (
		<div className="points">
			<Block columns={current.round != 'round6' ? true : false}>
				{current.round != 'round6' ? (
					<p>
						<strong>Current round:</strong> {currentRound.points}
					</p>
				) : null}

				<p>
					<strong>Game total:</strong> {current.points}
				</p>

				{current.round == 'round5' && current.points == 500 ? <p className="flawless-victory">Flawless Victory</p> : null}
			</Block>
		</div>
	);
};

export const Status = (props: ObjectPrimitiveProps) => {
	const status = props.status;

	// Determine status message
	let message = '🎉 You got it!';
	if (status == 'incorrect') {
		message = '😠 Try again!';
	} else if (status == 'failed') {
		message = '😠 Out of guesses!';
	}

	return <div className="status">{message}</div>;
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
		<div className="pagination flex-nowrap flex-align-items-center flex-justify-content-center">
			<Button className="pagination-previous" onClick={() => goToRound('previous')} disabled={!hasPrevious}>
				Previous
			</Button>

			<Button className="pagination-next" onClick={() => goToRound('next')} disabled={!hasNext}>
				{current.round == 'round5' ? 'Game End' : 'Next'}
			</Button>
		</div>
	);
};
