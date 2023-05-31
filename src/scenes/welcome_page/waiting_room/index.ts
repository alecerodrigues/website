import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';// Set up the scene, camera, and renderer
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';// Set up the scene, camera, and renderer
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';// Set up the scene, camera, and renderer
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';// Set up the scene, camera, and renderer
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';// Set up the scene, camera, and renderer
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

import { ActiveScene } from '../../../classes/active_scene';

import { create_skybox } from './components/skybox';
import { create_floor } from './components/floor';
import { create_walls } from './components/walls';
import { create_couch } from './components/objects/furniture/chair';

import { create_lamp } from './components/objects/furniture/lamp';

export function run() {
    // var scene = new THREE.Scene()
    let active = new ActiveScene(new THREE.Scene())
    let scene = active.scene
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // var camera = new THREE.OrthographicCamera(
    //     window.innerWidth / -120, window.innerWidth / 120,
    //     window.innerHeight / 120, window.innerHeight / -120,
    //     0.1, 1000
    // )

    var renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    create_skybox(active)

    // Create the room  
    create_floor(active)
    create_walls(active)

    create_couch(active)

    create_lamp(active)

    camera.rotation.order = 'YXZ';
    camera.rotation.y = -Math.PI / 4;
    camera.rotation.x = Math.atan(-1 / Math.sqrt(2));

    // Set up the camera position
    camera.position.set(10, 9, 8)
    camera.lookAt(scene.position)

    var controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false // Enable panning with the mouse

    controls.enableRotate = true
    controls.autoRotate = false
    controls.autoRotateSpeed = 1

    // var buttonTexture = new THREE.TextureLoader().load('button_2.png');
    // var buttonMaterial = new THREE.SpriteMaterial({ map: buttonTexture });
    // var buttonSprite = new THREE.Sprite(buttonMaterial);
    // buttonSprite.scale.set(10, 10, 10); // Set the size of the button
    // buttonSprite.position.set(0, 10, 5); // Set the position of the button
    // scene.add(buttonSprite);

    // document.addEventListener('click', onDocumentClick, false);

    // function onDocumentClick(event) {
    //     event.preventDefault();
    //     var mouse = new THREE.Vector2();
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //     var raycaster = new THREE.Raycaster();
    //     raycaster.setFromCamera(mouse, camera);

    //     var intersects = raycaster.intersectObject(buttonSprite);

    //     if (intersects.length > 0) {
    //       // Handle button click event
    //       alert('Button clicked!');
    //       controls.autoRotate = !controls.autoRotate
    //     }
    //   }
    
    
    // var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    // var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // cubeMesh.position.set(0, 0, 5); // Set the position of the cube
    // scene.add(cubeMesh);

    // // Add click event listener to the cube
    // document.addEventListener('click', onDocumentClick, false);

    // function onDocumentClick(event) {
    //     event.preventDefault();
    //     var mouse = new THREE.Vector2();
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //     var raycaster = new THREE.Raycaster();
    //     raycaster.setFromCamera(mouse, camera);

    //     var intersects = raycaster.intersectObject(cubeMesh);

    //     if (intersects.length > 0) {
    //         // Handle cube click event
    //         // alert('Cube clicked!');
    //         controls.autoRotate = !controls.autoRotate

    //     }
    // }

    var composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    var filmPass = new FilmPass(50, 1, 1024, false);
    filmPass.renderToScreen = true;
    composer.addPass(filmPass);

    // Render the scene
    function animate() {
        requestAnimationFrame(animate)
        composer.render();
        // renderer.render(scene, camera)
        controls.update()
    }
    animate()
}