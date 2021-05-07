import React from 'react'
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {Form, Input, Button, Typography, Select, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../_actions/user_actions'
import './SetInfoPage.css'

const { Title } = Typography;

const { Option } = Select;

function SetInfoPage(props) {
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
                    personalColor: '',
                    favoriteCategories:''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        let dataToSubmit = {
                            personalColor: values.personalColor,
                            favoriteCategories: values.favoriteCategories,
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
                            <Form style={{ minWidth: '400px' }} className="info-signup-form" {...formItemLayout} onSubmit={handleSubmit} >
                                <Form.Item
                                    id="pcform"
                                    required
                                    label="Personal Color"
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please select your personal color!' }]}
                                >
                                    <Select placeholder="Please select your personal color">
                                        <Option value="spring">spring</Option>
                                        <Option value="summer">summer</Option>
                                        <Option value="fall">fall</Option>
                                        <Option value="winter">winter</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    id='favCategories'
                                    required
                                    label="Favorite Categories"
                                    rules={[{ required: true, message: 'Please select your favourite categories!', type: 'array' }]}
                                >
                                    <Select mode="multiple" placeholder="Please select favourite categories">
                                        <Option value="Base">Base</Option>
                                        <Option value="Lip">Lip</Option>
                                        <Option value="Hair">Hair</Option>
                                        <Option value="Lens">Lens</Option>
                                        <Option value="Top">Top</Option>
                                        <Option value="Acc">Acc</Option>
                                    </Select>
                                </Form.Item>

                                <br/>
                                <Form.Item >
                                    <Button onClick={handleSubmit} className="info-signup-form-button" type="primary" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        </div>
    )
}
export default SetInfoPage