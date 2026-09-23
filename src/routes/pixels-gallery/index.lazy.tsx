/* Packages */
import { createLazyFileRoute } from '@tanstack/react-router';

/* Scripts */
import { categories } from '../index/scripts/categories';

/* Components */
import { PixelsGallery } from '../index.lazy';

export const Route = createLazyFileRoute('/pixels-gallery/')({
	component: RouteComponent,
});

function RouteComponent() {
	return <PixelsGallery categories={categories} />;
}
