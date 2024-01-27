import React, {useState } from "react";
import warning from "../sources/image/warning.png";

export default function Modal_alarm({ onSubmit, onCancel}){

    return(
        <div className="modal-container">
            <div className="madal-main" style={{border:"3.5px solid rgba(106, 136, 30, 0.519)",width:"30%",padding:"20px"}}>
                
                    {/* <div style={{fontSize:"20px",fontWeight:"bold", textAlign:"center"}}>SSGTARBUCKS</div> */}
                    <div style={{marginTop:"10px",display:"flex",justifyContent:"center"}}>
                        <img src={warning} style={{width:"45px", height:"45px"}}/>
                    </div>
                    <div style={{paddingTop:"20px",textAlign:"center"}}>
                        <h2 style={{fontSize:"18px"}}>입력 형식이 올바르지 않습니다.<br/> 한글, 영어, 숫자만 입력해주세요.</h2>
                    </div>
                    <div style={{paddingTop:"20px",display:"flex",justifyContent:"center"}}>
                        <button style={{border:"1px solid rgba(106, 136, 30, 0.519)",
                                        borderRadius:"3px",
                                        boxShadow:"0px 5px 5px #ccc",
                                        height:"35px",
                                        width:"100px"}}>확인</button></div>
                
            </div>
        </div>
    )
}