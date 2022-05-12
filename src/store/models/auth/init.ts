import {forward, guard, sample} from 'effector';
import {
    $accessToken,
    $isAuth,
    $loginData,
    $registerData,
    $userInfo,
    isAuthApi,
    loginUserEvent,
    loginUserFx,
    logoutUserEvent,
    registerUserEvent,
    registerUserFx,
    resetAccessTokenEvent,
    resetUserInfoEvent,
    validateTokenEvent,
    validateTokenFx
} from './index';
import {persist} from 'effector-storage/local';

forward({
    from: registerUserEvent,
    to: $registerData,
})

guard({
    source: $registerData,
    clock: registerUserEvent,
    filter: $isAuth.map($isAuth => !$isAuth),
    target: registerUserFx,
})

sample({
    clock: registerUserFx.doneData,
    fn: (data) => {
        return {
            ...data.user
        }
    },
    target: $userInfo,
})

sample({
    clock: registerUserFx.doneData,
    fn: (data) => data.accessToken,
    target: $accessToken,
})

forward({
    from: registerUserFx.done,
    to: isAuthApi.login,
})

forward({
    from: loginUserEvent,
    to: loginUserFx,
})

guard({
    source: $loginData,
    clock: loginUserEvent,
    filter: $isAuth.map($isAuth => !$isAuth),
    target: loginUserFx,
})

sample({
    clock: loginUserFx.doneData,
    fn: (data) => data.user,
    target: $userInfo,
})

sample({
    clock: loginUserFx.doneData,
    fn: (data) => data.accessToken,
    target: $accessToken,
})

forward({
    from: loginUserFx.done,
    to: isAuthApi.login,
})

sample({
    clock: logoutUserEvent,
    target: [resetUserInfoEvent, resetAccessTokenEvent, isAuthApi.logout]
})

persist({
    store: $accessToken,
    key: 'accessToken'
})

forward({
    from: validateTokenEvent,
    to: validateTokenFx
})

sample({
    clock: validateTokenFx.doneData,
    fn: (data) => data.user,
    target: $userInfo,
})

sample({
    clock: validateTokenFx.doneData,
    fn: (data) => data.accessToken,
    target: $accessToken,
})

forward({
    from: validateTokenFx.done,
    to: isAuthApi.login,
})

sample({
    clock: validateTokenFx.fail,
    target: [resetUserInfoEvent, resetAccessTokenEvent, isAuthApi.logout]
})
