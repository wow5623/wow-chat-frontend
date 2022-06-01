import React from 'react';
import { Styled } from './MessageStatusRead-styled';
import MessageReadIcon from '../../../../../../assets/icons/message-read.svg';

export const MessageStatusRead: React.FC = () => {

    return (
        <Styled.Wrapper>
            <Styled.Icon src={MessageReadIcon}/>
        </Styled.Wrapper>
    )

}
