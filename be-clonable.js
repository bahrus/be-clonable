import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
export class BeClonable {
    #trigger;
    intro(proxy, target, beDecorProps) {
    }
    finale(proxy, target, beDecorProps) {
    }
    onTriggerInsertPosition({ text, triggerInsertPosition }) {
        if (this.#trigger === undefined) {
            switch (triggerInsertPosition) {
                case 'afterbegin':
                case 'beforeend':
                    {
                        const trigger = this.proxy.querySelector('button.be-clonable-trigger');
                        if (trigger !== null) {
                            this.#trigger = trigger;
                        }
                    }
                    break;
                case 'beforebegin':
                    {
                        const trigger = this.proxy.previousElementSibling;
                        if (trigger !== null && trigger.matches('button.be-clonable-trigger')) {
                            this.#trigger = trigger;
                        }
                    }
                    break;
                case 'afterend':
                    {
                        const trigger = this.proxy.nextElementSibling;
                        if (trigger !== null && trigger.matches('button.be-clonable-trigger')) {
                            this.#trigger = trigger;
                        }
                    }
                    break;
            }
            if (this.#trigger === undefined) {
                this.#trigger = document.createElement('button');
                this.#trigger.classList.add('be-delible-trigger');
            }
            this.onText(this);
            this.#trigger.addEventListener('click', this.handleClick);
            this.proxy.insertAdjacentElement(triggerInsertPosition, this.#trigger);
        }
    }
    onText({ text }) {
        if (this.#trigger !== undefined) {
            this.#trigger.innerHTML = text; //TODO:  sanitize
        }
    }
    handleClick = (e) => {
        const clone = this.proxy.cloneNode(true);
        const elements = Array.from(clone.querySelectorAll('*'));
        elements.push(clone);
        for (const el of elements) {
            for (const a of el.attributes) {
                //TODO:  use behive - some attributes starting wit is- might not be bedeocrated
                if (a.name.startsWith('is-')) {
                    const val = a.value;
                    el.removeAttribute(a.name);
                    el.setAttribute(a.name.replace('is-', 'be-'), val);
                }
                console.log(a.name, a.value);
            }
        }
        this.proxy.insertAdjacentElement(this.proxy.cloneInsertPosition, clone);
    };
}
const tagName = 'be-clonable';
const ifWantsToBe = 'clonable';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            upgrade,
            virtualProps: ['triggerInsertPosition', 'text'],
            intro: 'intro',
            finale: 'finale',
            proxyPropDefaults: {
                triggerInsertPosition: 'beforeend',
                cloneInsertPosition: 'afterend',
                text: '&#10063;'
            }
        },
        actions: {
            onTriggerInsertPosition: 'triggerInsertPosition',
            onText: 'text',
        }
    },
    complexPropDefaults: {
        controller: BeClonable
    }
});
register(ifWantsToBe, upgrade, tagName);
