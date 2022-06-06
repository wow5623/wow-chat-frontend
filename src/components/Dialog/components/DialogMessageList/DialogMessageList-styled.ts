import styled from 'styled-components';
import ChatBackgroundImage from '../../../../assets/images/chat-background.png'

const Wrapper = styled.div`
    width: 100%;
    background: url(${ChatBackgroundImage}), rgba(56, 46, 89, 0.6);
    background-size: cover;
    background-blend-mode: darken;
    padding: 20px 7px 20px 20px;
    overflow-y: scroll;
    flex-grow: 1;
  
    display: flex;
    flex-direction: column;
    
`

const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: end;
    flex: 1 1 auto;
`

export const Styled = {
    Wrapper,
    MessagesContainer
}

