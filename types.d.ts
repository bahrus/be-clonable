import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';

export interface EndUserProps {
    triggerInsertPosition?: InsertPosition;
    cloneInsertPosition?: InsertPosition;
    text?: string;
}

export interface VirtualProps extends EndUserProps, MinimalProxy{}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export type PPP = Partial<ProxyProps>;

export type PPE = [Partial<PP>, EventConfigs<Proxy, Actions>];

export interface Actions{
    batonPass(pp: PP, target: Element, beDecorProps: BeDecoratedProps, baton: any): void;
    finale(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
    addCloneBtn(pp: PP): Promise<PPE | void>;
    onText(pp: PP): void;
    beCloned(pp: PP): void;
}