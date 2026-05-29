/* External imports */
import { MouseEvent, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
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

export const useViewTransition = () => {
	// Custom hook to use View Transitions API
	const navigate = useNavigate();
	const location = useLocation();

	return (e: MouseEvent<HTMLElement>, target: string | (() => void)) => {
		const isUrl = typeof target === 'string';

		if (!document.startViewTransition || e.ctrlKey || e.metaKey || e.shiftKey || (isUrl && target === location.pathname)) {
			return false;
		} else {
			e.preventDefault();

			const contentEl = document.querySelector('.content') as HTMLElement;
			if (contentEl) contentEl.style.viewTransitionName = 'page-content';

			void document
				.startViewTransition(() => {
					flushSync(() => {
						if (isUrl) {
							void navigate(target);
						} else {
							target();
						}
					});
				})
				.finished.finally(() => {
					if (contentEl) contentEl.style.viewTransitionName = '';
				});
		}
	};
};
