/* Packages */
import type { DefaultOptions } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useReducer } from 'react';
import { CookiesProvider } from 'react-cookie';

/* Scripts */
import type { ContextProps, ContextValuesType } from './scripts/context-types';
import { game as gameUtils } from './scripts/game';
import { theme } from '../_core/scripts/theme';
import { utils } from '../_core/scripts/utils';
import { variables } from '../_core/scripts/variables';

/* Query client for api */
const queryConfig: DefaultOptions = {
	queries: {
		gcTime: Infinity,
		staleTime: Infinity,
		retryDelay: (attemptIndex: number) => (attemptIndex === 0 ? 200 : 1000),
		retry: (failureCount: number, error: RequestErrorType) => {
			const status = error?.status ? error.status : 9999;

			// Only retry for 401s (the intermittent issue)
			if (status === 401 && failureCount < 2) {
				console.warn(`Retry attempt ${failureCount + 1} for status: ${status}`);
				return true;
			}

			// Don't retry for 404s or other permanent errors
			return false;
		},
	},
};
const queryClient = new QueryClient({
	defaultOptions: queryConfig,
});

/* Create context */
export const Context = createContext({} as ContextValuesType);

/* Create Context wrapper */
export const ContextProvider = ({ children }: ContextProps) => {
	// Set game state
	const [game, dispatch] = useReducer(gameUtils.reducer, gameUtils.initialState);

	const values: ContextValuesType = {
		game,
		dispatch,
		queryClient,
		theme,
		utils,
		variables,
	};

	return (
		<QueryClientProvider client={queryClient}>
			<CookiesProvider>
				<Context value={values}>{children}</Context>
			</CookiesProvider>
		</QueryClientProvider>
	);
};
