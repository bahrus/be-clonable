import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, PP, PPE, VirtualProps, Proxy, ProxyProps} from './types';


export class BeClonable extends EventTarget implements Actions{
    #trigger: HTMLButtonElement | undefined;
    async addCloneBtn(pp: PP): Promise<PPE | void> {
        
        if(this.#trigger === undefined){
            const {text, triggerInsertPosition, self} = pp;
            const {findAdjacentElement} = await import('be-decorated/findAdjacentElement.js');
            const trigger = findAdjacentElement(triggerInsertPosition!, self, 'button.be-clonable-trigger');
            if(trigger !== null) this.#trigger = trigger as HTMLButtonElement;
            if(this.#trigger === undefined){
                this.#trigger = document.createElement('button');
                this.#trigger.type = 'button';
                this.#trigger.classList.add('be-clonable-trigger');
                this.#trigger.ariaLabel = 'Clone this.';
                this.#trigger.title = 'Clone this.';
                self.insertAdjacentElement(triggerInsertPosition!, this.#trigger);
            }
            this.setText(pp);
            return [{resolved: true}, {beCloned: {on: 'click', of: self}}];
        }        
    }

    setText({text}: PP): void{
        if(this.#trigger !== undefined){
            this.#trigger.innerHTML = text!;//TODO:  sanitize
        }
    }

    async beCloned({self, cloneInsertPosition}: PP){
        const clone = self.cloneNode(true) as Element;
        const {beatify} = await import('be-hive/beatify.js');
        const beHive = (self.getRootNode() as ShadowRoot).querySelector('be-hive') as Element;
        if(beHive !== null){
            beatify(clone, beHive);
        }
        self.insertAdjacentElement(cloneInsertPosition!, clone);
    }
}