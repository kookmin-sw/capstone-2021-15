import './App.css';
import CardComponent from "./components/CardComponent";
import drapeComponent from "./components/drapeComponent";
import PropTypes from 'prop-types';
import React from "react";
import bgimg from "./background/spring.png";
import hFace from "./hyeonFace.png"

const season = [
    {

    }
]

function App() {
  return (

    <div className="App">
        <drapeComponent bgSeason="./background/spring.png" detectedFace="./hyeonFace.png" ></drapeComponent>
    {/*    <div className="canvas">*/}

    {/*            <div>*/}
    {/*        <img src={bgimg}/>*/}
    {/*        <div className="face">*/}
    {/*            <img src={hFace} />*/}
    {/*        </div>*/}
    {/*    </div>*/}

    {/*</div>*/}
    </div>
  );
}

drapeComponent.propTypes = {
    bgSeason: PropTypes.string.isRequired,
    hFace: PropTypes.string.isRequired,

}

export default App;
