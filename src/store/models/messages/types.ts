import {TDialog} from '../dialogs/types';
import {TUser} from '../users/types';

export type TAddMessageFxProps = {prevMessages: string[], message: string};

export type TMessage = {
    dialog: TDialog;
    author: TUser;
    text: string;
    createdTime: Date;
}
