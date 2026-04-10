/* React */
import { useCookies } from 'react-cookie';

/* Local styles */
import './styles/footer.scss';

export const Footer = () => {
	const [cookies, _setCookie, removeCookie] = useCookies(['scoreboard']);
	const hasScoreboard = cookies?.scoreboard ? true : false;
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
