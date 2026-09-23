/* Packages */
import { createFileRoute, redirect } from '@tanstack/react-router';

/* Scripts */
import { variables } from '../../_core/scripts/variables';

export const Route = createFileRoute('/pixels-gallery/')({
	beforeLoad: () => {
		if (!variables.paths.api.includes('localhost')) {
			throw redirect({ to: '/' });
		}
	},
});
