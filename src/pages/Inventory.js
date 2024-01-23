import React from "react";
import Nav from "../commons/Nav";
import Search from "../commons/Search"
import '../sources/css/scanner.css'


export default function Inventory(){

    return(
        <>
            <div className="bg_btnpage" style={{ fontFamily:'Pretendard-Regular'}}>
                <div className="box_btn flex">
                    <div className="box_btn_inn">
                        <h1 className="btn_name">보관상품</h1>
                        <button className="w-96 h-96 shadow-slate-700 shadow-xl rounded-3xl" id="qrbtn"></button>
                        <h3 className="text-lg text-red-700 font-bold my-3">※ 카메라를 켜주세요</h3>
                    </div>

                    <div className="box_btn_inn">
                        <h1 className="btn_name">보관장소</h1>
                        <button className="w-96 h-96 shadow-slate-700 shadow-xl rounded-3xl" id="qrbtn"></button>
                        <h3 className="text-lg text-red-700 font-bold my-3">※ 카메라를 켜주세요</h3>
                    </div>
                </div>
            </div>
        </>

    )
}