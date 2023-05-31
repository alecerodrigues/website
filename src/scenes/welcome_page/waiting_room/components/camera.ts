import * as THREE from 'three'
import { ActiveScene } from '../../../../classes/active_scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';// Set up the scene, camera, and renderer
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';// Set up the scene, camera, and renderer
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';// Set up the scene, camera, and renderer
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';// Set up the scene, camera, and renderer
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';// Set up the scene, camera, and renderer
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export function create_camera(active: ActiveScene) {
    var scene = active.scene

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    var renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    active.renderer = renderer

    camera.rotation.order = 'YXZ';
    camera.rotation.y = -Math.PI / 4;
    camera.rotation.x = Math.atan(-1 / Math.sqrt(2));

    // Set up the camera position
    camera.position.set(10, 9, 8)
    camera.lookAt(scene.position)

    active.camera = camera


    var controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false // Enable panning with the mouse

    controls.enableRotate = true
    controls.autoRotate = false
    controls.autoRotateSpeed = 1

    active.controls = controls

    var composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    active.composer = composer

    var filmPass = new FilmPass(50, 1, 1024, false);
    filmPass.renderToScreen = true;
    composer.addPass(filmPass);
}