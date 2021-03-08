import CardComponent from "./components/CardComponent";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import React from "react";
import Carousel from "./components/CardCarousel";

function App() {
    const cardMargin = {
        marginBottom: "60px"
    }

    return (
        <div className="App">
            <Header/>
            <Navigation/>
            <div className="main-container">
                <CardComponent PName="제품명" PColor="퍼스널컬러 톤" Categories="카테고리" Brand="브랜드"
                               style={cardMargin}></CardComponent>
                <CardComponent PName="제품명" PColor="퍼스널컬러 톤" Categories="카테고리" Brand="브랜드"
                               style={cardMargin}></CardComponent>
                <Carousel></Carousel>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
