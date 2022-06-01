import {Effect} from 'effector';

export type TRegisterData = {
    email: string,
    password: string,
    name: string,
}

export type TLoginData = {
    email: string,
    password: string,
}

export type TUserInfo = {
    id: string,
    email: string,
    name: string,
    isEmailActivated: string,
}

export namespace NCreateEffectWithAuthToken {
    export type TEffectParam<P, R, E> = Effect<TEffectParamParams<P>, R, E>
    export type TEffectResult<P, R, E> = Effect<P, R, E>
    export type TEffectParamParams<P> = {params: P, token: string}
}
