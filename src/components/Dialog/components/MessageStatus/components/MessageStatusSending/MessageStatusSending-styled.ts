import styled, {keyframes} from 'styled-components';

const sendingAnimation = keyframes`
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`

export const MessageStatusSendingStyled = styled.div`
    transform: scale(0.8);
    display: inline-block;
    position: relative;
    width: 25px;
    height: 25px;
    div {
        position: absolute;
        width: 2.5px;
        height: 2.5px;
        background: rgba(255,255,255,0.8);
        border-radius: 50%;
        animation: ${sendingAnimation} 1.2s linear infinite;
    }
    div:nth-child(1) {
        animation-delay: 0s;
        top: 12px;
        left: 21px;
    }
    div:nth-child(2) {
        animation-delay: -0.1s;
        top: 7px;
        left: 20px;
    }
    div:nth-child(3) {
        animation-delay: -0.2s;
        top: 3.5px;
        left: 16.5px;
    }
    div:nth-child(4) {
        animation-delay: -0.3s;
        top: 2px;
        left: 12px;
    }
    div:nth-child(5) {
        animation-delay: -0.4s;
        top: 3.5px;
        left: 7px;
    }
    div:nth-child(6) {
        animation-delay: -0.5s;
        top: 7px;
        left: 3.5px;
    }
    div:nth-child(7) {
        animation-delay: -0.6s;
        top: 12px;
        left: 2px;
    }
    div:nth-child(8) {
        animation-delay: -0.7s;
        top: 16.5px;
        left: 3.5px;
    }
    div:nth-child(9) {
        animation-delay: -0.8s;
        top: 20px;
        left: 7px;
    }
    div:nth-child(10) {
        animation-delay: -0.9s;
        top: 21px;
        left: 12px;
    }
    div:nth-child(11) {
        animation-delay: -1s;
        top: 20px;
        left: 16.5px;
    }
    div:nth-child(12) {
        animation-delay: -1.1s;
        top: 16.5px;
        left: 20px;
    }

`
