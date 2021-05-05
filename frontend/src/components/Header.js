import React from 'react';
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Button, Menu } from 'antd';

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
        <div style={{textAlign: "center", backgroundColor:"#2F2F2F"}}>
            <Row style={{width:"1024px", display: "inline-block"}}>
                <Col lg={12} style={{textAlign: "left"}}>
                    <Link to={`/main`}>
                        <Button type="link" style={{color: "white", fontSize: "30px"}}>
                            LOGO
                        </Button>
                    </Link>
                </Col>
                <Col lg={12} style={{textAlign: "right"}}>
                    <Button type="link" style={{color: "white", fontSize: "16px"}}>MY PAGE</Button>
                    <Button type="link" style={{color: "white", fontSize: "16px"}} onClick={logoutHandler}>LOGOUT</Button>
                </Col>
                {/* <Menu mode="vertical">
                    <Menu.Item key="mypage">
                        <a>MY PAGE</a>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={logoutHandler}>
                            LOGOUT
                    </Menu.Item>
                </Menu> */}
            </Row>
        </div>
    );
}


export default withRouter(Header);