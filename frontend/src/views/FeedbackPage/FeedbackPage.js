import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Input, Button } from 'antd';
import { HeartOutlined, FrownOutlined, ArrowRightOutlined} from '@ant-design/icons';
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

function FeedbackPage(props) {
    const { TextArea } = Input;
    // const [colorGood, setColorGood] = useState("white");
    // const [colorBad, setColorBad] = useState("white");
    const [clickedGood, setClickedGood] = useState(false);
    const [clickedBad, setClickedBad] = useState(false);
    const [comment, setComment] = useState('');
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const onClickGoodButton = e => {
        e.preventDefault();
        setClickedGood(true);
        setClickedBad(false);

        setFeedback(e.currentTarget.value);
        console.log(e.currentTarget.value)
    }
    const onClickBadButton = e => {
        e.preventDefault();
        setClickedGood(false);
        setClickedBad(true);

        setFeedback(e.currentTarget.value);
        console.log(e.currentTarget.value)
    }
    const onChangeTextArea = e => {
        e.preventDefault();
        setComment(e.currentTarget.value);
    }
    const onClickToSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
        let fb = {
            'user_id' : props.user.userData._id,
            'feedback' : feedback,
            'comment' : comment,
        }
        console.log('feed-back', fb)
        axios.post('/api/feedback/', fb)
            .then(response => {
                if(response.data.submitSuccess) {

                }
            })
    }

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
                        submitted
                            ? <h3>소중한 피드백 감사합니다</h3>
                            : <>
                                <h2>utopr의 추천 아이템이 마음에 드셨나요?</h2>
                                <br/>
                                <div className="button-list" style={{"width": "400px","display":"flex", "justifyContent":"space-evenly"}}>
                                    <Button
                                            size='large'
                                            onClick={onClickGoodButton}
                                            value="good"
                                            style={{"backgroundColor":clickedGood ? "blue" :"white"}}
                                            icon={<HeartOutlined style={{"color":"red"}}/>}>
                                        GOOD</Button>
                                    <Button
                                            size='large'
                                            onClick={onClickBadButton}
                                            value="bad"
                                            style={{"backgroundColor":clickedBad ?"blue" :"white"}}
                                            icon={<FrownOutlined style={{"color":"blue",}}
                                            />}>
                                        BAD</Button>
                                </div>
                                <br/>
                                <br/>
                                <div className="comments">
                                    <h2>utopr의 퍼스널 컬러는 진단은 어떠셨나요?</h2>
                                    <TextArea showCount
                                        maxLength={100}
                                        onChange={onChangeTextArea}
                                        placeholder="자유롭게 적어주세요"/>
                                </div>
                                <br/>
                                <Button size='large'
                                        onClick={onClickToSubmit}
                                        icon={<ArrowRightOutlined />}
                                        style={{"height":"50px","fontSize":"150%"}}
                                        >
                                    제출하기</Button>
                            </>

                    }

                </div>
            </div>
            <Footer/>
        </>
    )
}
export default FeedbackPage;