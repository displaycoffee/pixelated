/* React */
import { NavLink } from 'react-router-dom';

export const About = () => {
	return (
		<div className="about spacing-reset">
			<h2>About</h2>

			<p>
				"Pixelated" is a simple guessing game created by{' '}
				<a href="//display.coffee" target="_blank" rel="noreferrer">
					displaycoffee
				</a>
				. It is inspired by the Futurama episode "All the Way Down" (Season 11, Episode 10). On each round, you'll try to guess a set of
				pixel-rendered characters from a category. More information on how to play can be found on the{' '}
				<NavLink to={'/rules'} title={'Rules'}>
					Rules
				</NavLink>{' '}
				page.
			</p>

			<p>
				This site sets one cookie to log scores at the end of each round. However, this is optional; just don't click the "Log Score" button.
			</p>

			<h2>Credits</h2>

			<p>
				Most of the hints were sourced from{' '}
				<a href="//www.imdb.com" target="_blank" rel="noreferrer">
					IMDB
				</a>{' '}
				or{' '}
				<a href="//en.wikipedia.org" target="_blank" rel="noreferrer">
					Wikipedia
				</a>
				. <em>(Please don't come after me.)</em>
			</p>
		</div>
	);
};
