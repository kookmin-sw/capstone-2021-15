import './App.css';
import CardComponent from "./components/CardComponent";
import React from "react";

function App() {
  return (
    <div className="App">
      <CardComponent PName="제품명" PColor="퍼스널컬러 톤" Categories="카테고리" Brand="브랜드"></CardComponent>
    </div>
  );
}

export default App;
