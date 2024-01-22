import Search from "../commons/Search"
import Nav from "../commons/Nav"
import { useEffect, useState } from "react"
import axios from "axios";

export default function History(){
    let [toggle, setToggle] = useState(false);
    const [datas, setDatas] = useState([]);

    useEffect(()=>{
        axios.get("https://gonookim.github.io/income.json")
        .then((response) => { 
            console.log("check : ", response);
            setDatas(response.data);
        })
    },[]);

    return(
        <>
            <Search />
            <div className="low-opacity-bg-image" style={{display:"flex"}}>
                <Nav />
                <div style={{ height:"92vh"}} className="w-full my-auto overflow-scroll">
                    {datas.map(function(r,i){
                        return(
                        <>
                            <div style={{border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"6.5%"}} 
                                className="w-3/5 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4">
                                <i className="fa-solid fa-angle-down fa-fade fa-lg grow-0 w-1/6" onClick={()=>{setToggle(!toggle)}}></i>
                                <span className="w-1/6">{r.income_id}</span>
                                <span className="w-2/6">{r.income_code}</span>
                                <span className="w-1/6">{r.income_amount} 개</span>
                                <span className="w-1/6">{r.income_date}</span>
                            </div>
                            {toggle ? <Detail /> : null}
                        </>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

function Detail(){

    return(
        <>
            <div className="bg-neutral-300 w-3/5 p-2 mx-auto">
                <div style={{border:"1px solid #d5d5d5", borderRadius:"5px", background:"white", height:"5vh"}} 
                    className="w-11/12 my-2 mx-auto flex justify-between items-center text-lg shadow-lg px-4">
                        <span className="w-1/6">{1}</span>
                        <span className="w-2/6">{"바질 치즈 포카치아"}</span>
                        <span className="w-1/6">{"211g"}</span>
                        <span className="w-1/6">{"1EX"}</span>
                        <span className="w-1/6">{"90"}</span>
                </div>
                <div style={{border:"1px solid #d5d5d5", borderRadius:"5px", background:"white", height:"5vh"}} 
                    className="w-11/12 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4">
                        <span className="w-1/6">{2}</span>
                        <span className="w-2/6">{"베이컨 크림치즈 씨드롤"}</span>
                        <span className="w-1/6">{"212g"}</span>
                        <span className="w-1/6">{"1EX"}</span>
                        <span className="w-1/6">{"91"}</span>
                </div>
                <div style={{border:"1px solid #d5d5d5", borderRadius:"5px", background:"white", height:"5vh"}} 
                    className="w-11/12 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4">
                        <span className="w-1/6">{3}</span>
                        <span className="w-2/6">{"바질 토마토 크림치즈 베이글"}</span>
                        <span className="w-1/6">{"200g"}</span>
                        <span className="w-1/6">{"1EX"}</span>
                        <span className="w-1/6">{"112"}</span>
                </div>
                <div style={{border:"1px solid #d5d5d5", borderRadius:"5px", background:"white", height:"5vh"}} 
                    className="w-11/12 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4">
                        <span className="w-1/6">{2}</span>
                        <span className="w-2/6">{"크림치즈 브리오슈 보스톡"}</span>
                        <span className="w-1/6">{"220g"}</span>
                        <span className="w-1/6">{"1EX"}</span>
                        <span className="w-1/6">{"162"}</span>
                </div>
            </div>
        </>
    )
}