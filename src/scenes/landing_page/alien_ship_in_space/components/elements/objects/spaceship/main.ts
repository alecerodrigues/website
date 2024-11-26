// import * as THREE from 'three'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { ActiveScene } from '../../../../../../../classes/active_scene';

// // export function create(active: ActiveScene) {
// //     var scene = active.scene
// //     var fbx_loader = new FBXLoader();

// //     // Load the FBX file
// //     fbx_loader.load('./assets/spaceship.obj', function (fbx) {
// //         // Set up materials for the mesh
// //         fbx.traverse(function (child) {
// //             // if (child.isMesh) {
// //                 // var textureLoader = new THREE.TextureLoader();
// //                 // var texture = textureLoader.load('./assets/spaceship_texture.png');
// //                 // child.material = new THREE.MeshBasicMaterial({ map: texture });
// //             // }

// //             if (child.isMesh) {
// //                 child.material = new THREE.MeshBasicMaterial({
// //                     color: 0x808080, // Base color (white)
// //                     metalness: 1, // Controls the amount of metalness (1 for fully metallic)
// //                     roughness: 0, // Controls the roughness (0 for perfectly smooth)
// //                   });
// //             }
            
// //         });

// //         // Position and scale the mesh as needed
// //         fbx.position.set(1, 1, 1);
// //         fbx.scale.set(1.0, 1.0, 1.0);

// //         // Add the mesh to the scene
// //         scene.add(fbx);
// //     });
// // }





// export function create(active: ActiveScene) {
//     var scene = active.scene
//     var fbx_loader = new FBXLoader();

//     // Load the FBX file
//     fbx_loader.load('./assets/spaceship.fbx', function (fbx) {
//         // Load the PNG texture
//         var textureLoader = new THREE.TextureLoader();
//         var texture = textureLoader.load('./assets/spaceship_texture.png');
    
//         // Traverse through the FBX model to find all meshes
//         fbx.traverse(function (child) {
//             if (child.isMesh) {
//                 // Apply the texture to each mesh's material
//                 if (child.material) {
//                     // If the material is an array (e.g., multiple materials for a single mesh)
//                     if (Array.isArray(child.material)) {
//                         child.material.forEach(mat => {
//                             mat.map = texture;  // Assign texture to the map
//                             mat.needsUpdate = true; // Ensure the material updates
//                         });
//                     } else {
//                         child.material.map = texture; // Apply texture for single material
//                         child.material.needsUpdate = true; // Ensure material update
//                     }
//                 }
//             }
//         });
//     })
// }


import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';

export function create(active: ActiveScene) {
    var scene = active.scene;
    var camera = active.camera; // Ensure you have a camera to view the model
    var fbx_loader = new FBXLoader();  // FBX loader instance

    // Load the FBX file
    fbx_loader.load('./assets/spaceship.fbx', function (fbx) {
        console.log("FBX Loaded Successfully", fbx); // Debugging: Check if FBX is loaded

        // Load the PNG texture
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('./assets/spaceship_texture.png', 
            function () {
                console.log("Texture Loaded Successfully");
            },
            function (err) {
                console.error("Error loading texture", err);
            }
        );

        // Traverse through the FBX model to find all meshes
        fbx.traverse(function (child) {
            if (child.isMesh) {
                console.log("Found Mesh", child); // Debugging: Check the mesh

                // Apply texture to each mesh's material
                if (child.material) {
                    // If the material is an array (e.g., multiple materials for a single mesh)
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => {
                            mat.map = texture;  // Assign texture to the map
                            mat.needsUpdate = true; // Ensure the material updates
                        });
                    } else {
                        child.material.map = texture; // Apply texture for single material
                        child.material.needsUpdate = true; // Ensure material update
                    }
                } else {
                    // If no material exists, create a new material
                    child.material = new THREE.MeshStandardMaterial({ map: texture });
                }
            }
        });

        // Position, scale, and add the FBX model to the scene
        fbx.position.set(0, 0, 0);
        fbx.scale.set(1.0, 1.0, 1.0);
        scene.add(fbx);

        // Add lighting to see the effect of MeshStandardMaterial
        var light = new THREE.AmbientLight(0x404040);  // Ambient light
        scene.add(light);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);  // Directional light
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
        
        // Position the camera to view the model
        camera.position.z = 5;

    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Track FBX loading progress
    }, function (error) {
        console.error('An error happened while loading the FBX model:', error);
    });
}
