import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Button } from 'antd';
import { HeartOutlined, FrownOutlined} from '@ant-design/icons';
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

function RecommendFeedbackPage(props) {
    const [clicked, setClicked] = useState(false);
    const onClickToSubmitFeedback = e => {
        setClicked(true);
        let fb = {
            'user_id' : props.user.userData._id,
            'feedback' : e.target.value
        }
        console.log('feed-back', fb)
        axios.post('/api/recommend-feedback/', fb)
            .then(response => {
                if(response.data.submitSuccess) {

                }
            })
    }
    useEffect(()=>{

    }, [])


    return (
        <>
            <Header/>
            <Navigation/>
            <div className="box">
                <div className="app">
                    <h1>피드백 남겨주기</h1>
                    <br/>

                    <br/>
                    {
                        clicked
                            ? <h3>소중한 피드백 감사합니다</h3>
                            : <>
                                <h2>저희 추천 아이템이 마음에 드셨나요?</h2>
                                <br/>
                                <br/>
                                <div className="button-list" style={{"width": "400px","display":"flex", "justifyContent":"space-evenly"}}>
                                    <Button size='large'
                                            onClick={onClickToSubmitFeedback}
                                            value="good"
                                            style={{"height":"120%","fontSize":"150%"}}
                                            icon={<HeartOutlined style={{"color":"red"}}/>}>
                                        GOOD</Button>
                                    <Button size='large'
                                            onClick={onClickToSubmitFeedback}
                                            value="bad"
                                            style={{"height":"120%","fontSize":"150%"}}
                                            icon={<FrownOutlined style={{"color":"blue",}}
                                            />}>
                                        BAD</Button>
                                </div>
                            </>

                    }

                </div>
            </div>
            <Footer/>
        </>
    )
}
export default RecommendFeedbackPage;