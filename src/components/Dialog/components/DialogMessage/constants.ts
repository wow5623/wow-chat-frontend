import {TStyleKeyFromSendMessage} from './types';
import {Colors} from '../../../../theme/colors';

export const StylesMessageToDictionary = new Map<TStyleKeyFromSendMessage, string>([
    ['color', Colors.primary],
    ['background-color', Colors.secondary],
    ['align-self', 'end'],
    ['border-radius', '10px 10px 0 10px'],
])

export const StylesMessageFromDictionary = new Map<TStyleKeyFromSendMessage, string>([
    ['color', Colors.secondary],
    ['background-color', Colors.primary],
    ['align-self', 'start'],
    ['border-radius', '0 15px 15px 15px'],
])
