import styled from 'styled-components';
import {Form} from 'formik';

const Wrapper = styled.div`
    margin: 100px 0;
    width: 100%;
`

const FormStyled = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
`

export const Styled = {
    Wrapper,
    FormStyled
}
