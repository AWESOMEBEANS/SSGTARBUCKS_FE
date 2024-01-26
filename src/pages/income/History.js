import Search from "../../commons/Search"
import Nav from "../../commons/Nav"
import { useEffect, useState } from "react"
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

export default function History() {
    let [toggle, setToggle] = useState([]);
    const [incomeId, setIncomeId] = useState(0);
    const initialIncomeList = useLoaderData();
    
    let groupedList = initialIncomeList.reduce((acc, curr) => {
        const { income_id } = curr;
        if (acc[income_id]) acc[income_id].push(curr);
        else acc[income_id] = [curr];
        return acc;
    }, {});

    console.log("groupedList >>>", groupedList);
    let groupedListkeys = Object.keys(groupedList).reverse();
    const resultArray = groupedListkeys.map(key => groupedList[key][0]);

    return (
        <>
            <div style={{ height: "92vh", fontFamily: 'Pretendard-Regular' }} className="w-full my-auto overflow-scroll">

                <div style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3" }}
                    className="w-3/5 h-14 my-4 mx-auto flex justify-between items-center text-lg shadow-lg px-3 text-center font-bold">
                    <i className="w-8"></i>
                    <span className="w-1/16">No</span>
                    <span className="w-1/12">입고코드</span>
                    <span className="w-1/12">입고총량</span>
                    <span className="w-2/12">입고일자</span>
                    <span className="w-1/12">입고상태</span>

                </div>
                {groupedListkeys.map((key, index) => {
                    const isToggled = toggle === key; // 현재 키에 해당하는 아이템이 펼쳐져 있는지 여부
                    return (
                        <>
                            <div
                                style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "6.5%" }}
                                className="w-3/5 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-3 text-center"
                            >
                                <i
                                    className={`fa-solid fa-angle-${isToggled ? 'up' : 'down'} fa-fade fa-lg grow-0 w-8`}
                                    onClick={() => {
                                        setToggle(isToggled ? null : key); // 클릭 시 현재 상태의 반대로 토글
                                        setIncomeId(isToggled ? 0 : groupedList[key][0].income_id);
                                    }}
                                ></i>
                                <span className="w-1/16">{index+1}</span>
                                <span className="w-1/12">{groupedList[key][0].income_code}</span>
                                <span className="w-1/12">{groupedList[key][0].income_amount}</span>
                                <span className="w-2/12">{groupedList[key][0].income_date}</span>
                                <span className="w-1/12">{groupedList[key][0].income_status}</span>

                            </div>
                            {isToggled && <Detail id={groupedList[key][0].income_id} />} {/* 토글된 경우에만 Detail 컴포넌트 렌더링 */}
                        </>
                    )
                })}
            </div>
        </>
    )
}

function Detail({id}) {
    const incomeDetailList = useLoaderData();
    let groupedDetailList = incomeDetailList.reduce((acc, curr) => {
        const { income_id } = curr;
        if(acc[income_id]) acc[income_id].push(curr);
        else acc[income_id] = [curr];
        return acc;
    }, {});

    return (
        <>
            <div className= "w-3/5 p-2 mx-auto" style={{backgroundColor : "#f0f0f0aa"}}>
                <div style={{ border: "1px solid #d5d5d5", borderRadius: "5px", background: "white", }}
                    className="w-11/12 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4 h-10 font-bold text-center">
                    <span className="w-1/12">번호</span>
                    <span className="w-2/6">상품명</span>
                    <span className="w-1/6">유통기한</span>
                    <span className="w-1/6">승인여부</span>
                    <span className="w-1/12">QR</span>
                </div>
                {true && groupedDetailList[id].map((row, index) => 
                    <div style={{ border: "1px solid #d5d5d5", borderRadius: "5px", background: "white", height: "6vh" }}
                        className="w-11/12 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4 text-center ">
                        <span className="w-1/12">{index+1}</span>
                        <span className="w-2/6">{row.product_name}({row.product_standard}, {row.product_unit})</span>
                        <span className="w-1/6">{row.item_exp}</span>
                        <span className="w-1/6">{row.income_list_result}</span>
                        <button className="w-1/12 border-2 h-8 shadow-md page_itms rounded-sm">스캔</button>
                    </div>
                )}
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
