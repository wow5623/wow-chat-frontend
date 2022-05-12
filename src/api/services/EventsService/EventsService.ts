import {SocketApi} from '../../SocketApi';

export class EventsService extends SocketApi {

    async dialogJoin(dialogId: string) {
        this.socket.emit('DIALOGS:JOIN', dialogId)
    }

}
