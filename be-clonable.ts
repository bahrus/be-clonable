import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeClonableActions, BCP, BeClonableVirtualProps, Proxy} from './types';
import {Cloner, proxyPropDefaults} from './Cloner.js';

export class BeClonable extends EventTarget implements BeClonableActions{
    #cloner!: Cloner;

    finale(proxy: BCP, target: Element, beDecorProps: BeDecoratedProps): void{
        if(this.#cloner !== undefined){
            this.#cloner.dispose();
        }
    }
    batonPass(proxy: BCP, target: Element, beDecorProps: BeDecoratedProps<any, any>, baton: any): void {
        this.#cloner = baton;
    }
    async onTriggerInsertPosition(bcp: BCP){
        const {proxy} = bcp;
        if(this.#cloner === undefined){
            this.#cloner = new Cloner(proxy, bcp);
        }
        await this.#cloner.addCloneButtonTrigger(bcp);
        proxy.resolved = true;

    }

    onText(bcp: BCP): void{
        if(this.#cloner === undefined){
            const {proxy} = bcp
            this.#cloner = new Cloner(proxy, bcp);
        }
        this.#cloner.setText(bcp);
    }
}

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