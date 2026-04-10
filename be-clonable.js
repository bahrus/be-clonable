// @ts-check
import {emc} from './emc.mjs';

/** @import {Actions, PAP, AllProps, AP} from './types/be-clonable/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway} from './types/mount-observer/types' */;

/**
 * @implements {Actions}
 */
class BeClonable {
    /**
     * @type {WeakRef<Element & ElementEnhancementGateway>}
     */
    #enhancedElementRef;

    get enhancedElement(){
        const ref = this.#enhancedElementRef.deref();
        if(ref === undefined) throw 404;
        return ref;
    }

    /**
     * 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {*} ctx 
     * @param {AllProps} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.#enhancedElementRef = new WeakRef(enhancedElement);
        const self = /** @type {AllProps & Actions} */(/** @type {unknown} */(this));
        self.init(self, initVals);
    }

    /**
     * @this {AllProps & Actions}
     * @param {AllProps} self 
     * @param {PAP} initVals 
     */
    async init(self, initVals){
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

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    setBtnContent(self) {
        const { buttonContent, trigger } = self;
        const btn = trigger?.deref();
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

export { BeClonable }
