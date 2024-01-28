import React, {useState, useRef,useEffect } from "react";
import '../sources/css/modal.css';
import QRCode from 'qrcode';

export default function Modal_QRViewer({  onCancel, onSendLocationQRValue}){
    const [qrcodeValue, setQrcodeValue] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const qrRef = useRef(null);

    useEffect(() => {
        setQrcodeValue(onSendLocationQRValue);
        console.log("qrcodeValue : " + qrcodeValue);
        generateQrCode();
    }, [onSendLocationQRValue,qrcodeValue]);


    const generateQrCode = async () => {
        try {
            const options = {
                width: 500,  
                height: 500, 
            };
    
            const response = await QRCode.toDataURL(qrcodeValue, options);
            setImageUrl(response);
        } catch (error) {
            console.log(error);
        }
    };

    const downloadQrCode = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = qrcodeValue+'.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    return(
        <div className="modal-container">
            <div className="madal-main">
                <div style={{paddingBottom:"10px",
                            textAlign:"center", 
                            fontSize:"20px"}}>SSGTARBUCKS</div>
                <div style={{border:"1px solid rgba(106, 136, 30, 0.519)",borderRadius:"3px"}}>
                    <img src={imageUrl} alt="png" style={{width:"500px", height:"500px"}} />
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
                                        onClick={downloadQrCode}>
                                        다운로드</button></div>
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