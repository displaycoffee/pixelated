/* Packages */
import { useQuery } from '@tanstack/react-query';

/* Scripts */
import { requests } from './requests';

export const useReactQuery = (key: string, category: CategoryType, questionId: string, content: string, guessNumber?: number) => {
	// Note: Content is either the hintId or the user's guess

	// Set initial variables
	let requestData = false;
	const queryKey = [key, JSON.stringify(category), questionId, content, String(guessNumber ?? 0)] as QueryKeyType;

	// If content, add to queryKey
	if (key == 'answers') {
		requestData = !!content;
	}

	// Create query request
	const {
		data: data,
		isError: isError,
		isPending: isPending,
		isSuccess: isSuccess,
		isFetched: isFetched,
		refetch: refetch,
	} = useQuery({
		queryKey: queryKey,
		queryFn: requests[key as keyof RequestsType],
		enabled: requestData,
	});

	return [data, refetch, { error: isError, fetched: isFetched, pending: isPending, success: isSuccess }];
};
