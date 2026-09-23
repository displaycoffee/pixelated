let sitemap = {
	dynamicRoutes: ['/page-one', '/page-two/child-page-one', '/page-two/child-page-two', '/page-three', '/page-four'],
	exclude: ['/assets', '/assets/css', '/assets/fonts', '/assets/js', '/assets/images'],
	hostname: 'https://pixelated.display.coffee',
	readable: true,
};

export const sitemapConfig = sitemap;
