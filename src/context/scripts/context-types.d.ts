/* React */
import { QueryClient } from '@tanstack/react-query';

/* Type definitions */
type Context = {
	children: ReactNode;
};

type ContextValues = {
	gameDefault: GameType;
	game: GameType;
	setGame: React.Dispatch;
	queryClient: QueryClient;
	theme: {
		[key: string]: ObjectPrimitiveType;
	};
	utils: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: (...args: any[]) => any;
	};
	variables: {
		[key: string]: ObjectPrimitiveType;
	};
};

/* Export types */
export type ContextValuesType = ContextValues;

/* Export prop types */
export type ContextProps = Context;
