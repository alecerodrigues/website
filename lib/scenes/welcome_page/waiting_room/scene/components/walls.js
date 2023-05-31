System.register(["three"], function (exports_1, context_1) {
    "use strict";
    var THREE;
    var __moduleName = context_1 && context_1.id;
    function create_walls(active) {
        var scene = active.scene;
        var room = new THREE.Object3D();
        var textureLoader = new THREE.TextureLoader();
        var wallMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        var wallGeometry = new THREE.BoxGeometry(10, 8, .2);
        var right_wall = new THREE.Mesh(wallGeometry, wallMaterial);
        right_wall.position.set(0, 4, -5);
        room.add(right_wall);
        var left_wall = new THREE.Mesh(wallGeometry, wallMaterial);
        left_wall.position.set(-5, 4, 0);
        left_wall.rotation.y = Math.PI / 2;
        room.add(left_wall);
        textureLoader.load('./assets/red_curtain.webp', function (texture) {
            var wallMaterial = new THREE.MeshBasicMaterial({ map: texture });
            var wallGeometry = new THREE.BoxGeometry(10, 8, .2);
            var right_wall = new THREE.Mesh(wallGeometry, wallMaterial);
            right_wall.position.set(0, 4, -5);
            room.add(right_wall);
            var left_wall = new THREE.Mesh(wallGeometry, wallMaterial);
            left_wall.position.set(-5, 4, 0);
            left_wall.rotation.y = Math.PI / 2;
            room.add(left_wall);
        });
        scene.add(room);
    }
    exports_1("create_walls", create_walls);
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
//# sourceMappingURL=walls.js.map