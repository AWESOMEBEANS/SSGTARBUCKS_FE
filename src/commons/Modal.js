import React, {useState } from "react";
import '../sources/css/modal.css';
import QRScanner from "./QRScanner";

export default function Modal({ onSubmit, onCancel}){

    return(
        <div className="modal-container">
            <div className="madal-main">
                <QRScanner style={{width:"400px", height:"500px"}}/>
            </div>
        </div>
    )
}