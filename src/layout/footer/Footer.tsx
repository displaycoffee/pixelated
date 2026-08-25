/* Styles */
import './styles/footer.scss';

/* Packages */
import { useCookies } from 'react-cookie';

/* Components */
import { LinkExternal } from '../../components/blocks/Blocks';
import { Button } from '../../components/forms/Forms';

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
						<Button label={'Clear Scoreboard'} variant={'link'} onClick={() => removeCookie('scoreboard')} />
					</>
				) : null}
			</p>
		</footer>
	);
};
