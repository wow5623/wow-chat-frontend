import styled from 'styled-components';
import {Colors} from '../../../../../../theme/colors';

const Wrapper = styled.div`
  width: 23px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Colors.secondary};
  border-radius: 50%;
`

const Icon = styled.img`
  margin-top: 5px;
  width: 19px;
`

export const Styled = {
    Wrapper,
    Icon
}
