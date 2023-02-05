<script lang="ts">
	import * as BABYLON from 'babylonjs';
	import { onMount, onDestroy } from 'svelte';

	let container3d: HTMLCanvasElement;
	class Playground {
		public static CreateScene(canvas: HTMLCanvasElement): BABYLON.Scene {
			const engine = new BABYLON.Engine(canvas, true);
			let scene = new BABYLON.Scene(engine);
			var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
			camera.setTarget(BABYLON.Vector3.Zero());
			camera.attachControl(canvas, true);
			var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
			light.intensity = 0.7;
			// var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);
			// sphere.position.y = 1;
			// var ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);

			// BABYLON.SceneLoader.Load('../../src/lib/3d-assets/', 'Dragon.glb', engine, function (scene) {
			// 	console.log('ok');
			// 	// scene.createDefaultCamera(true, true, true);
			// });
			BABYLON.SceneLoader.Append('../../src/lib/3d-assets/', 'Dragon.glb', scene, function (scene) {
				// Create a default arc rotate camera and light.
				scene.createDefaultCameraOrLight(true, true, true);

				// The default camera looks at the back of the asset.
				// Rotate the camera by 180 degrees to the front of the asset.
				scene!.activeCamera!.alpha += Math.PI;
			});

			engine.runRenderLoop(function () {
				scene.render();
			});

			return scene;
		}
	}

	onMount(() => {
		Playground.CreateScene(container3d);
	});
</script>

<canvas bind:this={container3d} class="w-screen h-screen fixed" />
