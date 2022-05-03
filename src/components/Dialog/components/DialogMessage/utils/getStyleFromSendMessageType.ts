import {ESendMessage, TStyleKeyFromSendMessage} from '../types';
import {StylesMessageFromDictionary, StylesMessageToDictionary} from '../constants';

export type TGetStyleFromSendMessageProps = {
    send: ESendMessage,
    styleKey: TStyleKeyFromSendMessage
}

export const getStyleFromSendMessageType = ({send, styleKey}: TGetStyleFromSendMessageProps) => {
    switch (send) {
        case ESendMessage.To:
            return StylesMessageToDictionary.get(styleKey);
        case ESendMessage.From:
            return StylesMessageFromDictionary.get(styleKey);
    }
}
