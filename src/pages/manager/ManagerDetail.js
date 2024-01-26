import React from "react";
import SearchManager from "../../commons/SearchManager";
import NavManager from "../../commons/NavManager";

export default function ManagerDetail(){

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
                    
                    <div className="flex h-20 justify-around items-center rounded-2xl shadow-lg my-4" style={{textAlign:'center',backgroundColor:"#f6f5efb3", border:"1px solid #d5d5d5"}}>
                        <h4 className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>
                        <label for="id">사원이름</label>
                        </h4>
                            <select for="number" className="w-64 h-10" style={{textAlign:'center',backgroundColor:"#f6f5efb3",border:"1px solid #d5d5d5"}} >
                            <option value="">선택해주세요.</option>
                                    <option value="dog">철수</option>
                                    <option value="cat">훈이</option>
                                    <option value="hamster">맹구</option>
                                    <option value="parrot">짱구</option>
                            </select>
                        
                    </div>
                    <div className="flex h-20 justify-around items-center rounded-2xl shadow-lg my-4"style={{backgroundColor:"#f6f5efb3", border:"1px solid #d5d5d5"}}>
                        <div><button className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>수정</button></div>
                        <div><button className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>삭제</button></div>
                    </div>
                </div>
            </div>
        
        </>
    )
}