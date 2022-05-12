import {createEffect, createEvent, createStore, restore} from 'effector';
import {EventsService} from '../../../api/services/EventsService/EventsService';
import {TDialogJointFxProps} from './types';

export const serviceConnectEvent = createEvent();
export const dialogJoinEvent = createEvent<string>();

export const serviceConnectFx = createEffect<void, EventsService, Error>(() => {
    return new EventsService();
});

export const $service = restore<EventsService>(serviceConnectFx.doneData, null)

export const dialogJoinFx = createEffect<TDialogJointFxProps, string, Error>(async ({service, dialogId}) => {

    if (!service) {
        throw new Error('Ошибка соединения с сокет-сервером');
    }

    await service.dialogJoin(dialogId);
    return dialogId;
})
