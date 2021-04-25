import React from "react";
import './drapeComponent.css';
import bgimg from "../background/spring.png";
import hFace from "../hyeonFace.png"

function drapeComponent(props) {
    return (
        <div className="canvas">
            <div>
                <img src={props.bgSeason}/>
                <div className="face">
                    <img src={props.detectedFace} />
                </div>
            </div>
            <h1>hello</h1>
        </div>
    )
}

// drapeComponent.defaultProps = {
//     bgSeason: "../background/spring.png",
//     detectedFace: "../hyeonFace.png"
// }

export default drapeComponent;