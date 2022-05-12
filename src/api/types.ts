import {AxiosRequestHeaders, AxiosResponse} from 'axios';

export type TApiMethodConfig = TServiceRequest & {
    queryParams?: object,
    body?: object,
}

export type TApiMethodMutableConfig = TApiMethodConfig
export type TApiMethodUnMutableConfig = Omit<TApiMethodConfig, 'body'>

export type TApiMethod<Request> = <R extends Request>(url: string, config?: TApiMethodMutableConfig | TApiMethodUnMutableConfig) => Promise<R>

export type TServiceMethod = (props: TServiceRequest & any) => Promise<any>

export type TApiMethodMutable = (url: string, config: TApiMethodMutableConfig) => Promise<AxiosResponse>
export type TApiMethodUnMutable = (url: string, config: TApiMethodUnMutableConfig) => Promise<AxiosResponse>

export type TServiceRequest = {
    token?: string;
    headers?: AxiosRequestHeaders;
};
