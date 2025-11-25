import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { searchForWorkspaceRoot } from 'vite';
import path from 'path'; // ⬅️ Ensure this import is present

const __dirname = path.resolve(); // ⬅️ Get the absolute root path

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'] })],
	kit: {
		adapter: adapter(),
	},
};

export default config;
