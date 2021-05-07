import React from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { withRouter, Link } from 'react-router-dom';
import './WelcomePage.css'


function WelcomePage(props) {

    const onClickHandler = (e) => {
        axios.get('/api/user/logout')
            .then(response => {
                if(response.data.success ) {
                    props.history.push('/login')
                } else{
                    alert('Failed to Log Out')
                }
            })
    }

    return (
        <div className="appContainer">
            <div className="app">
                <h1>Welcome</h1>
                <div>

                    <Button href='/login' variant="outline-dark"> 로그인 </Button>
                    <Button href='/signup' variant="outline-dark"> 회원가입 </Button>
                    <Button onClick={onClickHandler} href='/login' variant="outline-dark"> Log Out </Button>

                </div>
            </div>
        </div>
    )
}

export default withRouter(WelcomePage)