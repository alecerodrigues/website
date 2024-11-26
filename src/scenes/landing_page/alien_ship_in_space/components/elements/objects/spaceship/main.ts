import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { ActiveScene } from '../../../../../../../classes/active_scene';
export function create(active: ActiveScene) {
    var scene = active.scene
    var fbx_loader = new OBJLoader();

    // Load the FBX file
    fbx_loader.load('./assets/spaceship.obj', function (fbx) {
        // Set up materials for the mesh
        fbx.traverse(function (child) {
            // if (child.isMesh) {
                // var textureLoader = new THREE.TextureLoader();
                // var texture = textureLoader.load('./assets/spaceship_texture.png');
                // child.material = new THREE.MeshBasicMaterial({ map: texture });
            // }

            if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({
                    color: 0x808080, // Base color (white)
                    metalness: 1, // Controls the amount of metalness (1 for fully metallic)
                    roughness: 0, // Controls the roughness (0 for perfectly smooth)
                  });
            }
            
        });

        // Position and scale the mesh as needed
        fbx.position.set(1, 1, 1);
        fbx.scale.set(1.0, 1.0, 1.0);

        // Add the mesh to the scene
        scene.add(fbx);
    });
}