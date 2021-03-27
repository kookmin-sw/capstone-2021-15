import './App.css';
import React from "react";
import Carousel from "./components/CardCarousel";
import Recommand from "./components/Recommand";
import Auth from './hoc/auth'
import MainPage from "./views/MainPage/MainPage"
import Category from "./Category";
import LoginPage from './views/LoginPage/LoginPage'
import SignUpPage from './views/SignUpPage/SignUpPage'
import {Link, Route, BrowserRouter as Router} from "react-router-dom"

function App() {
    const cardMargin = {
        marginBottom: "60px"
    }

    return (
        <Router>
            <div className="App">
                <Route exact path="/main" component={Auth(MainPage, true)}/>
                {/*<Route path="/product" component={Product}/>*/}
                {/*<Route path="/mypage" component={Mypage}/>*/}
                <Route path="/category" component={Category}/>
                {/*<Route path="/" component={Welcome}/>*/}
                <Route path="/login" component={Auth(LoginPage, false)}/>
                <Route path="/signup" component={Auth(SignUpPage, false)}/>
            </div>
        </Router>
    );
}

export default App;
