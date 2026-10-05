/* Packages */
import { createLazyFileRoute } from '@tanstack/react-router';

/* Scripts */
import { categories } from '@/components/play/scripts/categories';

/* Components */
import { PixelsGallery } from '@/components/play/Play';

export const Route = createLazyFileRoute('/pixels-gallery/')({
	component: RouteComponent,
});

function RouteComponent() {
	return <PixelsGallery categories={categories} />;
}
