import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';// Set up the scene, camera, and renderer
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';// Set up the scene, camera, and renderer
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';// Set up the scene, camera, and renderer
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';// Set up the scene, camera, and renderer
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';// Set up the scene, camera, and renderer
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

import { ActiveScene } from '../../../classes/active_scene';

import { create_couch } from './components/objects/furniture/chair';

import { create_lamp } from './components/objects/furniture/lamp';
import { create_camera } from './components/camera'; 

import * as SKYBOX from './components/skyboxes'
import * as FLOOR from './components/floor'
import * as WALLS from './components/walls'


declare global {
    var active: ActiveScene;
  }

export function run() {
    // var scene = new THREE.Scene()
    
    globalThis.active = new ActiveScene(new THREE.Scene())
    let scene = active.scene
    create_camera(active)

    // var camera = new THREE.OrthographicCamera(
    //     window.innerWidth / -120, window.innerWidth / 120,
    //     window.innerHeight / 120, window.innerHeight / -120,
    //     0.1, 1000
    // )

    /**
     * Generate SkyBox
     */
    new SKYBOX.STARFIELD()
    // Create the room 
    new FLOOR.ZIGZAG_TILE()
    new WALLS.RED_CURTAINS()
    
    create_couch(active)
    create_lamp(active)


/**
 * 
 * BANNANA
 */



    /**
     * CIRCLE BUTTONS
     * 
     * 
     */

//     let buttonDiv: HTMLDivElement;
//     let buttons: HTMLButtonElement[];
//     const buttonRadius = 150;

//     buttonDiv = document.createElement('div');
//     buttonDiv.style.position = 'absolute';
//     buttonDiv.style.top = '50%';
//     buttonDiv.style.left = '50%';
//     buttonDiv.style.transform = 'translate(-50%, -50%)';
//     document.body.appendChild(buttonDiv);
  
//     buttons = [];
//     const numButtons = 8; // Adjust this value to control the number of buttons in the crescent
//     const angleIncrement = (2 * Math.PI) / numButtons;
  
//     for (let i = 0; i < numButtons; i++) {
//       const angle = i * angleIncrement;
//       const x = buttonRadius * Math.cos(angle);
//       const y = buttonRadius * Math.sin(angle);
  
//       const button = createButton('Button ' + (i + 1), () => {
//         alert('Button ' + (i + 1) + ' clicked!');
//       });
  
//       button.style.position = 'absolute';
//       button.style.left = x + 'px';
//       button.style.top = y + 'px';
  
//       buttons.push(button);
//       buttonDiv.appendChild(button);
//     }
  
  
//   function createButton(label: string, onClick: () => void): HTMLButtonElement {
//     const button = document.createElement('button');
//     button.textContent = label;
//     button.style.padding = '10px 20px';
//     button.style.backgroundColor = '#3498db';
//     button.style.color = '#ffffff';
//     button.style.fontSize = '20px';
//     button.style.cursor = 'pointer';
//     button.style.border = 'none';
//     button.style.borderRadius = '5px';
//     button.style.outline = 'none';
//     button.style.marginBottom = '20px';
  
//     button.onclick = onClick;
//     return button;
//   }














    
    
    let buttonDiv: HTMLDivElement;

    buttonDiv = document.createElement('div');
    buttonDiv.style.position = 'absolute';
    buttonDiv.style.top = '85%';
    buttonDiv.style.left = '50%';
    buttonDiv.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(buttonDiv);
  
    let marginRight = 20
    createButton('Button 1', () => {
      alert('Button 1 clicked!');
    });
  
    createButton('Button 2', () => {
      alert('Button 2 clicked!');
    });

    createButton('Button 2', () => {
        alert('Button 2 clicked!');
      });

    function createButton(label: string, onClick: () => void) {

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
          }
                   
        let iconUrl = './assets/cloud.png'
        const button = document.createElement('button');
        const buttom_img = document.createElement('img');
        buttom_img.src = iconUrl
        buttom_img.textContent = label;
        buttom_img.style.padding = '10px 20px';
        buttom_img.style.backgroundColor = '#3498db';
        buttom_img.style.color = '#ffffff';
        buttom_img.style.fontSize = '20px';
        buttom_img.style.cursor = 'pointer';
        buttom_img.style.border = 'none';
        buttom_img.style.borderRadius = '5px';
        buttom_img.style.outline = 'none';
        buttom_img.style.marginRight = '80px'
        buttom_img.style.verticalAlign = getRandomArbitrary(-80, 80) + 'px'
        // button.style.backgroundImage = `file(${iconUrl})`;
        buttom_img.style.backgroundRepeat = 'no-repeat';
        buttom_img.style.backgroundSize = 'contain';
        buttom_img.style.backgroundPosition = 'center';
        buttom_img.height = 20;
        buttonDiv.appendChild(buttom_img);


        // button.textContent = label;
        // button.style.padding = '10px 20px';
        // button.style.backgroundColor = '#3498db';
        // button.style.opacity = '0.0';
        // button.style.fontSize = '20px';
        // button.style.cursor = 'pointer';
        // button.style.border = 'none';
        // button.style.borderRadius = '5px';
        // button.style.outline = 'none';
        // button.style.marginRight = '80px'
        // button.style.verticalAlign = getRandomArbitrary(-80, 80) + 'px'
        // // button.style.backgroundImage = `file(${iconUrl})`;
        // button.style.backgroundRepeat = 'no-repeat';
        // button.style.backgroundSize = 'contain';
        // button.style.backgroundPosition = 'center';
        button.onclick = onClick;
        buttonDiv.appendChild(button);

        
      }
    

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