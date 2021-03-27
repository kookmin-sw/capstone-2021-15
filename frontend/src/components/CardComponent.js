import React from "react";
import './CardComponent.css';

function CardComponent(props) {

    return (
        <div className="card">
            <div className="image">
                <img src={props.image}></img>
            </div>
            <div className="info">
                <h2>{props.name}</h2>
                <h3>{props.color}</h3>
                <p>{props.categories}</p>
                <p>{props.brand}</p>
            </div>
        </div>
    )
}

export default CardComponent;