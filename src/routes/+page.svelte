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

	const setLogoSize = (currentWidth = windowWidth) => {
		if (windowWidth > 1536) {
			logoSize = windowWidth * 0.27;
		} else if (windowWidth > 1280) {
			logoSize = windowWidth * 0.25;
		} else if (windowWidth > 1024) {
			logoSize = windowWidth * 0.3;
		} else if (windowWidth > 768) {
			logoSize = windowWidth * 0.39;
		} else if (windowWidth > 640) {
			logoSize = windowWidth * 0.5;
		} else {
			logoSize = windowWidth * 0.6;
		}
	};
	$: setLogoSize(windowWidth);

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
	<title>Home Page | Svg Development</title>
	<meta name="description" content="Home Page | Svg Development" />
</svelte:head>

<section>
	<div class="flex flex-col justify-center items-center w-screen h-screen overflow-auto">
		<div class="text-center w-full h-full flex flex-col justify-start items-center">
			<div class={`w-[${logoSize}] h-[${logoSize}]`}>
				{#if logoTransition}
					<img
						src={SvgLogo}
						alt="Svg Development Logo"
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
							textTransition = !textTransition;
						}, 4000)}
					on:outroend={() => (textTransition = !textTransition)}
					class="logoText text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mt-10"
				>
					create. design. code. build.
				</p>
			{/if}
		</div>
	</div>
</section>

<style>
</style>
