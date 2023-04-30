import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    triggerInsertPosition?: InsertPosition;
    cloneInsertPosition?: InsertPosition;
    buttonContent?: string;
}

export interface AllProps extends EndUserProps{
    byob?: boolean,
}


export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>]

export type ProPOA = Promise<POA | undefined>;

export interface Actions{
    addCloneBtn(self: this): ProPOA;
    setBtnContent(self: this): void;
    beCloned(self: this): void;
    //finale(): void;
}