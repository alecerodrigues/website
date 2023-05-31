System.register(["three"], function (exports_1, context_1) {
    "use strict";
    var THREE;
    var __moduleName = context_1 && context_1.id;
    function create_floor(active) {
        var scene = active.scene;
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load('./assets/waiting_room_floor_material.jpg', function (texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2);
            var floorMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
            var floorGeometry = new THREE.PlaneGeometry(10, 10);
            var floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI / 2;
            floor.position.y = 0;
            scene.add(floor);
        });
    }
    exports_1("create_floor", create_floor);
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
//# sourceMappingURL=floor.js.map