import React from 'react';
import {Styled} from './DialogHeader-styled';

export const DialogHeader: React.FC = () => {
    return (
        <Styled.Wrapper>
            <Styled.UserAvatar size="large" >
                W
            </Styled.UserAvatar>
            <Styled.UserName level={4}>
                Wow5623
            </Styled.UserName>
        </Styled.Wrapper>
    );
};
