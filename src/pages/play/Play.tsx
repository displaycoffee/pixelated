/* Styles */
import './styles/play.scss';

/* Packages */
import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { produce, Draft } from 'immer';

/* Scripts */
import { useAppContext } from '../../context/scripts/context-hooks';
import { useReactQuery, useRespond, useViewTransition } from '../../_config/scripts/hooks';
import { difficulty } from './scripts/difficulty';
import { categories } from './scripts/categories';

/* Components */
import { Block, Button } from '../../components/blocks/Blocks';
import { List } from '../../components/blocks-2/Blocks';
import { Form, FormActions, Input, Select } from '../../components/forms/Forms';

export const Play = () => {
	const { game } = useAppContext();
	const settings = game.settings;
	const showSettings = !settings.category && !settings.difficulty;

	return <div className="play margin-trim">{showSettings ? <Settings /> : <Round />}</div>;
};

export const Round = () => {
	const { game, gameDefault, setGame, queryClient } = useAppContext();
	const { current, rounds, settings } = game;
	const settingsDifficulty = settings.difficulty as DifficultyType;
	const currentRound = rounds[`${current.round}`];
	const title = currentRound.status == 'game end' ? `Game Over` : `Round ${current.round.replace('round', '')}`;
	const pixels = currentRound.values[currentRound.values.length - settingsDifficulty.id];
	const [cookies, setCookie] = useCookies(['scoreboard']);

	// Reset game
	const resetGame = () => {
		void queryClient.resetQueries({ queryKey: ['hints'] });
		void queryClient.resetQueries({ queryKey: ['answers'] });
		setGame(gameDefault);
	};

	// Set score
	const setScore = () => {
		if (!current.scoreLogged) {
			// Get details for score
			const today = new Date().toISOString().split('T')[0];
			const settingsDifficulty = settings.difficulty as DifficultyType;
			const settingsCategory = settings.category as CategoryType;
			const difficultyDetails = difficulty.filter((diff) => diff.id === settingsDifficulty.id).pop();
			const categoryDetails = categories.filter((category) => category.id === settingsCategory.id).pop();

			// Check current and new score cookie
			const scoreLimit = 10;
			const currentScoreboard: string[] = cookies?.scoreboard ? cookies.scoreboard.split('|') : [];
			const newScore = `${current.points};${today};${difficultyDetails?.name};${categoryDetails?.name}`;

			// Prepend new score and trim to limit
			const updatedScoreboard = [newScore, ...currentScoreboard].slice(0, scoreLimit).join('|');
			setCookie('scoreboard', updatedScoreboard, { path: '/', maxAge: 60 * 60 * 24 * 365 });

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
				<div className="game-end flex-wrap flex-align-items-center flex-justify-content-center">
					<Button onClick={() => resetGame()}>New Game?</Button>

					<Button onClick={() => setScore()} disabled={current.scoreLogged}>
						Log Score
					</Button>

					<Button
						onClick={() => {
							setScore();
							resetGame();
						}}
						disabled={current.scoreLogged}
					>
						Why Not Both?
					</Button>
				</div>
			) : (
				<>
					{currentRound && currentRound.values.length !== 0 ? (
						<>
							<div className="pixels">
								<div className="row row-fit row-nowrap row-align-items-center row-justify-content-center row-spacing-10">
									{pixels.map((pixel, index) => {
										return (
											<div className="column" key={`${currentRound}-${index}`}>
												{pixel.map((color, colorIndex) => {
													return (
														<div
															className="pixel-block"
															style={{ backgroundColor: color }}
															key={`${color}-${colorIndex}`}
														></div>
													);
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

					<Pagination resetGame={resetGame} />
				</>
			)}
		</div>
	);
};

export const Settings = () => {
	const { setGame } = useAppContext();
	const [descriptions, setDescriptions] = useState({
		difficulty: difficulty[2].description,
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
			// Find difficulty
			const difficultyDetails = difficulty.filter((diff) => diff.id === Number(difficultyValue)).pop() as DifficultyType;

			// Find category
			const categoryMatch = categories.filter((category) => category.id === categoryValue).pop() as CategoryValuesType;

			// Set up category details
			const categoryDetails: CategoryType = {
				name: categoryMatch.name,
				id: categoryMatch.id,
				category: categoryMatch.category,
				subCategory: categoryMatch.subCategory,
				description: categoryMatch.description,
			};

			// Get questions for round from matching categories
			const roundQuestions = categoryMatch.values;

			// Shuffle questions (using the Fisher-Yates algorithm)
			const shuffleQuestions = (array: CategoryQuestionsType) => {
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
					draft.settings.category = categoryDetails;
					draft.settings.difficulty = difficultyDetails;
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
				<Select
					className={'settings-select'}
					id={'settings-difficulty'}
					label={'Difficulty:'}
					name={'difficulty'}
					defaultValue={difficulty[2].id}
					onChange={(e) => updateDescriptions(e, 'difficulty')}
					description={descriptions.difficulty}
				>
					{difficulty.map((diff) => {
						return (
							<option value={diff.id} key={diff.id}>
								{diff.name}
							</option>
						);
					})}
				</Select>

				<Select
					className={'settings-select'}
					id={'settings-category'}
					label={'Category:'}
					name={'category'}
					defaultValue={categories[0].id}
					onChange={(e) => updateDescriptions(e, 'categories')}
					description={descriptions.categories}
				>
					{categories.map((category) => {
						return (
							<option value={category.id} key={category.id}>
								{category.name}
							</option>
						);
					})}
				</Select>

				<FormActions className={'settings-actions'}>
					<Button>Submit</Button>
				</FormActions>
			</Form>
		</>
	);
};

export const Guess = () => {
	const { game, setGame } = useAppContext();
	const { current, rounds, settings } = game;
	const currentRound = rounds[`${current.round}`];
	const settingsCategory = settings.category as CategoryType;
	const questionId = currentRound.id as string;
	const hintsLength = currentRound.hints.length;
	const hintId = `h${hintsLength + 1}`;
	const hasHints = hintsLength < 3;

	// Use custom hook to get hints
	const [hintsData, hintsRefetch, hintsStatus] = useReactQuery('hints', settingsCategory, questionId, hintId) as HintsRequestType;
	useEffect(() => {
		if (hintsData) {
			// Update game when hints are fetched
			setGame(
				produce((draft: Draft<GameType>) => {
					const round = draft.current.round;
					draft.rounds[round].hints = draft.rounds[round].hints.concat([hintsData.message]);
					draft.rounds[round].points = draft.rounds[round].points - 10;
				}),
			);
		}
	}, [hintsData, setGame]);

	// Get hint by using refetch
	const getHint = () => {
		if (hasHints) {
			hintsRefetch();
		} else {
			return null;
		}
	};

	// Use custom hook to get answers
	const [answersData, _answersRefetch, answersStatus] = useReactQuery(
		'answers',
		settingsCategory,
		questionId,
		current.guess as string,
		currentRound.guesses,
	) as AnswersRequestType;

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
		if (answersData) {
			// Update game settings when guess is submitted
			setGame(
				produce((draft: Draft<GameType>) => {
					const round = draft.current.round;
					const draftRound = draft.rounds[round];

					// Set status
					let status = answersData.success ? 'correct' : 'incorrect';
					if (answersData.close) {
						status = 'close';
					}

					// Update round status
					let roundStatus: RoundType['status'] = 'pending';
					if (status == 'incorrect' && draftRound.guesses > 2) {
						roundStatus = 'failed';
					} else if (status == 'correct') {
						roundStatus = 'complete';
					}

					// Deduct 10 for each wrong guess; 0 if failed; no deduction for correct
					let points = draftRound.points;
					if (roundStatus == 'failed') {
						points = 0;
					} else if (status == 'incorrect' || status == 'close') {
						points = draftRound.points - 10;
					}

					draft.current.status = status as GameType['current']['status'];
					draft.current.points = roundStatus != 'pending' ? draft.current.points + points : draft.current.points;
					draftRound.points = points;
					draftRound.status = roundStatus;

					if (answersData.title) {
						draftRound.title = answersData.title;
						draftRound.characters = answersData.characters || '';
					}
				}),
			);
		}
	}, [answersData, setGame]);

	return (
		<>
			{current.status == 'incorrect' || current.status == 'close' ? <Status status={current.status} /> : null}

			{hintsStatus.error || answersStatus.error ? (
				<div className="status" role="alert">
					<p>😵 Something went wrong. Please try again.</p>
				</div>
			) : null}

			<Form className={'guess'} onSubmit={(e) => submitGuess(e)}>
				<Input className={'guess-field'} hideLabel={true} id={questionId} label={'Guess'} placeholder={'Guess the pixels.'} />
				{/* <Input className={'guess-field'} hideLabel={true} id={questionId} label={'Guess'} placeholder={'Guess the pixels.'}>
					<label htmlFor={questionId} className="sr-only">
						Guess
					</label>

					<FormFieldWrapper hasSelect={false}>
						<input id={questionId} name="guess" type="text" placeholder="" />
					</FormFieldWrapper>

					<Button className="guess-submit">Submit</Button>
				</Input> */}
			</Form>

			{currentRound.hints.length !== 0 ? (
				<div className="hints">
					<Block>
						<List>
							{currentRound.hints.map((hint) => (
								<li key={hint}>{hint}</li>
							))}
						</List>
					</Block>
				</div>
			) : null}

			<Actions key={current.round} hasActions={false} getHint={getHint} hasHints={hasHints} />
		</>
	);
};

export const Points = () => {
	const { game } = useAppContext();
	const { current, rounds } = game;
	const currentRound = rounds[`${current.round}`];
	const isFinal = current.round == 'round5';

	return (
		<div className="points">
			<Block columns={current.round != 'round6'}>
				{current.round != 'round6' ? (
					<p>
						<strong>Current:</strong> {currentRound.points}
					</p>
				) : null}

				<p>
					<strong>Total:</strong> {current.points}
				</p>

				{isFinal && current.points == 500 ? <p className="flawless-victory">Flawless Victory</p> : null}
			</Block>
		</div>
	);
};

export const Status = (props: ObjectPrimitiveProps) => {
	const status = props.status;
	const enableActions = status == 'complete' || status == 'failed';
	const { game } = useAppContext();
	const { current } = game;

	// Determine status message
	let message = '😍 You got it!';
	if (status == 'close') {
		message = '🤔 Close! Try again!';
	} else if (status == 'incorrect') {
		message = '😠 Try again!';
	} else if (status == 'failed') {
		message = '😩 Out of guesses!';
	}

	return (
		<>
			<div className="status" role="status">
				<p>{message}</p>
			</div>

			{enableActions ? <Actions key={current.round} hasActions={enableActions} hasHints={false} /> : null}
		</>
	);
};

export const Actions = (props: ActionsProps) => {
	const { hasActions, getHint, hasHints } = props;
	const { game, theme } = useAppContext();
	const { current, rounds } = game;
	const currentRound = rounds[`${current.round}`];
	const [showAnswer, setShowAnswer] = useState(false);
	const [showCharacters, setShowCharacters] = useState(false);
	const isDesktop = useRespond(theme.bps.bp01 as number);

	return (
		<>
			{showAnswer || showCharacters ? (
				<div className="details">
					<Block>
						{showAnswer && (
							<p>
								<strong>Title:</strong> {currentRound.title}
							</p>
						)}

						{showCharacters && (
							<p>
								<strong>Characters:</strong> {currentRound.characters}
							</p>
						)}
					</Block>
				</div>
			) : null}

			<div className="actions">
				<div className="row row-auto row-nowrap row-align-items-center row-justify-content-center row-spacing-10">
					<div className="column">
						<Button
							className="actions-get-hint"
							onClick={() => {
								if (typeof getHint == 'function') {
									getHint();
								} else {
									return false;
								}
							}}
							disabled={!hasHints}
						>
							{isDesktop ? 'Get ' : ''}Hint
						</Button>
					</div>

					<div className="column">
						<Button
							className="actions-get-answer"
							onClick={() => {
								if (!showAnswer) {
									setShowAnswer(true);
								} else {
									return false;
								}
							}}
							disabled={!hasActions || showAnswer}
						>
							{isDesktop ? 'Get ' : ''}Answer
						</Button>
					</div>

					<div className="column">
						<Button
							className="actions-get-characters"
							onClick={() => {
								if (!showCharacters) {
									setShowCharacters(true);
								} else {
									return false;
								}
							}}
							disabled={!hasActions || showCharacters}
						>
							{isDesktop ? 'Get ' : ''}Characters
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export const Pagination = (props: PaginationProps) => {
	const resetGame = props.resetGame;
	const { game, setGame, theme } = useAppContext();
	const { current, rounds } = game;
	const currentRound = rounds[`${current.round}`];
	const roundNumber: number = parseInt(current.round.replace('round', ''));
	const hasPrevious = current.round != 'round1';
	const hasNext = currentRound.status != 'pending' && current.round != 'round6';
	const isDesktop = useRespond(theme.bps.bp01 as number);
	const handleTransition = useViewTransition();
	const isFinal = current.round == 'round5';

	// Set button labels
	let previousLabel = 'Previous';
	let previousAriaLabel = '';
	let nextLabel = isFinal ? 'Game End' : 'Next';
	let nextAriaLabel = '';

	if (!isDesktop) {
		previousAriaLabel = 'Previous';
		previousLabel = '<';
		nextAriaLabel = isFinal ? '' : 'Next';
		nextLabel = isFinal ? 'Game End' : '>';
	}

	// Navigation to round
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
			<div className="row row-auto row-nowrap row-align-items-center row-justify-content-center row-spacing-10">
				<div className="column">
					<Button
						ariaLabel={previousAriaLabel}
						className="pagination-previous"
						onClick={(e) => handleTransition(e, () => goToRound('previous'))}
						disabled={!hasPrevious}
					>
						{previousLabel}
					</Button>
				</div>

				<div className="column">
					<Button
						ariaLabel={nextAriaLabel}
						className="pagination-next"
						onClick={(e) => handleTransition(e, () => goToRound('next'))}
						disabled={!hasNext}
					>
						{nextLabel}
					</Button>
				</div>

				<div className="column">
					<Button className="pagination-start-over" onClick={(e) => handleTransition(e, () => resetGame())}>
						New Game?
					</Button>
				</div>
			</div>
		</div>
	);
};

/* Note: this component is only used for testing on dev.
   It won't be imported or added on prodution. */
export const PixelsGallery = (props: CategoriesObjectProps) => {
	const categories = props.categories;

	return (
		<div className="play margin-trim">
			<div className="round round1">
				{categories.map((category) => {
					return (
						<div className="round-category" key={category.id}>
							<h2>{category.name}</h2>

							{category.values.map((value) => {
								const categoryId = `${category.id}-${value.id}`;

								return (
									<div className="round-question" key={categoryId}>
										<Block className="round-header">
											<h3>{value.id}</h3>
										</Block>

										<div className="round-content row row-wrap row-spacing-20">
											{value.values.map((pixels, pixelsIndex) => {
												return (
													<div className="round-pixels column column-width-20" key={`${categoryId}-${pixelsIndex}`}>
														<div className="pixels row row-fit row-nowrap row-align-items-center row-justify-content-center row-spacing-10">
															{pixels.map((pixel, pixelIndex) => (
																<div className="column" key={`${pixel.join()}-${pixelIndex}`}>
																	{pixel.map((color, colorIndex) => (
																		<div
																			className="pixel-block"
																			style={{ backgroundColor: color }}
																			key={`${color}-${colorIndex}`}
																		></div>
																	))}
																</div>
															))}
														</div>
													</div>
												);
											})}
										</div>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};
