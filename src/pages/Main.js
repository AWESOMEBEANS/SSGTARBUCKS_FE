import Search from "../commons/Search"
import Nav from "../commons/Nav"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../util/auth";

export default function Main(){

    const loaderDataMain = useLoaderData();
    console.log("loaderDataMain >>>>>" , loaderDataMain);
    let {expDataList, remainDataList} = loaderDataMain;

    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    const branch_name = localStorage.getItem("branch_name");

    return(
        <>
            <div className="w-full" style={{height:"92vh"}}>
                <div className="h-full text-center flex items-center flex-col">
                    <h1 className="text-5xl h-1/12 mt-5" style={{fontFamily: 'SUITE-Regular'}}>
                        SSGTARBUCKS에 오신 것을 환영합니다 :)
                        <p>스타벅스 <span style={{boxShadow: "inset 0 -20px 0 #D9FCDB", fontFamily:"EASTARJET-Medium"}}>{branch_name}</span> 입니다 </p>
                    </h1>
                    <div className="w-11/12 h-72 text-start flex justify-center flex-col mt-20">
                        <h3 className="text-xl h-10  bg-lime-800 text-white rounded-md w-fit px-4 my-2 flex items-center"
                            >
                            유통기한 임박 목록
                        </h3>
                        {expDataList.length ? 
                        <Table1 onLoadData={loaderDataMain} />
                        : <h1 className="text-xl">불러올 목록이 없습니다.</h1>}
                    </div>
                    <div className="w-11/12 h-72 text-start flex justify-center flex-col mt-5">
                        <h3 className="text-xl h-10  bg-lime-800 text-white rounded-md w-fit px-4 my-2 flex items-center">
                            발주추천 목록
                        </h3>
                        {remainDataList.length ? 
                        <Table2 onLoadData={loaderDataMain}/>
                        : <h1 className="text-xl">불러올 목록이 없습니다.</h1>}
                    </div>
                </div>
            </div>
        </>
    )
}


function Table1({onLoadData}){
let {expDataList, remainDataList} = onLoadData;
const getLocationType = (area) => {
    switch (area) {
        case 'FR':
            return "매장";
        case 'BA':
            return "창고";
        default:
            return area;
    }
};
    return(
        <>
            <div className="rounded-xl overflow-auto h-full" >
                <table className="w-full mx-auto text-lg shadow-lg" style={{borderRadius:"10px"}}>
                    <thead >
                        <tr className="text-center" style={{backgroundColor:"#f6f5efb3"}} >
                            <th className="px-1">번호</th>
                            <th className="px-1">카테고리</th>
                            <th className="px-1">상품명</th>
                            <th className="px-1">규격</th>
                            <th className="px-1">단위</th>
                            <th className="px-1">옵션</th>
                            <th className="px-1">유통기한</th>
                            <th className="px-1">재고상태</th>
                            <th className="px-1">보관유형</th>
                            <th className="px-1">보관장소</th>
                            <th className="px-1">보관명칭</th>
                            <th className="px-1">수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expDataList.map(function(r,i){
                            return(
                                <tr className="h-10 text-center" style={{borderBottom:"1px dashed black", fontFamily:'Pretendard-Regular'}} key={`${r.product_id}-${i}`}>
                                    <td className="px-1">
                                        {i+1}
                                    </td>
                                    <td className="px-1">
                                        {r.category_name}
                                    </td>
                                    <td className="px-1"> 
                                        {r.product_name}
                                    </td>
                                    <td className="px-1">
                                        {r.product_standard}
                                    </td>
                                    <td className="px-1">
                                        {r.product_unit}
                                    </td>
                                    <td className="px-1">
                                        {r.product_spec}
                                    </td>
                                    <td className="px-1 w-28 ">
                                        <span style={{boxShadow: "inset 0 -20px 0 rgb(255, 200, 200)"}}className=" text-lg">{r.item_exp}</span>
                                    </td>
                                    <td className="px-1">
                                        <span className=" text-lg" style={{boxShadow: "inset 0 -20px 0 rgb(255, 245, 160)"}}>{r.item_status}</span>
                                    </td>
                                    <td className="px-1">
                                        {getLocationType(r.location_area)}
                                    </td>
                                    <td className="px-1">
                                        {r.location_section_name}
                                    </td>
                                    <td className="px-1">
                                        {r.location_alias}
                                    </td>
                                    <td className="px-1">
                                        {r.stock_quantity}
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

function Table2({onLoadData}){
    let {expDataList, remainDataList} = onLoadData;
        return(
            <>
                <div className="rounded-xl overflow-auto h-full">
                    <table className="w-full mx-auto text-lg text-center shadow-lg" style={{borderRadius:"10px"}}>
                        <thead  >
                            <tr style={{backgroundColor:"#f6f5efb3"}} >
                                <th className="px-1">번호</th>
                                <th className="px-1">카테고리</th>
                                <th className="px-1">상품명</th>
                                <th className="px-1">규격</th>
                                <th className="px-1">단위</th>
                                <th className="px-1">옵션</th>
                                <th className="px-1">잔여수량</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {remainDataList.map(function(r,i){
                                return(
                                    <tr className="h-10" style={{borderBottom:"1px dashed black", fontFamily:'Pretendard-Regular'}} key={`${r.product_id}-${i}`}>
                                        <td className="px-1">
                                            {i+1}
                                        </td>
                                        <td className="px-1">
                                            {r.category_name}
                                        </td>
                                        <td className="px-1">
                                            {r.product_name}
                                        </td>
                                        <td className="px-1">
                                            {r.product_standard}
                                        </td>
                                        <td className="px-1">
                                            {r.product_unit}
                                        </td>
                                        <td className="px-1">
                                            {r.product_spec}
                                        </td>
                                        <td className="px-1 flex justify-center">
                                            <p style={{boxShadow: "inset 0 -25px 0 rgb(200, 200, 255)"}} className="w-fit">{r.total_product_quantity}개</p>
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
    
export async function loader({ request }) {
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    const expResponse = await axios({
        method: "GET",
        url: "http://localhost:8000/api/v1/branch/main/exp",
        headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
        },
        params: {
            branch_id: branch_id
            , curDate: null
        }
    });

    if (expResponse.status !== 200) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }
    const remainResponse = await axios({
        method: "GET",
        url: "http://localhost:8000/api/v1/branch/main/remain",
        headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
        },
        params: {
            branch_id: branch_id
            , curDate: null
        }
    });

    if (expResponse.status !== 200) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    const expDataList = expResponse.data;
    const remainDataList = remainResponse.data;
    return { expDataList, remainDataList };
}
    