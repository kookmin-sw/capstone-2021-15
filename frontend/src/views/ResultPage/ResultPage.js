import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import ResultComponent from "../../components/ResultComponent";
import StepComponent from "../../components/StepComponent";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Steps, Divider,Tooltip,Progress,Card   } from 'antd';
import axios from 'axios'
import "./ResultPage.css"


function ResultPage() {

    return (
        <div className="App">
            <Header/>
            <Navigation/>
            <div className="main-container">
                <StepComponent></StepComponent>

                <ResultComponent></ResultComponent>


            </div>
            <Footer/>
        </div>
    );
}

export default ResultPage;