import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface BeClonableEndUserProps {
    triggerInsertPosition: InsertPosition;
    cloneInsertPosition: InsertPosition;
    text: string;
}

export interface BeClonableVirtualProps extends BeClonableEndUserProps, MinimalProxy{}

export interface BeClonableProps extends BeClonableVirtualProps{
    proxy: Element & BeClonableProps;
}

export interface BeClonableActions{
    batonPass(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps, baton: any): void;
    finale(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onTriggerInsertPosition(self: this): void;
    onText(self: this): void;
}