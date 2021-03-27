import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';
import { Form, Input, Button} from 'antd';


function SignUpPage(props) {
    const [nickName, setNickName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setComfirmPassword] = useState("")
    const [age, setAge] = useState("")
    const [personalColor, setPersonalColor] = useState("")

    const onNickNameHandler = (e) => {
        setNickName(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onConfirmPasswordHandler = (e) => {
        setComfirmPassword(e.currentTarget.value)
    }

    const onAgeHandler = (e) => {
        setAge(e.currentTarget.value)
    }

    const onPersonalColorHandler = (e) => {
        setPersonalColor(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            return alert('confirm password not matched.')
        }
        let body = {
            nickName: nickName,
            password: password,
            age: age,
            personalColor: personalColor
        }
        axios.post('/api/user/signup', body)
            .then(response => {
                if(response.data.registerSuccess ) {
                    props.history.push('/login');
                } else {
                    alert('failed to sign up');
                }
            })
    }

    return (
        <div className="signup">
            <h2>회원가입</h2>
            <Form className="signup-form" onSubmit={onSubmitHandler}>
                <label>NickName</label>
                <Input type="text" value={nickName} onChange={onNickNameHandler} />
                <br/>
                <label>Password</label> 
                
                <Input type="password" value={password} onChange={onPasswordHandler} /> 
                <br/>
                
                <label>Confirm Password</label> 
                <Input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} /> 
                <br/>

                <label>Age</label>
                <Input type="number" value={age} onChange={onAgeHandler} />
                <br/>

                <label>PersonalColor</label>
                <Input type="text" value={personalColor} onChange={onPersonalColorHandler} />
                <br/>
                <br/>
                <Button type="submit" style={{ justifyContent: 'center'}}>
                    Sign Up
                </Button>
                <br/>
            
            </Form>
        </div>
    )
}

export default withRouter(SignUpPage)