import React, { useEffect, useState } from "react";
import Nav from "../commons/Nav";
import Search from "../commons/Search"
import '../sources/css/salelist.css';
import axios from 'axios';
import Pagination from "../commons/Pagination";
import { getAuthToken } from "../util/auth";
import { json, useLoaderData } from "react-router";


export default function Salelist() {
    const [datas, setDatas] = useState(useLoaderData());

    const handleSaleListUpdate = async () => {
        try {
            const token = getAuthToken();
            const branch_id = localStorage.getItem("branch_id");

            const response = await axios({
                method: "PUT",
                url: `http://localhost:8000/api/v1/stock/sale/product`,
                headers: {
                    'Content-Type': 'application/json',
                    'jwtauthtoken': token
                },
                params: {
                    branch_id: branch_id
                }
            });

            console.log("Update Quantity Response:", response.data);

            // Reload the page
            window.location.reload();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    return (
        <>
        <div style={{ height: "92vh", fontFamily: 'Pretendard-Regular' }} className="w-full mx-auto my-auto  overflow-scroll text-center">
                <div className="w-2/3 my-4 mx-auto flex justify-around items-center text-xl h-14 rounded-md border font-bold shadow-lg" style={{background: "#f6f5efb3"}}>
                    <span className="w-1/12">번호</span>
                    <span className="w-2/12">상품명</span>
                    <span className="w-1/12">상품번호</span>
                    <span className="w-2/12">판매번호</span>
                    <span className="w-1/12">판매개수</span>
                    <span className="w-2/12">판매날짜</span>
                    <span className="w-1/12">판매상태</span>
                </div>
                { datas.length === 0 ? <h1 className="text-3xl mt-20">갱신할 판매목록이 없습니다.</h1> : 
                <>
                {datas.map(function (r, i) {
                    return (
                        <div style={{ height: "6.8%" }}
                            className="w-2/3 my-3 mx-auto flex justify-center items-center text-2xl"
                            key={i} >
                            <div style={{ border: "0.1px solid #d5d5d5", borderRadius: "7px", background: "#f6f5efb3", height: "100%" }}
                                className="w-11/12  flex justify-between items-center text-lg shadow-lg px-4">
                                <span className="w-1/12">{i+1}</span>
                                <span className="w-2/12">{r.product_name}</span>
                                <span className="w-1/12">{r.item_id}</span>
                                <span className="w-2/12">{r.sale_code}</span>
                                <span className="w-1/12">{r.sale_list_quantity}</span>
                                <span className="w-2/12">{r.sale_date}</span>
                                <span className="w-1/12">{r.sale_status}</span>
                            </div>
                        </div>
                    )
                })}
                <div className="w-3/5 my-5 mx-auto flex justify-center items-center text-2xl h-10">
                    <input type="button" value="갱신하기" className="text-center text-xl w-28 shadow-lg border rounded-md h-full btn_salelist "/>
                </div>
                </>
                }
            </div>
        </>
    )
}

export async function loader({ request }) {
    console.log("OutcomeListPage,loader>>>>>>>>>>>>.", request)
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    console.log("token:", token);
    console.log("branch_id:", branch_id);
    const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/v1/stock/sale/list",
        headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
        },
        params: {
            branch_id: branch_id
        }
    });
    console.log("OutcomeListPage.response >>>>>>>>>>>..", response);
    if (response.status !== 200) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }
    const resData = response.data;
    console.log("resData", resData);
    return resData;
}