import React from 'react'
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {Form, Input, Button, Typography} from 'antd';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../_actions/user_actions'
import './SignUpPage.css'

const { Title } = Typography;

function SignUpPage(props) {
    const dispatch = useDispatch();
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0, },
            sm: { span: 16, offset: 8, },
        },
    };

    return (
        <div className="box">

        <Formik
            initialValues={{
                nickName: '',
                // age: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
                // age: Yup.string()
                //     .required('Age is required'),
                nickName: Yup.string()
                    .required('NickName is required'),
                password: Yup.string()
                    .min(6, 'Password at least 6 characters')
                    .required('Password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm Password is required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                let dataToSubmit = {
                    nickName: values.nickName,
                    password: values.password,
                    // age: values.age
                };
        
                dispatch(signupUser(dataToSubmit))
                    .then(response => {
                        if (response.payload.success) {
                            props.history.push("/login");
                        } else {
                            alert(response.payload.err)
                        }
                    })
                setSubmitting(false);
                }, 500);
            }}
            >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;
                return (
                    <div className="app">
                    <Title level={1}>Sign Up</Title>
                    <br/>
                    <Form style={{ minWidth: '400px' }} className="signup-form" {...formItemLayout} onSubmit={handleSubmit} >
                    <Form.Item required label="NickName" hasFeedback validateStatus={errors.nickName && touched.nickName ? "error" : 'success'}>
                        <Input
                            id="nickName"
                            placeholder="Enter your nickName"
                            type="text"
                            value={values.nickName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                            errors.nickName && touched.nickName ? 'text-input error' : 'text-input'
                            }
                        />
                        {errors.nickName && touched.nickName && (
                            <div className="input-feedback">{errors.nickName}</div>
                        )}
                    </Form.Item>

                    {/* <Form.Item required label="Age">
                        <Input
                            id="age"
                            placeholder="Enter your Age"
                            type="number"
                            value={values.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.age && touched.age ? 'text-input error' : 'text-input'
                            }
                        />
                        {errors.age && touched.age && (
                        <div className="input-feedback">{errors.age}</div>
                    )}
                    </Form.Item> */}
                    
                    <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                        <Input
                            id="password"
                            placeholder="Enter your password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.password && touched.password ? 'text-input error' : 'text-input'
                            }
                        />
                        {errors.password && touched.password && (
                            <div className="input-feedback">{errors.password}</div>
                        )}
                    </Form.Item>

                    <Form.Item required label="Confirm Password" hasFeedback>
                        <Input
                            id="confirmPassword"
                            placeholder="Enter your confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                            errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                        }
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <div className="input-feedback">{errors.confirmPassword}</div>
                        )}
                    </Form.Item>
                    <br/>
                    <Form.Item {...tailFormItemLayout}>
                        <Button onClick={handleSubmit} className="signup-form-button" type="primary" disabled={isSubmitting}>
                            Submit
                        </Button>
                        <br/>
                        <br/>
                        <div className="signin-comment-box">
                            If you already have an account? 
                            <a href="/login" style={{color: '#50C2FF', textDecoration:'none'}}>  Login!</a>
                        </div>
                    </Form.Item>
                    </Form>
                </div>
                );
            }}
            </Formik>
        </div>
    )
}
export default SignUpPage