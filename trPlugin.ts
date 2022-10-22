import {RenderContext, TransformPluginSettings} from 'trans-render/lib/types';
import {DEMethods} from 'be-decorated/types';
import {register} from 'trans-render/lib/pluginMgr.js';

export const trPlugin: TransformPluginSettings = {
    selector: 'beClonableAttribs',
    ready: true,
    processor:  async ({target, val, attrib, host}: RenderContext) => {
        if(customElements.get('be-clonable') === undefined) return;
        const {attach} = await import('be-decorated/upgrade.js');
        const instance = document.createElement('be-clonable') as any as DEMethods;
        attach(target!, 'clonable', instance.attach.bind(instance));
    }
}

register(trPlugin);