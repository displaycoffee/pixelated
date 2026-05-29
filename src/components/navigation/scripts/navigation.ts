/* Packages */
import { lazy } from 'react';

/* Scripts */
import { variables } from '../../../_config/scripts/variables';
import { categories } from '../../../pages/play/scripts/categories';
import { NavigationType } from './navigation-types';

/* Components */
const Play = lazy(() => import('../../../pages/play/Play').then((m) => ({ default: m.Play })));
const PixelsGallery = lazy(() => import('../../../pages/play/Play').then((m) => ({ default: m.PixelsGallery })));
const About = lazy(() => import('../../../pages/about/About').then((m) => ({ default: m.About })));
const Rules = lazy(() => import('../../../pages/rules/Rules').then((m) => ({ default: m.Rules })));
const Scoreboard = lazy(() => import('../../../pages/scoreboard/Scoreboard').then((m) => ({ default: m.Scoreboard })));

export const navigation = [
	{
		id: 0,
		alt: 'Play',
		element: Play,
		isRoute: true,
		label: 'Play',
		showInNav: true,
		url: '/',
	},
	{
		id: 1,
		alt: 'About',
		element: About,
		isRoute: true,
		label: 'About',
		showInNav: true,
		url: '/about',
	},
	{
		id: 2,
		alt: 'Rules',
		element: Rules,
		isRoute: true,
		label: 'Rules',
		showInNav: true,
		url: '/rules',
	},
	{
		id: 3,
		alt: 'Scoreboard',
		element: Scoreboard,
		isRoute: true,
		label: 'Scoreboard',
		showInNav: true,
		url: '/scoreboard',
	},
] as NavigationType[];

/* Only add gallery url for testing pixels in development mode */
if (variables.paths.api.includes('localhost')) {
	navigation.push({
		id: 4,
		alt: 'Pixels Gallery',
		element: PixelsGallery,
		isRoute: true,
		label: 'Pixels Gallery',
		showInNav: true,
		url: '/pixels-gallery',
		props: {
			categories: categories,
		},
	});
}
