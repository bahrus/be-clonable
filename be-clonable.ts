import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, PP, PPE, VirtualProps, Proxy, ProxyProps} from './types';


export class BeClonable extends EventTarget implements Actions{
    #trigger: HTMLButtonElement | undefined;
    async addCloneBtn(pp: PP, returnObjMold: PPE): Promise<PPE | void> {
        if(this.#trigger === undefined){
            //the check above is unlikely to ever fail.
            const {triggerInsertPosition, self} = pp;
            const {findAdjacentElement} = await import('be-decorated/findAdjacentElement.js');
            const trigger = findAdjacentElement(triggerInsertPosition!, self, 'button.be-clonable-trigger');
            if(trigger !== null) this.#trigger = trigger as HTMLButtonElement;
            let byob = true;
            if(this.#trigger === undefined){
                byob = false;
                this.#trigger = document.createElement('button');
                this.#trigger.type = 'button';
                this.#trigger.classList.add('be-clonable-trigger');
                this.#trigger.ariaLabel = 'Clone this.';
                this.#trigger.title = 'Clone this.';
                self.insertAdjacentElement(triggerInsertPosition!, this.#trigger);
            }
            returnObjMold[1].beCloned!.of = this.#trigger;
            return returnObjMold;
        }else{
            //can't think of a scenario where consumer would want to change the trigger position midstream, so not bothering to do anything here
        }     
    }

    setBtnContent({buttonContent}: PP): void{
        if(this.#trigger !== undefined){
            this.#trigger.innerHTML = buttonContent!;//TODO:  sanitize
        }
    }

    async beCloned({self, cloneInsertPosition}: PP){
        const clone = self.cloneNode(true) as Element;
        //TODO:  maybe we can skip this step and use the new attach method?
        const {beatify} = await import('be-hive/beatify.js'); 
        const beHive = (self.getRootNode() as ShadowRoot).querySelector('be-hive') as Element;
        if(beHive !== null){
            beatify(clone, beHive);
        }
        self.insertAdjacentElement(cloneInsertPosition!, clone);
    }

    finale(): void {
        this.#trigger = undefined;
    }
}

const tagName = 'be-clonable';

const ifWantsToBe = 'clonable';

const upgrade = '*';

define<VirtualProps & BeDecoratedProps<VirtualProps, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            upgrade,
            finale: 'finale',
            virtualProps: ['cloneInsertPosition', 'triggerInsertPosition', 'buttonContent'],
            proxyPropDefaults: {
                byob: true,
                triggerInsertPosition: 'beforeend',
                cloneInsertPosition: 'afterend',
                buttonContent: '&#10063;'
            }
        },
        actions:{
            addCloneBtn: {
                ifAllOf: ['triggerInsertPosition'],
                returnObjMold: [{resolved: true, byob: true}, {beCloned: {on: 'click', of: 'tbd'}}]
            },
            setBtnContent: {
                ifAllOf: ['buttonContent'],
                ifNoneOf: ['byob'],
            }
        }
    },
    complexPropDefaults:{
        controller: BeClonable
    }
});

register(ifWantsToBe, upgrade, tagName);
