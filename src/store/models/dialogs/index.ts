import {combine, createApi, createEffect, createEvent, createStore, restore, Store} from 'effector';
import {
    TAcceptDialogFxParams,
    TAcceptDialogFxResponse,
    TCreateDialogFxResponse,
    TDialog,
    TGenerateDeriveKeyParams,
    TGetAllMeDialogsFxProps,
    TMyDialog,
    TPartner,
    TUpdateDialogDeriveKey,
    TUpdateDialogKeyPairs,
} from './types';
import {createEffectWithAuthToken} from '../auth/decorators';
import {NCreateEffectWithAuthToken} from '../auth/types';
import {DialogsService} from '../../../api/services/DialogsService/DialogsService';
import {$userInfo} from '../auth';
import {TUser} from '../users/types';
import {CryptoManager} from '../../../crypto/CryptoManager';
import {TDialogsMeKeys} from '../events/types';
import {getDecryptTextPromise} from '../messages/utils/getDecryptTextPromise';
import * as lodashHelper from 'lodash';

export const $currentDialogId = createStore<string | null>(null);

export const $currentDialog = createStore<TDialog | null>(null);
export const $partner: Store<TPartner | null> = combine(
    {dialog: $currentDialog, me: $userInfo},
    ({dialog, me}) => {
        if (!dialog || !me) {
            return null;
        }
        if (dialog?.companion?.id === me?.id) {
            return {
                user: dialog?.initiator,
                publicKey: dialog?.initiatorPublicKey,
            }
        }
        else {
            return {
                user: dialog?.companion,
                publicKey: dialog?.companionPublicKey,
            }
        }
    }
)

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
    addInitiator: (prevList, newInitiatorId: string) => {
        return [...prevList, newInitiatorId]
    },
    removeInitiator: (prevList, initiatorIdForRemove: string) => {
        return prevList.filter(initiatorId => initiatorId !== initiatorIdForRemove)
    },
});

export const updateDialogKeyPairsEvent = createEvent<TUpdateDialogKeyPairs>();
export const updateDialogDeriveKeyEvent = createEvent<TUpdateDialogDeriveKey>();
export const $dialogsMeKeys = createStore<TDialogsMeKeys | null>(null)
    .on(
        updateDialogKeyPairsEvent,
        (prevKeys, {newDialogKeyPair, dialogId}) =>
            ({
                ...prevKeys,
                [dialogId]: {
                    ...(prevKeys ?? {})[dialogId],
                    ...newDialogKeyPair
                }
            })
    )
    .on(
        updateDialogDeriveKeyEvent,
        (prevKeys, {newDeriveKey, dialogId}) => {

            return {
                ...prevKeys,
                [dialogId]: {
                    ...(prevKeys ?? {})[dialogId],
                    deriveKey: newDeriveKey
                }
            }
        }
    )

$dialogsMeKeys.watch(dialogsMeKeys => {
    console.log(dialogsMeKeys);
})

export const $currentDeriveKey: Store<CryptoKey | null> = combine(
    {dialogId: $currentDialogId, keys: $dialogsMeKeys},
    ({dialogId, keys}) => {
        if (!dialogId || !keys || !keys[dialogId] || !keys[dialogId]?.deriveKey) {
            return null
        }
        return keys[dialogId]?.deriveKey ?? null;
    }
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
                isDialogRequest,
                createdTime: dialog.createdTime,
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
export const getCurrentDialogEvent = createEvent<string>();
export const createDialogEvent = createEvent<string>();
export const acceptDialogEvent = createEvent<TAcceptDialogFxParams>();
export const deleteDialogEvent = createEvent<string>();
export const generateDeriveKeyEvent = createEvent();

export const getAllMeDialogsFx = createEffectWithAuthToken<TGetAllMeDialogsFxProps, TDialog[], Error>(createEffect(
    async ({token, params: {me, cryptoKeys}}: NCreateEffectWithAuthToken.TEffectParamParams<TGetAllMeDialogsFxProps>) => {
        const service = new DialogsService();

        const dialogs = await service.getAllMeDialogs({token});

        const cryptoManager = new CryptoManager();


        return await Promise.all(
            dialogs.map(async (dialog) => {

                let dialogKeys = cryptoKeys ? cryptoKeys[dialog.id] : null;

                let deriveKey = dialogKeys?.deriveKey;
                const privateKey = dialogKeys?.privateKeyJwk;
                const publicKey = (() => {
                    if (dialog.companion.id === me?.id) {
                        return dialog?.initiatorPublicKey
                    }
                    else {
                        return dialog?.companionPublicKey
                    }
                })()

                if (lodashHelper.isEmpty(deriveKey) && !!privateKey && !!publicKey) {
                    deriveKey = await cryptoManager.generateDeriveKey(JSON.parse(publicKey), privateKey);
                }

                if (!!dialog?.lastMessage && !!deriveKey) {
                    const decryptedLastMessage = await getDecryptTextPromise(dialog?.lastMessage, deriveKey, cryptoManager);
                    return {
                        ...dialog,
                        lastMessage: decryptedLastMessage
                    }
                }


                return dialog;
            })
        )
    }
));

export const getCurrentDialogFx = createEffectWithAuthToken<string, TDialog, Error>(createEffect(
    async ({token, params: dialogId}: NCreateEffectWithAuthToken.TEffectParamParams<string>) => {
        const service = new DialogsService();
        return await service.getDialog({token, dialogId})
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
                initiatorPublicKey: JSON.stringify(keyPair.publicKeyJwk),
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

export const deleteDialogFx = createEffectWithAuthToken<string, void, Error>(createEffect(
    async ({token, params: dialogId}: NCreateEffectWithAuthToken.TEffectParamParams<string>) => {

        const dialogsService = new DialogsService();

        await dialogsService.deleteDialog(
            {
                token,
                dialogId,
            }
        )
    }
));

export const generateDeriveKeyFx = createEffect<TGenerateDeriveKeyParams, CryptoKey, Error>(
    async ({partnerPublicKey, myPrivateKey}) => {

        const partnerPublicKeyJwk: JsonWebKey = JSON.parse(partnerPublicKey);
        const myPrivateKeyJwk: JsonWebKey = JSON.parse(myPrivateKey);

        const cryptoManager = new CryptoManager();

        const key = await cryptoManager.generateDeriveKey(partnerPublicKeyJwk, myPrivateKeyJwk);

        return key;
    }
);
