import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	assetsInclude: ['**/*.glb'],
	plugins: [sveltekit()]
};

export default config;
