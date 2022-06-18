import {BeClonableProps, BeClonableVirtualProps} from './types';

export class IsoLogic{
    #trigger: HTMLButtonElement | undefined;
    constructor(public proxy: Element & BeClonableProps){}

    async onTriggerInsertPosition({text, triggerInsertPosition, then, proxy}: BeClonableProps){
        if(this.#trigger === undefined){
            switch(triggerInsertPosition){
                case 'afterbegin':
                case 'beforeend':
                    {
                        const trigger = proxy.querySelector('button.be-clonable-trigger');
                        if(trigger !== null){
                            this.#trigger = trigger as HTMLButtonElement;
                        }
                    }
                    break;
                case 'beforebegin':
                    {
                        const trigger = proxy.previousElementSibling;
                        if(trigger !== null && trigger.matches('button.be-clonable-trigger')){
                            this.#trigger = trigger as HTMLButtonElement;
                        }
                    }
                    break;
                case 'afterend':
                    {
                        const trigger = proxy.nextElementSibling;
                        if(trigger !== null && trigger.matches('button.be-clonable-trigger')){
                            this.#trigger = trigger as HTMLButtonElement;
                        }
                    }
                    break;

            }
            if(this.#trigger === undefined){
                this.#trigger = document.createElement('button');
                this.#trigger.classList.add('be-clonable-trigger');
                proxy.insertAdjacentElement(triggerInsertPosition, this.#trigger);
            }
            this.onText(proxy);
            this.#trigger.addEventListener('click', this.handleClick);
            if(then !== undefined){
                const {doThen} = await import('be-decorated/doThen.js');
                doThen(proxy, then);
            }
        }

    }

    onText({text}: BeClonableProps): void{
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

export const proxyPropDefaults: BeClonableVirtualProps = {
    triggerInsertPosition: 'beforeend',
    cloneInsertPosition: 'afterend',
    text: '&#10063;'
}