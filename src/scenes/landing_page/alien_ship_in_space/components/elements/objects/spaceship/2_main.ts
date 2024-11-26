import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import { ActiveScene } from '../../../../../../../classes/active_scene';
export function create(active: ActiveScene) {
    var scene = active.scene
    var fbx_loader = new OBJLoader();

    fbx_loader.load('./assets/spaceship.obj', function (fbx) {
        // Set up materials for the mesh
        fbx.traverse(function (child) {
            // if (child.isMesh) {
            //     var textureLoader = new THREE.TextureLoader();
            //     var texture = textureLoader.load('./assets/scene/waiting_room/chair_texture_brown.png');
            //     child.material = new THREE.MeshBasicMaterial({ map: texture });
            // }

            
            if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({
                    color: 0x808080, // Base color (white)
                    // metalness: 1, // Controls the amount of metalness (1 for fully metallic)
                    // roughness: 2, // Controls the roughness (0 for perfectly smooth)
                  });
            }
        });

        // Position and scale the mesh as needed
        fbx.position.set(2, 2, 2);
        fbx.scale.set(300.00, 300.00, 300.00);

        // Add the mesh to the scene
        scene.add(fbx);
    });
    // Load the FBX file
    // fbx_loader.load('./assets/spaceship.fbx', function (fbx) {
        // Set up materials for the mesh
        // fbx.traverse(function (child) {
            // if (child.isMesh) {
            //     var textureLoader = new THREE.TextureLoader();
            //     var texture = textureLoader.load('./assets/spaceship_texture.png');
            //     child.material = new THREE.MeshBasicMaterial({ map: texture });
            // }
            

            // if (child.isMesh) {
            //     child.material = new THREE.MeshBasicMaterial({
            //         color: 0x808080, // Base color (white)
            //         metalness: 1, // Controls the amount of metalness (1 for fully metallic)
            //         roughness: 2, // Controls the roughness (0 for perfectly smooth)
            //       });
            // }
            
        // });
        

        // Position and scale the mesh as needed
        // fbx.position.set(0, 0, 0);
        // fbx.scale.set(1.0, 1.0, 1.0);

        // // Add the mesh to the scene
        // scene.add(fbx);
    // });
}