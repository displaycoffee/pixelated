/* This config contains variables to use through application */
const directory = '/pixelated';
export const variables = {
	paths: {
		basename: window.location.pathname.includes(directory) ? directory : '',
	},
};
