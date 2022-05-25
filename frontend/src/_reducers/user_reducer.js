import {
    LOGIN_USER,
    SIGNUP_USER,
    AUTH_USER,
    LOGOUT_USER,
    MODIFY_USER
} from '../_actions/types';

export default function(state={},action){
    switch(action.type){
        case SIGNUP_USER:
            return {...state, signup: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case MODIFY_USER:
            return {...state, modifiedUserData: action.payload}
        default:
            return state;
    }
}