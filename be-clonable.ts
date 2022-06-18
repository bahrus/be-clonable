import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeClonableActions, BeClonableProps, BeClonableVirtualProps} from './types';
import {IsoLogic, proxyPropDefaults} from './IsoLogic.js';

export class BeClonable implements BeClonableActions{
    #iso!: IsoLogic;

    intro(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{
        this.#iso = new IsoLogic(proxy);
    }
    finale(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{
        
    }
    async onTriggerInsertPosition(self: this){
        this.#iso.onTriggerInsertPosition(self);

    }

    onText(self: this): void{
        this.#iso.onText(self);
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