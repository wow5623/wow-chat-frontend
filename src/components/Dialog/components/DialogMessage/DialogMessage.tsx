import React from 'react';
import {Styled} from './DialogMessage-styled';
import {ESendMessage} from './types';
import {MessageStatus} from '../MessageStatus/MessageStatus';
import {EMessageStatus} from '../MessageStatus/types';

interface IDialogMessage {
    send: ESendMessage
    text: string
}

export const DialogMessage: React.FC<IDialogMessage> = ({send, text}) => {

    return (
        <Styled.Wrapper send={send}>
            <Styled.InnerInfo send={send}>
                <Styled.MessageText send={send}>
                    {text}
                </Styled.MessageText>
                <Styled.SendTime>
                    17:03
                </Styled.SendTime>
            </Styled.InnerInfo>
            {
                send === ESendMessage.To && (
                    <MessageStatus messageStatus={EMessageStatus.Sending}/>
                )
            }
        </Styled.Wrapper>
    )
}
