<script lang="ts">
	import { scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
	import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
	import Stats from 'three/examples/jsm/libs/stats.module';
	import msft_texture_dds from 'three-gltf-extensions/loaders/MSFT_texture_dds/MSFT_texture_dds';
	// import msft_lod from 'three-gltf-extensions/loaders/MSFT_lod/MSFT_lod';

	let container3d: HTMLCanvasElement;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let scene: THREE.Scene;
	let windowHeight = 0;
	let windowWidth = 0;

	function loadCustomMesh(path: string) {
		const loader = new GLTFLoader();
		loader.register((parser) => new msft_texture_dds(parser, new DDSLoader()));
		return new Promise((resolve: (value: GLTF) => void) => {
			loader.load(
				path,
				(model) => {
					resolve(model);
				},
				() => {},
				() => {
					throw new Error('Could not load model from file.');
				}
			);
		});
	}

	// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
	// const material = new THREE.MeshStandardMaterial({ color: 0xccaaff });
	// const torus = new THREE.Mesh(geometry, material);
	// // scene.add(torus);

	onMount(async () => {
		scene = new THREE.Scene();
		scene.background = null;

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(5, 0, 0);

		renderer = new THREE.WebGLRenderer({
			canvas: container3d,
			// alpha: true,
			powerPreference: 'high-performance',
			antialias: true
		});
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMap.enabled = true;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(windowWidth, windowHeight);

		//#region LIGHT
		const pointLightTop = new THREE.PointLight(0xffffff);
		pointLightTop.position.set(5, 50, 20);
		scene.add(pointLightTop);

		const pointLightBottom = new THREE.PointLight(0xffffff);
		pointLightBottom.position.set(5, -50, -50);
		scene.add(pointLightBottom);

		const ambientLight = new THREE.AmbientLight(0x555555);
		scene.add(ambientLight);
		//#endregion LIGHT

		const controls = new OrbitControls(camera, renderer.domElement);

		let abstractMesh = await loadCustomMesh(`../../src/lib/3d-assets/Dragon.glb`);
		abstractMesh.scene.traverse(function (child) {
			if ((child as THREE.Mesh).isMesh) {
				const m = child as THREE.Mesh;
				m.receiveShadow = true;
				m.castShadow = true;
			}
			if ((child as THREE.Light).isLight) {
				const l = child as THREE.Light;
				l.castShadow = true;
				l.shadow.bias = -0.003;
				l.shadow.mapSize.width = 2048;
				l.shadow.mapSize.height = 2048;
			}
		});

		abstractMesh.scene.scale.set(8, 8, 8);
		abstractMesh.scene.position.set(2.6, -4, -1);
		abstractMesh.scene.rotation.set(0, 1.4, 0);
		scene.add(abstractMesh.scene);

		const mixer = new THREE.AnimationMixer(abstractMesh.scene);
		const clips = abstractMesh.animations;
		const stats = Stats();
		container3d.appendChild(stats.dom);
		function animate() {
			requestAnimationFrame(animate);
			// abstractMesh.scene.rotation.y += 0.01;
			// mixer.update(.03)
			mixer.update(0.04);
			controls.update();
			renderer.render(scene, camera);

			stats.update();
		}
		animate();

		const clip = THREE.AnimationClip.findByName(clips, 'flying');

		const action = mixer.clipAction(clip);
		action.play();
	});

	function scrollHandler() {
		console.log('scrolling');
	}

	function handleResize() {
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(windowWidth, windowHeight);
	}
</script>

<svelte:window
	bind:innerHeight={windowHeight}
	bind:innerWidth={windowWidth}
	on:wheel={scrollHandler}
	on:resize={handleResize}
/>
<div class="flex flex-col justify-center h-screen items-center pt-10">
	<div class="fixed">
		<canvas bind:this={container3d} />
	</div>
</div>
