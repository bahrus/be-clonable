import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeClonableActions, BeClonableProps} from './types';

export class BeClonable implements BeClonableActions{
    #trigger: HTMLButtonElement | undefined;
    intro(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{
    }
    finale(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{

    }
    onTriggerInsertPosition({text, triggerInsertPosition}: this): void{
        if(this.#trigger === undefined){
            switch(triggerInsertPosition){
                case 'afterbegin':
                case 'beforeend':
                    {
                        const trigger = this.proxy.querySelector('button.be-clonable-trigger');
                        if(trigger !== null){
                            this.#trigger = trigger as HTMLButtonElement;
                        }
                    }
                    break;
                case 'beforebegin':
                    {
                        const trigger = this.proxy.previousElementSibling;
                        if(trigger !== null && trigger.matches('button.be-clonable-trigger')){
                            this.#trigger = trigger as HTMLButtonElement;
                        }
                    }
                    break;
                case 'afterend':
                    {
                        const trigger = this.proxy.nextElementSibling;
                        if(trigger !== null && trigger.matches('button.be-clonable-trigger')){
                            this.#trigger = trigger as HTMLButtonElement;
                        }
                    }
                    break;

            }
            if(this.#trigger === undefined){
                this.#trigger = document.createElement('button');
                this.#trigger.classList.add('be-delible-trigger');
            }
            this.onText(this);
            this.#trigger.addEventListener('click', this.handleClick);
            this.proxy.insertAdjacentElement(triggerInsertPosition, this.#trigger);
        }

    }

    onText({text}: this): void{
        if(this.#trigger !== undefined){
            this.#trigger.innerHTML = text;//TODO:  sanitize
        }
    }

    handleClick = (e: Event) => {
        const clone = this.proxy.cloneNode(true) as Element;
        this.proxy.insertAdjacentElement(this.proxy.cloneInsertPosition, clone);
    }
}

export interface BeClonable extends BeClonableProps{}

const tagName = 'be-clonable';

const ifWantsToBe = 'clonable';

const upgrade = '*';

define<BeClonableProps & BeDecoratedProps<BeClonableProps, BeClonableActions>, BeClonableActions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            upgrade,
            virtualProps: ['triggerInsertPosition', 'text'],
            intro: 'intro',
            finale: 'finale',
            proxyPropDefaults:{
                triggerInsertPosition: 'beforeend',
                cloneInsertPosition: 'afterend',
                text: '&#10063;'
            }
        },
        actions:{
            onTriggerInsertPosition: 'triggerInsertPosition',
            onText: 'text',
        }
    },
    complexPropDefaults:{
        controller: BeClonable
    }
});

register(ifWantsToBe, upgrade, tagName);