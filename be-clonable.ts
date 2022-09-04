import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeClonableActions, PP, BeClonableVirtualProps, Proxy} from './types';
import {Cloner, proxyPropDefaults} from './Cloner.js';

export class BeClonable extends EventTarget implements BeClonableActions{
    #cloner!: Cloner | undefined;

    finale(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void{
        if(this.#cloner !== undefined){
            this.#cloner.dispose();
            this.#cloner = undefined;
        }
    }
    batonPass(pp: PP, target: Element, beDecorProps: BeDecoratedProps<any, any>, baton: any): void {
        this.#cloner = baton;
    }
    async onTriggerInsertPosition(pp: PP){
        const {proxy} = pp;
        if(this.#cloner === undefined){
            this.#cloner = new Cloner(proxy, pp);
        }
        await this.#cloner.addCloneButtonTrigger(pp);
        proxy.resolved = true;

    }

    onText(pp: PP): void{
        if(this.#cloner === undefined){
            const {proxy} = pp;
            this.#cloner = new Cloner(proxy, pp);
        }
        this.#cloner.setText(pp);
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