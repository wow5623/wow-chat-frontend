import {forward, sample} from 'effector';
import {
    $dialogs,
    $dialogsKeyPairs, acceptDialogFx,
    createDialogEvent,
    createDialogFx,
    getAllMeDialogsEvent,
    getAllMeDialogsFx, listCompanionIdPendingApi, listInitiatorIdPendingApi,
    updateDialogKeyPairsEvent
} from './index';
import {persist} from 'effector-storage/local';
import {getAllUsersEvent} from '../users';


// Fetching dialogs

forward({
    from: getAllMeDialogsEvent,
    to: getAllMeDialogsFx,
})

forward({
    from: getAllMeDialogsFx.doneData,
    to: $dialogs,
})


// Creating dialog, saving key pairs

persist({
    store: $dialogsKeyPairs,
    key: 'dialogsKeyPair',
})

forward({
    from: createDialogEvent,
    to: createDialogFx,
})

sample({
    clock: createDialogFx.doneData,
    target: [updateDialogKeyPairsEvent, getAllMeDialogsEvent, getAllUsersEvent]
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
    target: listInitiatorIdPendingApi.addCompanion
})

sample({
    clock: acceptDialogFx.finally,
    fn: effectInfo => effectInfo.params.initiatorId,
    target: listInitiatorIdPendingApi.removeCompanion
})



