import {createEffect, createEvent, createStore} from 'effector';
import {TAddMessageFxProps} from './types';

export const $messages = createStore<string[]>([])

export const addMessageEvent = createEvent<string>();

export const addMessageFx = createEffect<TAddMessageFxProps, string[], Error>(({prevMessages, message}) => {
    return [...prevMessages, message]
});
