import Footer from "../../components/Footer";
import Question from "../../components/Question";
import React, { useEffect, useState } from "react";
import {  } from 'react-bootstrap';
import { Row, Col } from 'antd';
import axios from 'axios'
import "./TestPage.css"

function TestPage() {

    return (
        <div className="App">
            <div className="main-container">
                <div className="card-container">
                    <Question title="나는 피부가" text1="노란 편이다." text2="붉은 편이다."></Question>
                    <Question title="나는 손목의 핏줄이" text1="초록색이다." text2="파란색이다."></Question>
                    <Question title="나는 손목의 핏줄이" text1="초록색이다." text2="파란색이다."></Question>
                    <Question title="나는 손목의 핏줄이" text1="초록색이다." text2="파란색이다."></Question>
                    <Question title="나는 손목의 핏줄이" text1="초록색이다." text2="파란색이다."></Question>
                    <Question title="나는 손목의 핏줄이" text1="초록색이다." text2="파란색이다."></Question>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default TestPage;