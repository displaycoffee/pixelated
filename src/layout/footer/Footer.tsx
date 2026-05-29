/* Styles */
import './styles/footer.scss';

/* Packages */
import { useCookies } from 'react-cookie';

export const Footer = () => {
	const [cookies, _setCookie, removeCookie] = useCookies(['scoreboard']);
	const hasScoreboard = cookies?.scoreboard;
	const date = new Date().getFullYear();

	return (
		<footer className="footer">
			<p>
				&copy; {date}{' '}
				<a href="//display.coffee" target="_blank" rel="noreferrer">
					displaycoffee
				</a>
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
