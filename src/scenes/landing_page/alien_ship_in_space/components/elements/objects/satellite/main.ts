import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';
import { ActiveScene } from '../../../../../../../classes/active_scene';

export function create(active: ActiveScene) {
    var scene = active.scene;
    var camera = active.camera;  // Ensure you have a camera to view the model
    var obj_loader = new OBJLoader();  // OBJ loader instance

    // Load the OBJ file
    obj_loader.load('./assets/satellite.obj', function (obj) {
        console.log("OBJ Loaded Successfully", obj); // Debugging: Check if OBJ is loaded

        // Load the PNG texture
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('./assets/satellite_texture.png', 
            function () {
                console.log("Texture Loaded Successfully");
            },
            function (err) {
                console.error("Error loading texture", err);
            }
        );

        // Traverse through the OBJ model to find all meshes
        obj.traverse(function (child) {
            if (child.isMesh) {
                console.log("Found Mesh", child); // Debugging: Check the mesh

                // Apply texture to each mesh's material
                if (child.material) {
                    // If the material is an array (e.g., multiple materials for a single mesh)
                    if (Array.isArray(child.material)) {
                        console.log("Mesh Type: mat"); // Debugging: Check the mesh
                        child.material.forEach(mat => {
                            mat.map = texture;  // Assign texture to the map
                            mat.needsUpdate = true; // Ensure the material updates
                            mat.roughness = 0.3; // Less roughness = shinier surface
                            mat.metalness = 0.6; // Make the material partially metallic   
                            mat.transparent = true; // Enable transparency
                        });
                    } else {
                        console.log("Mesh Type: map"); // Debugging: Check the mesh
                        child.material.map = texture; // Apply texture for single material
                        child.material.needsUpdate = true; // Ensure material update
                        child.material.roughness = 0.3; // Less roughness = shinier surface
                        child.material.metalness = 0.6; 
                        child.material.transparent = false; // Enable transparency
                    }
                } else {
                    // If no material exists, create a new 
                    console.log("Mesh Type: strd"); // Debugging: Check the mesh
                    child.material = new THREE.MeshStandardMaterial({ 
                        map: texture,
                        roughness: 0.3, // Less roughness = shinier surface
                        metalness: 0.6, // Make the material partially metallic
                        transparent: true, // Enable transparency
                    });
                }
            }
        });

        // Position, scale, and add the OBJ model to the scene
        obj.position.set(-20, 15, -20);
        obj.scale.set(3.0, 3.0, 3.0);
        obj.rotation.setFromVector3(new THREE.Vector3( 0, -Math.PI/1.5, Math.PI / 3));
        scene.add(obj);

        // Add lighting to see the effect of MeshStandardMaterial
        var light = new THREE.AmbientLight(0x404040);  // Ambient light
        scene.add(light);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);  // Directional light
        directionalLight.position.set(10, 3, 1).normalize();
        scene.add(directionalLight);
        
        // Position the camera to view the model
        camera.position.z = 5;

    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Track OBJ loading progress
    }, function (error) {
        console.error('An error happened while loading the OBJ model:', error);
    });
}
