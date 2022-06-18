import {RenderContext, TransformPluginSettings} from 'trans-render/lib/types';
import {register} from 'trans-render/lib/pluginMgr.js';
import {BeClonableVirtualProps} from './types';
import {proxyPropDefaults, IsoHelper} from './IsoHelper.js';
import {isoStorage} from 'be-decorated/isoStorage.js';

export const trPlugin: TransformPluginSettings = {
    selector: 'beClonableAttribs',
    ready: true,
    processor: async ({target, val, attrib, host}: RenderContext) => {
        let defaults = proxyPropDefaults;
        if(val){
            const params = JSON.parse(val) as BeClonableVirtualProps;
            Object.assign(defaults, params);
        }
        const isoHelper = new IsoHelper(target!, defaults);

    }
}

register(trPlugin);