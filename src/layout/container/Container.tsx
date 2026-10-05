/* Styles */
import './styles/container.scss';

/* Packages */
import { useRef } from 'react';
import { Link } from '@tanstack/react-router';

/* Scripts */
import { useAvailableMinHeight, useBodyClass } from '@displaycoffee/scripts/hooks-tanstack';
import { navigationHeader } from '@/components/navigation/scripts/navigation';

/* Components */
import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary';
import { Navigation } from '@/components/navigation/Navigation';
import { Header } from '@/layout/header/Header';
import { Content } from '@/layout/content/Content';
import { Footer } from '@/layout/footer/Footer';

export const Container = () => {
	const mainRef = useRef<HTMLElement>(null);
	useAvailableMinHeight(mainRef);

	// Set body class using custom hook
	useBodyClass('index');

	return (
		<div className="container">
			<ErrorBoundary message={<ContainerError />}>
				<a href="#main-content" className="skip-link sr-only no-decoration">
					Skip to main content
				</a>

				<Header />

				<Navigation data={navigationHeader} label={'Header Navigation'} />

				<main id="main-content" className="main" ref={mainRef}>
					<div className="main-layout flex-wrap">
						<Content />
					</div>
				</main>

				<Footer />
			</ErrorBoundary>
		</div>
	);
};

const ContainerError = () => {
	return (
		<p>
			Something went wrong. <Link to={'/'}>Go back</Link>.
		</p>
	);
};
