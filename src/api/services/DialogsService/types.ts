import {TDialog} from '../../../store/models/dialogs/types';

export type TGetDialogDto = {
    dialogId: string;
}

export type TCreateDialogRequest = {
    companion: string;
    initiatorPublicKey: string;
}

export type TAcceptDialogDto = {
    dialogId: string;
    companionPublicKey: string;
}

export type TDeleteDialogDto = {
    dialogId: string;
}

export type TGetAllMeDialogsResponse = TDialog[]
export type TGetDialogResponse = TDialog
export type TCreateDialogResponse = TDialog
export type TAcceptDialogResponse = TDialog
