/* React */
import { useContext, useEffect, useState } from 'react';

/* Local styles */
import './styles/play.scss';

/* Local scripts */
import { difficulty } from './scripts/difficulty';
import { categories } from './scripts/categories';
import { useReactQuery } from '../../_config/scripts/hooks';

/* Local components */
import { Context } from '../../context/Context';

export const Play = () => {
	const context = useContext(Context);
	console.log('in play', context);
	let game = context.game;
	let { settings, rounds } = game;
	const showSettings = !settings.category && !settings.difficulty ? true : false;

	let [guess, setGuess] = useState('');
	let [status, setStatus] = useState('idle');
	//console.log(context);

	// Use custom hook to get answers
	const [answersData, answersStatus] = useReactQuery(guess, 'answers') as AnswersRequestType;
	const answersComplete = (!answersStatus.pending && answersStatus.success) || answersStatus.fetched ? true : false;

	// Submit guess and update state to trigger request
	const submitGuess = async (e: EventsType) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		guess = formData.get('guess') as string;
		setGuess(guess);
	};

	useEffect(() => {
		// If an answer has been returned, update status
		if (answersComplete && answersData) {
			status = answersData.success ? 'correct' : 'incorrect';
			setStatus(status);
		}
	}, [answersData]);

	return (
		<div className="play spacing-reset">
			{showSettings ? (
				<Settings />
			) : (
				<>
					<h2>Play</h2>

					<form onSubmit={(e) => submitGuess(e)}>
						<input name="guess" type="text" placeholder="Enter your guess" />
						<button type="submit">Submit</button>

						{status === 'correct' && <p>🎉 You got it!</p>}
						{status === 'incorrect' && <p>❌ Try again!</p>}
					</form>
				</>
			)}
		</div>
	);
};

export const Settings = () => {
	let context = useContext(Context);
	let game = context.game;
	const setGame = context.setGame;

	console.log('init', context);

	// Submit guess and update state to trigger request
	const submitSettings = async (e: EventsType) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const difficulty = formData.get('difficulty');
		const category = formData.get('category');

		// Set new game settings
		const settings = {
			...game.settings,
			difficulty: difficulty as string,
			category: category as string,
			currentRound: 'round1' as const,
		};

		// Update state
		game = {
			...game,
			settings: settings,
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
