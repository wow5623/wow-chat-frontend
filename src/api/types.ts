import {AxiosResponse} from 'axios';

export type TApiMethodConfig = {
    queryParams?: object,
    body?: object,
}

export type TApiMethodMutableConfig = TApiMethodConfig
export type TApiMethodUnMutableConfig = Omit<TApiMethodConfig, 'body'>

export type TApiMethod = <R>(url: string, config?: TApiMethodMutableConfig | TApiMethodUnMutableConfig) => Promise<R>

export type TApiMethodMutable = (url: string, config: TApiMethodMutableConfig) => Promise<AxiosResponse>
export type TApiMethodUnMutable = (url: string, config: TApiMethodUnMutableConfig) => Promise<AxiosResponse>
