import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
import { IsoHelper, proxyPropDefaults } from './IsoHelper.js';
export class BeClonable {
    #iso;
    intro(proxy, target, beDecorProps) { }
    finale(proxy, target, beDecorProps) { }
    batonPass(proxy, target, beDecorProps, isoHelper) {
        this.#iso = isoHelper;
    }
    async onTriggerInsertPosition(self) {
        if (this.#iso === undefined) {
            this.#iso = new IsoHelper(self.proxy, self.proxy);
        }
        this.#iso.onTriggerInsertPosition(self);
    }
    onText(self) {
        if (this.#iso === undefined) {
            this.#iso = new IsoHelper(self.proxy, self.proxy);
        }
        this.#iso.onText(self);
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
