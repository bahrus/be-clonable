import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeClonableActions, BeClonableProps} from './types';

export class BeClonable implements BeClonableActions{
    #trigger: HTMLButtonElement | undefined;
    intro(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{
    }
    finale(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{

    }
    async onTriggerInsertPosition({text, triggerInsertPosition, then}: this): void{
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
                this.#trigger.classList.add('be-clonable-trigger');
                this.proxy.insertAdjacentElement(triggerInsertPosition, this.#trigger);
            }
            this.onText(this);
            this.#trigger.addEventListener('click', this.handleClick);
            if(then !== undefined){
                const {doThen} = await import('be-decorated/doThen.js');
                doThen(this.proxy, then);
            }
        }

    }

    onText({text}: this): void{
        if(this.#trigger !== undefined){
            this.#trigger.innerHTML = text;//TODO:  sanitize
        }
    }

    handleClick = (e: Event) => {
        const clone = this.proxy.cloneNode(true) as Element;
        const elements = Array.from(clone.querySelectorAll('*'));
        elements.push(clone);
        for(const el of elements){
            for (const a of el.attributes) {
                //TODO:  use behive - some attributes starting wit is- might not be bedeocrated
                if(a.name.startsWith('is-')){
                    const val = a.value;
                    el.removeAttribute(a.name);
                    el.setAttribute(a.name.replace('is-', 'be-'), val);
                }
                console.log(a.name, a.value);
            } 
        }
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
            virtualProps: ['triggerInsertPosition', 'text', 'then'],
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