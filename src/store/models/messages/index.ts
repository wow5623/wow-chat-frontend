import {combine, createApi, createEffect, createEvent, createStore, Store} from 'effector';
import {
    TAddNewMessageFxProps,
    TCreateMessageFxProps,
    TGetAllMessagesByDialogFxProps,
    TMarkMessagesAsReadFxProps,
    TMessage,
    TMyMessage
} from './types';
import {createEffectWithAuthToken} from '../auth/decorators';
import {NCreateEffectWithAuthToken} from '../auth/types';
import {MessagesService} from '../../../api/services/MessagesService/MessagesService';
import {CryptoManager} from '../../../crypto/CryptoManager';
import {getDecryptTextPromise} from './utils/getDecryptTextPromise';
import {$userInfo} from '../auth';

export const createMessageEvent = createEvent<string>();

export const $messages = createStore<TMessage[] | null>([]);

export const $myMessages: Store<TMyMessage[] | null> = combine(
    {messages: $messages, me: $userInfo},
    ({messages, me}) => {
        return messages?.map(message => {
            return {
                ...message,
                isMyMessage: message?.author?.id === me?.id,
            }
        }) ?? null
    }
)
export const $partnerUnreadMessagesIds: Store<string[] | null> = $myMessages.map(
    messages => messages
        ?.filter(message => {
            return !message?.isRead && !message?.isMyMessage;
        })
        ?.map(({id}) => id)
    ?? null
)

export const $listSendMessagesPending = createStore<string[]>([]);
export const listSendMessagesPendingApi = createApi($listSendMessagesPending, {
    addSendMessage: (prevList, newMessageId: string | null) => {
        if (!newMessageId) return prevList;
        return [...prevList, newMessageId]
    },
    removeSendMessage: (prevList, messageIdForRemove: string | null) => {
        if (!messageIdForRemove) return prevList;
        return prevList.filter(messageId => messageId !== messageIdForRemove)
    },
});

export const getAllMessagesByDialogEvent = createEvent();
export const markMessagesAsReadEvent = createEvent<string>();

export const getAllMessagesByDialogFx = createEffectWithAuthToken<TGetAllMessagesByDialogFxProps, TMessage[], Error>(createEffect(
    async (
        {token, params: {dialogId, deriveKey}}: NCreateEffectWithAuthToken.TEffectParamParams<TGetAllMessagesByDialogFxProps>,
    ) => {

        if (!dialogId) {
            throw new Error('Отсутствует dialogId');
        }

        if (!deriveKey) {
            throw new Error('Отсутствует deriveKey');
        }

        const cryptoManager = new CryptoManager();
        const messagesService = new MessagesService();

        const messages = await messagesService.getAllMessagesByDialog(
            {
                token,
                dialogId,
            }
        )

        const messagesPromises = messages.map(message => getDecryptTextPromise(message, deriveKey, cryptoManager))

        return await Promise.all(messagesPromises);
    }
));

export const createMessageFx = createEffectWithAuthToken<TCreateMessageFxProps, TMessage, Error>(createEffect(
    async (
        {token, params: {dialogId, deriveKey, text}}: NCreateEffectWithAuthToken.TEffectParamParams<TCreateMessageFxProps>,
    ) => {

        if (!dialogId) {
            throw new Error('Отсутствует dialogId');
        }

        if (!deriveKey) {
            throw new Error('Отсутствует deriveKey');
        }

        const cryptoManager = new CryptoManager();

        const encryptedText = await cryptoManager.encryptText(text, deriveKey);

        const messagesService = new MessagesService();

        return await messagesService.createMessage(
            {
                token,
                dialogId,
                text: encryptedText,
            }
        )
    }
));

export const markMessagesAsReadFx = createEffectWithAuthToken<TMarkMessagesAsReadFxProps, void, Error>(createEffect(
    async (
        {token, params}: NCreateEffectWithAuthToken.TEffectParamParams<TMarkMessagesAsReadFxProps>,
    ) => {

        if (!params?.messagesIds || !params?.messagesIds?.length) {
            throw new Error('Непрочитанных сообщений нет.')
        }

        const messagesService = new MessagesService();

        return await messagesService.markMessagesAsRead(
            {
                token,
                messagesIds: params?.messagesIds,
                dialogId: params.dialogId,
            }
        )
    }
));

export const addNewMessageFx = createEffect<TAddNewMessageFxProps, TMessage[], Error>((props) => {

        if (!props.prevMessages) {
            return [];
        }

        if (!props.dialog) {
            return [...props.prevMessages];
        }

        const message: TMessage = {
            text: props.text,
            id: '',
            isRead: false,
            createdTime: new Date().toISOString(),
            dialog: props.dialog,
            author: {
                id: props?.me?.id ?? '',
                name: props?.me?.name ?? '',
                email: props?.me?.email ?? '',
                isEmailActivated: true,
            },
            isSending: true,
        }

        return [...props.prevMessages, message]

})

