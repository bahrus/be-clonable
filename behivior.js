import './behance.js';
import { BeHive } from 'be-hive/be-hive.js';
BeHive.registry.register({
    base: 'be-clonable',
    enhPropKey: 'beClonable',
    map: {
        '0.0': 'ni'
    },
    do: {
        mount: {
            import: async () => {
                const { BeClonable } = await import('./be-clonable.js');
                return BeClonable;
            }
        }
    }
});
