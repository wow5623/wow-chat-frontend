import React from 'react';
import {Styled} from './DialogHeader-styled';
import {useNavigate} from 'react-router-dom';
import {Button} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

interface IDialogHeader {
    partnerName: string | undefined;
}

export const DialogHeader: React.FC<IDialogHeader> = ({partnerName}) => {

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1);
    }

    return (
        <Styled.Wrapper>
            <Styled.BackButtonWrapper>
                <Button icon={<ArrowLeftOutlined />} onClick={navigateBack} size={'large'} type={'primary'} shape={'circle'}/>
            </Styled.BackButtonWrapper>
            <Styled.UserInfo>
                <Styled.UserAvatar size="large" >
                    {partnerName?.at(0) || 'Н'}
                </Styled.UserAvatar>
                <Styled.UserName level={4}>
                    {partnerName || 'Неизвестное имя пользователя'}
                </Styled.UserName>
            </Styled.UserInfo>
        </Styled.Wrapper>
    );
};
