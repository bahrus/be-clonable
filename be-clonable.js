import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
import { Cloner, proxyPropDefaults } from './Cloner.js';
export class BeClonable extends EventTarget {
    #cloner;
    finale(proxy, target, beDecorProps) {
        if (this.#cloner !== undefined) {
            this.#cloner.dispose();
        }
    }
    batonPass(proxy, target, beDecorProps, baton) {
        this.#cloner = baton;
    }
    async onTriggerInsertPosition(bcp) {
        const { proxy } = bcp;
        if (this.#cloner === undefined) {
            this.#cloner = new Cloner(proxy, bcp);
        }
        await this.#cloner.addCloneButtonTrigger(bcp);
        proxy.resolved = true;
    }
    onText(bcp) {
        if (this.#cloner === undefined) {
            const { proxy } = bcp;
            this.#cloner = new Cloner(proxy, bcp);
        }
        this.#cloner.setText(bcp);
    }
}
const tagName = 'be-clonable';
const ifWantsToBe = 'clonable';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            upgrade,
            finale: 'finale',
            batonPass: 'batonPass',
            virtualProps: ['cloneInsertPosition', 'triggerInsertPosition', 'text'],
            proxyPropDefaults
        },
        actions: {
            onTriggerInsertPosition: 'triggerInsertPosition',
            onText: 'text',
        }
    },
    complexPropDefaults: {
        controller: BeClonable
    }
});
register(ifWantsToBe, upgrade, tagName);
