import React from "react";
import Nav from "../commons/Nav";
import Search from "../commons/Search"
import "../sources/css/scanner.css"


export default function Release(){

    return(
        <>
        <div className="bg_btnpage" style={{ fontFamily:'Pretendard-Regular'}}>
            <div className="box_btn flex">
                <div className="box_btn_inn">
                    <h1 className="text-3xl font-semibold">사용등록</h1>
                    <button className="w-80 h-80 shadow-slate-700 shadow-md rounded-md" id="qrbtn"></button>
                    <h3 className="text-lg text-red-700 font-bold my-3">※ 카메라를 켜주세요</h3>
                </div>

                <div className="box_btn_inn">
                    <h1 className="text-3xl font-semibold">폐기등록</h1>
                    <button className="w-80 h-80 shadow-slate-700 shadow-md rounded-md" id="qrbtn"></button>
                    <h3 className="text-lg text-red-700 font-bold my-3">※ 카메라를 켜주세요</h3>
                </div>
            </div>
        </div>
        </>

    )
}