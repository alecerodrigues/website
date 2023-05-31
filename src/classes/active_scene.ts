import * as THREE from 'three'

export class ActiveScene {

    scene: THREE.Scene
    constructor(scene: THREE.Scene){
        this.scene = scene
    }

    get_scene(){
        return this.scene
    }
}