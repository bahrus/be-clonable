import {BeClonableProps, BeClonableVirtualProps} from './types';
import {findAdjacentElement} from 'be-decorated/findAdjacentElement.js';

export class IsoHelper{
    #trigger: HTMLButtonElement | undefined;
    constructor(public proxy: Element, public props: BeClonableProps){
        if(props === undefined) {
            this.props = proxy as any as BeClonableProps;
        }
    }

    async onTriggerInsertPosition({text, triggerInsertPosition, then}: BeClonableVirtualProps){
        if(this.#trigger === undefined){
            const trigger = findAdjacentElement(triggerInsertPosition, this.proxy, 'button.be-clonable-trigger');
            if(trigger !== null) this.#trigger = trigger as HTMLButtonElement;
            if(this.#trigger === undefined){
                this.#trigger = document.createElement('button');
                this.#trigger.classList.add('be-clonable-trigger');
                this.proxy.insertAdjacentElement(triggerInsertPosition, this.#trigger);
            }
            this.onText(this.props);
            this.#trigger.addEventListener('click', this.handleClick);
            if(then !== undefined){
                const {doThen} = await import('be-decorated/doThen.js');
                doThen(this.proxy, then);
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
                //TODO:  use be-hive - some attributes starting with is- might not be be-decorated based
                if(a.name.startsWith('is-')){
                    const val = a.value;
                    el.removeAttribute(a.name);
                    el.setAttribute(a.name.replace('is-', 'be-'), val);
                }
            } 
        }
        this.proxy.insertAdjacentElement(this.props.cloneInsertPosition, clone);
    }
}

export const proxyPropDefaults: BeClonableVirtualProps = {
    triggerInsertPosition: 'beforeend',
    cloneInsertPosition: 'afterend',
    text: '&#10063;'
}