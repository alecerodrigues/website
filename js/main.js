import * as THREE from '../node_modules/three/build/three.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';// Set up the scene, camera, and renderer
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';// Set up the scene, camera, and renderer
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';// Set up the scene, camera, and renderer
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';// Set up the scene, camera, and renderer
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';// Set up the scene, camera, and renderer

var scene = new THREE.Scene()
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var camera = new THREE.OrthographicCamera(
    window.innerWidth / -120, window.innerWidth / 120,
    window.innerHeight / 120, window.innerHeight / -120,
    0.1, 1000
  )

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create a starfield texture
var starfieldTexture = new THREE.TextureLoader().load('./assets/stars.webp');

// Create a material for the starfield using the texture
var starfieldMaterial = new THREE.MeshBasicMaterial({
    map: starfieldTexture,
    side: THREE.BackSide // Ensure the material is visible from inside the scene
});

// Create a geometry for the skydome (can also use a box geometry for a skybox)
var skydomeGeometry = new THREE.SphereGeometry(50, 32, 32);

// Create a mesh using the skydome geometry and the starfield material
var skydomeMesh = new THREE.Mesh(skydomeGeometry, starfieldMaterial);

// Add the skydome mesh to the scene
scene.add(skydomeMesh);

// Create the room
var room = new THREE.Object3D()

// Create the floor with black and white squares
var squareSize = 1
var gridSize = 10

// // Create black and white squares
// var square_color_BLACK = new THREE.MeshBasicMaterial({ color: 0x000000 })
// var square_color_WHITE = new THREE.MeshBasicMaterial({ color: 0xffffff })
// for (var i = 0 ; i < gridSize ; i++) {
//     for (var j = 0 ; j < gridSize ; j++) {
//     var squareGeometry = new THREE.PlaneGeometry(squareSize, squareSize, 4, 3)
//     var squareMaterial = (i + j) % 2 === 0 ? square_color_BLACK : square_color_WHITE
//     var square = new THREE.Mesh(squareGeometry, squareMaterial)
//     square.position.x = i - (gridSize - 1) / 2
//     square.position.z = j - (gridSize - 1) / 2
//     square.rotation.x = -Math.PI / 2
//     room.add(square)
//     }
// }

// // Create a floor
// var floorSize = 10;
// var floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
// var floorTexture = new THREE.TextureLoader().load('red_room_floor_material.jpg');
// var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
// var floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
// floorMesh.rotation.x = -Math.PI / 2; // Rotate the floor to be horizontal
// scene.add(floorMesh);
var textureLoader = new THREE.TextureLoader();

textureLoader.load('./assets/waiting_room_floor_material.jpg', function (texture) {
  // Set the texture to repeat twice
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  // Create the floor material using the texture
  var floorMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

  // Create the floor geometry
  var floorGeometry = new THREE.PlaneGeometry(10, 10);

  // Create the floor mesh with the geometry and material
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);

  // Rotate and position the floor
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;

  // Add the floor to the scene
  scene.add(floor);
});

/**
 * Creates 2 adjoining walls of the cube to compliment the isometric view into the room.
 */
// Set the wall color to red
var wallMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// Assign the box geometry
var wallGeometry = new THREE.BoxGeometry(10, 8, .2)
// Create the right facing wall
var right_wall = new THREE.Mesh(wallGeometry, wallMaterial)
right_wall.position.set(0, 4, -5)
room.add(right_wall)
// Create the left facing wall
var left_wall = new THREE.Mesh(wallGeometry, wallMaterial)
left_wall.position.set(-5, 4, 0)
left_wall.rotation.y = Math.PI / 2
room.add(left_wall)

/**
 * Adds the composite room object to the scene.
 * Contains:
 * - Walls
 * - Floor
 */
scene.add(room)

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

var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.set(0, 0, 5); // Set the position of the cube
scene.add(cubeMesh);

// Add click event listener to the cube
document.addEventListener('click', onDocumentClick, false);

function onDocumentClick(event) {
  event.preventDefault();
  var mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  var raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObject(cubeMesh);

  if (intersects.length > 0) {
    // Handle cube click event
    // alert('Cube clicked!');
    controls.autoRotate = !controls.autoRotate

  }
}

var composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

var filmPass = new FilmPass(50,1,1024,false);
filmPass.renderToScreen = true;
composer.addPass(filmPass);

// Render the scene
function animate() {
    requestAnimationFrame(animate)
    composer.render();
    // renderer.render(scene, camera)
    controls.update()
    starfieldMaterial.needsUpdate = true
    
}
animate()