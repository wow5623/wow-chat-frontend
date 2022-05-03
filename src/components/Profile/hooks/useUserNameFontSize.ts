import {useMemo} from 'react';

export const useUserNameFontSize = (userName: string | undefined): number => {

    return useMemo(() => {

        if (!userName) {
            return 78;
        }

        if (userName.length > 7) {
            return 60
        }

        if (userName.length > 12) {
            return 50
        }

        if (userName.length > 18) {
            return 40
        }

        return 78
    }, [userName])

}
