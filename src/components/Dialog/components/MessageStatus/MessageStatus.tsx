import React from 'react';
import {EMessageStatus} from './types';
import {MessageStatusSending} from './components/MessageStatusSending/MessageStatusSending';
import {MessageStatusDerived} from './components/MessageStatusDerived/MessageStatusDerived';
import {MessageStatusRead} from './components/MessageStatusRead/MessageStatusRead';

interface IMessageStatus {
    messageStatus: EMessageStatus;
}

export const MessageStatus: React.FC<IMessageStatus> = ({messageStatus}) => {
    if (messageStatus === EMessageStatus.Sending) {
        return <MessageStatusSending/>
    }
    if (messageStatus === EMessageStatus.Delivered) {
        return <MessageStatusDerived/>
    }
    if (messageStatus === EMessageStatus.Read) {
        return <MessageStatusRead/>
    }
    return null;
}
