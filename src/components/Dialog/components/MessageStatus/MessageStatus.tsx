import React from 'react';
import {EMessageStatus} from './types';
import {MessageStatusSending} from './components/MessageStatusSending/MessageStatusSending';

interface IMessageStatus {
    messageStatus: EMessageStatus;
}

export const MessageStatus: React.FC<IMessageStatus> = ({messageStatus}) => {
    if (messageStatus === EMessageStatus.Sending) {
        return <MessageStatusSending/>
    }
    return null;
}
