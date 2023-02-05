// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}
declare module '$lib/3d-assets/*.glb' {
	const src: string
	export default src
}
export { };
