import { register } from 'trans-render/lib/pluginMgr.js';
import { proxyPropDefaults, IsoHelper } from './IsoHelper.js';
import { store } from 'be-decorated/isoStorage.js';
export const trPlugin = {
    selector: 'beClonableAttribs',
    ready: true,
    processor: async ({ target, val, attrib, host }) => {
        let defaults = proxyPropDefaults;
        if (val) {
            const params = JSON.parse(val);
            Object.assign(defaults, params);
        }
        const isoHelper = new IsoHelper(target, defaults);
        isoHelper.onTriggerInsertPosition(defaults);
        store('clonable', target, isoHelper);
    }
};
register(trPlugin);
