import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';// Set up the scene, camera, and renderer
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';// Set up the scene, camera, and renderer
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';// Set up the scene, camera, and renderer
// import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';// Set up the scene, camera, and renderer
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';// Set up the scene, camera, and renderer
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

import { ActiveScene } from '../../classes/active_scene';


import { create_camera } from './components/camera'; 



declare global {
    var active: ActiveScene;
  }

export function run() {
    // var scene = new THREE.Scene()
    
    globalThis.active = new ActiveScene(new THREE.Scene())
    let scene = active.scene
    create_camera(active)


    var sphereGeometry = new THREE.SphereGeometry(5, 32, 32); // Adjust radius and segments as needed
    // var sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 50, specular: 0xffffff });
    // var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.5, metalness: 0.5 });
    var loader = new THREE.CubeTextureLoader();
    var texture = loader.load([
      'https://threejs.org/examples/textures/cube/skybox/px.jpg',
      'https://threejs.org/examples/textures/cube/skybox/nx.jpg',
      'https://threejs.org/examples/textures/cube/skybox/py.jpg',
      'https://threejs.org/examples/textures/cube/skybox/ny.jpg',
      'https://threejs.org/examples/textures/cube/skybox/pz.jpg',
      'https://threejs.org/examples/textures/cube/skybox/nz.jpg'
  ]);
    var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.1, metalness: 0.9, envMap: texture });
    // const sphereMaterial = new THREE.MeshNormalMaterial();


    // WORKING
    // var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);


    var particleGroup = new THREE.Group();
    scene.add(particleGroup);

    // Create particles
    var particleCount = 200;
    var particleGeometry = new THREE.SphereGeometry(0.1, 8);
    var particleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // for (var i = 0; i < particleCount; i++) {
    //     var particle = new THREE.Mesh(particleGeometry, particleMaterial);
    //     var angle = Math.random() * Math.PI * 2;
    //     var radius = 5.5;
    //     particle.position.x = Math.cos(angle) * radius;
    //     particle.position.z = Math.sin(angle) * radius;
    //     particle.rotation.x = Math.random() * Math.PI * 2;
    //     particleGroup.add(particle);
    // }

    //   for (var i = 0; i < particleCount; i++) {
    //     var phi = Math.random() * Math.PI * 2; // Random angle
    //     var theta = Math.random() * Math.PI; // Random inclination angle
    
    //     // Convert spherical coordinates to Cartesian coordinates
    //     var x = 5 * Math.sin(theta) * Math.cos(phi);
    //     var y = 5 * Math.sin(theta) * Math.sin(phi);
    //     var z = 5 * Math.cos(theta);
    
    //     var particle = new THREE.Mesh(particleGeometry, particleMaterial);
    //     particle.position.set(x, y, z);
    //     particleGroup.add(particle);
    // }


    var particles = [];

    // for (var i = 0; i < particleCount; i++) {
    //     var phi = Math.random() * Math.PI * 2; // Random angle
    //     var theta = Math.random() * Math.PI; // Random inclination angle

    //     // Convert spherical coordinates to Cartesian coordinates
    //     var x = 5 * Math.sin(theta) * Math.cos(phi);
    //     var y = 5 * Math.sin(theta) * Math.sin(phi);
    //     var z = 5 * Math.cos(theta);

    //     var particle = new THREE.Mesh(particleGeometry, particleMaterial);
    //     particle.position.set(x, y, z);
    //     particleGroup.add(particle);
    //     particles.push({ particle: particle, theta: theta, phi: phi });
    // }


    for (var i = 0; i < particleCount; i++) {
      var phi = Math.random() * Math.PI * 2; // Random angle
      var theta = Math.random() * Math.PI; // Random inclination angle
      var speed = Math.random() * 0.05 + 0.02; // Random speed between 0.02 and 0.07
      var radius = 5 + Math.random() * 2; // Random radius between 5 and 7
      // Convert spherical coordinates to Cartesian coordinates
      var x = 5 * Math.sin(theta) * Math.cos(phi);
      var y = 5 * Math.sin(theta) * Math.sin(phi);
      var z = 5 * Math.cos(theta);
  
      var particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(x, y, z);
      particleGroup.add(particle);
      particles.push({ particle: particle, theta: theta, phi: phi, speed: speed, radius: radius });      // particles.push({ particle: particle, theta: theta, phi: phi, originalPosition: { x: x, y: y, z: z } });
  }

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);


  //   function animateParticles(isBreathing) {
  //     var targetScale = isBreathing ? 2 : 1; // Define target scale based on breathing state
  
  //     particles.forEach(function(particleData) {
  //         var targetX = particleData.originalPosition.x * targetScale;
  //         var targetY = particleData.originalPosition.y * targetScale;
  //         var targetZ = particleData.originalPosition.z * targetScale;
  
  //         var distanceX = targetX - particleData.particle.position.x;
  //         var distanceY = targetY - particleData.particle.position.y;
  //         var distanceZ = targetZ - particleData.particle.position.z;
  
  //         var easingFactor = 0.5; // Adjust easing factor to control the speed of the animation
  
  //         particleData.particle.position.x += distanceX * easingFactor;
  //         particleData.particle.position.y += distanceY * easingFactor;
  //         particleData.particle.position.z += distanceZ * easingFactor;
  //     });
  // }

//   function animateParticles() {
//     particles.forEach(function(particleData) {
//         particleData.phi += particleData.speed; // Update phi angle based on particle speed
//         if (particleData.phi > Math.PI * 2) {
//             particleData.phi -= Math.PI * 2;
//         }

//         var x = 5 * Math.sin(particleData.theta) * Math.cos(particleData.phi);
//         var y = 5 * Math.sin(particleData.theta) * Math.sin(particleData.phi);
//         var z = 5 * Math.cos(particleData.theta);
//         particleData.particle.position.set(x, y, z);
//     });
// }

function animateParticles() {
  particles.forEach(function(particleData) {
      // Update phi angle based on particle speed
      particleData.phi += particleData.speed;
      if (particleData.phi > Math.PI * 2) {
          particleData.phi -= Math.PI * 2;
      }

        // Update radius based on breathing effect
        if (particleData.isBreathing) {
          particleData.radius += Math.sin(performance.now() * 1.4 + particleData.theta) * 0.01;
      } else {
          particleData.radius = particleData.originalRadius;
      }

      // Convert spherical coordinates to Cartesian coordinates
      var x = particleData.radius * Math.sin(particleData.theta) * Math.cos(particleData.phi);
      var y = particleData.radius * Math.sin(particleData.theta) * Math.sin(particleData.phi);
      var z = particleData.radius * Math.cos(particleData.theta);

      particleData.particle.position.set(x, y, z);
  });
}
    
// Event listener for mouseover event
document.addEventListener('mouseover', function() {
  particles.forEach(function(particleData) {
      particleData.originalRadius = particleData.radius;
      particleData.isBreathing = true;
  });
});

// Event listener for mouseout event
document.addEventListener('mouseout', function() {
  particles.forEach(function(particleData) {
      particleData.isBreathing = false;
  });
});

    // Render the scene
    function animate() {
        requestAnimationFrame(animate)
        active.composer.render();
        particleGroup.rotation.y += 0.005;
        // renderer.render(scene, camera)
        active.controls.update()
    }
    animate()
}