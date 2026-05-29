/* Styles */
import './styles/container.scss';

/* External imports */
import { Link } from 'react-router-dom';

/* Scripts */
import { useBodyClass } from './scripts/container-hooks';

/* Components */
import { ErrorBoundary } from '../../components/error-boundary/ErrorBoundary';
import { Navigation } from '../../components/navigation/Navigation';
import { Header } from '../header/Header';
import { Content } from '../content/Content';
import { Footer } from '../footer/Footer';

export const Container = () => {
	// Set body class using custom hook
	useBodyClass('play');

	return (
		<div className="container spacing-reset">
			<ErrorBoundary message={<ContainerError />}>
				<Header />

				<Navigation />

				<main className="main">
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
