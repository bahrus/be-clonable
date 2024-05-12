import { config as beCnfg } from 'be-enhanced/config.js';
import { BE } from 'be-enhanced/BE.js';
export class BeClonable extends BE {
    static config = {
        propDefaults: {
            byob: true,
            triggerInsertPosition: 'beforeend',
            cloneInsertPosition: 'afterend',
            buttonContent: '&#10063;'
        },
        propInfo: {
            ...(beCnfg.propInfo),
            trigger: {
                ro: true,
            }
        },
        actions: {
            addCloneBtn: {
                ifAllOf: ['triggerInsertPosition'],
            },
            setBtnContent: {
                ifAllOf: ['buttonContent', 'trigger'],
                ifNoneOf: ['byob'],
            }
        },
        handlers: {
            trigger_to_beCloned_on: 'click'
        }
    };
    async addCloneBtn(self) {
        const { triggerInsertPosition, enhancedElement, buttonContent } = self;
        const { findAdjacentElement } = await import('trans-render/lib/findAdjacentElement.js');
        let trigger = findAdjacentElement(triggerInsertPosition, enhancedElement, 'button.be-clonable-trigger');
        let byob = true;
        if (trigger === null) {
            byob = false;
            trigger = document.createElement('button');
            trigger.type = 'button';
            trigger.classList.add('be-clonable-trigger');
            trigger.ariaLabel = 'Clone this.';
            trigger.title = 'Clone this.';
            enhancedElement.insertAdjacentElement(triggerInsertPosition, trigger);
        }
        return {
            trigger: new WeakRef(trigger),
            resolved: true,
            byob
        };
    }
    setBtnContent({ buttonContent, trigger }) {
        const btn = trigger?.deref();
        if (btn === undefined)
            return;
        btn.innerHTML = buttonContent;
    }
    beCloned(self) {
        const { enhancedElement, cloneInsertPosition } = self;
        const clone = enhancedElement.cloneNode(true);
        enhancedElement.insertAdjacentElement(cloneInsertPosition, clone);
    }
}
