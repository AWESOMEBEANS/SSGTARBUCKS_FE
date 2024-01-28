import React from "react";
import Nav from "../commons/Nav";
import Search from "../commons/Search"
import { getAuthToken } from "../util/auth";
import axios from "axios";
import { json, useLoaderData, useNavigate } from "react-router-dom";

export default function MyPage() {
    const myData = useLoaderData();

    return (
        <>
            <div className="w-full " style={{ height: "100%", fontFamily: 'Pretendard-Regular' }}>
                <div className="w-5/12 h-fit mx-auto my-20">
{/* 
                    <h1 className="text-4xl font-semibold mx-auto w-fit text-lime-700" style={{ fontFamily: 'SUITE-Regular' }}>SSGTARBUCKS</h1> */}

                    <div className="flex h-16 justify-around items-center rounded-lg shadow-lg my-4" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-lg font-bold pl-4">
                            <label for="id">지점명</label>
                        </h4>
                        <input className="w-96 h-10 border text-center text-xl"  disabled type="text" id="id" value={myData.branch_name}></input>

                    </div>
                    <div className="flex h-16 justify-around items-center rounded-lg shadow-lg my-4" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-lg font-bold pl-4">
                            <label for="id">지점주소</label>
                        </h4>
                        <input className="w-96 h-10 border text-center text-xl" disabled type="text" id="address" value={myData.branch_address}></input>

                    </div>
                    <div className="flex h-16 justify-around items-center rounded-lg shadow-lg my-4" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-lg font-bold pl-4">
                            <label for="e-mail">e-mail</label>
                        </h4>
                        <input className="w-96 h-10 border text-center text-xl"  disabled type="e-mail" id="e-mail" value={myData.user_email}></input>

                    </div>
                    <div className="flex h-16 justify-around items-center rounded-lg shadow-lg my-4" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-lg font-bold pl-4">
                            <label for="number">사원번호</label>
                        </h4>
                        <input className="w-96 h-10 border text-center text-xl"  disabled type="text" id="number"></input>

                    </div>
                    <div className="flex h-16 justify-around items-center rounded-lg shadow-lg my-4" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-lg font-bold pl-4">
                            <label for="number">연락처</label>
                        </h4>
                        <input className="w-96 h-10 border text-center text-xl"  disabled type="text" id="number" value={myData.user_phone}></input>
                    </div>
                    <div className="flex h-20 justify-around items-center my-20">
                        <button className="text-xl font-bold page_itms h-2/3 w-1/4 border rounded-md shadow-md" style={{fontFamily: 'SUITE-Regular'}}>수정</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export async function loader({ request }) {
    console.log("UserListPage,loader>>>>>>>>>>>>.", request)
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    const user_type = localStorage.getItem("user_type");
    console.log("token:", token);
    console.log("branch_id:", branch_id);

    const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/v1/branch/info",
        headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
        },
        params: {
            branch_id: branch_id
        }
    });

    console.log("UserListPage.response >>>>>>>>>>>..", response);

    if (response.status !== 200) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    const resData = response.data;
    console.log("resData", resData);
    return resData;
}