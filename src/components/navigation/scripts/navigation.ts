/* Local scripts */
import { NavigationType } from './navigation-types';

export const navigation = [
	{
		id: 0,
		alt: 'Play',
		isRoute: true,
		label: 'Play',
		showInNav: true,
		url: '/',
	},
	{
		id: 1,
		alt: 'About',
		isRoute: true,
		label: 'About',
		showInNav: true,
		url: '/about',
	},
	{
		id: 2,
		alt: 'Rules',
		isRoute: true,
		label: 'Rules',
		showInNav: true,
		url: '/rules',
	},
	{
		id: 3,
		alt: 'Scores',
		isRoute: true,
		label: 'Scores',
		showInNav: true,
		url: '/scores',
	},
] as NavigationType[];
