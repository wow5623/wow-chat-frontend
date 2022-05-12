import {Api} from '../Api';
import {TApiMethod} from '../types';
import {AxiosResponse} from 'axios';


export const apiMethod = (_target: Api, propertyKey: string, descriptor: TypedPropertyDescriptor<TApiMethod<any>>) => {

    const originalMethod = descriptor.value;

    if (!originalMethod) {
        throw new Error('API метод не найден!')
    }

    descriptor.value = async function (...props){
        const response = await originalMethod.apply(this, props) as AxiosResponse;

        if (!response.data) {
            console.error('Backend не вернул дату!', propertyKey, response.status, response.statusText)
        }

        return response.data;
    }

}
