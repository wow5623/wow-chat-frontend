import React from 'react';
import {Styled} from './DialogMessage-styled';
import {ESendMessage} from './types';
import {MessageStatus} from '../MessageStatus/MessageStatus';
import {useMessageStatus} from './hooks/useMessageStatus';
import {TMyMessage} from '../../../../store/models/messages/types';
import {useMessageSendTime} from '../../../../hooks/useMessageSendTime';

interface IDialogMessage {
    send: ESendMessage
    message: TMyMessage
}

export const DialogMessage: React.FC<IDialogMessage> = ({send, message}) => {

    const messageStatus = useMessageStatus(message);
    const sendTime = useMessageSendTime(message?.createdTime);

    return (
        <Styled.Wrapper send={send}>
            <Styled.InnerInfo send={send}>
                <Styled.MessageText send={send}>
                    {message.text}
                </Styled.MessageText>
                <Styled.SendTime send={send}>
                    {sendTime}
                </Styled.SendTime>
            </Styled.InnerInfo>
            {
                send === ESendMessage.To && (
                    <MessageStatus messageStatus={messageStatus}/>
                )
            }
        </Styled.Wrapper>
    )
}
