import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { optimizeCss } from 'carbon-preprocess-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), optimizeCss(), basicSsl()]
});
