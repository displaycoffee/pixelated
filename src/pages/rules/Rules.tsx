/* Local styles */
import './styles/rules.scss';

/* Local scripts */
import { difficulty } from '../play/scripts/difficulty';

export const Rules = () => {
	return (
		<div className="rules spacing-reset">
			<h2>Rules</h2>

			<ol>
				<li>
					Start by choosing a "Difficulty" and "Category". "Difficulty" values are as follows:
					<ul>
						{difficulty.map((diff) => {
							return (
								<li key={diff.value}>
									<strong>{diff.name}:</strong> {diff.description}
								</li>
							);
						})}
					</ul>
				</li>
				<li>There are five rounds and each round is randomly generated.</li>
				<li>
					On each round, you will have three guesses and three hints to complete the round.
					<ul>
						<li>
							Each incorrect guess is <strong>minus 10 points</strong>.
						</li>
						<li>
							Each hint is <strong>minus 10 points</strong>.
						</li>
						<li>
							Therefore, if you use three hints and two guesses and complete the round on the third guess, you have{' '}
							<strong>50 points</strong> for the round.
						</li>
						<li>
							If you aren't able to guess correctly, it's <strong>0 points</strong> for that round.
						</li>
					</ul>
				</li>
				<li>You can keep track of your scores once "Round 5" is complete.</li>
				<li>Refreshing the page will restart the game.</li>
			</ol>
		</div>
	);
};
