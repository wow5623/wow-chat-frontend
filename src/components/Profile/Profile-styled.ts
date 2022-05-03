import styled from 'styled-components';
import ChatBackgroundImage from '../../assets/images/chat-background.png'
import {Colors} from '../../theme/colors';
import {EProfileMode} from './types';

interface IUserName {
    fontSize: number;
}
interface IProfileModeButton {
    profileMode: EProfileMode;
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: url(${ChatBackgroundImage}), rgba(56, 46, 89, 0.6);
  background-size: cover;
  background-blend-mode: darken;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
`

const ContentWrapper = styled.div`
  width: 572px;
  height: 472px;
  border: 3px ${Colors.primary} solid;
  border-radius: 50px;
  backdrop-filter: blur(4px);
  background-color: rgba(33, 33, 33, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 27px;
`

const UserName = styled.div<IUserName>`
    font-size: ${({fontSize}) => fontSize}px;
    font-weight: 500;
    color: ${Colors.secondary};
    line-height: 0;
    white-space: nowrap;
`

const UserEmail = styled.span`
  font-size: 29px;
  color: ${Colors.secondary};
  line-height: 0;
  margin-top: 60px;
  font-weight: 300;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 27px;
  
  &:before, &:after {
    content: '';
    display: block;
    flex-grow: 1;
    height: 1px;
    background-color: ${Colors.secondary};
  }
  
  &:before {
    margin-left: 27px;
  }
  
  &:after {
    margin-right: 27px;
  }
`


const ProfileModeButton = styled.div<IProfileModeButton>`
    width: 62px;
    height: 62px;
    border-radius: 50%;
    border: 2px ${Colors.secondary} solid;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color ease 0.35s;
    
    
    &:hover {
      background-color: ${Colors.secondary};
      
      &:after {
        color: ${Colors.primary}
      }
    }
  
    &:after {
      content: '${({profileMode}) => profileMode === EProfileMode.Info ? '...': '←'}';
      display: block;
      color: ${Colors.secondary};
      font-size: 29px;
      line-height: 0;
      margin-bottom: ${({profileMode}) => profileMode === EProfileMode.Info ? 16: 2}px;
      font-weight: 400;

      transition: color ease 0.35s;
    }
`

export const Styled = {
    Wrapper,
    ContentWrapper,
    UserName,
    UserEmail,
    ProfileModeButton,
    Content
}
