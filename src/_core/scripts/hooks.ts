/* Packages */
import type { MouseEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useEffect, useId, useState } from 'react';
import { flushSync } from 'react-dom';

/* Scripts */
import { requests } from './requests';

export const useFormattedId = () => {
	// Updates the format of useId hook
	const id = useId();
	return id.slice(1, -1).replace(/^_|_$/g, '').replace(/_/g, '-');
};

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

export const useRespond = (bp: string, rule?: 'min-width' | 'max-width') => {
	const mediaQueryRule = `(${rule ?? 'min-width'}: ${bp})`;
	const [match, setMatch] = useState(() => window.matchMedia(mediaQueryRule).matches);

	// Update match state on media change
	useEffect(() => {
		const mediaQuery = window.matchMedia(mediaQueryRule);
		const handler = (e: MediaQueryListEvent) => setMatch(e.matches);
		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	}, [mediaQueryRule]);

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
							void navigate({ href: target });
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
