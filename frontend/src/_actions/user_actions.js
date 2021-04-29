import axios from 'axios';
import {
    LOGIN_USER,
    AUTH_USER,
    SIGNUP_USER,
    LOGOUT_USER
} from './types'

// 회원가입
export function signupUser(dataToSubmit) {
    const request = axios.post('/api/user/signup', dataToSubmit)
        .then(response => response.data);

    return {
        type: SIGNUP_USER,
        payload: request
    }
}
// 로그인
export function loginUser(dataToSubmit) {
    const request = axios.post('/api/user/login', dataToSubmit)
        .then(response => response.data);
    
    return {
        type: LOGIN_USER,
        payload: request
    }
}
// 인증
export function auth() {
    const request = axios.get('/api/user/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}
// 로그아웃
export function logoutUser(){
    const request = axios.get('/api/user/logout')
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}