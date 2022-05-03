import styled from 'styled-components';
import {ESendMessage} from './types';
import {getStyleFromSendMessageType} from './utils/getStyleFromSendMessageType';
import {Colors} from '../../../../theme/colors';

interface IWrapper {
    send: ESendMessage
}
interface IInnerInfo extends IWrapper {}
interface IMessageText extends IInnerInfo {}

const Wrapper = styled.div<IWrapper>`
  align-self: ${({send}) => getStyleFromSendMessageType({send, styleKey: 'align-self'})};
  display: flex;
  align-items: flex-end;
  gap: 5px;
`

const InnerInfo = styled.div<IInnerInfo>`
  background-color: ${({send}) => getStyleFromSendMessageType({send, styleKey: 'background-color'})};
  border-radius: ${({send}) => getStyleFromSendMessageType({send, styleKey: 'border-radius'})};
  display: flex;
  gap: 7px;
  padding: 4px;
`

const SendTime = styled.span`
   color: ${Colors.dialog.messageSendTime};
   font-style: italic;
   font-size: 12px;
   align-self: end;
`

const MessageText = styled.span<IMessageText>`
   color: ${({send}) => getStyleFromSendMessageType({send, styleKey: 'color'})};
   font-size: 17px;
   padding: 2px 0 2px 5px; 
`

export const Styled = {
    Wrapper,
    InnerInfo,
    SendTime,
    MessageText,
}

