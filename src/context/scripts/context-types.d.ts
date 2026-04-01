/* React */
import { QueryClient } from '@tanstack/react-query';

/* Export types */
export type ContextValuesType = {
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

/* Export prop types */
export type ContextProps = {
	children: ReactNode;
};
