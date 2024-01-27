import React, { useState } from "react";
import SearchManager from "../../commons/SearchManager";
import NavManager from "../../commons/NavManager";
import { useLoaderData, useNavigate, useParams } from "react-router";

export default function ManagerDetail(){
    const [datas, setDatas] = useState(useLoaderData());
    const [edit, setEdit] = useState(true);
    const params = useParams();
    const navigate = useNavigate();
    const targetObject = datas.find(item => item.branch_id === params.branch_id);

    return(
        <>
            <div className="w-full " style={{ height: "100%", fontFamily: 'Pretendard-Regular' }}>
                <div className="w-2/4 h-full mx-auto my-10">

                    <div className="flex h-14 justify-around items-center rounded-sm shadow-lg my-4" style={{ backgroundColor: "#8c8279", color:"white", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-2xl pl-4 font-bold">
                            {targetObject.branch_name}
                        </h4>
                    </div>

                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="id">지점주소</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border" disabled type="text" id="address" value={targetObject.branch_address}></input>
                    </div>

                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="e-mail">지점코드</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border"  disabled type="e-mail" id="e-mail" value={targetObject.branch_id}></input>
                    </div>

                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="number">매니저이름</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border"  disabled={edit} type="text" id="number" value={targetObject.user_name}></input>
                    </div>

                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="number">매니저연락처</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border"  disabled={edit} type="text" id="number" value={targetObject.user_phone}></input>
                    </div>

                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="number">매니저이메일</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border"  disabled={edit} type="text" id="number" value={targetObject.user_email}></input>
                    </div>

                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="number">매니저코드</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border"  disabled type="text" id="number" value={targetObject.user_id}></input>
                    </div>

                    <div className="w-11/12 mx-auto flex h-16 justify-around items-center rounded-md">
                        <button className="text-xl font-semibold page_itms w-1/4 mx-5 h-5/6 shadow-lg rounded-md" style={{fontFamily: 'Pretendard-Regular'}} onClick={()=>setEdit(!edit)}>{edit ? "수정" : "저장"}</button>
                        <button className="text-xl font-semibold page_itms w-1/4 mx-5 h-5/6 shadow-lg rounded-md" style={{fontFamily: 'Pretendard-Regular'}} onClick={()=>navigate(-1)}>뒤로가기</button>
                    </div>
                </div>
            </div>
        </>
    )
}