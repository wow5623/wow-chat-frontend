import {TMessage} from '../../../store/models/messages/types';

export type TGetAllMessagesByDialogRequest = {
    dialogId: string;
}

export type TCreateMessageRequest = {
    dialogId: string;
    text: string;
}

export type TMarkMessagesAsReadRequest = {
    messagesIds: string[];
    dialogId: string;
};

export type TCreateMessageResponse = TMessage
export type TGetAllMessagesByDialogResponse = TMessage[]
