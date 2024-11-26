import * as THREE from 'three'
import { ActiveScene } from '../../../../classes/active_scene';
import { CAMERA } from './camera'

import * as SKYBOX from './elements/skyboxes'
import * as OBJECTS from './elements/objects'

declare global {
    var active: ActiveScene;
  }

export function run() {
    // var scene = new THREE.Scene()
    
    globalThis.active = new ActiveScene(new THREE.Scene())
    let scene = active.scene

    /**
     * Generate Camera
     */
    let camera = new CAMERA()

    /**
     * Generate SkyBox
     */
    // new SKYBOX.STARFIELD()

    /**
     * Generate Alien Spaceship
     */
    new OBJECTS.SPACESHIP()


    // Render the scene
    function animate() {
        requestAnimationFrame(animate)
        active.composer.render();
        renderer.render(scene, camera)
        active.controls.update()
    }
    animate()
}