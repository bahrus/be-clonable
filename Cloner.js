import { findAdjacentElement } from 'be-decorated/findAdjacentElement.js';
export class Cloner {
    proxy;
    props;
    #trigger;
    constructor(proxy, props) {
        this.proxy = proxy;
        this.props = props;
        if (props === undefined) {
            this.props = proxy;
        }
    }
    async addCloneButtonTrigger({ text, triggerInsertPosition, then }) {
        if (this.#trigger === undefined) {
            const trigger = findAdjacentElement(triggerInsertPosition, this.proxy, 'button.be-clonable-trigger');
            if (trigger !== null)
                this.#trigger = trigger;
            if (this.#trigger === undefined) {
                this.#trigger = document.createElement('button');
                this.#trigger.type = 'button';
                this.#trigger.classList.add('be-clonable-trigger');
                this.proxy.insertAdjacentElement(triggerInsertPosition, this.#trigger);
            }
            this.setText(this.props);
            this.#trigger.addEventListener('click', this.handleClick);
            if (then !== undefined) {
                const { doThen } = await import('be-decorated/doThen.js');
                doThen(this.proxy, then);
            }
        }
    }
    setText({ text }) {
        if (this.#trigger !== undefined) {
            this.#trigger.innerHTML = text; //TODO:  sanitize
        }
    }
    handleClick = async (e) => {
        const clone = this.proxy.cloneNode(true);
        const { beatify } = await import('be-hive/beatify.js');
        const beHive = this.proxy.getRootNode().querySelector('be-hive');
        beatify(clone, beHive);
        this.proxy.insertAdjacentElement(this.props.cloneInsertPosition, clone);
    };
    dispose() {
        if (this.#trigger !== undefined) {
            this.#trigger.removeEventListener('click', this.handleClick);
            this.#trigger.remove();
        }
    }
}
export const proxyPropDefaults = {
    triggerInsertPosition: 'beforeend',
    cloneInsertPosition: 'afterend',
    text: '&#10063;'
};
