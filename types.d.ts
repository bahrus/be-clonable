import {BeDecoratedProps} from 'be-decorated/types';

export interface BeClonableVirtualProps {
    triggerInsertPosition: InsertPosition;
    cloneInsertPosition: InsertPosition;
    text: string;
}

export interface BeClonableProps extends BeClonableVirtualProps{
    proxy: Element & BeClonableVirtualProps;
}

export interface BeClonableActions{
    intro(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    finale(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onTriggerInsertPosition(self: this): void;
    onText(self: this): void;
}