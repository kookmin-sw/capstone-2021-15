import React , { useState } from 'react';
import {  } from 'react-bootstrap';
import './DrapeComponent.css';

const drapeComponent = props => {

    const bgSeason = props.bgSeason.toString();
    const detectedFace = props.detectedFace;

    return (

        <div className="canvas" style={{position:"relative"}}>

            <div className="face" style={{position:"absolute"}}>

                <img src={detectedFace} />
            </div>

            <img src={bgSeason}/>

        </div>
    )
}


export default drapeComponent;