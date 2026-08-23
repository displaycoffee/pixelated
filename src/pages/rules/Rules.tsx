/* Styles */
import './styles/rules.scss';

/* Scripts */
import { difficulty } from '../play/scripts/difficulty';

/* Components */
import { List } from '../../components/blocks-2/Blocks';

export const Rules = () => {
	return (
		<div className="rules margin-trim">
			<h2>Rules</h2>

			<h3>How to Play</h3>

			<List variant="ol">
				<li>
					Start by choosing a "Difficulty" and "Category". "Difficulty" values are as follows:
					<List>
						{difficulty.map((diff) => {
							return (
								<li key={diff.id}>
									<strong>{diff.name}:</strong> {diff.description}
								</li>
							);
						})}
					</List>
				</li>
				<li>There are five rounds and each round is randomly generated.</li>
				<li>In each round, you will have three guesses and three hints to complete the round.</li>
				<li>You can log your score once "Round 5" is complete.</li>
			</List>

			<h3>Scoring</h3>

			<List variant="ol">
				<li>
					Each incorrect guess is <strong>minus 10 points</strong>.
				</li>
				<li>
					Each hint is <strong>minus 10 points</strong>. You'll get the same type of hint for each round:
					<List>
						<li>
							<strong>Hint 1:</strong> The first letter of each character's name.
						</li>
						<li>
							<strong>Hint 2:</strong> A rhyming word for a character's name.
						</li>
						<li>
							<strong>Hint 3:</strong> Emoji clues.
						</li>
					</List>
				</li>
				<li>
					Therefore, if you use three hints and two guesses and complete the round on the third guess, you have <strong>50 points</strong>{' '}
					for the round.
				</li>
				<li>
					If you aren't able to guess correctly, it's <strong>0 points</strong> for that round.
				</li>
			</List>

			<h3>Hints and tips</h3>

			<List variant="ol">
				<li>
					Each round you will have five characters generated. The pixel blocks rendered are not to the scale of a character's height.
					Meaning, all characters will be rendered the same height. The topmost block can be thought of as the character's hat or hair,
					while the bottom block would be pants or shoes. The characters displayed are usually going to be five main characters from the
					category, however, some will be secondary or supporting.
				</li>
				<li>
					Casing (lowercase or uppercase) doesn't matter when submitting your guess. Special characters have also been stripped out in the
					final answer, so don't worry about those.
				</li>
			</List>
		</div>
	);
};
