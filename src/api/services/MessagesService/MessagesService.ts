import {Api} from '../../Api';
import {serviceMethodWithAuth} from '../../decorators/serviceMethodWithAuth';
import {TServiceRequest} from '../../types';
import {
    TCreateMessageRequest,
    TCreateMessageResponse,
    TGetAllMessagesByDialogRequest,
    TGetAllMessagesByDialogResponse,
    TMarkMessagesAsReadRequest
} from './types';

export class MessagesService extends Api {

    private readonly serviceUrl = 'messages/';

    @serviceMethodWithAuth
    async getAllMessagesByDialog(props: TServiceRequest & TGetAllMessagesByDialogRequest): Promise<TGetAllMessagesByDialogResponse> {
        return this.read<TGetAllMessagesByDialogResponse>(this.getServiceEndpoint(this.serviceUrl, 'getAllMessagesByDialog', props.dialogId), {
            headers: props.headers,
        })
    }

    @serviceMethodWithAuth
    async createMessage(props: TServiceRequest & TCreateMessageRequest): Promise<TCreateMessageResponse> {
        return this.create<TCreateMessageResponse>(this.getServiceEndpoint(this.serviceUrl, 'createMessage'), {
            headers: props.headers,
            body: {
                dialogId: props.dialogId,
                text: props.text,
            }
        })
    }

    @serviceMethodWithAuth
    async markMessagesAsRead(props: TServiceRequest & TMarkMessagesAsReadRequest): Promise<void> {
        return this.update<void>(this.getServiceEndpoint(this.serviceUrl, 'markMessagesAsRead'), {
            headers: props.headers,
            body: {
                messagesIds: props.messagesIds,
                dialogId: props.dialogId,
            }
        })
    }

}
