/* Packages */
import { createLazyFileRoute } from '@tanstack/react-router';

/* Components */
import { Play } from '@/components/play/Play';

export const Route = createLazyFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	return <Play />;
}
