// @ts-check
/** @import {Actions, PAP, AllProps, AP, CustomData} from './types/be-clonable/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig} from './types/roundabout/types' */;
/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions, AllProps, CustomData>>}
 */
import emc from './emc.json' with {type: 'json'};

const {customData} = emc;



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
        const {defaultPropVals} = customData;
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: this,
            initialPropVals: {
                enhancedElement,
                //set default prop values below
                ...defaultPropVals,
                ...initVals
            }
        };
        await (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
    }

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
            const {triggerSettings, withMethods} = customData.customData;
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

