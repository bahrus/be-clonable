import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
export class BeClonable extends BE {
    #trigger;
    async addCloneBtn(self) {
        if (this.#trigger === undefined) {
            //the check above is unlikely to ever fail.
            const { triggerInsertPosition, enhancedElement } = self;
            const { findAdjacentElement } = await import('trans-render/lib/findAdjacentElement.js');
            const trigger = findAdjacentElement(triggerInsertPosition, enhancedElement, 'button.be-clonable-trigger');
            if (trigger !== null)
                this.#trigger = new WeakRef(trigger);
            let byob = true;
            if (this.#trigger === undefined) {
                byob = false;
                const trigger = document.createElement('button');
                trigger.type = 'button';
                trigger.classList.add('be-clonable-trigger');
                trigger.ariaLabel = 'Clone this.';
                trigger.title = 'Clone this.';
                enhancedElement.insertAdjacentElement(triggerInsertPosition, trigger);
                this.#trigger = new WeakRef(trigger);
            }
            return [{
                    resolved: true,
                    byob
                }, {
                    beCloned: {
                        on: 'click',
                        of: this.#trigger?.deref()
                    }
                }];
        }
        else {
            //can't think of a scenario where consumer would want to change the trigger position midstream, so not bothering to do anything here
        }
    }
    setBtnContent({ buttonContent }) {
        if (this.#trigger !== undefined) {
            this.#trigger.deref().innerHTML = buttonContent;
        }
    }
    beCloned(self) {
        const { enhancedElement, cloneInsertPosition } = self;
        const clone = enhancedElement.cloneNode(true);
        enhancedElement.insertAdjacentElement(cloneInsertPosition, clone);
    }
}
export const tagName = 'be-clonable';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
            byob: true,
            triggerInsertPosition: 'beforeend',
            cloneInsertPosition: 'afterend',
            buttonContent: '&#10063;'
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            addCloneBtn: {
                ifAllOf: ['triggerInsertPosition'],
            },
            setBtnContent: {
                ifAllOf: ['buttonContent'],
                ifNoneOf: ['byob'],
            }
        }
    },
    superclass: BeClonable
});
