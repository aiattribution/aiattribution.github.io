import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { optimizeCss } from 'carbon-preprocess-svelte';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
	plugins: [sveltekit(), optimizeCss(), basicSsl(), imagetools()]
});
