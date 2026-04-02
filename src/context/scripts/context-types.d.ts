/* React */
import { QueryClient } from '@tanstack/react-query';

/* Type definitions */
type Context = {
	children: ReactNode;
};

type ContextValues = {
	game: Game;
	setGame: React.Dispatch;
	queryClient: QueryClient;
	theme: {
		[key: string]: ObjectPrimitiveType;
	};
	utils: {
		[key: string]: Function;
	};
	variables: {
		[key: string]: ObjectPrimitiveType;
	};
};

type Game = {
	settings: {
		category: boolean | string;
		difficulty: boolean | string;
		totalPoints: number;
		currentRound: boolean | 'round1' | 'round2' | 'round3' | 'round4' | 'round5';
	};
	rounds: {
		round1: Round;
		round2: Round;
		round3: Round;
		round4: Round;
		round5: Round;
	};
};

type Round = {
	status: 'pending' | 'in progress' | 'complete';
	guesses: number;
	hints: number;
	points: number;
};

/* Export types */
export type ContextValuesType = ContextValues;

export type GameType = Game;

export type RoundType = Round;

/* Export prop types */
export type ContextProps = Context;
