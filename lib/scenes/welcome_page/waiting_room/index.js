"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var THREE = require("three");
var OrbitControls_js_1 = require("three/examples/jsm/controls/OrbitControls.js");
var EffectComposer_js_1 = require("three/examples/jsm/postprocessing/EffectComposer.js");
var RenderPass_js_1 = require("three/examples/jsm/postprocessing/RenderPass.js");
var FilmPass_js_1 = require("three/examples/jsm/postprocessing/FilmPass.js");
var FBXLoader_js_1 = require("three/examples/jsm/loaders/FBXLoader.js");
var active_scene_1 = require("../../../classes/active_scene");
var skybox_1 = require("./components/skybox");
var floor_1 = require("./components/floor");
var walls_1 = require("./components/walls");
function run() {
    var active = new active_scene_1.ActiveScene(new THREE.Scene());
    var scene = active.scene;
    var camera = new THREE.OrthographicCamera(window.innerWidth / -120, window.innerWidth / 120, window.innerHeight / 120, window.innerHeight / -120, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    (0, skybox_1.create_skybox)(active);
    (0, floor_1.create_floor)(active);
    (0, walls_1.create_walls)(active);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = -Math.PI / 4;
    camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
    camera.position.set(10, 9, 8);
    camera.lookAt(scene.position);
    var controls = new OrbitControls_js_1.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 1;
    var fbx_loader = new FBXLoader_js_1.FBXLoader();
    fbx_loader.load('./assets/waiting_room/chair.fbx', function (fbx) {
        fbx.traverse(function (child) {
            if (child.isMesh) {
                var textureLoader = new THREE.TextureLoader();
                var texture = textureLoader.load('./assets/waiting_room/chair_texture_brown.png');
                child.material = new THREE.MeshBasicMaterial({ map: texture });
            }
        });
        fbx.position.set(0, 0, 0);
        fbx.scale.set(0.02, 0.02, 0.02);
        scene.add(fbx);
    });
    var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cubeMesh.position.set(0, 0, 5);
    scene.add(cubeMesh);
    document.addEventListener('click', onDocumentClick, false);
    function onDocumentClick(event) {
        event.preventDefault();
        var mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObject(cubeMesh);
        if (intersects.length > 0) {
            controls.autoRotate = !controls.autoRotate;
        }
    }
    var composer = new EffectComposer_js_1.EffectComposer(renderer);
    composer.addPass(new RenderPass_js_1.RenderPass(scene, camera));
    var filmPass = new FilmPass_js_1.FilmPass(50, 1, 1024, false);
    filmPass.renderToScreen = true;
    composer.addPass(filmPass);
    function animate() {
        requestAnimationFrame(animate);
        composer.render();
        controls.update();
    }
    animate();
}
exports.run = run;
