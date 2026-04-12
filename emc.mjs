//@ts-check

/** @import {EMC} from './types/mount-observer/types' */;
/** @import {AllProps, Actions, CustomData} from './types/be-clonable/types' */
/** @import {RAConfig} from './types/roundabout/types' */

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions, AllProps, CustomData> >}
 */
export const emc = {
    enhConfig: {
        enhKey: 'BeClonable',
        spawn: 'be-clonable/be-clonable.js',
        withAttrs: {
            base: 'be-clonable',
            triggerInsertPosition: '${base}-trigger-insert-position',
            cloneInsertPosition: '${base}-clone-insert-position',
            buttonContent: '${base}-button-content',
        }
    },
    customData: {
        actions: {
            addCloneBtn: {
                ifAllOf: ['triggerInsertPosition', 'enhancedElement'],
            },
            setBtnContent: {
                ifAllOf: ['buttonContent', 'trigger', 'enhancedElement'],
                ifNoneOf: ['byob'],
            }
        },
        handlers: {
            trigger_to_beCloned_on: 'click'
        },
        compacts:{
            when_resolved_changes_dispatch: 'resolved',
        },
        weakRef: {
            properties: ['enhancedElement', 'trigger']
        },
        defaultPropVals: {
            byob: true,
            triggerInsertPosition: 'beforeend',
            cloneInsertPosition: 'afterend',
            buttonContent: '⿻',
        },
        customData: {
            triggerSettings: {
                type: 'button',
                '?.classList?.add': 'be-clonable-trigger',
                //trigger.classList.add('be-clonable-trigger');
                ariaLabel: 'Clone this.',
                title: 'Clone this.',
            },
            withMethods: ['add']
        }
        
    }
}

export function render(){
    return JSON.stringify(emc, null, 4);
}

console.log(render());
