import {useStore} from 'effector-react';
import {createMessageFx} from '../../../../../store/models/messages';
import {TMyMessage} from '../../../../../store/models/messages/types';
import {EMessageStatus} from '../../MessageStatus/types';
import {useMemo} from 'react';

export const useMessageStatus = (message: TMyMessage): EMessageStatus => {

    const isSending = useStore(createMessageFx.pending);

    return useMemo(() => {

        if (isSending && message.isSending) {
            return EMessageStatus.Sending;
        }

        if (message.isRead) {
            return EMessageStatus.Read;
        }
        else {
            return EMessageStatus.Delivered;
        }

    }, [message, isSending])


}
