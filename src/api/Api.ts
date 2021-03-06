import axios, {AxiosInstance} from 'axios';
import {TApiMethodMutableConfig, TApiMethodUnMutableConfig, TServiceRequest} from './types';
import {apiMethod} from './decorators/apiMethod';

export class Api {

    private readonly baseUrl = 'http://127.0.0.1:7777/';

    private apiInstance: AxiosInstance = axios;

    constructor() {
        this.apiInstance = axios.create({
            baseURL: this.baseUrl
        })
    }

    @apiMethod
    protected async read<R>(url: string, config?: TServiceRequest & TApiMethodUnMutableConfig): Promise<R> {
        return await this.apiInstance.get(url, {
            params: config?.queryParams ?? {},
            headers: config?.headers ?? {},
        })
    }

    @apiMethod
    protected async create<R>(url: string, config?: TServiceRequest & TApiMethodMutableConfig): Promise<R> {
        return await this.apiInstance.post(url, config?.body ?? {}, {
            params: config?.queryParams,
            headers: config?.headers ?? {},
        })
    }

    @apiMethod
    protected async update<R>(url: string, config?: TServiceRequest & TApiMethodMutableConfig): Promise<R> {
        return await this.apiInstance.put(url, config?.body ?? {}, {
            params: config?.queryParams,
            headers: config?.headers ?? {},
        })
    }

    @apiMethod
    protected async delete<R>(url: string, config?: TServiceRequest & TApiMethodUnMutableConfig): Promise<R> {
        return await this.apiInstance.delete(url, {
            params: config?.queryParams ?? {},
            headers: config?.headers ?? {},
        })
    }

    protected getServiceEndpoint(serviceUrl: string, endpointUrl: string, uriParam?: string) {
        return `${serviceUrl}${endpointUrl}${uriParam ? '/' + uriParam : ''}`;
    }

}
