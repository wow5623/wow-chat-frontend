import {useStore} from 'effector-react';
import {$listCompanionIdPending} from '../../../../../store/models/dialogs';
import {useMemo} from 'react';

export const useIsDialogCreatePending = (userId: string): boolean => {

    const listCompanionIdPending = useStore($listCompanionIdPending);

    return useMemo(() => {
        return listCompanionIdPending.some(companionId => companionId === userId)
    }, [listCompanionIdPending, userId])
}
