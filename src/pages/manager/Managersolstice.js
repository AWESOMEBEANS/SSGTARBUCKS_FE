import React, { useState } from "react";
import '../../sources/css/storageproductmanager.css'
import NavManager from "../../commons/NavManager";
import SearchManager from "../../commons/SearchManager";
import { Link, json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import axios from "axios";

export default function Managersolstice() {
    const [ datas, setDatas ] = useState(useLoaderData());
    const branchList = useLoaderData();
    console.log("datas >>>", datas);
    console.log("branchList >>>", branchList);

    return (
        <>
            <div style={{ height: "92vh", fontFamily: 'Pretendard-Regular' }} className="w-full my-auto overflow-scroll">
                <div style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3" }}
                    className="w-3/5 h-14 my-4 mx-auto flex justify-around items-center text-lg shadow-lg px-3 text-center font-bold">
                    <span className="w-16">번호</span>
                    <span className="w-1/4">지점명</span>
                    <span className="w-1/2">지점주소</span>
                    <span className="w-1/4">매니저</span>
                </div>
                { branchList.map((row, index)=> {
                    <div
                    style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "6.5%" }}
                    className="w-3/5 my-3 mx-auto flex justify-around items-center text-lg shadow-lg px-3 text-center"
                    >
                        <span className="w-16">{index + 1}</span>
                        <span className="w-1/4">{row.branch_name}</span>
                        <span className="w-1/2">{row.branch_address}</span>
                        <span className="w-1/4">{row.user_name}</span>
                    </div>
                })}
            </div>
        </>
    )
}

export async function loader({ request }) {
    console.log("BranchListPage,loader>>>>>>>>>>>>.", request)
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    console.log("token:", token);
    console.log("branch_id:", branch_id);

    const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/v1/admin/branch/list",
        headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
        }
    });

    console.log("BranchListPage.response >>>>>>>>>>>..", response);

    if (response.status !== 200) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    const resData = response.data;
    console.log("resData", resData);
    return resData;
}