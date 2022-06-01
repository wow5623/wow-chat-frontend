import {CryptoManager} from '../../../../crypto/CryptoManager';
import {TMessage} from '../types';

export const getDecryptTextPromise = (message: TMessage, deriveKey: CryptoKey, manager: CryptoManager): Promise<TMessage> => {
    return new Promise<TMessage>(async (resolve) => {

        const decryptedMessage = await manager.decryptText(message.text, deriveKey)
        resolve({
            ...message,
            text: decryptedMessage,
        });
    })
}
