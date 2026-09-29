/* Packages */
import { produce } from 'immer';

/* Create config for each round */
const round: RoundType = {
	id: false,
	status: 'pending',
	guesses: 0,
	hints: [],
	points: 100,
	values: [],
	title: '',
	characters: '',
};

/* Create game config */
const initialState: GameType = {
	current: {
		guess: false,
		points: 0,
		round: 'round1',
		status: 'pending',
		scoreLogged: false,
	},
	settings: {
		category: false,
		difficulty: false,
	},
	rounds: {
		round1: { ...round },
		round2: { ...round },
		round3: { ...round },
		round4: { ...round },
		round5: { ...round },
		round6: {
			...round,
			status: 'game end',
		},
	},
};

export const game = {
	initialState,
	reducer: (state: GameType, action: GameActionType): GameType => {
		// Every change to the game goes through here, so the rules (points, statuses, rounds) live in one place
		if (action.type === 'game_reset') return initialState;

		return produce(state, (draft) => {
			const draftRound = draft.rounds[draft.current.round];

			switch (action.type) {
				case 'settings_submitted': {
					draft.settings.category = action.category;
					draft.settings.difficulty = action.difficulty;

					// Fill the first five rounds with the selected questions
					for (let number = 1; number <= 5; number++) {
						const roundKey = `round${number}` as keyof GameType['rounds'];
						draft.rounds[roundKey] = {
							...draft.rounds[roundKey],
							...action.questions[number - 1],
						};
					}
					break;
				}
				case 'guess_submitted': {
					draft.current.guess = action.guess;
					draftRound.guesses += 1;
					break;
				}
				case 'hint_received': {
					// Each hint costs 10 points
					draftRound.hints = draftRound.hints.concat([action.message]);
					draftRound.points -= 10;
					break;
				}
				case 'answer_received': {
					const { answer } = action;

					// Set status
					let status = answer.success ? 'correct' : 'incorrect';
					if (answer.close) status = 'close';

					// Update round status
					let roundStatus: RoundType['status'] = 'pending';
					if (status == 'incorrect' && draftRound.guesses > 2) {
						roundStatus = 'failed';
					} else if (status == 'correct') {
						roundStatus = 'complete';
					}

					// Deduct 10 for each wrong guess; 0 if failed; no deduction for correct
					let points = draftRound.points;
					if (roundStatus == 'failed') {
						points = 0;
					} else if (status == 'incorrect' || status == 'close') {
						points = draftRound.points - 10;
					}

					draft.current.status = status as GameType['current']['status'];
					draft.current.points = roundStatus != 'pending' ? draft.current.points + points : draft.current.points;
					draftRound.points = points;
					draftRound.status = roundStatus;

					if (answer.title) {
						draftRound.title = answer.title;
						draftRound.characters = answer.characters || '';
					}
					break;
				}
				case 'round_changed': {
					const roundNumber = parseInt(draft.current.round.replace('round', ''));
					const hasPrevious = draft.current.round != 'round1';
					const hasNext = draftRound.status != 'pending' && draft.current.round != 'round6';

					if (action.direction == 'previous' && hasPrevious) {
						const previousRound = `round${roundNumber - 1}` as keyof GameType['rounds'];
						const status = draft.rounds[previousRound].status == 'complete' ? 'correct' : 'incorrect';

						draft.current.guess = status;
						draft.current.round = previousRound;
						draft.current.status = status;
					} else if (action.direction == 'next' && hasNext) {
						const nextRound = `round${roundNumber + 1}` as keyof GameType['rounds'];

						draft.current.guess = false;
						draft.current.round = nextRound;
						draft.current.status = 'pending';
					}
					break;
				}
				case 'score_logged': {
					draft.current.scoreLogged = true;
					break;
				}
			}
		});
	},
};
