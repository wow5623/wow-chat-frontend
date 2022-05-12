import {Api} from '../../Api';
import {TGetAllUsersResponse} from './types';
import {serviceMethodWithAuth} from '../../decorators/serviceMethodWithAuth';
import {TServiceRequest} from '../../types';

export class UsersService extends Api {

    private readonly serviceUrl = 'users/';

    @serviceMethodWithAuth
    async getAllUsers(props: TServiceRequest): Promise<TGetAllUsersResponse> {
        return this.read<TGetAllUsersResponse>(this.getServiceEndpoint(this.serviceUrl, 'getAllUsersExpectMe'), {
            headers: props.headers,
        })
    }

}
