import {combine, forward, sample, Store} from 'effector';
import {
    $currentDialog,
    $currentDialogId,
    $dialogs,
    $dialogsMeKeys,
    $partner,
    acceptDialogEvent,
    acceptDialogFx,
    createDialogEvent,
    createDialogFx,
    deleteDialogEvent,
    deleteDialogFx,
    generateDeriveKeyEvent,
    generateDeriveKeyFx,
    getAllMeDialogsEvent,
    getAllMeDialogsFx,
    getCurrentDialogEvent,
    getCurrentDialogFx,
    listCompanionIdPendingApi,
    listInitiatorIdPendingApi,
    updateDialogDeriveKeyEvent,
    updateDialogKeyPairsEvent
} from './index';
import {persist} from 'effector-storage/local';
import {getAllUsersEvent} from '../users';
import {dialogJoinEvent} from '../events';
import {$userInfo} from '../auth';


// Fetching dialogs

sample({
    source: combine({
        me: $userInfo,
        cryptoKeys: $dialogsMeKeys,
    }),
    clock: getAllMeDialogsEvent,
    target: getAllMeDialogsFx,
})

forward({
    from: getAllMeDialogsFx.doneData,
    to: $dialogs,
})


// Fetching current dialog

forward({
    from: getCurrentDialogEvent,
    to: getCurrentDialogFx,
})

forward({
    from: getCurrentDialogFx.doneData,
    to: $currentDialog,
})

sample({
    clock: getCurrentDialogFx.doneData,
    fn: ({id}) => id,
    target: [$currentDialogId, dialogJoinEvent],
})


// Creating dialog, saving key pairs

persist({
    store: $dialogsMeKeys,
    key: 'dialogsMeKeys',
})

forward({
    from: createDialogEvent,
    to: createDialogFx,
})

forward({
    from: acceptDialogEvent,
    to: acceptDialogFx,
})

sample({
    clock: createDialogFx.doneData,
    target: [getAllMeDialogsEvent, getAllUsersEvent]
})

sample({
    clock: createDialogFx.doneData,
    fn: ({dialogId, newDialogKeyPair}) => ({dialogId, newDialogKeyPair}),
    target: updateDialogKeyPairsEvent,
})

sample({
    clock: createDialogFx,
    target: listCompanionIdPendingApi.addCompanion
})

sample({
    clock: createDialogFx.finally,
    fn: effectInfo => effectInfo.params,
    target: listCompanionIdPendingApi.removeCompanion
})

sample({
    clock: acceptDialogFx,
    fn: ({initiatorId}) => initiatorId,
    target: listInitiatorIdPendingApi.addInitiator
})

sample({
    clock: acceptDialogFx.done,
    target: getAllMeDialogsEvent,
})

sample({
    clock: acceptDialogFx.doneData,
    fn: ({dialogId, newDialogKeyPair}) => ({dialogId, newDialogKeyPair}),
    target: updateDialogKeyPairsEvent,
})

sample({
    clock: acceptDialogFx.finally,
    fn: effectInfo => effectInfo.params.initiatorId,
    target: listInitiatorIdPendingApi.removeInitiator
})

forward({
    from: deleteDialogEvent,
    to: deleteDialogFx,
})

forward({
    from: deleteDialogFx.done,
    to: getAllMeDialogsEvent,
})

sample({
    source: combine(
        $currentDialogId,
        $partner,
        $dialogsMeKeys,
        (dialogId, partner, keys) => {

            let myPrivateKey = '';
            let partnerPublicKey = partner?.publicKey ?? '';

            if (!!dialogId && !!partner && !!keys && keys[dialogId]) {
                myPrivateKey = JSON.stringify(keys[dialogId]?.privateKeyJwk)
            }

            return {
                myPrivateKey,
                partnerPublicKey,
            }
        }
    ),
    clock: generateDeriveKeyEvent,
    target: generateDeriveKeyFx,
})

sample({
    source: $currentDialogId,
    clock: generateDeriveKeyFx.doneData,
    fn: (dialogId, newDeriveKey) => ({
        dialogId: dialogId ?? '',
        newDeriveKey,
    }),
    target: updateDialogDeriveKeyEvent,
})



