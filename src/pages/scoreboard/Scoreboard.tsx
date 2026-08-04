/* Styles */
import './styles/scoreboard.scss';

/* Packages */
import { useCookies } from 'react-cookie';

/* Scripts */
import { useRespond } from '../../_config/scripts/hooks';
import { useAppContext } from '../../context/scripts/context-hooks';
import { ScoreboardType } from './scripts/scoreboard-types';

/* Components */
import { Data, DataColumn, DataRow } from '../../components/blocks/Blocks';

export const Scoreboard = () => {
	const { theme } = useAppContext();
	const isDesktop = useRespond(theme.bps.bp02 as number);
	const [cookies] = useCookies(['scoreboard']);
	const scoreboardCookie = cookies?.scoreboard?.split('|') ?? [];

	// Format scoreboard cookie
	const scoreboard = scoreboardCookie.map((score: string) => {
		const splitScore = score.split(';');
		return {
			category: splitScore[3],
			date: splitScore[1],
			difficulty: splitScore[2],
			key: score,
			points: splitScore[0],
		};
	});

	return (
		<div className="scoreboard margin-trim">
			<h2>Scoreboard</h2>

			{scoreboard.length !== 0 ? (
				<>
					<div className="scoreboard-data">
						<Data label={'Scoreboard'}>
							{isDesktop ? (
								<DataRow>
									<DataColumn label={'Points'} />

									<DataColumn label={'Date'} />

									<DataColumn label={'Difficulty'} />

									<DataColumn label={'Category'} />
								</DataRow>
							) : null}

							{scoreboard.map((score: ScoreboardType, index: number) => {
								return (
									<DataRow key={`${score.key}-${index}`}>
										<DataColumn label={'Points'} value={score.points} />

										<DataColumn label={'Date'} value={score.date} />

										<DataColumn label={'Difficulty'} value={score.difficulty} />

										<DataColumn label={'Category'} value={score.category} />
									</DataRow>
								);
							})}
						</Data>
					</div>

					<p>
						<strong>Note:</strong> The scoreboard only saves the last 10 scores.
					</p>
				</>
			) : (
				<p>No scores have been logged yet.</p>
			)}
		</div>
	);
};
