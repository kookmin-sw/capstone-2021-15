import React from "react";
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import './CardComponent.css';

function CardComponent(props) {

    const { Meta } = Card;

    return (
        // <div className="card">
        //     <div className="image">
        //         <img src={props.image}></img>
        //     </div>
        //     <div className="info">
        //         <h2>{props.name}</h2>
        //         <h3>{props.color}</h3>
        //         <p>{props.categories}</p>
        //         <p>{props.brand}</p>
        //     </div>
        // </div>
        <>
            <Link to={`/product/${props['data-code']}`}>
                <Card
                    size="small"
                    hoverable
                    cover={ <img src={props['img-url']} />}
                >
                    <Meta 
                        title={props.title}
                        description={props.season+" "+props.tone}
                    />
                </Card>
            </Link>
        </>
    )
}

export default CardComponent;