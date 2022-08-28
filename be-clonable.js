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
    async onTriggerInsertPosition({ proxy }) {
        if (this.#cloner === undefined) {
            this.#cloner = new Cloner(proxy, proxy);
        }
        await this.#cloner.addCloneButtonTrigger(this);
        proxy.resolved = true;
    }
    onText(self) {
        if (this.#cloner === undefined) {
            this.#cloner = new Cloner(self.proxy, self.proxy);
        }
        this.#cloner.setText(self);
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
