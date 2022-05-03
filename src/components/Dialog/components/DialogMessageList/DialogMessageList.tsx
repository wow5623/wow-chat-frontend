import React from 'react';
import {Styled} from './DialogMessageList-styled';
import {DialogMessage} from '../DialogMessage/DialogMessage';
import {ESendMessage} from '../DialogMessage/types';
import {useStore} from 'effector-react';
import {$messages} from '../../../../store/models/messages';

export const DialogMessageList: React.FC = () => {

    const messages = useStore($messages);

    return (
        <Styled.Wrapper>
            <Styled.MessagesContainer>
                {
                    messages.map(message => {
                        return (
                            <DialogMessage send={ESendMessage.To} text={message}/>
                        )
                    })
                }
            </Styled.MessagesContainer>
        </Styled.Wrapper>
    );
};
