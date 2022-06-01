import {Styled} from './Profile-styled';
import {useStore} from 'effector-react';
import {$isAuth, $userInfo, logoutUserEvent} from '../../store/models/auth';
import {Navigate} from 'react-router-dom';
import {useUserNameFontSize} from './hooks/useUserNameFontSize';
import React, {useState} from 'react';
import {EProfileMode} from './types';
import {Button} from 'antd';
import {ScreenWrapper} from '../ScreenWrapper/ScreenWrapper';
import {UsersSearch} from '../UsersSearch/UsersSearch';
import {Helmet} from 'react-helmet';

export const Profile = () => {

    const userInfo = useStore($userInfo)
    const isAuth = useStore($isAuth)
    const userNameFontSize = useUserNameFontSize(userInfo?.name);

    const [profileMode, setProfileMode] = useState<EProfileMode>(EProfileMode.Info)

    const handleSwitchProfileMode = () => {
        setProfileMode(prevProfileMode => prevProfileMode === EProfileMode.Settings ? EProfileMode.Info : EProfileMode.Settings)
    }

    const logoutUser = () => {
        logoutUserEvent()
    }

    if (!userInfo || !isAuth) {
        return (
            <Navigate to={'/auth/login'}/>
        )
    }

    if (!userInfo?.isEmailActivated) {
        console.log(userInfo);
        return (
            <Navigate to={'/confirm_email'}/>
        )
    }

    return (
        <ScreenWrapper>
            <Helmet>
                <title>
                    Профиль
                </title>
            </Helmet>
            <Styled.Outer>
                <Styled.SearchWrapper>
                    <UsersSearch/>
                </Styled.SearchWrapper>
                <Styled.Wrapper>
                    <Styled.ContentWrapper>
                        <Styled.Content>
                            {
                                profileMode === EProfileMode.Info && (
                                    <>
                                        <Styled.UserName fontSize={userNameFontSize}>
                                            {userInfo?.name}
                                        </Styled.UserName>
                                        <Styled.UserEmail>
                                            {userInfo?.email}
                                        </Styled.UserEmail>
                                    </>
                                )
                            }
                            {
                                profileMode === EProfileMode.Settings && (
                                    <>
                                        <Button type="primary" danger size={'large'} onClick={logoutUser}>
                                            Выйти из аккаунта
                                        </Button>
                                    </>
                                )
                            }
                        </Styled.Content>
                        <Styled.ProfileModeButton profileMode={profileMode} onClick={handleSwitchProfileMode}/>
                    </Styled.ContentWrapper>
                </Styled.Wrapper>
            </Styled.Outer>
        </ScreenWrapper>
    )
}
