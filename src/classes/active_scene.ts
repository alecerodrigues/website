import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';// Set up the scene, camera, and renderer
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';// Set up the scene, camera, and renderer

export class ActiveScene {

    scene: THREE.Scene
    camera: THREE.camera
    renderer: THREE.render
    composer: EffectComposer
    controls: OrbitControls

    constructor(scene: THREE.Scene){
        this.scene = scene
    }

    get_scene(){
        return this.scene
    }
}