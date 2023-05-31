import * as THREE from 'three'
import { ActiveScene } from '../../../../classes/active_scene';

export function create_skybox(active: ActiveScene) {
    // Create a starfield texture
    var scene = active.scene
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
}