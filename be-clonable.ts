import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeClonableActions, BeClonableProps} from './types';

export class BeClonable implements BeClonableActions{
    #trigger: HTMLButtonElement | undefined;
    intro(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{
    }
    finale(proxy: Element & BeClonableProps, target: Element, beDecorProps: BeDecoratedProps): void{

    }
    onInsertPosition({text, insertPosition}: this): void{
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
            virtualProps: ['insertPosition', 'text'],
            intro: 'intro',
            finale: 'finale',
            proxyPropDefaults:{
                insertPosition: 'beforeend',
                text: '&#10063;'
            }
        }
    }
});