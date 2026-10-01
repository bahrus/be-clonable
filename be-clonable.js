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
        // ctx.emc is only populated when spawned via an attribute (be-hive / mount-observer).
        // Programmatic attachment (enh.get / enh.set) only passes ctx.config -- see def.js.
        const {customData} = /** @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions, AllProps, CustomData>>} */ (ctx.emc || ctx.config);
        this.#customData = customData?.customData;
        if(ctx.emc === undefined) this.#programmaticConfig = ctx.config;
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
        await (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
        self.initialized = true;
    }

    /** @type {CustomData | undefined} */
    #customData;

    /**
     * The registry item this instance was spawned from, when attached programmatically.
     * @type {SpawnContext['config'] | undefined}
     */
    #programmaticConfig;

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
        const { enhancedElement, cloneInsertPosition, triggerInsertPosition, buttonContent } = self;
        const clone = /** @type {Element & ElementEnhancementGateway} */ (enhancedElement.cloneNode(true));
        enhancedElement.insertAdjacentElement(cloneInsertPosition, clone);
        const config = this.#programmaticConfig;
        if(config === undefined) return; // attribute path: be-hive enhances the clone via its copied attribute
        // Programmatic path: nothing is watching for the clone, so enhance it directly,
        // with the same settings.  The copied button is found and reused (byob).
        const {enhKey} = config;
        /** @type {any} */ (clone.enh)[enhKey] = {triggerInsertPosition, cloneInsertPosition, buttonContent};
        clone.enh.get(config);
    }
}