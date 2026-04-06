/* Local styles */
import './styles/rules.scss';

/* Local scripts */
import { difficulty } from '../play/scripts/difficulty';

export const Rules = () => {
	return (
		<div className="rules spacing-reset">
			<h2>Rules</h2>

			<h3>How to Play</h3>

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
				<li>In each round, you will have three guesses and three hints to complete the round.</li>
				<li>You can log your score once "Round 5" is complete.</li>
				<li>Refreshing the page will restart the game.</li>
			</ol>

			<h3>Scoring</h3>

			<ol>
				<li>
					Each incorrect guess is <strong>minus 10 points</strong>.
				</li>
				<li>
					Each hint is <strong>minus 10 points</strong>.
				</li>
				<li>
					Therefore, if you use three hints and two guesses and complete the round on the third guess, you have <strong>50 points</strong>{' '}
					for the round.
				</li>
				<li>
					If you aren't able to guess correctly, it's <strong>0 points</strong> for that round.
				</li>
			</ol>

			<h3>Tips</h3>

			<ol>
				<li>
					Each round you will have five characters generated. The pixel blocks rendered are not to the scale of a character's height.
					Meaning, all characters will be rendered the same height.
				</li>
				<li>
					The characters displayed are usually going to be five main characters from the category, however, some will be secondary
					characters if there are not five main characters.
				</li>
				<li>
					The formatting of the answer is pulled from sources like IMDB and Wikipedia, so if there is a special character in the title (e.g.
					"The Coolest Show: Ever"), you might want to look it up as it should be included in your submission. Casing doesn't matter.
				</li>
			</ol>
		</div>
	);
};
