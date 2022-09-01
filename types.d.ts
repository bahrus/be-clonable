import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface BeClonableEndUserProps {
    triggerInsertPosition?: InsertPosition;
    cloneInsertPosition?: InsertPosition;
    text?: string;
}

export interface BeClonableVirtualProps extends BeClonableEndUserProps, MinimalProxy{}

export type Proxy = Element & BeClonableVirtualProps;

export interface BeClonableProxy extends  BeClonableActions, BeClonableVirtualProps{
    proxy: Proxy;
}

export type BCP = BeClonableProxy;

export interface BeClonableActions{
    batonPass(proxy: BCP, target: Element, beDecorProps: BeDecoratedProps, baton: any): void;
    finale(proxy: BCP, target: Element, beDecorProps: BeDecoratedProps): void;
    onTriggerInsertPosition(proxy: BCP): void;
    onText(proxy: BCP): void;
}