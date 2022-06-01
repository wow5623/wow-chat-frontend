import {TUser} from '../users/types';
import {TMessage} from '../messages/types';
import {TKeyPair} from '../../../crypto/types';
import {getAllMeDialogsFx} from './index';
import {TUserInfo} from '../auth/types';
import {TDialogsMeKeys} from '../events/types';

export type TDialog = {
    id: string;
    initiator: TUser;
    companion: TUser;
    initiatorPublicKey: string;
    companionPublicKey: string;
    lastMessage: TMessage;
    isDialogAccepted: boolean;
    createdTime: string;
}

export type TMyDialog = {
    id: string;
    partner: TUser | null;
    lastMessage: TMessage;
    isDialogAccepted: boolean;
    isDialogRequest: boolean;
    createdTime: string;
}

export type TGetAllMeDialogsFxProps = {
    me: TUserInfo | null,
    cryptoKeys: TDialogsMeKeys | null,
}

export type TUpdateDialogKeyPairs = {
    dialogId: string,
    newDialogKeyPair: TKeyPair,
}

export type TUpdateDialogDeriveKey = {
    dialogId: string,
    newDeriveKey: CryptoKey,
}

export type TCreateDialogFxResponse = TUpdateDialogKeyPairs & {
    companionId: string,
}

export type TAcceptDialogFxParams = {
    initiatorId: string,
    dialogId: string,
}

export type TAcceptDialogFxResponse = TUpdateDialogKeyPairs & {
    initiatorId: string,
}

export type TGenerateDeriveKeyParams = {
    myPrivateKey: string,
    partnerPublicKey: string,
}

export type TPartner = {
    user: TUser,
    publicKey: string;
}
