import React from "react";
import SearchManager from "../../commons/SearchManager";
import NavManager from "../../commons/NavManager";

export default function Managershop(){

    return(
        <>
            <div className="w-full " style={{height:"100%"}}>
                <div className="w-1/3 h-fit mx-auto my-28">

                    <h1 className="text-5xl font-semibold mx-auto w-fit text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>SSGTARBUCKS</h1>
                    
                    <div className="flex h-20 justify-around items-center rounded-2xl shadow-lg my-4" style={{backgroundColor:"#f6f5efb3", border:"1px solid #d5d5d5"}}>
                        <h4 className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>
                            <label for="id">지점이름</label>
                        </h4>
                        <input className="w-64 h-10" style={{border:"1px solid #d5d5d5"}} disabled type="text" id="id"></input>
                    </div>
                    <div className="flex h-20 justify-around items-center rounded-2xl shadow-lg my-4" style={{backgroundColor:"#f6f5efb3", border:"1px solid #d5d5d5"}}>
                        <h4 className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>
                            <label for="id">지점주소</label>
                        </h4>
                        <input className="w-64 h-10" style={{border:"1px solid #d5d5d5"}} disabled type="text" id="address"></input>
                    </div>
                    <div className="flex h-20 justify-around items-center rounded-2xl shadow-lg my-4" style={{backgroundColor:"#f6f5efb3", border:"1px solid #d5d5d5"}}>
                        <h4 className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>
                            <label for="e-mail">e-mail</label>
                        </h4>
                        <input className="w-64 h-10" style={{border:"1px solid #d5d5d5"}} disabled type="e-mail" id="e-mail"></input>
                    </div>
                    <div className="flex h-20 justify-around items-center rounded-2xl shadow-lg my-4" style={{backgroundColor:"#f6f5efb3", border:"1px solid #d5d5d5"}}>
                        <h4 className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>
                            <label for="number">사원번호</label>
                        </h4>
                        <input className="w-64 h-10" style={{border:"1px solid #d5d5d5"}} disabled type="text" id="number"></input>
                    </div>
                    <div className="flex h-20 justify-around items-center rounded-2xl shadow-lg my-4" style={{backgroundColor:"#f6f5efb3", border:"1px solid #d5d5d5"}}>
                        <h4 className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>
                            <label for="number">휴대번호</label>
                        </h4>
                        <input className="w-64 h-10" style={{border:"1px solid #d5d5d5"}} disabled type="text" id="number"></input>
                    </div>

                </div>
            </div>
    
        
        </>
    )
}