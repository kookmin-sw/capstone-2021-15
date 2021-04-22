import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';
import axios from 'axios';

export default function (SpecificComponent, option, adminRoute = null) {
    // option: null, true, false
    // null: 아무나 출입 가능 -> 회원가입 페이지, 로그인 페이지
    // true: 로그인한 유저만 출입 가능 =>  메인페이지
    // false: 로그인한 유저는 출입 불가능 -> 회원가입 페이지. 로그인 페이지

    // adminRoute: 관리자만 출입 가능 페이지. 기본적으로 다 null
    

    function AuthenticationCheck(props) {
        const user = useSelector(state => state.user)
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(response => {
                if( !response.payload.isAuth) {
                    if( option) {
                        props.history.push('/login');
                    }
                } else{
                    // 로그인한 상태
                    if(adminRoute && !response.payload.isAuth) { // 로그인은 헀지만 관리자는 아님
                        props.history.push('/main'); 
                        

                    } else { // 로그인 했는데 회원가입, 로그인 페이지로 접근하려고 할 때
                        if(option===false){
                            props.history.push('/main');
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent {...props} user={user}/>
        )
    }

    return AuthenticationCheck
}