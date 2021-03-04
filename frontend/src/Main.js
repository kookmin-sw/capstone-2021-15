import './Main.css';
import CardComponent from "./components/CardComponent";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import React from "react";
import Carousel from "./components/CardCarousel";
import Recommand from "./components/Recommand";

function Main() {
    return (
        <div className="main">
            <Header/>
            <Navigation/>
            <div className="main-container">
                <Carousel></Carousel>
                <Recommand title="닉네임을 위한 맞춤 추천" hashtag="#겨울쿨톤"></Recommand>
            </div>
            <Footer/>
        </div>
    );
}

export default Main;
