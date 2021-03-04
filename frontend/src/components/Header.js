import React from 'react';
import './Header.css';

function Header(props) {
    return (
        <div>
            <div className="header">
                <img src="/logo192.png" alt="logo_image"></img>
                <div className="utility">
                    <div className="myPage">
                        <a href="#none">
                            <strong>MY PAGE</strong>
                        </a>
                    </div>
                    <div className="logout">
                        <a href="#none">
                            <strong>LOGOUT</strong>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Header;