import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeClonableActions, BeClonableProps, BeClonableVirtualProps} from './types';
import {IsoHelper, proxyPropDefaults} from './IsoHelper.js';

export class BeClonable implements BeClonableActions{
    #iso!: IsoHelper;

    intro(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{}
    finale(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{}
    resume(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps<any, any>, isoHelper: any): void {
        this.#iso = isoHelper;
    }
    async onTriggerInsertPosition(self: this){
        if(this.#iso === undefined){
            this.#iso = new IsoHelper(self.proxy, self.proxy);
        }
        this.#iso.onTriggerInsertPosition(self);

    }

    onText(self: this): void{
        if(this.#iso === undefined){
            this.#iso = new IsoHelper(self.proxy, self.proxy);
        }
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
            resume: 'resume',
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