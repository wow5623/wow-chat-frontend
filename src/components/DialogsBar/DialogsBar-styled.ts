import styled from 'styled-components';
import {Colors} from '../../theme/colors';

interface IUnacceptedDialogs {
    topOffset: number
}

export const Wrapper = styled.div`
    height: 100vh;
    width: 496px;
    background-color: ${Colors.extraDark};
    display: flex;
    flex-direction: column;
`

export const DialogsSearch = styled.div`
    width: 100%;
    background-color: ${Colors.extraDark};
    padding: 15px;
`

export const Styled = {
    Wrapper,
    DialogsSearch,
}
