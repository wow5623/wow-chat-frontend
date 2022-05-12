import {useStore} from 'effector-react';
import {$listInitiatorIdPending} from '../../../../../store/models/dialogs';
import {useMemo} from 'react';

export const useIsDialogAcceptPending = (userId: string): boolean => {

    const listInitiatorIdPending = useStore($listInitiatorIdPending);

    return useMemo(() => {
        return listInitiatorIdPending.some(initiatorId => initiatorId === userId)
    }, [listInitiatorIdPending, userId])
}
