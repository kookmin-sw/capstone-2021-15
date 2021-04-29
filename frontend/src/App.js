// import './App.css';
import React from "react";
// import Carousel from "./components/CardCarousel";
// import Recommand from "./components/Recommand";
import Auth from './hoc/auth'
import MainPage from "./views/MainPage/MainPage"
import CategoryPage from "./views/CategoryPage/CategoryPage";
import LoginPage from './views/LoginPage/LoginPage'
import SignUpPage from './views/SignUpPage/SignUpPage'
import WelcomePage from './views/WelcomePage/WelcomePage'
import ProductPage from './views/ProductPage/ProductPage'
import TestPage from './views/TestPage/TestPage'
import { Route, BrowserRouter as Router} from "react-router-dom"
import "antd/dist/antd.css"

function App() {
    // const cardMargin = {
    //     marginBottom: "60px"
    // }

    return (
        <Router>
            <div className="App" style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
                {/*<Route path="/mypage" component={Mypage}/>*/}
                <Route exact path="/" component={Auth(WelcomePage, null)}/>
                <Route exact path="/login" component={Auth(LoginPage, false)}/>
                <Route exact path="/signup" component={Auth(SignUpPage, false)}/>
                <Route exact path="/main" component={Auth(MainPage, true)}/>
                <Route exact path="/category" component={Auth(CategoryPage, true)}/>
                <Route exact path="/category/:id" component={Auth(CategoryPage,true)}/>
                <Route exact path="/product" component={Auth(ProductPage, true)}/>
                <Route exact path="/product/:id" component={ProductPage}/>
                <Route exact path="/test" component={TestPage}/>
            </div>
        </Router>
    );
}

export default App;