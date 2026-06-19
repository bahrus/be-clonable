// @ts-check
/** @import {Actions, PAP, AllProps, AP, CustomData} from './types/be-clonable/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway, SpawnContext} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig} from './types/roundabout/types' */;

/**
 * @implements {Actions}
 */
export class BeClonable {

    /**
     * @this {AllProps & Actions}
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.init(this, enhancedElement, ctx, initVals);
    }

    /**
     * @param {AllProps} self 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    async init(self, enhancedElement, ctx, initVals){
        const {customData} = /** @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions, AllProps, CustomData>>} */ (ctx.emc);
        this.#customData = customData?.customData;
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: self,
            initialPropVals: {
                enhancedElement,
                ...customData?.defaultPropVals,
                ...initVals
            }
        };
        (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
    }

    /** @type {CustomData | undefined} */
    #customData;

    /**
     * 
     * @param {AP} self 
     * @returns 
     */
    async addCloneBtn(self) {
        const { triggerInsertPosition, enhancedElement } = self;
        let trigger = /** @type {HTMLButtonElement | null} */ ((await import('be-hive/findAdjacentElement.js')).findAdjacentElement(
            triggerInsertPosition, enhancedElement, 'button.be-clonable-trigger')
        );
        let byob = true;
        if (trigger === null) {
            byob = false;
            trigger = document.createElement('button');
            const {triggerSettings, withMethods} = /** @type {CustomData} */ (this.#customData);
            (await import('assign-gingerly/assignGingerly.js')).assignGingerly(trigger, triggerSettings, {withMethods});
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
        trigger.textContent = buttonContent;
    }

    /**
     * 
     * @param {AP} self 
     */
    beCloned(self) {
        const { enhancedElement, cloneInsertPosition } = self;
        const clone = /** @type {Element} */ (enhancedElement.cloneNode(true));
        enhancedElement.insertAdjacentElement(cloneInsertPosition, clone);
    }
}