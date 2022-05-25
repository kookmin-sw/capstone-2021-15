import React, {useEffect, useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import 'bootstrap/dist/css/bootstrap.min.css';
import CardComponent from "./CardComponent";
import './CardCarousel.css'

function CardCarousel(props) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <CardComponent name="test" image="/logo192.png"></CardComponent>
                <CardComponent name="test" image="/logo192.png"></CardComponent>
                <CardComponent name="test" image="/logo192.png"></CardComponent>
            </Carousel.Item>
            <Carousel.Item>
                <CardComponent name="test" image="/logo192.png"></CardComponent>
                <CardComponent name="test" image="/logo192.png"></CardComponent>
                <CardComponent name="test" image="/logo192.png"></CardComponent>
            </Carousel.Item>
            <Carousel.Item>
                <CardComponent name="test" image="/logo192.png"></CardComponent>
                <CardComponent name="test" image="/logo192.png"></CardComponent>
                <CardComponent name="test" image="/logo192.png"></CardComponent>
            </Carousel.Item>
        </Carousel>
    )
}

export default CardCarousel;