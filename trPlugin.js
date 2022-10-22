import { register } from 'trans-render/lib/pluginMgr.js';
export const trPlugin = {
    selector: 'beClonableAttribs',
    ready: true,
    processor: async ({ target, val, attrib, host }) => {
        if (customElements.get('be-clonable') === undefined)
            return;
        const { attach } = await import('be-decorated/upgrade.js');
        const instance = document.createElement('be-clonable');
        attach(target, 'clonable', instance.attach.bind(instance));
    }
};
register(trPlugin);
