import React from "react";
import '../sources/css/login.css';

export default function Login(){


    return(
        <div className="bg">
        <div>
        <div className="circle shadow-lg"></div>
        <div className="card_login shadow-lg">
            <h2>SSGTARBUCKS</h2><br/>
            <h4>안녕하세요 환영합니다</h4>
            <form className="form_login">
                <input type="text" placeholder="사원번호"/>
                <input type="password" placeholder="password"/>
                <button type="submit">SIGN IN</button>
            </form>
            <footer>
                <a href="/find">비밀번호 찾기</a>
            </footer>
        </div>
        </div>
        </div>
    )
}