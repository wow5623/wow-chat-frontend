import {TApiMethod, TServiceMethod} from '../types';

export const serviceMethodWithAuth = (
    _target: object,
    _method: string,
    descriptor: TypedPropertyDescriptor<TServiceMethod>,
): void => {
    const originalMethod = descriptor.value;

    if (!originalMethod) {
        throw new Error('Service метод не найден!')
    }

    descriptor.value = async function (params) {

        if (!params?.token) {
            return await originalMethod.call(this, params);
        }

        return await originalMethod!.call(this, {
            ...params,
            headers: {
                Authorization: `Bearer ${params?.token}`,
            },
        });
    };
};
