/* React */
import { createContext, useState } from 'react';
import { DefaultOptions, QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* Local scripts */
import { ContextProps, ContextValuesType } from './scripts/context-types';
import { theme } from '../_config/scripts/theme';
import { utils } from '../_config/scripts/utils';
import { variables } from '../_config/scripts/variables';

/* Query client for api */
const queryConfig: DefaultOptions = {
	queries: {
		gcTime: Infinity,
		staleTime: Infinity,
		retryDelay: (attemptIndex: number) => (attemptIndex === 0 ? 200 : 1000),
		retry: (failureCount: number, error: RequestErrorType) => {
			const status = error?.status ? error.status : 9999;

			// This will now log correctly!
			console.warn(`Retry attempt ${failureCount + 1} for status: ${status}`);

			// Only retry for 401s (the intermittent issue)
			if (status === 401 && failureCount < 2) {
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

/* Create Context.Provider wrapper */
export const ContextProvider = ({ children }: ContextProps) => {
	// Create config for each round
	const round: RoundType = {
		id: false,
		status: 'pending',
		guesses: 0,
		hints: 0,
		points: 100,
		values: [],
	};

	// Create game config
	const gameConfig: GameType = {
		current: {
			guess: false,
			hint: false,
			points: 0,
			round: 'round1',
			status: 'pending',
		},
		settings: {
			category: false,
			difficulty: false,
		},
		rounds: {
			round1: round,
			round2: round,
			round3: round,
			round4: round,
			round5: round,
		},
	};

	// Set game state
	const [game, setGame] = useState(gameConfig);

	const values: ContextValuesType = {
		game,
		setGame,
		queryClient,
		theme,
		utils,
		variables,
	};

	return (
		<QueryClientProvider client={queryClient}>
			<Context.Provider value={values}>{children}</Context.Provider>
		</QueryClientProvider>
	);
};
