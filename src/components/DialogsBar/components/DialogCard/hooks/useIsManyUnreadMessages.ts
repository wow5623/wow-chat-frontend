import {useMemo} from 'react';

export const useIsManyUnreadMessages = (countUnreadMessages: number | undefined): boolean => {

    return useMemo(() => {
        return !!countUnreadMessages && countUnreadMessages >= 10;
    }, [countUnreadMessages])

}
