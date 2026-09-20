/* Styles */
import './styles/container.scss';

/* Packages */
import { useRef } from 'react';
import { Link } from 'react-router-dom';

/* Scripts */
import { useAvailableMinHeight, useBodyClass } from './scripts/container-hooks';

/* Components */
import { ErrorBoundary } from '../../components/error-boundary/ErrorBoundary';
import { Navigation } from '../../components/navigation/Navigation';
import { Header } from '../header/Header';
import { Content } from '../content/Content';
import { Footer } from '../footer/Footer';

export const Container = () => {
	const mainRef = useRef<HTMLElement>(null);
	useAvailableMinHeight(mainRef);

	// Set body class using custom hook
	useBodyClass('play');

	return (
		<div className="container">
			<ErrorBoundary message={<ContainerError />}>
				<a href="#main-content" className="skip-link sr-only">
					Skip to main content
				</a>

				<Header />

				<Navigation label={'Header Navigation'} />

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
			Something went wrong. <Link to={'/'}>Go back.</Link>
		</p>
	);
};
