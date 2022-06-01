import React from 'react';
import { Styled } from './MessageStatusDerived-styled';
import MessageDerivedIcon from '../../../../../../assets/icons/message-derived.svg';

export const MessageStatusDerived: React.FC = () => {

    return (
        <Styled.Wrapper>
            <Styled.Icon src={MessageDerivedIcon}/>
        </Styled.Wrapper>
    )

}
