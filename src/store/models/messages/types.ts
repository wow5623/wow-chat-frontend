import {TDialog} from '../dialogs/types';
import {TUser} from '../users/types';
import {TUserInfo} from '../auth/types';

export type TGetAllMessagesByDialogFxProps = {
    deriveKey: CryptoKey | null;
    dialogId: string | null;
};

export type TCreateMessageFxProps = {
    dialogId: string | null;
    text: string;
    deriveKey: CryptoKey | null;
};

export type TMarkMessagesAsReadFxProps = {
    messagesIds: string[] | null;
    dialogId: string;
};

export type TMessage = {
    id: string;
    dialog: TDialog;
    author: TUser;
    text: string;
    createdTime: string;
    isRead: boolean;
    isSending: boolean;
}

export type TMyMessage = TMessage & {
    isMyMessage: boolean;
}

export type TAddNewMessageFxProps = {
    me: TUserInfo | null;
    dialog: TDialog | null;
    text: string;
    prevMessages: TMessage[] | null;
}
