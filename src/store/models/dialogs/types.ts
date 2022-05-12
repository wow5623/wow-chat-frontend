import {TUser} from '../users/types';
import {TMessage} from '../messages/types';
import {TKeyPair} from '../../../crypto/types';

export type TDialog = {
    id: string;
    initiator: TUser;
    companion: TUser;
    lastMessage: TMessage;
    isDialogAccepted: boolean;
}

export type TMyDialog = {
    id: string;
    partner: TUser | null;
    lastMessage: TMessage;
    isDialogAccepted: boolean;
    isDialogRequest: boolean;
}

export type TUpdateDialogsKeyPairs = {
    dialogId: string,
    newDialogKeyPair: TKeyPair,
}

export type TCreateDialogFxResponse = TUpdateDialogsKeyPairs & {
    companionId: string,
}

export type TAcceptDialogFxParams = {
    initiatorId: string,
    dialogId: string,
}
export type TAcceptDialogFxResponse = TUpdateDialogsKeyPairs & {
    initiatorId: string,
}
