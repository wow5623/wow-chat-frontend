import {attach} from 'effector';
import {NCreateEffectWithAuthToken} from './types';
import {$accessToken} from './index';

export const createEffectWithAuthToken = <P, R, E = Error>(
    effect: NCreateEffectWithAuthToken.TEffectParam<P, R, E>,
): NCreateEffectWithAuthToken.TEffectResult<P, R, E> => {
    return attach({
        effect,
        source: $accessToken,
        mapParams: (params, token) => {
            if (!token) throw new Error('Вы не авторизованы!');
            return {params, token} as NCreateEffectWithAuthToken.TEffectParamParams<P>;
        },
    });
};
