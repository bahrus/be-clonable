import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeClonableActions, BeClonableController, BeClonableVirtualProps} from './types';
import {Cloner, proxyPropDefaults} from './Cloner.js';

export class BeClonable extends EventTarget implements BeClonableActions{
    #cloner!: Cloner;

    finale(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void{
        if(this.#cloner !== undefined){
            this.#cloner.dispose();
        }
    }
    batonPass(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps<any, any>, baton: any): void {
        this.#cloner = baton;
    }
    async onTriggerInsertPosition({proxy}: this){
        if(this.#cloner === undefined){
            this.#cloner = new Cloner(proxy, proxy);
        }
        await this.#cloner.addCloneButtonTrigger(this);
        proxy.resolved = true;

    }

    onText(self: this): void{
        if(this.#cloner === undefined){
            this.#cloner = new Cloner(self.proxy, self.proxy);
        }
        this.#cloner.setText(self);
    }
}

export interface BeClonable extends BeClonableController{}

const tagName = 'be-clonable';

const ifWantsToBe = 'clonable';

const upgrade = '*';



define<BeClonableVirtualProps & BeDecoratedProps<BeClonableVirtualProps, BeClonableActions>, BeClonableActions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            upgrade,
            finale: 'finale',
            batonPass: 'batonPass',
            virtualProps: ['cloneInsertPosition', 'triggerInsertPosition', 'text'],
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