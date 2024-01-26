import React, {useState } from "react";
import '../sources/css/modal.css';
import QRScanner from "./QRScanner";

export default function Modal_list({ onSubmit, onCancel}){

    return(
        <div className="modal-container">
            <div className="madal-main">
                <div style={{paddingBottom:"10px",
                            textAlign:"center", 
                            fontSize:"20px"}}>SSGTARBUCKS</div>
                <div style={{border:"2px solid rgba(106, 136, 30, 0.519)",borderRadius:"3px"}}>
                    <QRScanner style={{width:"400px", height:"500px"}}/>
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
                                        >취소</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}