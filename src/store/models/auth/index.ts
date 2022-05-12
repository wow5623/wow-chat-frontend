import {createApi, createEffect, createEvent, createStore} from 'effector';
import {NCreateEffectWithAuthToken, TLoginData, TRegisterData, TUserInfo} from './types';
import {AuthService} from '../../../api/services/AuthService/AuthService';
import {TLoginResponse, TRegisterResponse, TValidateTokenResponse} from '../../../api/services/AuthService/types';
import {createEffectWithAuthToken} from './decorators';

export const registerUserEvent = createEvent<TRegisterData>()
export const loginUserEvent = createEvent<TLoginData>()
export const resetAccessTokenEvent = createEvent()
export const resetUserInfoEvent = createEvent()
export const logoutUserEvent = createEvent()
export const validateTokenEvent = createEvent()

export const $isAuth = createStore<boolean>(false);
export const $userInfo = createStore<TUserInfo | null>(null)
    .reset(resetUserInfoEvent)
export const $accessToken = createStore<string | null>(null)
    .reset(resetAccessTokenEvent)

export const $registerData = createStore<TRegisterData | null>(null)
export const $loginData = createStore<TLoginData | null>(null)

export const isAuthApi = createApi($isAuth, {
    login: () => true,
    logout: () => false,
})

export const loginUserFx = createEffect<TLoginData | null, TLoginResponse, Error>(async (loginData) => {

    if (!loginData) {
        throw new Error('Отсутствуют данные для входа в аккаунт!');
    }

    const service = new AuthService();

    return await service.login({
        email: loginData.email,
        password: loginData.password,
    });
})

export const registerUserFx = createEffect<TRegisterData | null, TRegisterResponse, Error>(async (registerData) => {

    if (!registerData) {
        throw new Error('Отсутствуют данные для регистрации нового пользователя!');
    }

    const service = new AuthService();

    return await service.register({
        email: registerData.email,
        password: registerData.password,
        name: registerData.name,
    });
})

export const validateTokenFx = createEffectWithAuthToken<undefined, TValidateTokenResponse, Error>(createEffect(
    async ({token}: NCreateEffectWithAuthToken.TEffectParamParams<undefined>) => {
        const service = new AuthService();
        return await service.validateToken({token})
    }
))

export const $isTokenChecked = createStore<boolean>(false)
    .on(validateTokenFx.finally, () => true);

