import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/DE.js';
export class BeClonable extends EventTarget {
    #trigger;
    async addCloneBtn(pp) {
        if (this.#trigger === undefined) {
            //the check above is unlikely to ever fail.
            const { triggerInsertPosition, self } = pp;
            const { findAdjacentElement } = await import('be-decorated/findAdjacentElement.js');
            const trigger = findAdjacentElement(triggerInsertPosition, self, 'button.be-clonable-trigger');
            if (trigger !== null)
                this.#trigger = trigger;
            const returnObj = [{ resolved: true }, { beCloned: { on: 'click', of: self } }];
            if (this.#trigger === undefined) {
                this.#trigger = document.createElement('button');
                this.#trigger.type = 'button';
                this.#trigger.classList.add('be-clonable-trigger');
                this.#trigger.ariaLabel = 'Clone this.';
                this.#trigger.title = 'Clone this.';
                self.insertAdjacentElement(triggerInsertPosition, this.#trigger);
                returnObj[0].byob = false;
            }
            return returnObj;
        }
        else {
            //can't think of a scenario where consumer would want to change the trigger position midstream, so not bothering to do anything here
        }
    }
    setBtnContent({ buttonContent }) {
        if (this.#trigger !== undefined) {
            this.#trigger.innerHTML = buttonContent; //TODO:  sanitize
        }
    }
    async beCloned({ self, cloneInsertPosition }) {
        const clone = self.cloneNode(true);
        //TODO:  maybe we can skip this step and use the new attach method?
        const { beatify } = await import('be-hive/beatify.js');
        const beHive = self.getRootNode().querySelector('be-hive');
        if (beHive !== null) {
            beatify(clone, beHive);
        }
        self.insertAdjacentElement(cloneInsertPosition, clone);
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
            virtualProps: ['cloneInsertPosition', 'triggerInsertPosition', 'buttonContent'],
            proxyPropDefaults: {
                byob: true,
                triggerInsertPosition: 'beforeend',
                cloneInsertPosition: 'afterend',
                buttonContent: '&#10063;'
            }
        },
        actions: {
            addCloneBtn: 'triggerInsertPosition',
            setBtnContent: {
                ifAllOf: ['buttonContent'],
                ifNoneOf: ['byob'],
            }
        }
    },
    complexPropDefaults: {
        controller: BeClonable
    }
});
register(ifWantsToBe, upgrade, tagName);
