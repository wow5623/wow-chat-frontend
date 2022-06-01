import styled, {css} from 'styled-components';
import {Colors} from '../../../../theme/colors';
import {Avatar, Badge} from 'antd';

interface IWrapper {
    isDialogAccepted: boolean;
}
interface IUserAvatar extends IWrapper {}
interface IUnreadMessagesBadge {
    isManyUnreadMessages?: boolean;
}

const WrapperHover = css`
    transition: background-color ease .4s;
    cursor: pointer;
    &:hover {
      background: ${Colors.softDark};
    }
`

const Wrapper = styled.div<IWrapper>`
    width: 100%;
    background: ${
        ({isDialogAccepted}) =>
                isDialogAccepted
                        ? Colors.dark
                        : `linear-gradient(45deg, #999, #888)`
    };
    box-shadow: 10px 0px 30px rgba(0,0,0,0.16);
    display: flex;
    padding: 10px;
    gap: 10px;

    ${({isDialogAccepted}) => {
      return isDialogAccepted && WrapperHover;
    }}
`

export const UserAvatarWrapper = styled.div`
    flex-basis: 60px;
`

export const UserAvatar = styled(Avatar)<IUserAvatar>`
    background-color: ${({isDialogAccepted}) => isDialogAccepted ? Colors.primary : '#ccc'} !important;
    color: ${Colors.secondary} !important;
`

const Info = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const InfoSectionTop = styled.div`
    display: flex;
    justify-content: space-between;
`

const UserName = styled.div`
    color: ${Colors.secondary};
    font-size: 16px;
`

const AdditionalInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const UnreadMessagesBadge = styled(Badge)<IUnreadMessagesBadge>`
    .ant-badge-count {
      ${
         ({isManyUnreadMessages}) => !isManyUnreadMessages && `background-color: ${Colors.primary};`}
      }
    } 
`

const SendTime = styled.div`
    color: #ccc;
    font-style: italic;
`

const LastMessage = styled.div`
    color: #ccc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-clamp: 3;
    width: 400px;
    gap: 10px;
  
  
`

const DialogAcceptMessage = styled.div`
    display: flex;
    align-items: center;
    color: #ccc;
    gap: 5px;
`

export const Styled = {
    Wrapper,
    UserAvatarWrapper,
    UserAvatar,
    Info,
    InfoSectionTop,
    UserName,
    LastMessage,
    DialogAcceptMessage,
    UnreadMessagesBadge,
    SendTime,
    AdditionalInfo,
}
