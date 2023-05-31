import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

import { ActiveScene } from '../../../../../../classes/active_scene';
export function create_lamp(active: ActiveScene) {
    var scene = active.scene
    var fbx_loader = new FBXLoader();

    // Load the FBX file
    fbx_loader.load('./assets/scene/waiting_room/lamp.fbx', function (fbx) {
        // Set up materials for the mesh
        fbx.traverse(function (child) {
            if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({
                    color: 0x808080, // Base color (white)
                    metalness: 1, // Controls the amount of metalness (1 for fully metallic)
                    roughness: 2, // Controls the roughness (0 for perfectly smooth)
                  });
            }
        });

        // Position and scale the mesh as needed
        fbx.position.set(2.3, 0.01, -1);
        fbx.scale.set(0.05, 0.05, 0.05);

        // Add the mesh to the scene
        scene.add(fbx);
    });
}