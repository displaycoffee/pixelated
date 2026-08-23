/* Packages */
import { NavLink } from 'react-router-dom';

/* Components */
import { LinkExternal } from '../../components/blocks-2/Blocks';

export const About = () => {
	return (
		<div className="about margin-trim">
			<h2>About</h2>

			<p>
				"Pixelated" is a simple guessing game created by <LinkExternal href="//display.coffee">displaycoffee</LinkExternal>. It is inspired by
				the Futurama episode "All the Way Down" (Season 11, Episode 10). On each round, you'll try to guess a set of pixel-rendered characters
				from a category. More information on how to play can be found on the <NavLink to={'/rules'}>Rules</NavLink> page.
			</p>

			<p>
				This site sets one cookie to log scores at the end of each round. However, this is optional; just don't click the "Log Score" button.
			</p>
		</div>
	);
};
