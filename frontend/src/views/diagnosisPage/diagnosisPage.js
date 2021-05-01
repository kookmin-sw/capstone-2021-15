import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Question from "../../components/Question";
import React, { useEffect, useState } from "react";
import {  } from 'react-bootstrap';
import { Row, Col } from 'antd';
import axios from 'axios'
import "./diagnosisPage.css"
import orange from '../../orange.png'
import pink from '../../pink.png'
import gold from '../../gold.png'
import silver from '../../silver.png'
import blue from '../../blue.png'
import green from '../../green.png'
import bgimg from "../../background/spring.png";
import hFace from "../../hyeonFace.png"
import Navigation from "../../components/Navigation";
import DrapeComponent from "../../components/DrapeComponent";

function diagnosisPage() {

    return (
        <>
            <Header/>

            <div className="App">

                <div className="main-container">
                    <DrapeComponent bgSeason={bgimg} detectedFace={hFace} ></DrapeComponent>
                    {/*<div className="card-container">*/}
                    {/*    <Question title="오렌지 코랄 vs 핑크 코랄" img1={orange} img2={pink}></Question>*/}
                    {/*    <Question title="골드 악세서리 vs 실버 악세서리" img1={gold} img2={silver}></Question>*/}
                    {/*    <Question title="손목 푸른 빛 vs 손목 초록 빛" img1={blue} img2={green}></Question>*/}
                    {/*</div>*/}
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default diagnosisPage;