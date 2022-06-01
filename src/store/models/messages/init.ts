import {combine, forward, sample} from 'effector';
import {$currentDeriveKey, $currentDialog, $currentDialogId, generateDeriveKeyFx} from '../dialogs';
import {
    $messages,
    $partnerUnreadMessagesIds,
    addNewMessageFx,
    createMessageEvent,
    createMessageFx,
    getAllMessagesByDialogEvent,
    getAllMessagesByDialogFx, markMessagesAsReadEvent,
    markMessagesAsReadFx
} from './index';
import {$userInfo} from '../auth';

forward({
    from: generateDeriveKeyFx.done,
    to: getAllMessagesByDialogEvent,
})

sample({
    source: combine({
        dialogId: $currentDialogId,
        deriveKey: $currentDeriveKey,
    }),
    clock: getAllMessagesByDialogEvent,
    target: getAllMessagesByDialogFx,
})


sample({
    source: combine({
        dialogId: $currentDialogId,
        deriveKey: $currentDeriveKey,
    }),
    clock: createMessageEvent,
    fn: ({dialogId, deriveKey}, text) => {
        return {
            dialogId,
            deriveKey,
            text,
        }
    },
    target: createMessageFx,
});

forward({
    from: createMessageFx.done,
    to: getAllMessagesByDialogEvent,
})

sample({
    source: combine({
        me: $userInfo,
        dialog: $currentDialog,
        prevMessages: $messages,
    }),
    clock: createMessageEvent,
    fn: (source, text) => ({...source, text}),
    target: addNewMessageFx,
})

forward({
    from: addNewMessageFx.doneData,
    to: $messages,
})

forward({
    from: getAllMessagesByDialogFx.doneData,
    to: $messages,
})

sample({
    source: $partnerUnreadMessagesIds,
    clock: markMessagesAsReadEvent,
    fn: (messagesIds, dialogId) => ({
        messagesIds,
        dialogId,
    }),
    target: markMessagesAsReadFx,
})

forward({
    from: markMessagesAsReadFx.done,
    to: getAllMessagesByDialogEvent,
})

