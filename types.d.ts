import { ActionOnEventConfigs } from "trans-render/froop/types";
import { IEnhancement, BEAllProps } from 'trans-render/be/types';

export interface EndUserProps extends IEnhancement{
    triggerInsertPosition?: InsertPosition;
    cloneInsertPosition?: InsertPosition;
    buttonContent?: string;
}

export interface AllProps extends EndUserProps{
    byob?: boolean,
    trigger?: WeakRef<HTMLButtonElement>
}


export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;



export interface Actions{
    addCloneBtn(self: this): ProPOA;
    setBtnContent(self: this): void;
    beCloned(self: this): void;
}