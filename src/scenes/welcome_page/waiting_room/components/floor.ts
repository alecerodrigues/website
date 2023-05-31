import * as THREE from 'three'
import { ActiveScene } from '../../../../classes/active_scene';

export function create_floor(active: ActiveScene) {
    var scene = active.scene
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
}