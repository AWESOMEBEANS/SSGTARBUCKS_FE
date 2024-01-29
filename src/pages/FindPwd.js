import React,{useState} from "react";
import '../sources/css/findpwd.css'

export default function FindPwd(){

    let [modal, setModal] = useState(false);
    let [modal2, setModal2] = useState(false);
    console.log(modal);

    return(
        <div className="bg">
        <div>
        <div className="circle shadow-lg"></div>
        <div className="card shadow-lg">
            <h2>SSGTARBUCKS</h2><br/>
            <h4>비밀번호 찾기</h4>
        
            <div className="form">
                <input type="text" placeholder="사원번호" required/>
                <input type="e-mail" placeholder="e-mail " required/>
                <button type="submit" onClick={()=>{setModal(!modal);}}>인증번호 발송</button>
            </div>
            <div className={modal ? "form" : "form1"}>
                <input type="text" placeholder="인증번호" required/>
                <button type="submit" onClick={()=>{setModal2(!modal2);}}>인증번호 확인</button>
            </div>
            <form className={modal2 ? "form" : "form2" }>
                <input type="password" placeholder="비밀번호" required/>
                <input type="password" placeholder="비밀번호 확인"/><button type="submit" required>비밀번호 변경</button>
            </form>
            <footer>
            <button className="backbutton" type="submit" href="/">BACK</button>
            </footer>
        </div>
        </div>
        </div>
    )
}
