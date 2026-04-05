/* React */
import { useCookies } from 'react-cookie';

/* Local styles */
import './styles/scoreboard.scss';

/* Local scripts */
import { ScoreboardType } from './scripts/scoreboard-types';

export const Scoreboard = () => {
	const [cookies, setCookie] = useCookies(['scoreboard']);
	const scoreboardCookie = cookies?.scoreboard ? cookies.scoreboard.split('|') : [];

	// Format scoreboard cookie
	const scoreboard = scoreboardCookie.map((score: string) => {
		const splitScore = score.split(';');
		return {
			category: splitScore[2],
			date: splitScore[1],
			key: score,
			points: splitScore[0],
		};
	});

	return (
		<div className="scoreboard spacing-reset">
			<h2>Scoreboard</h2>

			<div className="aaa">
				{scoreboard.map((score: ScoreboardType, index: number) => {
					return (
						<div key={`${score.key}-${index}`}>
							<p>Points: {score.points}</p>
							<p>Date: {score.date}</p>
							<p>Category: {score.category}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
