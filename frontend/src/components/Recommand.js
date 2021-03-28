import React from "react";
import './Recommand.css';
import CardComponent from "./CardComponent";
// import CardCarousel from "./CardCarousel";

function Recommand(props) {
    return (
        <div className="recommand-container">
            <div style={{width: '100%'}}>
                <div className="circle"></div>
                <div className="describe">
                    <div style={{fontSize: '16px'}}>{props.title}</div>
                    <div style={{fontSize: '10px'}}>{props.hashtag}</div>
                </div>
            </div>
            <div className="inner-container">
                {/* <CardCarousel></CardCarousel> */}
            </div>
        </div>
    )
}

export default Recommand;