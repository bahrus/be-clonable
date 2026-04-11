// @ts-check
/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>}
 */
import emc from './emc.json' with {type: 'json'};

/** @import {Actions, PAP, AllProps, AP} from './types/be-clonable/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig} from './types/roundabout/types' */;

/**
 * @implements {Actions}
 */
export class BeClonable {

    /**
     * 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {*} ctx 
     * @param {AllProps} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        const self = /** @type {AllProps & Actions} */(/** @type {unknown} */(this));
        self.init(self, enhancedElement, initVals);
    }

    /**
     * @this {AllProps & Actions}
     * @param {AllProps} self 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {PAP} initVals 
     */
    async init(self, enhancedElement, initVals){
        const {customData} = emc;
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: this,
        };
        await (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
        (await import('assign-gingerly/assignGingerly.js')).assignGingerly(self, {
            //set default prop values below
            byob: true,
            enhancedElement,
            triggerInsertPosition: 'beforeend',
            cloneInsertPosition: 'afterend',
            buttonContent: '⿻',
            ...initVals
        });
    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    async addCloneBtn(self) {
        const { triggerInsertPosition, enhancedElement, buttonContent } = self;
        const { findAdjacentElement } = await import('be-hive/findAdjacentElement.js');
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
            trigger,
            resolved: true,
            byob
        });
    }

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    setBtnContent(self) {
        const { buttonContent, trigger } = self;
        const btn = trigger;
        if (btn === undefined)
            return;
        //TODO:  support trusted types
        btn.textContent = buttonContent;
    }

    /**
     * 
     * @param {AP} self 
     */
    beCloned(self) {
        const { enhancedElement, cloneInsertPosition } = self;
        const clone = enhancedElement.cloneNode(true);
        enhancedElement.insertAdjacentElement(cloneInsertPosition, clone);
    }
}

