import Search from "../commons/Search"
import Nav from "../commons/Nav"
import { useEffect, useState } from "react"
import axios from "axios";
import "../sources/css/event.css"

export default function Regiter(){
    const [datas, setDatas] = useState([]);

    useEffect(()=>{
        axios.get("https://gonookim.github.io/income.json")
            .then((a) => { 
                console.log("check : ", a);
                setDatas(a.data);
            })
        },[])

    const result = datas.filter((data)=>data.income_status == "검수전");
    console.log("result >>>>>" ,result);
    return(
        <>
            <Search />
            <div className="low-opacity-bg-image" style={{display:"flex"}}>
                <Nav />
                <div style={{ height:"92vh"}} className="w-full mx-auto my-auto  overflow-scroll text-center">
                    
                    {result.map(function(r,i){
                        return(
                        <div style={{border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"7%"}} 
                            className="w-3/5 my-3 mx-auto flex justify-between items-center text-2xl shadow-lg px-4">
                            <input type="checkbox" className="w-20"></input>
                            <h6 className="grow text-center text-xl">ID : {r.income_id}</h6>
                            <p className="grow text-center text-xl">{r.income_code}</p>
                            <p className="grow text-center text-xl">수량 : {r.income_amount}</p>
                            <p className="grow text-center text-xl bg-violet-700 w-0 text-white rounded-xl border border-black border-solid">{r.income_status}</p>
                            <p className="grow text-end text-xl">{r.income_date}</p>
                        </div>
                        )
                    })}
                    <button style={{ borderRadius:"7px", height:"5%", backgroundColor:"#f6f5efb3" }} 
                            className="text-xl shadow-lg w-32 text-slate-950 font-bold " id="hoverBtn">
                            검수하기
                    </button>
                </div>
            </div>
        </>
    )
}
