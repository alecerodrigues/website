import * as THREE from 'three'
import { ActiveScene } from '../../../../classes/active_scene'

export function create_walls(active: ActiveScene) {
    var scene = active.scene
    var room = new THREE.Object3D()

    var textureLoader = new THREE.TextureLoader()

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
  
  
    textureLoader.load('./assets/red_curtain.webp', function (texture) {
        // Create the material for the walls using the texture
        var wallMaterial = new THREE.MeshBasicMaterial({ map: texture })
    
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
    })
    scene.add(room)
}