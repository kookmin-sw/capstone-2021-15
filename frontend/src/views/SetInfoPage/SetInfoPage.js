import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as Yup from 'yup';
import {Form, Input, Button, Typography, Select, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../_actions/user_actions'
import './SetInfoPage.css'

const { Title } = Typography;

const { Option } = Select;

const Categories = [
    {key:1, value: 'lip'},
    {key:2, value: 'hair-color'},
    {key:3, value: 'shadow'},
    {key:4, value: 'cheek'}
]
const Seasons = [
    {key:1, value: 'spring'},
    {key:2, value: 'summer'},
    {key:3, value: 'fall'},
    {key:4, value: 'winter'}
]

function SetInfoPage(props) {
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
    const [IsMount, setIsMount] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [NickName,setNickName] = useState('')
    const [PersonalColor, setPersonalColor] = useState('')
    const [InterestCategory, setInterestCategory ] = useState([])
    const [userInfo, setUserInfo] = useState({
        season:'',
        interestCategory:''

    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleSubmit = async (event) => {
        setSubmitting(true)
        event.preventDefault()
        await new Promise((r) => setTimeout(r, 1000))

    }

    // const { nickName, season,interestCategory } = userInfo;
    // const onChange = e => {
    //     const { name, value } = e.target;
    //     setUserInfo({
    //         ...userInfo,
    //         [name]: value
    //     });
    // };
    useEffect(() => {

        setNickName(props.user.userData.nickName)
        setPersonalColor(props.user.userData.season)
        setInterestCategory(props.user.userData.interestCategory)

    },[props])





    return (
        <div className="box">
        <div className="app">
            <Title level={1}>My Info</Title>
            <br/>

            <Form onSubmit={handleSubmit} style={{ minWidth: '400px' }} className="info-signup-form" {...formItemLayout} >
                <Form.Item label="Nickname">
                    {/*일단 닉네임 프롭스 빼놨음*/}
                    <span className="ant-form-text">NickName</span>
                </Form.Item>
                <Form.Item
                    id="pcform"
                    required
                    label="Personal Color"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select your personal color!' }]}
                >
                    <Select placeholder="Please select your personal color">
                        {Seasons.map(item => (
                            <Option onChange={handleChange} key={item.key} value={item.value}>{item.value}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    id='favCategories'
                    required
                    label="Favorite Categories"
                    rules={[{ required: true, message: 'Please select your favourite categories!', type: 'array' }]}
                >
                    <Select mode="multiple" placeholder="Please select favourite categories">
                        {Categories.map(item => (
                            <Option onChange={handleChange} key={item.key} value={item.value}>{item.value}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <br/>
                <Form.Item >
                    <Button className="info-signup-form-button" type="primary">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </div>
    )
}
export default SetInfoPage