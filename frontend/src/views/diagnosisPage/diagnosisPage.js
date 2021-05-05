import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { Radio  } from 'antd';
import axios from 'axios'
import "./DiagnosisPage.css"
import bgspring from "../../background/spring.png";
import bgsummer from "../../background/summer.png";
import bgFall from "../../background/fall.png"
import bgWinter from "../../background/winter.png"
import hFace from "../../hyeonFace.png"
import face2 from "../../face2.png"
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
                    <div className="diagnosis">
                        <DrapeComponent bgSeason={season} detectedFace={face2} ></DrapeComponent>

                        {/*<ToggleButtonGroup className="diagnosis" type="radio" name="options" defaultValue={1}>*/}
                        {/*    <ToggleButton onClick={onSpring} value={1} variant="outline-secondary" > 1 </ToggleButton>*/}
                        {/*    <ToggleButton onClick={onSummer}value={2} variant="outline-secondary"> 2 </ToggleButton>*/}
                        {/*    <ToggleButton onClick={onFall} value={3} variant="outline-secondary"> 3 </ToggleButton>*/}
                        {/*    <ToggleButton onClick={onWinter} value={4} variant="outline-secondary"> 4 </ToggleButton>*/}
                        {/*</ToggleButtonGroup>*/}

                        {/*<ButtonToolbar className="diagnosis" aria-label="Toolbar with button groups">*/}
                        {/*    <ToggleButtonGroup className="mr-2" name="options">*/}
                        {/*        <ToggleButton  onClick={onSpring}  variant="outline-secondary" > 1 </ToggleButton>*/}
                        {/*    </ToggleButtonGroup>*/}
                        {/*    <ToggleButtonGroup className="mr-2" name="options">*/}
                        {/*        <ToggleButton onClick={onSummer} variant="outline-secondary"> 2 </ToggleButton>*/}
                        {/*    </ToggleButtonGroup>*/}
                        {/*    <ToggleButtonGroup className="mr-2" name="options">*/}
                        {/*        <ToggleButton onClick={onFall} variant="outline-secondary"> 3 </ToggleButton>*/}
                        {/*    </ToggleButtonGroup>*/}
                        {/*    <ToggleButtonGroup name="options">*/}
                        {/*        <ToggleButton onClick={onWinter} variant="outline-secondary"> 4 </ToggleButton>*/}
                        {/*    </ToggleButtonGroup>*/}
                        {/*</ButtonToolbar>*/}

                        <Radio.Group className="diagnosis" defaultValue="a" buttonStyle="solid" size="large">
                            <Radio.Button onClick={onSpring} value="a">1</Radio.Button>
                            <Radio.Button onClick={onSummer} value="b">2</Radio.Button>
                            <Radio.Button onClick={onFall} value="c">3</Radio.Button>
                            <Radio.Button onClick={onWinter} value="d">4</Radio.Button>
                        </Radio.Group>







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