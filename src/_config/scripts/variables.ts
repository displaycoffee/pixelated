/* This config contains variables to use through application */
const directory = '/pixelated';
export const variables = {
	paths: {
		api: window.location.host.includes('localhost') ? 'http://localhost:3001' : 'https://pixelated-api.display.coffee',
		basename: window.location.pathname.includes(directory) ? directory : '',
	},
};
