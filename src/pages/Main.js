import Search from "../commons/Search"
import Nav from "../commons/Nav"
import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Main(){
    const [data, setData] = useState([]);

        useEffect(()=>{
            axios.get("https://sw-devr.github.io/data.json")
                .then((a) => { 
                    console.log("check : ", a);
                    setData(a.data);
                })
            },[])

    return(
        <>
            <Search />
            <div className="low-opacity-bg-image flex">
                <Nav />
                <div className="w-full">
                    <div className="h-full text-center flex items-center flex-col">
                        <h1 className="text-5xl h-1/5 flex items-center" style={{fontFamily: 'EASTARJET-Medium'}}>
                            SSGTARBUCKS에 오신것을 환영합니다 :)
                        </h1>
                        <div className="w-4/5 h-2/6 text-start flex justify-center flex-col">
                            <h3 className="text-xl h-10 ml-14 bg-lime-800 text-white rounded-xl w-fit px-2 my-2 flex items-center"
                                >
                                유통기한 임박 목록
                            </h3>
                            <Table1 data={data} />
                        </div>
                        <div className="w-4/5 h-2/6 text-start flex justify-center flex-col">
                            <h3 className="text-xl h-10 ml-14 bg-lime-800 text-white rounded-xl w-fit px-2 my-2 flex items-center">
                                발주추천 목록
                            </h3>
                            <Table2 data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function Table1(props){
console.log("%%%%%%%%", props.data)
    return(
        <>
            <div className="rounded-xl">
                <table className="w-11/12 mx-auto text-xl shadow-lg" style={{borderRadius:"10px"}}>
                    <thead  >
                        <tr style={{backgroundColor:"#f6f5efb3"}} >
                            <th className="px-3">ID</th>
                            <th className="px-3">제품명</th>
                            <th className="px-3">용량</th>
                            <th className="px-3">유닛</th>
                            <th className="px-3">잔여개수</th>
                            <th className="px-3">카테고리</th>
                            <th className="px-3">남은기간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map(function(r,i){
                            return(
                                <tr className="h-9" style={{borderBottom:"1px dashed black"}}>
                                    <td className="px-3">
                                        {r.product_id}
                                    </td>

                                    <td className="px-3"> 
                                        {r.product_name}
                                    </td>
                                    <td className="px-3">
                                        {r.product_standard}
                                    </td>
                                    <td className="px-3">
                                        {r.product_unit}
                                    </td>

                                    <td className="px-3">
                                        {r.product_quantity}
                                    </td>
                                    <td className="px-3">
                                        {"Bread"}
                                    </td>
                                    <td className="px-3 bg-red-700 w-28 text-center text-white border-2 rounded-full">
                                        {"3일"}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function Table2(props){
    console.log("%%%%%%%%", props.data)
        return(
            <>
                <div className="rounded-xl">
                    <table className="w-11/12 mx-auto text-xl shadow-lg" style={{borderRadius:"10px"}}>
                        <thead  >
                            <tr style={{backgroundColor:"#f6f5efb3"}} >
                                <th className="px-3">ID</th>
                                <th className="px-3">제품명</th>
                                <th className="px-3">용량</th>
                                <th className="px-3">유닛</th>
                                <th className="px-3">잔여개수</th>
                                <th className="px-3">카테고리</th>
                                <th className="px-3">남은기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map(function(r,i){
                                return(
                                    <tr className="h-9" style={{borderBottom:"1px dashed black"}}>
                                        <td className="px-3">
                                            {r.product_id}
                                        </td>
    
                                        <td className="px-3"> 
                                            {r.product_name}
                                        </td>
                                        <td className="px-3">
                                            {r.product_standard}
                                        </td>
                                        <td className="px-3">
                                            {r.product_unit}
                                        </td>
                                        <td className="px-3 bg-sky-700 w-28 text-white border-2 rounded-full text-center">
                                            {"5개"}
                                        </td>
                                        <td className="px-3">
                                            {"Bread"}
                                        </td>
                                        <td className="px-3 w-28">
                                            {"3일"}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    