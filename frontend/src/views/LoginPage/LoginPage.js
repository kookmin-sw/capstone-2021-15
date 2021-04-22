import React, { useState } from 'react'
import './LoginPage.css';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button} from 'antd';
import axios from 'axios';


function LoginPage(props) {

    const [nickName, setNickName] = useState("")
    const [password, setPassword] = useState("")

    const onNickNameHandler = (e) => {
        setNickName(e.currentTarget.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            nickName: nickName,
            password: password
        }
        axios.post('/api/user/login', body)
            .then(response => {
                if(response.data.loginSuccess ) {
                        props.history.push('/main'); 
                    } else {
                        alert('error');
                    }
                })
    }

    return (
        <div className="signin">
            <h2>로그인</h2>
            <Form className="signin-form" onSubmit={onSubmitHandler}>
                <label>NickName</label>
                <Input type="text" value={nickName} onChange={onNickNameHandler} />
                <label>Password</label> 
                <Input type="password" value={password} onChange={onPasswordHandler} /> 
                <br/>
                <Button type="submit">
                    Sign In
                </Button>
            
            </Form>
        </div>
    )
}

export default withRouter(LoginPage)
