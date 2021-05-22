import React from 'react';
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import './Header.css';

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
        <div className="headerContainer">
            <Row className="row">
                <Col className="col1" lg={12}>
                    <Link to={`/main`}>
                        <Button type="link" style={{color: "#a78470", fontSize: "30px"}}>
                            UtoPR
                        </Button>
                    </Link>
                </Col>
                <Col className="col2" lg={12}>
                    <Button type="link" href='/myinfo' style={{color: "white", fontSize: "16px"}}>MY INFO</Button>
                    <Button type="link" style={{color: "white", fontSize: "16px"}} onClick={logoutHandler}>LOGOUT</Button>
                    <Button type="link" href='/feedback'style={{color: "white", fontSize: "16px"}}>FEEDBACK</Button>
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