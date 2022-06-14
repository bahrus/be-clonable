import {BeDecoratedProps} from 'be-decorated/types';

export interface BeClonableVirtualProps {
    insertPosition: InsertPosition;
    text: string;
}

export interface BeClonableProps extends BeClonableVirtualProps{
    proxy: Element & BeClonableVirtualProps;
}

export interface BeClonableActions{
    intro(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    finale(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onInsertPosition(self: this): void;
}