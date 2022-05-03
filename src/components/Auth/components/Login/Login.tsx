import React from 'react';
import {Formik} from 'formik';
import {Button, Input} from 'antd';
import {ClearOutlined, KeyOutlined, LoginOutlined, MailOutlined} from '@ant-design/icons';
import {Styled as AuthStyled} from '../../Auth-styled';
import {loginUserEvent, loginUserFx} from '../../../../store/models/auth';
import {useStore} from 'effector-react';
import * as Yup from 'yup';
import {useFormItemValidateStatusCallback} from '../../hooks/useFormItemValidateStatus';

const LOGIN_INITIAL_VALUES = {
    email: '',
    password: '',
}

const LOGIN_VALIDATION_SCHEMA = Yup.object().shape({
    email: Yup.string().email('Некорректный email').required('Введите email'),
    password: Yup.string().required('Введите пароль'),
});

export const Login: React.FC = () => {

    const loginPending = useStore(loginUserFx.pending);
    const handleFormItemValidateStatus = useFormItemValidateStatusCallback();

    return (
        <AuthStyled.FormContentWrapper>
            <Formik
                initialValues={LOGIN_INITIAL_VALUES}
                validationSchema={LOGIN_VALIDATION_SCHEMA}
                onSubmit={(values, actions) => {
                    console.group('User credentials')
                        console.log('Email', values.email);
                        console.log('Password', values.password);
                    console.groupEnd()

                    loginUserEvent({
                        email: values.email,
                        password: values.password,
                    })

                    actions.resetForm();
                }}
            >
                {
                    formikProps => (
                        <AuthStyled.FormFields onFinish={formikProps.submitForm} layout={'vertical'}>
                            <AuthStyled.FormItem
                                label={'Email'}
                                validateStatus={handleFormItemValidateStatus(formikProps.touched.email ? formikProps.errors.email : undefined)}
                                help={formikProps.touched.email ? formikProps.errors.email : undefined}
                                required={true}
                            >
                                <Input
                                    size="large"
                                    placeholder="Введите email"
                                    name={'email'}
                                    prefix={<MailOutlined />}
                                    onBlur={formikProps.handleBlur}
                                    onChange={formikProps.handleChange}
                                    value={formikProps.values.email}
                                />
                            </AuthStyled.FormItem>
                            <AuthStyled.FormItem
                                label={'Пароль'}
                                validateStatus={handleFormItemValidateStatus(formikProps.touched.password ? formikProps.errors.password : undefined)}
                                help={formikProps.touched.password ? formikProps.errors.password : undefined}
                                required={true}
                            >
                                <Input.Password
                                    size="large"
                                    placeholder="Введите пароль"
                                    name={'password'}
                                    prefix={<KeyOutlined />}
                                    onBlur={formikProps.handleBlur}
                                    onChange={formikProps.handleChange}
                                    value={formikProps.values.password}
                                />
                            </AuthStyled.FormItem>
                            <AuthStyled.FormActions>
                                <Button
                                    type="primary"
                                    shape="round"
                                    icon={<ClearOutlined />}
                                    size={'large'}
                                    onClick={() => {
                                        formikProps.resetForm()
                                    }}
                                    disabled={!formikProps.dirty || loginPending}
                                    danger
                                />
                                <AuthStyled.FormSubmitButton
                                    type="primary"
                                    shape="round"
                                    icon={<LoginOutlined />}
                                    size={'large'}
                                    htmlType={'submit'}
                                    loading={loginPending}
                                    disabled={!formikProps.isValid}
                                >
                                    Войти
                                </AuthStyled.FormSubmitButton>
                            </AuthStyled.FormActions>
                        </AuthStyled.FormFields>
                    )
                }
            </Formik>
        </AuthStyled.FormContentWrapper>
    )
}
