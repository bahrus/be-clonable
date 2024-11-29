import { BeHive } from 'be-hive/be-hive.js';
import { MountObserver } from 'mount-observer/MountObserver.js';
const base = 'be-clonable';
const emc = {
    base,
    map: {
        '0.0': 'ni'
    },
    enhPropKey: 'beClonable',
    importEnh: async () => {
        const { BeClonable } = await import('./be-clonable.js');
        return BeClonable;
    }
};
const mose = document.createElement('script');
mose.id = base;
mose.synConfig = emc;
MountObserver.synthesize(document, BeHive, mose);
