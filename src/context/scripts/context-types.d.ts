/* React */
import { QueryClient } from '@tanstack/react-query';

/* Type definitions */
type Context = {
	children: ReactNode;
};

type ContextValues = {
	game: GameType;
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

/* Export types */
export type ContextValuesType = ContextValues;

/* Export prop types */
export type ContextProps = Context;
