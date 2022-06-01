import styled from 'styled-components';
import {Colors} from '../../../../theme/colors';

interface IUnacceptedDialog {
    topOffset: number;
}

const UNACCEPTED_DIALOG_Z_INDEX = 100000000;

const Wrapper = styled.div`
    width: 100%;
    background-color: ${Colors.extraDark};
    overflow-y: scroll;
    flex-grow: 1;
`

const UnacceptedDialog = styled.div<IUnacceptedDialog>`
    position: sticky;
    top: ${({topOffset}) => topOffset}px;
    z-index: ${UNACCEPTED_DIALOG_Z_INDEX};
`

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const NotFoundMessage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${Colors.secondary};
    font-size: 20px;

    .emoji {
      font-size: 35px;
      padding-left: 7px;
    }  
`

export const Styled = {
    Wrapper,
    NotFoundMessage,
    LoaderWrapper,
    UnacceptedDialog,
}
