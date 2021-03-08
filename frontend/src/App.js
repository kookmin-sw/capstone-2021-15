import './App.css';
import React from "react";
import Carousel from "./components/CardCarousel";
import Recommand from "./components/Recommand";
import Main from "./Main";
import Category from "./Category";
import {Link, Route, BrowserRouter as Router} from "react-router-dom"

function App() {
    const cardMargin = {
        marginBottom: "60px"
    }

    return (
        <Router>
            <div className="App">
                <Route exact path="/main" component={Main}/>
                {/*<Route path="/product" component={Product}/>*/}
                {/*<Route path="/mypage" component={Mypage}/>*/}
                <Route path="/category" component={Category}/>
                {/*<Route path="/" component={Welcome}/>*/}
                {/*<Route path="/login" component={Login}/>*/}
                {/*<Route path="/signup" component={Signup}/>*/}
            </div>
        </Router>
    );
}

export default App;
