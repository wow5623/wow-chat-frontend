import React from 'react';
import { Styled } from './NotFound-styled';
import {Button, Result} from 'antd';
import {useNavigate} from 'react-router-dom';

export const NotFound: React.FC = () => {

    const navigate = useNavigate();

    const handleHomeBack = () => {
        navigate('');
    }

    return (
        <Styled.Wrapper>
            <Result
                status="404"
                title="404"
                subTitle="Простите, такой страницы не существует"
                extra={
                    <Button type="primary" onClick={handleHomeBack}>На главную страницу</Button>
                }
            />
        </Styled.Wrapper>
    )

}
