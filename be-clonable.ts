import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeClonableActions, BeClonableProps, BeClonableVirtualProps} from './types';
import {Cloner, proxyPropDefaults} from './Cloner.js';

export class BeClonable implements BeClonableActions{
    #cloner!: Cloner;

    intro(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{}
    finale(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{}
    batonPass(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps<any, any>, baton: any): void {
        this.#cloner = baton;
    }
    async onTriggerInsertPosition(self: this){
        if(this.#cloner === undefined){
            this.#cloner = new Cloner(self.proxy, self.proxy);
        }
        this.#cloner.addCloneButtonTrigger(self);

    }

    onText(self: this): void{
        if(this.#cloner === undefined){
            this.#cloner = new Cloner(self.proxy, self.proxy);
        }
        this.#cloner.setText(self);
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
            batonPass: 'batonPass',
            proxyPropDefaults
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