import {Api} from '../../Api';
import {serviceMethodWithAuth} from '../../decorators/serviceMethodWithAuth';
import {TServiceRequest} from '../../types';
import {
    TAcceptDialogDto,
    TAcceptDialogResponse,
    TCreateDialogRequest,
    TCreateDialogResponse, TDeleteDialogDto,
    TGetAllMeDialogsResponse, TGetDialogDto, TGetDialogResponse
} from './types';

export class DialogsService extends Api {

    private readonly serviceUrl = 'dialogs/';

    @serviceMethodWithAuth
    async getAllMeDialogs(props: TServiceRequest): Promise<TGetAllMeDialogsResponse> {
        return this.read<TGetAllMeDialogsResponse>(this.getServiceEndpoint(this.serviceUrl, 'getAllMeDialogs'), {
            headers: props.headers,
        })
    }

    @serviceMethodWithAuth
    async getDialog(props: TServiceRequest & TGetDialogDto): Promise<TGetDialogResponse> {
        return this.read<TGetDialogResponse>(this.getServiceEndpoint(this.serviceUrl, 'getDialog', props.dialogId), {
            headers: props.headers,
        })
    }

    @serviceMethodWithAuth
    async createDialog(props: TServiceRequest & TCreateDialogRequest): Promise<TCreateDialogResponse> {
        return this.create<TCreateDialogResponse>(this.getServiceEndpoint(this.serviceUrl, 'createDialog'), {
            headers: props.headers,
            body: {
                companion: props.companion,
                initiatorPublicKey: props.initiatorPublicKey,
            }
        })
    }

    @serviceMethodWithAuth
    async acceptDialog(props: TServiceRequest & TAcceptDialogDto): Promise<TAcceptDialogResponse> {
        return this.create<TCreateDialogResponse>(this.getServiceEndpoint(this.serviceUrl, 'acceptDialog'), {
            headers: props.headers,
            body: {
                dialogId: props.dialogId,
                companionPublicKey: props.companionPublicKey,
            }
        })
    }

    @serviceMethodWithAuth
    async deleteDialog(props: TServiceRequest & TDeleteDialogDto): Promise<void> {
        return this.delete(this.getServiceEndpoint(this.serviceUrl, 'deleteDialog', props.dialogId), {
            headers: props.headers,
        })
    }

}
