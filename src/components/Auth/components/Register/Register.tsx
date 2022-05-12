import React from 'react';
import {Styled as AuthStyled} from '../../Auth-styled';
import {Formik} from 'formik';
import {Button} from 'antd';
import {CheckCircleOutlined, ClearOutlined, KeyOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {registerUserEvent, registerUserFx} from '../../../../store/models/auth';
import {useStore} from 'effector-react';
import * as Yup from 'yup';
import {useFormItemValidateStatusCallback} from '../../hooks/useFormItemValidateStatus';
import {CommonStyled} from 'src/components/common/components-styled';
import {Helmet} from 'react-helmet';


const REGISTER_INITIAL_VALUES = {
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
}

const REGISTER_VALIDATION_SCHEMA = Yup.object().shape({
    email: Yup.string().email('Некорректный email').required('Введите email'),
    password: Yup.string().required('Введите пароль'),
    repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать').required('Введите пароль еще раз'),
    name: Yup.string().required('Введите имя'),
});

export const Register: React.FC = () => {

    const registerPending = useStore(registerUserFx.pending);
    const handleFormItemValidateStatus = useFormItemValidateStatusCallback();

    return (
        <AuthStyled.FormContentWrapper>
            <Helmet>
                <title>
                    Регистрация
                </title>
            </Helmet>
            <Formik
                initialValues={REGISTER_INITIAL_VALUES}
                validationSchema={REGISTER_VALIDATION_SCHEMA}
                onSubmit={(values, actions) => {

                    registerUserEvent({
                        email: values.email,
                        password: values.password,
                        name: values.name,
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
                                <CommonStyled.InputStyled
                                    size="large"
                                    placeholder="example@mail.ru"
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
                                <CommonStyled.InputPasswordStyled
                                    size="large"
                                    placeholder="Введите пароль..."
                                    name={'password'}
                                    prefix={<KeyOutlined />}
                                    onBlur={formikProps.handleBlur}
                                    onChange={formikProps.handleChange}
                                    value={formikProps.values.password}
                                />
                            </AuthStyled.FormItem>
                            <AuthStyled.FormItem
                                label={'Повторите пароль'}
                                validateStatus={handleFormItemValidateStatus(formikProps.touched.repeatPassword ? formikProps.errors.repeatPassword : undefined)}
                                help={formikProps.touched.repeatPassword ? formikProps.errors.repeatPassword : undefined}
                                required={true}
                            >
                                <CommonStyled.InputPasswordStyled
                                    size="large"
                                    placeholder="Повторите введенный пароль..."
                                    name={'repeatPassword'}
                                    prefix={<KeyOutlined />}
                                    onBlur={formikProps.handleBlur}
                                    onChange={formikProps.handleChange}
                                    value={formikProps.values.repeatPassword}
                                />
                            </AuthStyled.FormItem>
                            <AuthStyled.FormItem
                                label={'Ваше имя'}
                                validateStatus={handleFormItemValidateStatus(formikProps.touched.name ? formikProps.errors.name : undefined)}
                                help={formikProps.touched.name ? formikProps.errors.name : undefined}
                                required={true}
                            >
                                <CommonStyled.InputStyled
                                    size="large"
                                    placeholder="Введите ваше имя..."
                                    name={'name'}
                                    prefix={<UserOutlined />}
                                    onBlur={formikProps.handleBlur}
                                    onChange={formikProps.handleChange}
                                    value={formikProps.values.name}
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
                                    disabled={!formikProps.dirty || registerPending}
                                    danger
                                />
                                <AuthStyled.FormSubmitButton
                                    type="primary"
                                    shape="round"
                                    icon={<CheckCircleOutlined />}
                                    size={'large'}
                                    htmlType={'submit'}
                                    loading={registerPending}
                                    disabled={!formikProps.isValid}
                                >
                                    Зарегистрироваться
                                </AuthStyled.FormSubmitButton>
                            </AuthStyled.FormActions>
                        </AuthStyled.FormFields>
                    )
                }
            </Formik>
        </AuthStyled.FormContentWrapper>
    )

}
