import {config as beCnfg} from 'be-enhanced/config.js';
import {BE, BEConfig} from 'be-enhanced/BE.js';
import {Actions, AllProps, AP, ProPAP} from './types';
import {MountObserver} from 'mount-observer/MountObserver.js';
import {IEnhancement,  BEAllProps} from 'trans-render/be/types';

export class BeClonable extends BE implements Actions{
    static override config: BEConfig<AllProps & BEAllProps, Actions & IEnhancement, any> = {
        propDefaults:{
            byob: true,
            triggerInsertPosition: 'beforeend',
            cloneInsertPosition: 'afterend',
            buttonContent: '&#10063;'
        },
        propInfo: {
            ...(beCnfg.propInfo),
            trigger:{
                ro: true,
            }
        },
        actions:{
            addCloneBtn: {
                ifAllOf: ['triggerInsertPosition'],
            }, 
            setBtnContent: {
                ifAllOf: ['buttonContent', 'trigger'],
                ifNoneOf: ['byob'],
            }
        },
        handlers:{
            trigger_to_beCloned_on: 'click'
        }
    };
    async addCloneBtn(self: this): ProPAP {
        const {triggerInsertPosition, enhancedElement, buttonContent} = self;
        const {findAdjacentElement} = await import('trans-render/lib/findAdjacentElement.js');
        let trigger = findAdjacentElement(triggerInsertPosition!, enhancedElement, 'button.be-clonable-trigger') as HTMLButtonElement;
        let byob = true;
        if(trigger === null){
            byob = false;
            trigger =  document.createElement('button');
            trigger.type = 'button';
            trigger.classList.add('be-clonable-trigger');
            trigger.ariaLabel = 'Clone this.';
            trigger.title = 'Clone this.';
            enhancedElement.insertAdjacentElement(triggerInsertPosition!, trigger);
        }
        return {
            trigger: new WeakRef(trigger),
            resolved: true,
            byob
        }  
    }

    setBtnContent({buttonContent, trigger}: this): void {
        const btn = trigger?.deref();
        if(btn === undefined) return;
        btn.innerHTML = buttonContent!;
    }

    beCloned(self: this): void {
        const {enhancedElement, cloneInsertPosition} = self;
        const clone = enhancedElement.cloneNode(true) as Element;
        enhancedElement.insertAdjacentElement(cloneInsertPosition!, clone);
    }
}

export interface BeClonable extends AP{}