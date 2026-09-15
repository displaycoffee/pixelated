/* Packages */
import type { QueryClient } from '@tanstack/react-query';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

/* Type definitions */
type Context = {
	children: ReactNode;
};

type ContextValues = {
	gameDefault: GameType;
	game: GameType;
	setGame: Dispatch<SetStateAction<GameType>>;
	queryClient: QueryClient;
	theme: ThemeType;
	utils: UtilsType;
	variables: VariablesType;
};

/* Export types */
export type ContextValuesType = ContextValues;

/* Export prop types */
export type ContextProps = Context;
