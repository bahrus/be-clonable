import {BeDecoratedProps} from 'be-decorated/types';

export interface BeClonableVirtualProps {
    triggerInsertPosition: InsertPosition;
    cloneInsertPosition: InsertPosition;
    text: string;
    then?: string | any[] | any;
}

export interface BeClonableProps extends BeClonableVirtualProps{
    proxy: Element & BeClonableProps;
}

export interface BeClonableActions{
    intro(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    batonPass(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps, isoHelper: any): void;
    finale(proxy: Element & BeClonableVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onTriggerInsertPosition(self: this): void;
    onText(self: this): void;
}