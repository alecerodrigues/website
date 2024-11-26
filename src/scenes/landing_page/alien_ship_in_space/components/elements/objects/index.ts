import * as spaceship from './spaceship/main';
import * as satellite from './satellite/main';
import * as target_call from './target_call/main';

export class SPACESHIP {
    constructor() {
        spaceship.create(globalThis.active)
    }
}

export class SATELLITE {
    constructor() {
        satellite.create(globalThis.active)
    }
}

export class TARGET_CALL {
    constructor() {
        target_call.create(globalThis.active)
    }
}