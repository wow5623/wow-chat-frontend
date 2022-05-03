import React, {memo} from 'react';
import {Styled} from './Auth-styled';
import {Login} from './components/Login/Login';
import {Register} from './components/Register/Register';
import Typography from 'antd/lib/typography';
import {Link, Navigate} from 'react-router-dom';
import {useStore} from 'effector-react';
import {$isAuth} from '../../store/models/auth';

interface IAuth {
    authFlow: 'login' | 'register'
}

export const Auth: React.FC<IAuth> = memo(({authFlow}) => {

    const isAuth = useStore($isAuth);

    if (isAuth) {
        return (
            <Navigate to={'/profile'}/>
        )
    }

    return (
        <Styled.Wrapper>
            <Styled.Content>
                <Styled.TitleWrapper>
                    <Styled.AuthTitle level={1}>
                        {
                            authFlow === 'login' && 'Вход'
                        }
                        {
                            authFlow === 'register' && 'Регистрация'
                        }
                    </Styled.AuthTitle>
                </Styled.TitleWrapper>
                <Styled.FormWrapper>
                    {
                        authFlow === 'login' && (
                            <Login/>
                        )
                    }
                    {
                        authFlow === 'register' && (
                            <Register/>
                        )
                    }
                </Styled.FormWrapper>
                <Styled.LinkWrapper>
                    {
                        authFlow === 'login' && (
                            <>
                                <Typography.Text>
                                    Ещё не с нами?
                                </Typography.Text>
                                <Link to={'/auth/register'}>
                                    <Styled.LinkStyled>
                                        Зарегистрироваться
                                    </Styled.LinkStyled>
                                </Link>
                            </>
                        )
                    }
                    {
                        authFlow === 'register' && (
                            <>
                                <Typography.Text>
                                    Уже зарегистрированы?
                                </Typography.Text>
                                <Link to={'/auth/login'}>
                                    <Styled.LinkStyled>
                                        Войти
                                    </Styled.LinkStyled>
                                </Link>
                            </>
                        )
                    }
                </Styled.LinkWrapper>
            </Styled.Content>
        </Styled.Wrapper>
    )

})
