import styled from 'styled-components';
import AuthBackgroundImage from '../../assets/images/auth-background.jpeg'
import Title from 'antd/lib/typography/Title';
import {Colors} from '../../theme/colors';
import Typography from 'antd/lib/typography';
import {Button, Form} from 'antd';
import {CommonStyled} from '../common/components-styled';

const Wrapper = styled.div`
    background-image: url("${AuthBackgroundImage}");
    background-size: cover;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 100px;
`

const Content = styled.div`
    width: 600px;
    background-color: ${({theme}) => theme.formBackground};
    border-radius: 70px;
    padding: 50px 80px;
    backdrop-filter: blur(100px);
    box-shadow: -15px -15px 100px ${Colors.shadow};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TitleWrapper = styled.div`
  
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
    
    &:before, &:after {
      content: '';
      display: block;
      flex-grow: 1;
      height: 1px;
      background-color: ${Colors.shadow};
      border-radius: 1px;
    }
`

const FormWrapper = styled.div`
    
    width: 100%;
  
    &:after {
      content: '';
      display: block;
      flex-grow: 1;
      height: 1px;
      background-color: ${Colors.shadow};
      border-radius: 1px;
    }
`

const AuthTitle = styled(CommonStyled.TitleStyled)`
    margin: 0 !important;
`

const LinkWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 10px;
`

const LinkStyled = styled(Typography.Link)`
    font-weight: bold;
`

const FormContentWrapper = styled.div`
    margin: 120px 0;
    width: 100%;
`

const FormFields = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
`

const FormItem = styled(CommonStyled.FormItem)`
    margin: 0;
    width: 100%;
`

 const FormActions = styled.div`
   margin-top: 25px;
   display: flex;
   gap: 10px;
 `

const FormSubmitButton = styled(Button)`
    flex-grow: 1;
    width: 100%;
`

export const Styled = {
 Wrapper,
 TitleWrapper,
 AuthTitle,
 Content,
 FormWrapper,
 LinkWrapper,
 LinkStyled,
 FormContentWrapper,
 FormFields,
 FormItem,
 FormActions,
 FormSubmitButton
};
