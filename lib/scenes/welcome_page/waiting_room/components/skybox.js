"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_skybox = void 0;
var THREE = require("three");
function create_skybox(active) {
    var scene = active.scene;
    var starfieldTexture = new THREE.TextureLoader().load('./assets/stars.webp');
    var starfieldMaterial = new THREE.MeshBasicMaterial({
        map: starfieldTexture,
        side: THREE.BackSide
    });
    var skydomeGeometry = new THREE.SphereGeometry(50, 32, 32);
    var skydomeMesh = new THREE.Mesh(skydomeGeometry, starfieldMaterial);
    scene.add(skydomeMesh);
}
exports.create_skybox = create_skybox;
