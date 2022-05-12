import styled from 'styled-components';
import {Colors} from '../../theme/colors';

const Wrapper = styled.div`
    width: 100%;
    position: relative;
`

const SearchInputWrapper = styled.div`
    width: 100%;
    padding: 15px;
    background-color: ${Colors.extraDark};
`

const SearchResultsWrapper = styled.div`
    position: absolute;
    top: 110px;
    width: 100%;
    height: 700px;
    padding: 0 15%;
`

const SearchResultsBoxWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  &:before {
    content: '';
    display: block;
    position: relative;
    bottom: 30px;
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid ${Colors.dark};
    align-self: center;
  }
`


const SearchResultsBox = styled.div`
    margin-top: -30px;
    background-color: ${Colors.dark};
    height: 100%;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
`

const UsersLoaderWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Styled = {
    Wrapper,
    SearchInputWrapper,
    SearchResultsWrapper,
    SearchResultsBoxWrapper,
    SearchResultsBox,
    UsersLoaderWrapper
}
