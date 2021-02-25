import './App.css';
import CardComponent from "./components/CardComponent";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import React from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <CardComponent PName="제품명" PColor="퍼스널컬러 톤" Categories="카테고리" Brand="브랜드"></CardComponent>
      <Footer />
    </div>
  );
}

export default App;
