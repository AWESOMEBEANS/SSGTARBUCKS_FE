import React, {useState } from "react";
import '../sources/css/modal.css';
import code from '../sources/image/code-1.png';

export default function ImageModal({ onSubmit, onCancel}){

    return(
        <div className="modal-container">
            <div className="madal-main">
                <div style={{paddingBottom:"10px",
                            textAlign:"center", 
                            fontSize:"20px"}}>SSGTARBUCKS</div>
                <div style={{border:"1px solid rgba(106, 136, 30, 0.519)",borderRadius:"3px"}}>
                    <img src={code} style={{width:"500px", height:"300px"}}/>
                </div>
                <div style={{padding:"5%"}}>
                    <div style={{display:"flex",alignItems:"cent"}}>
                    
                    <div style={{width:"100%",textAlign:"center"}}>
                        <button style={{fontSize:"18px",
                                        width:"40%",
                                        height:"50px",
                                        boxShadow:"0px 5px 5px #ccc",
                                        border:"2px solid rgba(106, 136, 30, 0.519)",
                                        borderRadius:"3px",borderRadius:"10px"}}
                                        onClick={()=> onCancel()}
                                        >다운로드</button></div>
                    <div style={{width:"100%",textAlign:"center"}}>
                        <button style={{fontSize:"18px",
                                        width:"40%",
                                        height:"50px",
                                        boxShadow:"0px 5px 5px #ccc",
                                        border:"2px solid rgba(106, 136, 30, 0.519)",
                                        borderRadius:"3px",borderRadius:"10px"}}
                                        onClick={()=> onCancel()}
                                        >취소</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}