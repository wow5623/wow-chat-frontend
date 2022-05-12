import {TDialog} from '../../../store/models/dialogs/types';

export type TCreateDialogRequest = {
    companion: string;
    initiatorPublicKey: string;
}

export type TAcceptDialogDto = {
    dialogId: string;
    companionPublicKey: string;
}

export type TGetAllMeDialogsResponse = TDialog[]
export type TCreateDialogResponse = TDialog
export type TAcceptDialogResponse = TDialog
