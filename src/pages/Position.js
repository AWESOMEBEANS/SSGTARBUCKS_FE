import React, { useState } from "react";
import '../sources/css/position.css'
import Nav from "./../commons/Nav";
import Search from "./../commons/Search.js";


export default function Position(){

    const [rowCount, setRowCount] = useState(1);
    const handleAddRow = () => {
        setRowCount(rowCount + 1);
    };
    const handleDeleteRow = () => {
        setRowCount(rowCount - 1);
    };

    return(
        <>
        <Search/>
        <div className="low-opacity-bg-image" style={{display:"flex"}}>
            <Nav/>
            <div style={{ height:"92vh"}} className="w-full my-auto overflow-scroll">
                <div style={{margin:"2% auto", width:"70%"}}>
                        <table>
                            <thead>
                                <tr className="flex items-center h-16 border-2 shadow-md rounded-xl">
                                        <th className="h-full w-full flex items-center justify-center px-5 text-lg" style={{backgroundColor: "#f6f5efb3"}}>보관유형</th>
                                        <th className="h-full w-full flex items-center justify-center px-5 text-lg" style={{backgroundColor: "#f6f5efb3"}}>보관장소</th>
                                        <th className="h-full w-full flex items-center justify-center px-5 text-lg" style={{backgroundColor: "#f6f5efb3"}}>소분류</th>
                                </tr>
                            </thead>
                            <div className="w-full flex justify-center items-center">
                                <div className="btn m-2 text-bold" onClick={handleAddRow}>
                                    <button className="text-lg" >+</button>
                                </div>
                                <div className="btn m-2 text-bold" onClick={handleDeleteRow}>
                                    <button className="text-lg" >-</button>
                                </div>
                            </div>
                            <tbody id="text">
                                {[...Array(rowCount)].map((row, index) => (
                                    <div style={{height:"20%"}}>
                                        <tr key={index} className="tbody">
                                            <div className="w-full flex justify-around items-center px-5">
                                                <td className="w-1/3 text-center text-lg">
                                                    <select className="table_select border text-center">
                                                        <option value="구역">구역</option>
                                                        <option value="매장">매장</option>
                                                        <option value="창고">창고</option>
                                                    </select>
                                                </td>
                                                <td className="w-1/3 text-center">
                                                    <select className="table_select text-lg border text-center">
                                                        <option value="보관장소">보관장소 </option>
                                                        <option value="상부장">상부장</option>
                                                        <option value="하부장">하부장</option>
                                                        <option value="냉장고">냉장고</option>
                                                        <option value="냉동고">냉동고</option>
                                                        <option value="쇼케이스">쇼케이스</option>
                                                        <option value="다용도랙">다용도랙</option>
                                                        <option value="진열대">진열대</option>
                                                        <option value="매대">매대</option>
                                                        <option value="기타">기타</option>
                                                    </select>
                                                </td>
                                                <td className="w-1/3 text-center text-lg">
                                                    <input className="table_input border text-center" type="text" placeholder="소분류"/>
                                                </td>
                                            </div>
                                        </tr>
                                    </div>
                                ))}           
                            </tbody>
                                <div className="my-14 flex justify-end items-center">
                                    <div><button className="btn_2 text-lg border-2">저장</button></div>
                                    <div><button className="btn_3 text-lg border-2">취소</button></div>
                                </div>
                        </table>
                </div>
            </div>
        </div>
        
        </>


    )
}