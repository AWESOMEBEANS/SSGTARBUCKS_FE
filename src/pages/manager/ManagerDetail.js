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
                <div className="w-2/4 h-full mx-auto my-8">
                    
                    <div className="flex h-14 justify-around items-center  my-2" >
                        <h4 className="text-3xl font-bold " style={{fontFamily:"EASTARJET-Medium", textDecoration:"underline #eaeaea", textUnderlineOffset:"10px"}}>
                            {targetObject.branch_name} 
                        </h4>
                    </div>
                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="e-mail">지점 코드</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border"  disabled type="e-mail" id="e-mail" value={targetObject.branch_id}></input>
                    </div>
                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="id">지점명</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border" disabled type="text" id="address" value={targetObject.branch_name}></input>
                    </div>
                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="id">지점 주소</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border" disabled type="text" id="address" value={targetObject.branch_address.match(/([^(]*)/)[0].trim()}></input>
                    </div>
                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="id">지점 상세주소</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border" disabled type="text" id="address" value={targetObject.branch_address.match(/\(([^)]+)\)/)[1].trim()}></input>
                    </div>
                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="number">담당 직원</label>
                        </h4>
                        {edit&&<input className="w-96 h-10 text-center text-xl border"  disabled={edit} type="text" id="number" value={targetObject.user_name}></input>}
                        {!edit&&<select for="number" className="w-64 h-10" style={{textAlign:'center',backgroundColor:"#f6f5efb3",border:"1px solid #d5d5d5"}} >
                            <option value="">선택해주세요.</option>
                                    <option value="dog">철수</option>
                                    <option value="cat">훈이</option>
                                    <option value="hamster">맹구</option>
                                    <option value="parrot">짱구</option>
                            </select>}
                    </div>
                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="number">직원 코드</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border"  disabled type="text" id="number" value={targetObject.user_id}></input>
                    </div>
                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="number">연락처</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border"  disabled type="text" id="number" value={targetObject.user_phone}></input>
                    </div>
                    <div className="w-full mx-auto flex h-16 justify-around items-center rounded-lg shadow-lg my-8" style={{ backgroundColor: "#f6f5efb3", border: "1px solid #d5d5d5" }}>
                        <h4 className="text-md font-bold pl-4">
                            <label for="number">이메일</label>
                        </h4>
                        <input className="w-96 h-10 text-center text-xl border"  disabled type="text" id="number" value={targetObject.user_email}></input>
                    </div>
                    <div className="w-11/12 mx-auto flex h-20 justify-around items-center rounded-md">
                        <button className="text-xl border page_itms w-1/4 mx-5 h-3/5 shadow-lg rounded-md" style={{fontFamily: 'Pretendard-Regular'}} onClick={()=>setEdit(!edit)}>{edit ? "담당직원 변경" : "저장"}</button>
                        <button className="text-xl border page_itms w-1/4 mx-5 h-3/5 shadow-lg rounded-md" style={{fontFamily: 'Pretendard-Regular'}} onClick={()=>navigate(-1)}>{edit ? "확인" : "취소"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}