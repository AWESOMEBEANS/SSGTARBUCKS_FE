import React, {useState } from "react";
import '../../sources/css/storageproductmanager.css'
import NavManager from "../../commons/NavManager";
import SearchManager from "../../commons/SearchManager";
import { Link } from "react-router-dom";





export default function Managersolstice(){

    return(
        <>
        {/* <SearchManager/> */}
        
        {/* <NavManager/> */}
        <div style={{width:"100%",height:"80%"}}>
            <div className="main" style={{margin:"5% auto",width:"85%"}}>
                <div className="middle">
                    <table>
                        <thead>
                            <div className="th_1">
                                <tr className="thead">
                                    <div className="head"><th className="h_2">지점이름</th></div>
                                    <div className="head"><th className="h_3">지점주소</th></div>
                                    <div className="head"><th className="h_4">사원이름</th></div>
                                </tr>
                            </div>
                        </thead>
                        <tbody>
                            <div style={{height:"20%"}}>
                                <button className="btn-body">
                                    <Link className="btn-body" to="/manager/detail">
                                    <tr className="tbody">
                                        <div className="body"><td className="b_4">센텀그린타워점</td></div>
                                        <div className="body"><td className="b_4">부산 해운대구 샌텀중앙로 78</td></div>
                                        <div className="body"><td className="b_5">오승원</td></div>
                                    </tr>
                                    </Link>
                                </button>
                            </div>
                        </tbody>
                    </table>
                </div>    
            </div>
        </div>
        
</>
    )
}
