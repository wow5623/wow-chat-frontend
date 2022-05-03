import styled from 'styled-components';
import {Colors} from '../../theme/colors';

const THEME_SWITCHER_Z_INDEX = 100000000;

export const Wrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: ${THEME_SWITCHER_Z_INDEX};
    display: flex;
    gap: 10px;
`

export const Text = styled.div`
    color: ${Colors.secondary}
`


export const Styled = {
    Wrapper,
    Text
}
