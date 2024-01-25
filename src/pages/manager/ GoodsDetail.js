import React from "react";

import btb from '../../sources/image/btb.png';
import Nav from "../../commons/Nav";
import Search from "../../commons/Search"
export default function GoodsDetail(){

    return(
        <>
        {/* <Search/> */}
        <div className="low-opacity-bg-image flex">
            {/* <Nav/> */}
            <div style={{width:'50%', float:'left'}}>
            <div style={{padding:'30px'}}>
            <div className="w-1/1 h-fit mx-auto my-28">
                <div style={{paddingLeft:"60px",paddingTop:"40px"}}>
                {/* <h1 className="text-3xl font-semibold mx-auto w-fit text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>상품이미지</h1> */}
                    <div style={{paddingTop:'30px'}}>
                        <img style={{width:"450px",height:"400px"}} src={btb}/>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div style={{width:'50%', float:'right'}}>
            <div style={{padding:'30px'}}>
                <div className="w-1/1 h-fit mx-auto my-28">
                <h1 className="text-5xl font-semibold mx-auto w-fit text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>SSGTARBUCKS</h1>
                    <div className="flex h-20 justify-around items-center rounded-2xl shadow-lg my-4" style={{backgroundColor:"#f6f5efb3", border:"1px solid #d5d5d5"}}>
                        <h4 className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>
                            <label for="id">상품이름</label>
                        </h4>
                        <input className="w-64 h-10" style={{border:"1px solid #d5d5d5"}} disabled type="text" id="id"></input>
                    </div>
                    <div className="flex h-20 justify-around items-center rounded-2xl shadow-lg my-4" style={{backgroundColor:"#f6f5efb3", border:"1px solid #d5d5d5"}}>
                        <h4 className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>
                            <label for="id">상품정보</label>
                        </h4>
                        <input className="w-64 h-10" style={{border:"1px solid #d5d5d5"}} disabled type="text" id="address"></input>
                    </div>
                    
                    <div className="flex h-20 justify-around items-center rounded-2xl shadow-lg my-4" style={{backgroundColor:"#f6f5efb3", border:"1px solid #d5d5d5"}}>
                        <h4 className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>
                            <label for="number">QR정보</label>
                        </h4>
                        <input className="w-64 h-10" style={{border:"1px solid #d5d5d5"}} disabled type="text" id="number"></input>
                    </div>
                    <div className="flex h-20 justify-around items-center rounded-2xl shadow-lg my-4"style={{backgroundColor:"#f6f5efb3", border:"1px solid #d5d5d5"}}>
                        <div><button className="text-2xl  text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>확인</button></div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        
        </>
    )
}