import {useCallback} from 'react';

export const useFormItemValidateStatusCallback = () => {

    return useCallback((error: string | undefined) => {
        if (!error) {
            return 'success'
        }
        return 'error'
    }, [])

}
