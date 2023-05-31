System.register(["three"], function (exports_1, context_1) {
    "use strict";
    var THREE;
    var __moduleName = context_1 && context_1.id;
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
    exports_1("create_skybox", create_skybox);
    return {
        setters: [
            function (THREE_1) {
                THREE = THREE_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=skybox.js.map