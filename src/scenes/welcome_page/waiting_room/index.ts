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
import { create_camera } from './components/camera'; 

export function run() {
    // var scene = new THREE.Scene()
    let active = new ActiveScene(new THREE.Scene())
    let scene = active.scene
    create_camera(active)

    // var camera = new THREE.OrthographicCamera(
    //     window.innerWidth / -120, window.innerWidth / 120,
    //     window.innerHeight / 120, window.innerHeight / -120,
    //     0.1, 1000
    // )

    create_skybox(active)

    // Create the room  
    create_floor(active)
    create_walls(active)

    create_couch(active)

    create_lamp(active)



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



    // Render the scene
    function animate() {
        requestAnimationFrame(animate)
        active.composer.render();
        // renderer.render(scene, camera)
        active.controls.update()
    }
    animate()
}