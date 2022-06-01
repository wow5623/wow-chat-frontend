import React from 'react';
import { Styled } from './ConfirmEmail-styled';
import {Button, Result} from 'antd';
import {Navigate, useNavigate} from 'react-router-dom';
import {MailTwoTone} from '@ant-design/icons';
import {$isAuth, $userInfo, logoutUserEvent} from '../../store/models/auth';
import {useStore} from 'effector-react';

export const ConfirmEmail: React.FC = () => {

    const isAuth = useStore($isAuth);
    const userInfo = useStore($userInfo);

    const handleLogoutUser = () => {
        logoutUserEvent();
    }

    if (!isAuth) {
        return (
            <Navigate to={'/auth'}/>
        )
    }

    if (!!userInfo?.isEmailActivated) {
        return (
            <Navigate to={'/profile'}/>
        )
    }

    return (
        <Styled.Wrapper>
            <Result
                status="info"
                icon={<MailTwoTone/>}
                title="Подтвердите email"
                subTitle="На вашу почту было отправлено письмо со ссылкой на активацию аккаунта"
                extra={
                    <Button type="primary" onClick={handleLogoutUser} danger>Выйти из аккаунта</Button>
                }
            />
        </Styled.Wrapper>
    )

}
