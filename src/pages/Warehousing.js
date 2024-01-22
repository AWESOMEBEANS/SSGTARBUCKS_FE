import React, { useEffect, useState } from "react";
import Nav from "../commons/Nav";
import Search from "../commons/Search"
import "../sources/css/scanner.css"
import axios from "axios";
import Modal from "../commons/Modal";


export default function Warehousing(){
    const [datas, setDatas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleButtonClick = () => {
        setModalOpen(false);
    };


    useEffect(()=>{
        axios.get("https://gonookim.github.io/outcome.json")
            .then((a) => { 
                console.log("check : ", a);
                setDatas(a.data);
            })
        },[])

    // const result = datas.filter((data)=>data.income_status === "입고전");
    // console.log("result >>>>>" ,result);

    return(
        <>
        <Search/>
        <div className="low-opacity-bg-image flex">
            <Nav/>
            <div className="w-full flex">
                <div className="w-2/6 h-1/2 my-auto">
                    <div className="box_btn_inn text-center">
                        <h1 className="btn_name" >입고하기</h1>
                        <button className="w-96 h-96 shadow-slate-700 shadow-xl rounded-3xl" id="qrbtn" onClick={()=> setModalOpen(true)}></button>
                        <h3 className="text-lg text-red-700 font-bold my-3">※ 카메라를 켜주세요</h3>
                    </div>
                </div>
                <div className="w-4/6">
                    <div style={{ height:"92vh"}} className="w-full mx-auto  overflow-scroll text-center">
                        
                        {datas.map(function(r,i){
                            return(
                            <div className="flex h-16 my-2 w-11/12 mx-auto">
                                <div style={{border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"100%"}} 
                                    className="w-11/12 my-3 mx-auto flex justify-between items-center text-xl shadow-lg px-4">
                                    <input type="checkbox" className="w-20"></input>
                                    <h6 className="grow text-center text-xl">ID : {r.outcome_id}</h6>
                                    <p className="grow text-center text-xl">{r.outcome_code}</p>
                                    <p className="grow text-center text-xl">수량 : {r.outcome_amount}</p>
                                    <p className={`grow text-center text-xl ${r.outcome_status === "입고완료" ? "bg-lime-700" : (r.outcome_status === "검수전" ? "bg-violet-700" : "bg-yellow-600")} w-10 text-white rounded-xl border border-black border-solid`}>{r.outcome_status}</p>
                                    <p className="grow text-end text-xl">{r.outcome_date}</p>
                                </div>
                                <button style={{border:"1px solid #d5d5d5", borderRadius:"7px", height:"100%"}} onClick={()=> setModalOpen(true)}
                                    className="w-16 my-3 mx-auto flex items-center justify-center text-xl shadow-lg btn_delete">
                                    <img width={"30px"} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxklEQVR4nMVVwQ3DIAy8J38Goo+s4tGSAfrtgxWyQtkjSoVkVanjpBBMe9L9zF04xxj4IW4AJgCPDangHIkzWSNo4guAp4FBYq0Pk4nFHdrh2CRrvhGZVohSTzOQPaGDWLTMvxpoPaEDAy3znQEJgZqeOCVzqbdDbU9ibQ+7G9yZverhmeb1uWhopD8zGAGsjRxLbjAzh0Ju6/1f/iJSBi1ZDpr8gsDjn6yeCu2Koedj14oo9Woyv7RwtMxNVyaUzE2Xfje8AK9VhW+0XHTWAAAAAElFTkSuQmCC" />
                                </button>
                            </div>
                            )
                        })}
                        <button style={{ borderRadius:"7px", height:"5%", backgroundColor:"#f6f5efb3" }} 
                                className="text-xl shadow-lg w-32 text-slate-950 font-bold my-3" id="hoverBtn">
                                입고하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {modalOpen && (
        <Modal 
            onSubmit={handleButtonClick}
            onCancel={handleButtonClick}>
        </Modal>)}
        </>

    )
}

