//@ts-check

/** @import {EMC} from './types/mount-observer/types' */;
/** @import {AllProps, Actions} from './types/be-clonable/types' */
/** @import {RAConfig} from './types/roundabout/types' */

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions> >}
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
                ifAllOf: ['buttonContent', 'trigger'],
                ifNoneOf: ['byob'],
            }
        },
        handlers: {
            trigger_to_beCloned_on: 'click'
        },
        compacts:{
            //when_resolved_changes_dispatch: 'resolved',
        },
        weakRef: {
            properties: ['enhancedElement', 'trigger']
        }
    }
}

export function render(){
    return JSON.stringify(emc, null, 4);
}

console.log(render());
