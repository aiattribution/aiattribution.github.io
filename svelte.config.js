import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],

	kit: {
		appDir: 'app',
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			strict: false,
			fallback: '404.html'
		}),
		paths: {
			assets: 'https://pages.github.ibm.com/ai-c-7815/ai-attribution-toolkit',
			base: process.env.NODE_ENV === 'production' ? '/ai-c-7815/ai-attribution-toolkit' : ''
		}
	}
};

export default config;
