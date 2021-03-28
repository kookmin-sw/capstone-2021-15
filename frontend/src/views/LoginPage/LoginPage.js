import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Icon, Form, Input, Button, Typography} from 'antd';
import * as Yup from 'yup'
import { Formik} from 'formik';
import axios from 'axios';
const { Title } = Typography;


function LoginPage(props) {
    const [formErrorMessage, setFormErrorMessage] = useState('')

    return (
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
                        nickName:values.nickName,
                        password: values.password
                    }
                    axios.post('/api/user/login', dataToSubmit)
                        .then(response => {
                            if(response.data.loginSuccess ) {
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
                        handleReset,
                    } = props;
                    return (
                        <div className="app" style={{display:'flex',flexDirection:'column', justifyContent:'center' , alignItems:'center'}}>
                        <br/>
                        <br/>
                        <br/>
                        <Title level={2}>Log In</Title>
                        <br/>
                        <br/>
                        <br/>
                        <form onSubmit={handleSubmit}
                        style={{ width: '400px'}}>
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
                        <br/>
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
                            style={{ minWidth: '40%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                Log in
                            </Button>
                            </div>
                            <br/>
                            Or <a href="/signup">sign up!</a>
                        </Form.Item>
                        </form>
                    </div>
                    );
                }}
                </Formik>
                    
    )
}

export default withRouter(LoginPage)
