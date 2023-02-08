<script lang="ts">
	import * as BABYLON from 'babylonjs';
	import 'babylonjs-loaders';
	import { onMount } from 'svelte';

	let container3d: HTMLCanvasElement;
	let scene: BABYLON.Scene | null = null;
	let camera: BABYLON.FreeCamera | null = null;
	let dragonAnimations = '';

	class Playground {
		public static CreateScene(canvas: HTMLCanvasElement): BABYLON.Scene {
			const engine = new BABYLON.Engine(canvas, true);
			scene = new BABYLON.Scene(engine);
			camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
			camera.attachControl(canvas, true);

			let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
			light.intensity = 0.7;

			BABYLON.SceneLoader.Append('/', 'Dragon.glb', scene, function (scene) {
				// // Create a default arc rotate camera and light.
				scene.createDefaultCameraOrLight(true, true, true);
				//@ts-ignore
				scene.activeCamera!.alpha += -Math.PI / 1.2;

				//@ts-ignore
				scene.activeCamera!.radius += -0.8;
			});

			engine.runRenderLoop(function () {
				scene?.render();
			});

			return scene;
		}
	}

	function changeAnimation() {
		if (scene == null) return;

		switch (dragonAnimations[0]) {
			case 'flying':
				const flying = scene.getAnimationGroupByName('flying');
				flying?.start(true, 1, flying.from, flying.to, false);
				//@ts-ignore
				scene.activeCamera!.alpha = 1.2;

				//@ts-ignore
				scene.activeCamera!.beta = 1.4;

				//@ts-ignore
				scene.activeCamera!.radius = 1;
				break;
			case 'idle':
				const idle = scene.getAnimationGroupByName('idle');
				break;
			case 'running':
				const running = scene.getAnimationGroupByName('running');
				break;
		}
	}

	$: {
		console.log(dragonAnimations[0]);

		changeAnimation();
	}
	onMount(() => {
		Playground.CreateScene(container3d);
	});
</script>

<svelte:head>
	<title>3D Dragon</title>
	<meta name="description" content="display 3d dragon" />
</svelte:head>

<div class="w-screen h-screen relative">
	<canvas bind:this={container3d} class="w-full h-full absolute" />

	<!-- <select class="fixed" multiple bind:value={dragonAnimations}>
		<option value="flying">flying</option>
		<option value="idle">idle</option>
		<option value="running">running</option>
	</select> -->
</div>
