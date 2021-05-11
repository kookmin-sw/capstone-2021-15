import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {Form, Input, Button, Typography, Select, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import {modifyUser} from '../../_actions/user_actions'
import './MyInfoPage.css'
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

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

function MyInfoPage(props) {
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
    const [IsMount, setIsMount] = useState(true)
    const [NickName, setNickName] = useState('')
    const [PersonalColor, setPersonalColor] = useState('')
    const [InterestCategory, setInterestCategory ] = useState([])
    const [userInfo, setUserInfo] = useState({});

    const [form] = Form.useForm();

    const seasonChange = (value) => {
        setPersonalColor(value)

    }
    const categoryChange = (value) => {
        setInterestCategory([value])
    }

    useEffect(() => {
        if (IsMount ){
            setIsMount(false)
        } else {

            setNickName(props.user.userData.nickName)
            setUserInfo(props.user.userData)
            setPersonalColor(props.user.userData.season)
            setInterestCategory(props.user.userData.interestCategory)
            form.setFieldsValue({
                nickName: props.user.userData.nickName,
                interestCategory: props.user.userData.interestCategory,
                season: props.user.userData.season ? props.user.userData.season : '',
            })
        }
    },[props])

    const clickHandler = (data) => {
        dispatch(modifyUser(data))
            .then(response => {
                if(response.payload.modifySuccess) {
                    window.location.reload();
                    alert('정상적으로 수정되었습니다')
                    console.log(response.payload.user)

                } else {
                    alert(response.payload.err)
                }
            })
    }

    return (
        <>
            <Header/>
            <Navigation/>
            <div className="box">
                <div className="app">
                    <h1>나의 정보</h1>
                    <br/>
                    <br/>
                    <br/>
                    <Form form={form}
                           className="myinfo-form">
                        <Form.Item label="닉네임" name="nickName">
                            <Input  placeholder="닉네임" readOnly={true}/>
                        </Form.Item>
                        <Form.Item label="관심 카테고리" name="interestCategory">
                            <Select
                                name="interestCategory"
                                // onChange={(value)=>categoryChange(value)}
                                onChange={categoryChange}
                                style={{fontSize:'2rem', width:'250px', height:'40px'}}>
                                {Categories.map(item => (
                                    <Option key={item.key} value={item.value}>{item.value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="퍼스널 컬러" name="season">
                            <Select
                                // defaultValue="season"
                                // onChange={(value)=>seasonChange(value)}
                                onChange={seasonChange}
                                style={{fontSize:'2rem', width:'250px', height:'40px'}}>
                                {Seasons.map(item => (
                                    <Option key={item.key} value={item.value}>{item.value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <div className="diagnosis-field">
                            <span className="diagnosis-text">내 퍼스널 컬러를 궁금하다면?
                            <Link to="/test" style={{color: '#50C2FF', textDecoration:'none'}}>  진단받기</Link></span>
                        </div>
                        <br/>
                        <Form.Item {...tailFormItemLayout}>
                            <Button
                                onClick={()=>clickHandler({
                                    _id: userInfo._id,
                                    season: PersonalColor,
                                    interestCategory: InterestCategory
                                })}
                                className="modify-form-button"
                                type="primary">
                                수정하기
                            </Button>
                            <br/>
                            <br/>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default MyInfoPage