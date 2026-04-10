// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC} from './ts-refs/trans-render/be/types' */

/**
 * @type {EMC}
 */
export const emc = {
    base: 'be-clonable',
    // map: {
    //     '0.0': 'ni'
    // },
    enhPropKey: 'beClonable',
    importEnh: async () => {
        const { BeClonable } = await import('./be-clonable.js');
        return BeClonable;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
