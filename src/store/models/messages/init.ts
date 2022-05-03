import {forward, sample} from 'effector';
import {$messages, addMessageEvent, addMessageFx} from './index';

sample({
    clock: addMessageEvent,
    source: $messages,
    fn: (messages, message) => ({prevMessages: messages, message}),
    target: addMessageFx
})

forward({
    from: addMessageFx.doneData,
    to: $messages,
})
