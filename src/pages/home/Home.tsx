/* React */
import { useContext, useEffect, useState } from 'react';

/* Local styles */
import './styles/home.scss';

/* Local scripts */
import { useReactQuery } from '../../_config/scripts/hooks';

/* Local components */
import { Dropdown } from '../../components/dropdown/Dropdown';

export const Home = () => {
	let [guess, setGuess] = useState('');
	let [status, setStatus] = useState('idle');

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
		<div className="home spacing-reset">
			<h2>Home</h2>

			<form onSubmit={(e) => submitGuess(e)}>
				<input name="guess" type="text" placeholder="Enter your guess" />
				<button type="submit">Submit</button>

				{status === 'correct' && <p>🎉 You got it!</p>}
				{status === 'incorrect' && <p>❌ Try again!</p>}
			</form>
		</div>
	);
};
