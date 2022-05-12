import styled from 'styled-components';
import {Colors} from '../../../../theme/colors';

const Wrapper = styled.div`
    width: 100%;
    padding: 10px 20px;
    position: relative;
  
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: ${Colors.extraDark};
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const UserName = styled.div`
    font-weight: bold;
    color: ${Colors.secondary};
    font-size: 18px;
`

const UserEmail = styled.div`
    font-style: italic;
    color: #ccc;
    font-size: 16px;
`

export const Styled = {
    Wrapper,
    UserName,
    UserEmail,
    UserInfo
}
