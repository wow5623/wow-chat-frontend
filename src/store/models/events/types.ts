import {EventsService} from '../../../api/services/EventsService/EventsService';
import {TKeyPair} from '../../../crypto/types';

export type TDialogJointFxProps = {service: EventsService | null, dialogId: string};

export type TDialogsKeyPairs = {
    [key: string]: TKeyPair
}

