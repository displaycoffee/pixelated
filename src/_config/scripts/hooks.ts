/* React */
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

/* Local scripts */
import { requests } from './requests';

/* Variables for useBodyClass */
const bodyPrefix = 'page-';
const bodySelector = document.querySelector('body');
let previousPage = '';

export const useBodyClass = (defaultPrefix: string) => {
	const location = useLocation();

	useEffect(() => {
		if (!bodySelector) return;

		// Remove any previous body class
		bodySelector.classList.remove(`${bodyPrefix}${previousPage || defaultPrefix}`);

		// Update previous location path
		// Replace any body prefix, remove first slash, and replace any other slash with hyphen
		previousPage = location.pathname.replace(bodyPrefix, '').replace('/', '').replace(/\//g, '-');

		// Add new body class
		bodySelector.classList.add(`${bodyPrefix}${previousPage || defaultPrefix}`);
	}, [location, defaultPrefix]);

	return null;
};

export const useReactQuery = (key: string, category: CategoryType, questionId: string, content: string) => {
	// Note: Content is either the hintId or the user's guess

	// Set initial variables
	let requestData = false;
	const queryKey = [key, JSON.stringify(category), questionId, content] as QueryKeyType;

	// If content, add to queryKey
	if (key == 'answers') {
		requestData = !!content;
	}

	// Create query request
	const {
		data: data,
		isPending: isPending,
		isSuccess: isSuccess,
		isFetched: isFetched,
		refetch: refetch,
	} = useQuery({
		queryKey: queryKey,
		queryFn: requests[key as keyof RequestsType],
		enabled: requestData,
	});

	return [data, refetch, { fetched: isFetched, pending: isPending, success: isSuccess }];
};

export const useRespond = (bp: number) => {
	const [match, setMatch] = useState(() => window.matchMedia(`(min-width: ${bp}px)`).matches);

	// Update match state on media change
	useEffect(() => {
		const mediaQuery = window.matchMedia(`(min-width: ${bp}px)`);
		const handler = (e: MediaQueryListEvent) => setMatch(e.matches);
		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	}, [bp]);

	return match;
};
