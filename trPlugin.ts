import {RenderContext, TransformPluginSettings} from 'trans-render/lib/types';
import {register} from 'trans-render/lib/pluginMgr.js';

export const trPlugin: TransformPluginSettings = {
    selector: 'beClonableAttribs',
    processor: async ({target, val, attrib, host}: RenderContext) => {

    }
}