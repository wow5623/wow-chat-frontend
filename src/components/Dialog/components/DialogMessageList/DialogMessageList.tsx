import React, {useEffect, useRef} from 'react';
import {Styled} from './DialogMessageList-styled';
import {DialogMessage} from '../DialogMessage/DialogMessage';
import {ESendMessage} from '../DialogMessage/types';
import {useStore} from 'effector-react';
import {$myMessages} from '../../../../store/models/messages';

export const DialogMessageList: React.FC = () => {

    const messages = useStore($myMessages);
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({
            behavior: 'auto'
        })
    }, [bottomRef, messages])

    return (
        <Styled.Wrapper>
            <Styled.MessagesContainer>
                {
                    messages?.map(message => {
                        return (
                            <DialogMessage key={message?.id} send={message?.isMyMessage ? ESendMessage.To : ESendMessage.From} message={message}/>
                        )
                    })
                }
            </Styled.MessagesContainer>
            <div ref={bottomRef}/>
        </Styled.Wrapper>
    );
};
