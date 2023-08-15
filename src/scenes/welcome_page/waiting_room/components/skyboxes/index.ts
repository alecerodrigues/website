import * as starfield from './starfield';
import * as dwarfStar from './dwarf_star';
import { ActiveScene } from '../../../../../classes/active_scene';

export class STARFIELD {
    constructor() {
        starfield.create_skybox(globalThis.active)
    }
}

export class DWARF_STAR {
    constructor() {
        dwarfStar.create_skybox(globalThis.active)
    }
}


