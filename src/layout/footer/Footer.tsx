/* Styles */
import './styles/footer.scss';

/* Packages */
import { useCookies } from 'react-cookie';

/* Components */
import { LinkExternal } from '../../components/blocks-2/Blocks';

export const Footer = () => {
	const [cookies, _setCookie, removeCookie] = useCookies(['scoreboard']);
	const hasScoreboard = cookies?.scoreboard;
	const date = new Date().getFullYear();

	return (
		<footer className="footer">
			<p>
				&copy; {date} <LinkExternal href="//display.coffee">displaycoffee</LinkExternal>
				{hasScoreboard ? (
					<>
						<span> - </span>
						<button className="a unstyled" aria-label="Clear Scoreboard" type="button" onClick={() => removeCookie('scoreboard')}>
							Clear Scoreboard
						</button>
					</>
				) : null}
			</p>
		</footer>
	);
};
