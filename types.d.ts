import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';

export interface EndUserProps {
    triggerInsertPosition?: InsertPosition;
    cloneInsertPosition?: InsertPosition;
    buttonContent?: string;
}

export interface VirtualProps extends EndUserProps, MinimalProxy{
    byob?: boolean,
}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export type PPP = Partial<ProxyProps>;

export type PPE = [Partial<PP>, EventConfigs<Proxy, Actions>];

export interface Actions{
    addCloneBtn(pp: PP, returnObjMold: PPE): Promise<PPE | void>;
    setBtnContent(pp: PP): void;
    beCloned(pp: PP): void;
    finale(): void;
}