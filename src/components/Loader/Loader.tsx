import React from 'react';
import { Styled } from './Loader-styled';
import {Spin} from 'antd';

export const Loader: React.FC = () => {
    return (
        <Styled.Wrapper>
            <Spin size={'large'}/>
        </Styled.Wrapper>
    )

}
