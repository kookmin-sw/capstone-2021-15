import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { Radio  } from 'antd';
import axios from 'axios'
import "./DiagnosisPage.css"
import bgspring from "../../background/spring.png";
import bgsummer from "../../background/summer.png";
import bgFall from "../../background/fall.png"
import bgWinter from "../../background/winter.png"
import hFace from "../../hyeonFace.png"
import DrapeComponent from "../../components/DrapeComponent";

function DiagnosisPage() {


    const [season, setBg] = useState(bgspring);

    const onSpring = () => {
        setBg(bgspring);
    }

    const onSummer = () => {
        setBg(bgsummer);
    }
    const onFall = () => {
        setBg(bgFall);
    }
    const onWinter = () => {
        setBg(bgWinter);
    }


    return (
        <>
            <Header/>

            <div className="App">

                <div className="main-container">
                    <div className="diagnosos">
                        <DrapeComponent bgSeason={season} detectedFace={hFace} ></DrapeComponent>

                        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                            <ToggleButton onClick={onSpring} value={1} variant="outline-secondary" > 1 </ToggleButton>
                            <ToggleButton onClick={onSummer}value={2} variant="outline-secondary"> 2 </ToggleButton>
                            <ToggleButton onClick={onFall} value={3} variant="outline-secondary"> 3 </ToggleButton>
                            <ToggleButton onClick={onWinter} variant="outline-secondary"> 4 </ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                </div>
                <Footer/>
            </div>
        </>
    );
}

// const radios = [
//     { name: '1', value: '1' },
//     { name: '2', value: '2' },
//     { name: '3', value: '3' },
//     { name: '4', value: '3' },
// ];


export default DiagnosisPage;