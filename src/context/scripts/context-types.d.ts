/* Packages */
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
	theme: ThemeType;
	utils: UtilsType;
	variables: VariablesType;
};

/* Export types */
export type ContextValuesType = ContextValues;

/* Export prop types */
export type ContextProps = Context;
