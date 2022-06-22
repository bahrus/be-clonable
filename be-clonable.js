import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
import { Cloner, proxyPropDefaults } from './Cloner.js';
export class BeClonable {
    #cloner;
    intro(proxy, target, beDecorProps) { }
    finale(proxy, target, beDecorProps) {
        if (this.#cloner !== undefined) {
            this.#cloner.dispose();
        }
    }
    batonPass(proxy, target, beDecorProps, baton) {
        this.#cloner = baton;
    }
    async onTriggerInsertPosition(self) {
        if (this.#cloner === undefined) {
            this.#cloner = new Cloner(self.proxy, self.proxy);
        }
        this.#cloner.addCloneButtonTrigger(self);
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
            virtualProps: ['triggerInsertPosition', 'text', 'then'],
            intro: 'intro',
            finale: 'finale',
            batonPass: 'batonPass',
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
