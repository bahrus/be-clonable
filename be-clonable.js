// @ts-check
import { resolved, rejected, propInfo} from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP, BAP, ITyper} from './ts-refs/be-clonable/types.d.ts' */;

/**
 * @implements {Actions}
 */
export class BeClonable extends BE {
    /**
     * @type {BEConfig<BAP, Actions & IEnhancement, any>}
     */
    static config = {
        propDefaults: {
            byob: true,
            triggerInsertPosition: 'beforeend',
            cloneInsertPosition: 'afterend',
            buttonContent: '&#10063;'
        },
        propInfo: {
            ...propInfo,
            trigger: {
                ro: true,
            }
        },
        positractions: [resolved, rejected],
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

    de = de;
    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async addCloneBtn(self) {
        const { triggerInsertPosition, enhancedElement, buttonContent } = self;
        const { findAdjacentElement } = await import('trans-render/lib/findAdjacentElement.js');
        let trigger = /** @type {HTMLButtonElement | null} */ (findAdjacentElement(triggerInsertPosition, enhancedElement, 'button.be-clonable-trigger'));
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
        return /** @type {PAP} */ ({
            trigger: new WeakRef(trigger),
            resolved: true,
            byob
        });
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
