import {Api} from '../../Api';
import {TLoginBody, TLoginResponse, TRegisterBody, TRegisterResponse, TValidateTokenResponse} from './types';
import {serviceMethodWithAuth} from '../../decorators/serviceMethodWithAuth';
import {TServiceRequest} from '../../types';

export class AuthService extends Api {

    private readonly serviceUrl = 'auth/';

    async login(body: TLoginBody): Promise<TLoginResponse> {
        return this.create<TLoginResponse>(this.getServiceEndpoint(this.serviceUrl, 'login'), {
            body: body,
        })
    }

    async register(body: TRegisterBody): Promise<TRegisterResponse> {
        return this.create<TRegisterResponse>(this.getServiceEndpoint(this.serviceUrl, 'register'), {
            body: body,
        })
    }

    @serviceMethodWithAuth
    async validateToken(props: TServiceRequest): Promise<TValidateTokenResponse> {
        return this.read<TRegisterResponse>(this.getServiceEndpoint(this.serviceUrl, 'validateToken/'), {
            headers: props.headers
        })
    }

}
