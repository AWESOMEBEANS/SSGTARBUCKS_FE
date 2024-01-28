import React, {useState } from "react";
import '../sources/css/modal.css';
import QRScanner from "./QRScanner";

export default function Modal_search({onCancel, onScan, onType}){

    return(
        <div className="modal-container">
            <div className="madal-main">
                <h1 className="text-center text-3xl text-lime-800">SSGTARBUCKS</h1>
                <h1 className="text-center text-lg my-3  font-bold">{onType} QR코드를 스캔해주세요. </h1>
                <div style={{border:"2px solid rgba(106, 136, 30, 0.519)",borderRadius:"3px"}}>
                    <QRScanner onScan={onScan}/>
                </div>
                <div style={{padding:"5%"}}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <div style={{width:"100%",textAlign:"center"}}>
                            <button style={{fontSize:"18px",
                                            width:"40%",
                                            height:"50px",
                                            boxShadow:"0px 5px 5px #ccc",
                                            border:"2px solid rgba(106, 136, 30, 0.519)",
                                            borderRadius:"10px"}}
                                            onClick={()=> onCancel()}
                                            className="hoverBtn_white"
                                            >취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}