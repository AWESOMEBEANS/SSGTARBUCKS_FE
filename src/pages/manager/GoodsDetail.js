import React, { useState } from "react";
import { getAuthToken } from "../../util/auth";
import { json, useLoaderData } from "react-router-dom";
import axios from "axios";


export default function GoodsDetail(){
    const [ datas, setDatas ] = useState(useLoaderData());
    console.log("datas>>>", datas);

    return(
        <>
        <div className="low-opacity-bg-image flex">
            <div style={{width:'50%', float:'left'}}>
            <div style={{padding:'30px'}}>
            <div className="w-1/1 h-fit mx-auto my-28">
                <div style={{paddingLeft:"60px",paddingTop:"40px"}}>
                {/* <h1 className="text-3xl font-semibold mx-auto w-fit text-lime-700" style={{fontFamily: 'SUITE-Regular'}}>상품이미지</h1> */}
                    <div style={{paddingTop:'30px'}}>
                        <img style={{width:"450px",height:"400px"}} />
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

export async function loader({ request }) {
    console.log("ProductDetailPage,loader>>>>>>>>>>>>.", request)
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    const product_id = 103;
    console.log("token:", token);
    console.log("branch_id:", branch_id);

    const response = await axios({
        method: "GET",
        url: `http://localhost:8000/api/v1/product/detail/${product_id}`,
        headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
        },
        params: {
            branch_id: branch_id
        }
    });

    console.log("ProductDetailPage.response >>>>>>>>>>>..", response);

    if (response.status !== 200) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    const resData = response.data;
    console.log("resData", resData);
    return resData;
}