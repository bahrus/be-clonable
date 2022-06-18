import {RenderContext, TransformPluginSettings} from 'trans-render/lib/types';
import {register} from 'trans-render/lib/pluginMgr.js';
import {BeClonableVirtualProps} from './types';
import {proxyPropDefaults} from './IsoLogic.js';

export const trPlugin: TransformPluginSettings = {
    selector: 'beClonableAttribs',
    ready: true,
    processor: async ({target, val, attrib, host}: RenderContext) => {
        let defaults = proxyPropDefaults;
        if(val){
            const params = JSON.parse(val) as BeClonableVirtualProps;
            Object.assign(defaults, params);
        }
        

    }
}

register(trPlugin);