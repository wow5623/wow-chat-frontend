import {Api} from '../../Api';

export class UsersService extends Api {

    private readonly serviceUrl = 'users/';

    async getAllUsers() {
        return this.read(this.getServiceEndpoint(this.serviceUrl, 'getAllUsers'))
    }

}
