<script lang="ts">
	import SvgLogo from '$lib/images/logo64.svg';
	import { fade } from 'svelte/transition';
	import { scale } from 'svelte/transition';
	import { elasticInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	let windowWidth = 0;
	let logoSize = 0;
	let logoTransition = false;
	let textTransition = false;
	onMount(() => {
		setLogoSize();
		logoTransition = true;
		textTransition = true;
	});

	const setLogoSize = () => {
		if (windowWidth > 1536) {
			logoSize = windowWidth * 0.25;
		} else if (windowWidth > 1280) {
			logoSize = windowWidth * 0.34;
		} else if (windowWidth > 1024) {
			logoSize = windowWidth * 0.35;
		} else if (windowWidth > 768) {
			logoSize = windowWidth * 0.39;
		} else if (windowWidth > 640) {
			logoSize = windowWidth * 0.41;
		} else {
			logoSize = windowWidth * 5.8;
		}
	};
	$: setLogoSize();

	function typewriter(node: HTMLParagraphElement, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;

		const duration = text!.length / (speed * 0.006);

		return {
			duration,
			tick: (t: any) => {
				const i = ~~(text!.length * t);
				node.textContent = text!.slice(0, i);
			}
		};
	}
</script>

<svelte:window bind:innerWidth={windowWidth} />
<svelte:head>
	<title>Home</title>
	<meta name="description" content="svgdev home page" />
</svelte:head>

<section>
	<div
		class="flex flex-col justify-center items-center w-screen h-screen bg-[#0f0531] overflow-auto"
	>
		<div
			class="text-blue-300 text-center w-full h-full flex flex-col justify-start items-center"
		>
			<div class={`w-[${logoSize}] h-[${logoSize}]`}>
				{#if logoTransition}
					<img
						src={SvgLogo}
						alt="svg logo"
						width={logoSize}
						class="mx-auto object-scale-down"
						transition:scale={{
							duration: 3000,
							opacity: 0.8,
							start: 0.9,
							easing: elasticInOut
						}}
						on:introend={() => (logoTransition = !logoTransition)}
						on:outroend={() => (logoTransition = !logoTransition)}
					/>
				{/if}
			</div>
			{#if textTransition}
				<p
					in:typewriter
					out:fade
					on:introend={() =>
						setTimeout(() => {
							textTransition = textTransition;
						}, 4000)}
					on:outroend={() => (textTransition = textTransition)}
					class="logoText text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mt-32"
				>
					create. design. code. build.
				</p>
			{/if}
		</div>
	</div>
</section>

<style>
</style>
