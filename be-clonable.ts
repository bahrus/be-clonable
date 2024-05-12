import {config as beCnfg} from 'be-enhanced/config.js';
import {BE, BEConfig} from 'be-enhanced/BE.js';
import {Actions, AllProps, AP, ProPOA, POA} from './types';
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
        },
        actions:{
            addCloneBtn: {
                ifAllOf: ['triggerInsertPosition'],
            }, 
            setBtnContent: {
                ifAllOf: ['buttonContent'],
                ifNoneOf: ['byob'],
            }
        }
    };
    #trigger: WeakRef<HTMLButtonElement> | undefined;
    async addCloneBtn(self: this): ProPOA {
        if(this.#trigger === undefined){
            //the check above is unlikely to ever fail.
            const {triggerInsertPosition, enhancedElement} = self;
            const {findAdjacentElement} = await import('trans-render/lib/findAdjacentElement.js');
            const trigger = findAdjacentElement(triggerInsertPosition!, enhancedElement, 'button.be-clonable-trigger');
            if(trigger !== null) this.#trigger = new WeakRef(trigger as HTMLButtonElement);
            let byob = true;
            if(this.#trigger === undefined){
                byob = false;
                const trigger =  document.createElement('button');
                trigger.type = 'button';
                trigger.classList.add('be-clonable-trigger');
                trigger.ariaLabel = 'Clone this.';
                trigger.title = 'Clone this.';
                enhancedElement.insertAdjacentElement(triggerInsertPosition!, trigger);
                this.#trigger = new WeakRef(trigger);
            }
            
            return [{
                resolved: true,
                byob
            }, {
                beCloned: {
                    on: 'click',
                    of: this.#trigger?.deref()
                }
            }] as POA;
            
        }else{
            //can't think of a scenario where consumer would want to change the trigger position midstream, so not bothering to do anything here
        }   
    }

    setBtnContent({buttonContent}: this): void {
        if(this.#trigger !== undefined){
            this.#trigger.deref()!.innerHTML = buttonContent!;
        }
    }

    beCloned(self: this): void {
        const {enhancedElement, cloneInsertPosition} = self;
        const clone = enhancedElement.cloneNode(true) as Element;
        enhancedElement.insertAdjacentElement(cloneInsertPosition!, clone);
    }
}

export interface BeClonable extends AP{}