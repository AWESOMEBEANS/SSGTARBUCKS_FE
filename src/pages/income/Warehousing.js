import React, { useEffect, useState } from "react";
import Nav from "../../commons/Nav";
import Search from "../../commons/Search"
import "../../sources/css/scanner.css"
import axios from "axios";
import { json, useNavigate } from "react-router";
import { getAuthToken } from "../../util/auth";
import Modal_search from "../../commons/Modal_search";


export default function Warehousing() {
    const [scanResult, setScanResult] = useState('');
    const [datas, setDatas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };
    const handleScanWebCam = (result) => {
        setScanResult(result);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!scanResult) {
                return;
            }
            try {
                console.log("스캔결과값----------------->", scanResult);
                const token = getAuthToken();
                const response = await axios.get(
                    `http://localhost:8000/api/v1/income/inspection/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'jwtauthtoken': token
                        }, params: {
                            scanResult: scanResult
                        },
                    }
                );
                console.log("SearchPage.response >>>>>>>>>>>..", response);
                if (response.status !== 200) {
                    throw json({ message: '검색에 실패했습니다.' }, { status: 500 });
                }
                const resData = response.data;
                console.log("resData", resData);
                //navigate('/income/list/inspection', { prams: { incomeId: resData } });
                navigate(`/income/inspection/${resData}`);
            } catch (error) {
                console.error("Error during fetchData:", error);
                //navigate('/error', { state: { errorMessage: '조회시 없음' } });
            }
        };
        if (scanResult) {
            fetchData();
        }
    }, [scanResult, navigate]);

    return (
        <>
            <div style={{ height:"92vh", fontFamily:'Pretendard-Regular'}} className="w-full mx-auto my-auto  overflow-scroll text-center">
                { !modalOpen &&
                <div className="w-3/5 my-1 mx-auto flex justify-center items-center text-2xl h-20">
                    <input type="button" value="입고내역서 스캔" 
                    className="mt-56 text-xl w-80 font-bold shadow-lg border rounded-md h-full btn_salelist"
                    onClick={handleModalOpen}/>
                </div>
                }               
                {datas.map(function(r,i){
                    return(
                    <div style={{height:"6.8%"}} 
                        className="w-3/5 my-3 mx-auto flex justify-center items-center text-2xl"
                        key={i} >
                        <div style={{border:"0.1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"100%"}} 
                        className="w-11/12  flex justify-between items-center text-lg shadow-lg px-4">
                            <input type="checkbox" className="w-1/6"></input>
                            <span className="w-1/6">{r.outcome_id}</span>
                            <span className="w-2/6">CODE : {r.outcome_code}</span>
                            <span className="w-1/6">수량 : {r.outcome_amount}</span>
                            <span className="w-1/6">{r.outcome_date}</span>
                        </div>
                    </div>
                    )
                })}
            </div>
            {scanResult}
            {modalOpen && (
                <Modal_search
                    onSubmit={handleModalOpen}
                    onCancel={handleModalOpen}
                    onScan={handleScanWebCam}
                    onType={"입고내역서"}
                >
                </Modal_search>)}
        </>

    )
}
