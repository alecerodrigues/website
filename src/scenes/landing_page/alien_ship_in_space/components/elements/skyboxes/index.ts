import * as starfield from './starfield';

export class STARFIELD {
    constructor() {
        starfield.create_skybox(globalThis.active)
    }
}