/* Scripts */
import { site } from '@/_core/data/site';

/* This config contains variables to use through application */
const directory = '/pixelated';
export const variables: VariablesType = {
	paths: {
		api: import.meta.env.VITE_API_URL as string,
		basename: typeof window == 'object' && window.location.pathname.includes(directory) ? directory : '',
	},
	site: site,
};
