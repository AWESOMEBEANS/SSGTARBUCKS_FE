import Search from "../../commons/Search"
import Nav from "../../commons/Nav"
import { useEffect, useState } from "react"
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

export default function History(){
    let [toggle, setToggle] = useState(false);
    const [datas, setDatas] = useState([]);

    const incomeList = useLoaderData();
    console.log("incomeList >>>>" , incomeList);

    return(
        <>
            <div style={{ height:"92vh", fontFamily:'Pretendard-Regular'}} className="w-full my-auto overflow-scroll">

                <div style={{border:"1px solid #d5d5d5", borderRadius:"3px", background:"#f6f5efb3", height:"5%" }} 
                    className="w-11/12 my-4 mx-auto flex justify-between items-center text-lg shadow-lg px-3 text-center font-bold">
                    <i className="w-8"></i>
                    <span className="w-1/12">입고번호</span>
                    <span className="w-2/12">입고코드</span>
                    <span className="w-1/12">입고일자</span>
                    <span className="w-1/12">입고 총 개수</span>
                    <span className="w-1/12">입고상태</span>
                    <span className="w-1/12">입고목록번호</span>
                    <span className="w-1/12">입고상품개수</span>
                    <span className="w-1/12">입고상품번호</span>
                    <span className="w-1/12">입고상품유통기한</span>
                    <span className="w-2/12" >입고상품명</span>
                </div>
                {incomeList.map(function(r,i){
                    return(
                    <>
                        <div style={{border:"1px solid #d5d5d5", borderRadius:"3px", background:"#f6f5efb3", height:"6.5%"}} 
                            className="w-11/12 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-3 text-center">
                            <i className="fa-solid fa-angle-down fa-fade fa-lg grow-0 w-8" onClick={()=>{setToggle(!toggle)}}></i>
                            <span className="w-1/12">{r.income_id}</span>
                            <span className="w-2/12">{r.income_code}</span>
                            <span className="w-1/12">{r.income_date}</span>
                            <span className="w-1/12">{r.income_amount}</span>
                            <span className="w-1/12">{r.income_status}</span>
                            <span className="w-1/12">{r.income_list_id}</span>
                            <span className="w-1/12">{r.income_list_quantity}</span>
                            <span className="w-1/12">{r.item_id}</span>
                            <span className="w-1/12">{r.item_exp}</span>
                            <span className="w-2/12">{r.product_name}</span>
                        </div>
                        {toggle ? <Detail /> : null}
                    </>
                    )
                })}
            </div>
        </>
    )
}

function Detail(){

    return(
        <>
            <div className="bg-green-50 w-11/12 p-2 mx-auto">
                <div style={{border:"1px solid #d5d5d5", borderRadius:"5px", background:"white", height:"5vh"}} 
                    className="w-11/12 my-2 mx-auto flex justify-between items-center text-lg shadow-lg px-4">
                        <span className="w-1/6">{1}</span>
                        <span className="w-2/6">{"바질 치즈 포카치아"}</span>
                        <span className="w-1/6">{"211g"}</span>
                        <span className="w-1/6">{"1EX"}</span>
                        <span className="w-1/6">{"90"}</span>
                </div>
                <div style={{border:"1px solid #d5d5d5", borderRadius:"5px", background:"white", height:"5vh"}} 
                    className="w-11/12 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4">
                        <span className="w-1/6">{2}</span>
                        <span className="w-2/6">{"베이컨 크림치즈 씨드롤"}</span>
                        <span className="w-1/6">{"212g"}</span>
                        <span className="w-1/6">{"1EX"}</span>
                        <span className="w-1/6">{"91"}</span>
                </div>
                <div style={{border:"1px solid #d5d5d5", borderRadius:"5px", background:"white", height:"5vh"}} 
                    className="w-11/12 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4">
                        <span className="w-1/6">{3}</span>
                        <span className="w-2/6">{"바질 토마토 크림치즈 베이글"}</span>
                        <span className="w-1/6">{"200g"}</span>
                        <span className="w-1/6">{"1EX"}</span>
                        <span className="w-1/6">{"112"}</span>
                </div>
                <div style={{border:"1px solid #d5d5d5", borderRadius:"5px", background:"white", height:"5vh"}} 
                    className="w-11/12 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4">
                        <span className="w-1/6">{2}</span>
                        <span className="w-2/6">{"크림치즈 브리오슈 보스톡"}</span>
                        <span className="w-1/6">{"220g"}</span>
                        <span className="w-1/6">{"1EX"}</span>
                        <span className="w-1/6">{"162"}</span>
                </div>
            </div>
        </>
    )
}

export async function loader({ request }) {
    console.log("IncomeListPage,loader>>>>>>>>>>>>.", request)
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    console.log("token:", token);
    console.log("branch_id:", branch_id);
  
    const response = await axios({
      method: "GET",
      url: "http://localhost:8000/api/v1/income/list/",
      headers: {
        'Content-Type': 'application/json',
        'jwtauthtoken': token
      },
      params: {
        branch_id: branch_id
      }
    });
  
    console.log("IncomeListPage.response >>>>>>>>>>>..", response);
  
    if (response.status !== 200) {
      throw json({ message: 'Could not save event.' }, { status: 500 });
    }
  
    const resData = response.data;
    console.log("resData", resData);
    return resData;
  }
  