import styled from 'styled-components';
import {Form, Input, Typography} from 'antd';
import Title from 'antd/lib/typography/Title';

const FormItem = styled(Form.Item)`
    .ant-form-item-label {
      label {
        color: ${({theme}) => theme.typography}
      }
    }
`

const InputStyled = styled(Input)`
    background-color: ${({theme}) => theme.main} !important;
  
    input {
      background-color: ${({theme}) => theme.main};
      color: ${({theme}) => theme.typography};
    }
  
    .anticon {
      svg {
        fill: ${({theme}) => theme.typography};
      }
    }
`

const InputPasswordStyled = styled(Input.Password)`
    background-color: ${({theme}) => theme.main} !important;
  
    input {
      background-color: ${({theme}) => theme.main};
      color: ${({theme}) => theme.typography};
    }
  
    .anticon {
      svg {
        fill: ${({theme}) => theme.typography};
      }
    }
`

export const TitleStyled = styled(Title)`
  color: ${({theme}) => theme.typography} !important;
`

export const TypographyStyled = styled(Typography)`
  color: ${({theme}) => theme.typography} !important;
`

export const CommonStyled = {
    InputStyled,
    InputPasswordStyled,
    TypographyStyled,
    TitleStyled,
    FormItem
}
