/* React */
import { useContext } from 'react';
import { useCookies } from 'react-cookie';

/* Local styles */
import './styles/scoreboard.scss';

/* Local scripts */
import { useRespond } from '../../_config/scripts/hooks';
import { ScoreboardType } from './scripts/scoreboard-types';

/* Local components */
import { Context } from '../../context/Context';
import { Block } from '../../components/blocks/Blocks';

export const Scoreboard = () => {
	const context = useContext(Context);
	const isDesktop = useRespond(context.theme.bps.bp02 as number);
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

			{scoreboard && scoreboard.length !== 0 ? (
				<div className="scores">
					<Block>
						{isDesktop ? (
							<div className="row row-wrap row-spacing-10">
								<p className="points column">
									<strong>Points</strong>
								</p>
								<p className="date column">
									<strong>Date</strong>
								</p>
								<p className="category column">
									<strong>Category</strong>
								</p>
							</div>
						) : null}

						{scoreboard.map((score: ScoreboardType, index: number) => {
							return (
								<div className={`row row-wrap row-spacing-${isDesktop ? 10 : 5}`} key={`${score.key}-${index}`}>
									<p className="points column">
										{!isDesktop ? (
											<>
												<strong>Points:</strong>{' '}
											</>
										) : null}
										{score.points}
									</p>
									<p className="date column">
										{!isDesktop ? (
											<>
												<strong>Date:</strong>{' '}
											</>
										) : null}
										{score.date}
									</p>
									<p className="category column">
										{!isDesktop ? (
											<>
												<strong>Category:</strong>{' '}
											</>
										) : null}
										{score.category}
									</p>
								</div>
							);
						})}
					</Block>
				</div>
			) : (
				<p>No scores have been logged yet.</p>
			)}
		</div>
	);
};
