import React from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';

function Header(props) {
    const user = props.user;
        
    const logoutHandler = () => {
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
            <div>
                <img/>
                <Menu mode="vertical">
                    <Menu.Item key="mypage">
                        <a>MY PAGE</a>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={logoutHandler}>
                            LOGOUT
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
}


export default withRouter(Header);