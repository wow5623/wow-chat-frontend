import {combine, createApi, createEffect, createEvent, createStore, restore, Store} from 'effector';
import {
    TAcceptDialogFxParams,
    TAcceptDialogFxResponse,
    TCreateDialogFxResponse,
    TDialog,
    TMyDialog,
    TUpdateDialogsKeyPairs
} from './types';
import {createEffectWithAuthToken} from '../auth/decorators';
import {NCreateEffectWithAuthToken} from '../auth/types';
import {DialogsService} from '../../../api/services/DialogsService/DialogsService';
import {$userInfo} from '../auth';
import {TUser} from '../users/types';
import {CryptoManager} from '../../../crypto/CryptoManager';
import {TDialogsKeyPairs} from '../events/types';

export const $currentDialogId = createStore<string | null>(null);

export const $listCompanionIdPending = createStore<string[]>([]);
export const listCompanionIdPendingApi = createApi($listCompanionIdPending, {
    addCompanion: (prevList, newCompanionId: string) => {
        return [...prevList, newCompanionId]
    },
    removeCompanion: (prevList, companionIdForRemove: string) => {
        return prevList.filter(companionId => companionId !== companionIdForRemove)
    },
});

export const $listInitiatorIdPending = createStore<string[]>([]);
export const listInitiatorIdPendingApi = createApi($listInitiatorIdPending, {
    addCompanion: (prevList, newInitiatorId: string) => {
        return [...prevList, newInitiatorId]
    },
    removeCompanion: (prevList, initiatorIdForRemove: string) => {
        return prevList.filter(initiatorId => initiatorId !== initiatorIdForRemove)
    },
});

export const updateDialogKeyPairsEvent = createEvent<TUpdateDialogsKeyPairs>();
export const $dialogsKeyPairs = createStore<TDialogsKeyPairs | null>(null)
    .on(
        updateDialogKeyPairsEvent,
        (prevPairs, {newDialogKeyPair, dialogId}) =>
            ({...prevPairs, [dialogId]: newDialogKeyPair})
    )

export const $dialogs = createStore<TDialog[] | null>(null);
export const $myDialogs: Store<TMyDialog[] | null> = combine(
    {dialogs: $dialogs, me: $userInfo},
    ({dialogs, me}) => dialogs?.map(
        dialog => {

            let partner: TUser | null = null;
            if (dialog.initiator.id === me?.id) {
                partner = dialog.companion
            }
            if (dialog.companion.id === me?.id) {
                partner = dialog.initiator
            }

            const isDialogRequest = !dialog.isDialogAccepted && dialog.companion.id === me?.id

            return {
                id: dialog.id,
                partner,
                lastMessage: dialog.lastMessage,
                isDialogAccepted: dialog.isDialogAccepted,
                isDialogRequest
            }
        }
    ) ?? null
);


export const searchDialogByPartnerEvent = createEvent<string>();
export const $dialogPartnerFilter = restore(searchDialogByPartnerEvent, '');
export const $visibleMyDialogs: Store<TMyDialog[] | null> = combine(
    {dialogs: $myDialogs, filter: $dialogPartnerFilter},
    ({dialogs, filter}) => dialogs?.filter(
        dialog => {
            if (dialog.partner?.name.includes(filter)) {
                return true;
            }
        }
    ) ?? null
);

export const getAllMeDialogsEvent = createEvent();
export const createDialogEvent = createEvent<string>();
export const acceptDialogEvent = createEvent<TAcceptDialogFxParams>();

export const getAllMeDialogsFx = createEffectWithAuthToken<undefined, TDialog[], Error>(createEffect(
    async ({token}: NCreateEffectWithAuthToken.TEffectParamParams<undefined>) => {
        const service = new DialogsService();
        return await service.getAllMeDialogs({token})
    }
));

export const createDialogFx = createEffectWithAuthToken<string, TCreateDialogFxResponse, Error>(createEffect(
    async ({token, params: companionId}: NCreateEffectWithAuthToken.TEffectParamParams<string>) => {

        const cryptoManager = new CryptoManager();
        const dialogsService = new DialogsService();

        const keyPair = await cryptoManager.generateKeyPair()

        const dialog = await dialogsService.createDialog(
            {
                token,
                companion: companionId,
                initiatorPublicKey: JSON.stringify(keyPair.publicKeyJwk)
            }
        )

        return {
            companionId,
            dialogId: dialog.id,
            newDialogKeyPair: keyPair,
        }
    }
));

export const acceptDialogFx = createEffectWithAuthToken<TAcceptDialogFxParams, TAcceptDialogFxResponse, Error>(createEffect(
    async ({token, params: {dialogId, initiatorId}}: NCreateEffectWithAuthToken.TEffectParamParams<TAcceptDialogFxParams>) => {

        const cryptoManager = new CryptoManager();
        const dialogsService = new DialogsService();

        const keyPair = await cryptoManager.generateKeyPair()

        const dialog = await dialogsService.acceptDialog(
            {
                token,
                dialogId,
                companionPublicKey: JSON.stringify(keyPair.publicKeyJwk)
            }
        )

        return {
            initiatorId,
            dialogId: dialog.id,
            newDialogKeyPair: keyPair,
        }
    }
));
