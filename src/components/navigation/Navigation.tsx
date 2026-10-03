/* Styles */
import './styles/navigation.scss';

/* Packages */
import { Fragment } from 'react';
import { Link } from '@tanstack/react-router';

/* Scripts */
import type { NavigationComponentProps, NavigationItemComponentProps } from './scripts/navigation-types';
import { navigationUtils } from './scripts/navigation-utils';
import { useViewTransition } from '@displaycoffee/scripts/hooks-tanstack';

/* Components */
import { LinkExternal, List } from '../blocks/Blocks';

export const Navigation = (props: NavigationComponentProps) => {
	const { data, disableTransition, label } = props;
	const navigationList = navigationUtils.get.list(data);
	const navigationLinkClass = 'navigation-link';

	return navigationList.length != 0 ? (
		<nav className="navigation" aria-label={label}>
			<List className={'navigation-list'} variant={'ul-unstyled'}>
				{navigationList.map((nav) => {
					return (
						<Fragment key={nav.id}>
							<NavigationListItem disableTransition={disableTransition ?? false} navigationLinkClass={navigationLinkClass} nav={nav} />
						</Fragment>
					);
				})}
			</List>
		</nav>
	) : null;
};

export const NavigationListItem = (props: NavigationItemComponentProps) => {
	const { children, disableTransition, nav, navigationLinkClass } = props;
	const handleTransition = useViewTransition();

	return (
		<li className="navigation-list-item">
			{nav.isRoute ? (
				<Link
					to={nav.url}
					onClick={disableTransition ? undefined : (e) => handleTransition(e, nav.url)}
					className={navigationLinkClass}
					activeProps={{ className: `${navigationLinkClass}-active` }}
				>
					{nav.label}
				</Link>
			) : (
				<LinkExternal href={nav.url}>{nav.label}</LinkExternal>
			)}
			{children}
		</li>
	);
};
