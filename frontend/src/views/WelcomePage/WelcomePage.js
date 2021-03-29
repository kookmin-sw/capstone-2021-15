import React from 'react'
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

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
        <div>
            Welcome
            <Link to='/login'>
                <button> 로그인 </button>
            </Link>
            <Link to='/signup'>
                <button> 회원가입 </button>
            </Link>
            <button onClick={onClickHandler}>
                Log Out
            </button>
        </div>
    )
}

export default withRouter(WelcomePage)