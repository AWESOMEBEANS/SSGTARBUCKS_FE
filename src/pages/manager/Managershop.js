import React, { useState } from "react";
import SearchManager from "../../commons/SearchManager";
import NavManager from "../../commons/NavManager";
import axios from "axios";
import { getAuthToken } from "../../util/auth";
import { json, useLoaderData } from "react-router-dom";

export default function Managershop() {
    const [ datas, setDatas ] = useState(useLoaderData());
    const [ editPwd, setEditPwd ] = useState(true);
    console.log("myshop >>", datas);

    return (
        <>
            <div className="w-full " style={{ height: "100%", fontFamily: "Pretendard-Regular" }}>
                <div className="w-2/5 h-fit mx-auto my-20">
                <div className="flex h-14 justify-around items-center  my-2" >
                    <h4 className="text-3xl font-bold " style={{ fontFamily: "EASTARJET-Medium", textDecoration: "underline #eaeaea", textUnderlineOffset: "10px" }}>
                        내 정보
                    </h4>
                </div>
                <div className="flex h-16 justify-between px-20 items-center rounded-lg shadow-lg my-4 " style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-lg font-bold" >
                            <label for="e-mail">이름</label>
                        </h4>
                        <input className="w-3/5 h-10 border text-xl text-center" disabled type="e-mail" id="e-mail" value={datas.user_name}></input>
                    </div>
                <div className="flex h-16 justify-between px-20 items-center rounded-lg shadow-lg my-4 " style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-lg font-bold">
                            <label for="e-mail">직원 코드</label>
                        </h4>
                        <input className="w-3/5 h-10 border text-xl text-center" disabled type="e-mail" id="e-mail" value={datas.user_id}></input>
                    </div>
                    <div className="flex h-16 justify-between px-20 items-center rounded-lg shadow-lg my-4 " style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-lg font-bold">
                            <label for="number">비밀번호</label>
                        </h4>
                        <input className="w-3/5 h-10 border text-xl text-center" disabled={editPwd} type="password" id="number"></input>
                    </div>
                    { !editPwd &&
                    <div className="flex h-16 justify-between px-20 items-center rounded-lg shadow-lg my-4 " style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-lg font-bold">
                            <label for="number">비밀번호 확인</label>
                        </h4>
                        <input className="w-3/5 h-10 border text-xl text-center" disabled={editPwd} type="password" id="number"></input>
                    </div>
                    }
                    <div className="flex h-16 justify-between px-20 items-center rounded-lg shadow-lg my-4 " style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-lg font-bold">
                            <label for="e-mail">이메일</label>
                        </h4>
                        <input className="w-3/5 h-10 border text-xl text-center" disabled type="e-mail" id="e-mail" value={datas.user_email}></input>
                    </div>
                    <div className="flex h-16 justify-between px-20 items-center rounded-lg shadow-lg my-4 " style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-lg font-bold">
                            <label for="e-mail">연락처</label>
                        </h4>
                        <input className="w-3/5 h-10 border text-xl text-center" disabled type="e-mail" id="e-mail" value={datas.user_phone}></input>
                    </div>
                   
                    <div className="flex h-20 justify-center items-center my-4">
                        <button className="text-lg h-3/5 w-1/4 border shadow-lg rounded-lg page_itms" onClick={()=>setEditPwd(!editPwd)}>{editPwd ? "비밀번호 변경" : "변경하기"}</button>
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
        url: "http://localhost:8000/api/v1/admin/info",
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
