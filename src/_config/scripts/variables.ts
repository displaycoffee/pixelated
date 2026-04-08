/* This config contains variables to use through application */
const directory = '/pixelated';
export const variables = {
	paths: {
		api: import.meta.env.VITE_API_URL as string,
		basename: window.location.pathname.includes(directory) ? directory : '',
	},
};
