import React from 'react';
import {MessageStatusSendingStyled} from './MessageStatusSending-styled';

export const MessageStatusSending: React.FC = () => {

    return (
        <MessageStatusSendingStyled>
            {
                [...Array(12)].map(_item => <div/>)
            }
        </MessageStatusSendingStyled>
    )

}
