import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface BeClonableEndUserProps {
    triggerInsertPosition?: InsertPosition;
    cloneInsertPosition?: InsertPosition;
    text?: string;
}

export interface BeClonableVirtualProps extends BeClonableEndUserProps, MinimalProxy{}

export type Proxy = Element & BeClonableVirtualProps;

export interface ProxyProps extends BeClonableVirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface BeClonableActions{
    batonPass(proxy: PP, target: Element, beDecorProps: BeDecoratedProps, baton: any): void;
    finale(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
    onTriggerInsertPosition(proxy: PP): void;
    onText(proxy: PP): void;
}