/* React */
import { RefObject, useEffect, useId, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

/* Local scripts */
import { requests } from './requests';

/* Set pageCache to get previous page */
let pageCache = {
	previous: '',
};

export const useBodyClass = (defaultPrefix: string) => {
	const location = useLocation();
	const bodySelector = document.querySelector('body');
	const bodyPrefix = 'page-';
	const bodyDefault = defaultPrefix;

	if (bodySelector) {
		useEffect(() => {
			// Remove any previous body class
			bodySelector.classList.remove(`${bodyPrefix}${pageCache.previous || bodyDefault}`);

			// Update previous location path
			// Replace any body prefix, remove first slash, and replace any other slash with hyphen
			pageCache.previous = location.pathname.replace(bodyPrefix, '').replace('/', '').replace(/\//g, '-');

			// Add new body class
			bodySelector.classList.add(`${bodyPrefix}${pageCache.previous || bodyDefault}`);
		}, [location]);
	}

	return null;
};

export const useClickOutside = (callback: Function) => {
	const clickRef: RefObject<HTMLDivElement | null> = useRef(null);

	// Determine if a click has been performed outside an element
	useEffect(() => {
		const handleClickOutside = (e: Event) => {
			if (clickRef.current && !clickRef.current.contains(e.target as Node)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [clickRef, callback]);

	return clickRef;
};

export const useFormattedId = () => {
	// Updates the format of useId hook
	const id = useId();
	return id
		.slice(1, -1)
		.replace(/^\_|\_$/g, '')
		.replace(/\_/g, '-');
};

export const useReactQuery = (key: string, id: string, content?: string) => {
	// Set initial variables
	let requestData = false;
	let queryKey = [key, id] as QueryKeyType;

	// If content, add to queryKey
	if (content) {
		requestData = !!content;
		queryKey = [key, id, content] as QueryKeyType;
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
	const rule = window.matchMedia(`(min-width: ${bp}px)`);
	let [match, setMatch] = useState(rule.matches);

	// Update match state on media change
	rule.onchange = (e) => {
		if (e.matches) {
			match = true;
		} else {
			match = false;
		}
		setMatch(match);
	};

	return match;
};
