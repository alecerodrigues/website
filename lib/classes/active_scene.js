"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveScene = void 0;
var ActiveScene = (function () {
    function ActiveScene(scene) {
        this.scene = scene;
    }
    ActiveScene.prototype.get_scene = function () {
        return this.scene;
    };
    return ActiveScene;
}());
exports.ActiveScene = ActiveScene;
