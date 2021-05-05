import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Icon, Form, Input, Button, Typography} from 'antd';
import * as Yup from 'yup'
import { Formik} from 'formik';
import { loginUser } from '../../_actions/user_actions';
import { useDispatch } from 'react-redux'
import './LoginPage.css'

const { Title } = Typography;


function LoginPage(props) {
    const dispatch = useDispatch();
    const [formErrorMessage, setFormErrorMessage] = useState('')

    return (
        <div className="box">
        <Formik 
            initialValues={{
                nickName: '',
                password: ''
            }}
            validationSchema={Yup.object().shape({
                nickName: Yup.string()
                    .required('nickName is required'),
                    password:Yup.string()
                    .min(6, 'Password at least 6 characters')
                    .required('Password is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(()=> {
                    let dataToSubmit = {
                        nickName: values.nickName,
                        password: values.password
                    }

                    dispatch(loginUser(dataToSubmit))
                        .then(response => {
                            console.log(response)
                            if( response.payload.loginSuccess ) {
                                props.history.push('/main'); 
                            } else {
                                setFormErrorMessage('Check out your Account or Password again')
                            }
                        }) .catch(err => {
                            setFormErrorMessage('Check out your Account or Password again')
                                setTimeout(() => {
                                    setFormErrorMessage("")
                                }, 3000);
                            });
                        setSubmitting(false);
                }, 500)
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
                        <br/>
                        <br/>
                        <br/>
                        <Title level={1}>Log In</Title>
                        <br/>
                        <br/>
                        <form onSubmit={handleSubmit}
                        className="login-form" >
                            <Form.Item required>
                            <Input
                                
                                id="nickName"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Enter your NickName"
                                type="text"
                                value={values.nickName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.nickName&& touched.nickName? 'text-input error' : 'text-input'
                                }
                                />
                                {errors.nickName&& touched.nickName&& (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                        </Form.Item>
                        <Form.Item required>
                            <Input
                                id="password"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
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

                        {formErrorMessage && (
                            <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                        )}
                        <br/>
                        <Form.Item> 
                            <div>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                            disabled={isSubmitting} onSubmit={handleSubmit}>
                                Log in
                            </Button>
                            </div>
                            <br/>
                            <div className="form-button">
                                <a href="/signup" style={{color: '#50C2FF', textDecoration:'none'}}> sign up!</a>
                            </div>
                        </Form.Item>
                        </form>
                    </div>
                    );
                }}
                </Formik>
        </div>   
    )
}

export default withRouter(LoginPage)
