/* Packages */
import type { QueryClient } from '@tanstack/react-query';
import type { Dispatch, ReactNode } from 'react';

/* Type definitions */
type Context = {
	children: ReactNode;
};

type ContextValues = {
	game: GameType;
	dispatch: Dispatch<GameActionType>;
	queryClient: QueryClient;
	theme: ThemeType;
	utils: UtilsType;
	variables: VariablesType;
};

/* Export types */
export type ContextValuesType = ContextValues;

/* Export prop types */
export type ContextProps = Context;
