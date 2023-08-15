import * as THREE from 'three'
import { ActiveScene } from '../../../../../classes/active_scene';

export function create_skybox(active: ActiveScene) {
    // Create a starfield texture
    var scene = active.scene
    // var starfieldTexture = new THREE.TextureLoader().load('./assets/stars.webp');


    const loader = new THREE.TextureLoader();
    const starTexture = new THREE.PointsMaterial({
        size: 0.65,
        // color: 0x44aa88 // remove it if you want white points.
        map: loader.load(
            "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
          ),
        transparent: true
    });

    const starfieldArea = new THREE.BufferGeometry();
    starfieldArea.setAttribute(
        "position",
        new THREE.BufferAttribute(getRandomParticelPos(1900), 3)
    );
    const cube = new THREE.Points(starfieldArea, starTexture);
    
    scene.add(cube);
}

const getRandomParticelPos = (particleCount) => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i] = (Math.random() - 0.5) * 100;
    }
    return arr;
  };