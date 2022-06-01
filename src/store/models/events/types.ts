import {EventsService} from '../../../api/services/EventsService/EventsService';
import {TKeyPair} from '../../../crypto/types';

export type TKeys = TKeyPair & {
    deriveKey?: CryptoKey
}

export type TDialogJointFxProps = {service: EventsService | null, dialogId: string};


export type TDialogsMeKeys = {
    [key: string]: TKeys
}

