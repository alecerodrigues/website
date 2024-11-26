import * as camera from './camera'

export class CAMERA {
    constructor() {
        camera.create_camera(globalThis.active)
    }
}