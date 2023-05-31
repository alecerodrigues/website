import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

import { ActiveScene } from '../../../../../../classes/active_scene';
export function create_couch(active: ActiveScene) {
    var scene = active.scene
    var fbx_loader = new FBXLoader();

    // Load the FBX file
    fbx_loader.load('./assets/scene/waiting_room/chair.fbx', function (fbx) {
        // Set up materials for the mesh
        fbx.traverse(function (child) {
            if (child.isMesh) {
                var textureLoader = new THREE.TextureLoader();
                var texture = textureLoader.load('./assets/scene/waiting_room/chair_texture_brown.png');
                child.material = new THREE.MeshBasicMaterial({ map: texture });
            }
        });

        // Position and scale the mesh as needed
        fbx.position.set(0, 0, 0);
        fbx.scale.set(0.02, 0.02, 0.02);

        // Add the mesh to the scene
        scene.add(fbx);
    });
}