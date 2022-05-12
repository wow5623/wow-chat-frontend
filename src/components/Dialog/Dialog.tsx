import React from 'react';
import {DialogMessageInput} from './components/DialogMessageInput/DialogMessageInput';
import {DialogMessageList} from './components/DialogMessageList/DialogMessageList';
import {DialogHeader} from './components/DialogHeader/DialogHeader';
import { Styled } from './Dialog-styled';
import {Helmet} from 'react-helmet';

export const Dialog: React.FC = () => {
    return (
        <Styled.Wrapper>
            <Helmet>
                <title>
                    Диалог
                </title>
            </Helmet>
            <DialogHeader/>
            <DialogMessageList/>
            <DialogMessageInput/>
        </Styled.Wrapper>
    )
}
