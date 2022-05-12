import styled from 'styled-components';
import {Colors} from '../../../../theme/colors';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    flex-grow: 1;
`

const NotFoundMessage = styled.div`
    width: 100%;
    height: 100%;
    color: ${Colors.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  
    .emoji {
      font-size: 35px;
      padding-left: 7px;
    }
`

export const Styled = {
    Wrapper,
    NotFoundMessage
}
