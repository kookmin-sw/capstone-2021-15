import React from "react";
import './CardComponent.css';

function CardComponent(props) {
    return (
        <div className="card">
            <div className="image">

            </div>
            <div className="info">
                <h2>{props.PName}</h2>
                <h3>{props.PColor}</h3>
                <p>{props.Categories}</p>
                <p>{props.Brand}</p>
            </div>
        </div>
        )
    }

export default CardComponent;