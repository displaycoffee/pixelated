/* Scripts */
import type { NavigationMapType } from './navigation-types';
import { navigationUtils } from './navigation-utils';

const { create } = navigationUtils;

export const navigationHeader: NavigationMapType = {
	...create({ key: 'index', label: 'Play', url: '/' }),
	...create({ key: 'about', label: 'About' }),
	...create({ key: 'rules', label: 'Rules' }),
	...create({ key: 'scoreboard', label: 'Scoreboard' }),
};
