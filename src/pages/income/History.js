import Search from "../../commons/Search"
import Nav from "../../commons/Nav"
import { useEffect, useState } from "react"
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

export default function History() {
    let [toggle, setToggle] = useState([]);
    const [datas, setDatas] = useState([]);
    const [incomeId, setIncomeId] = useState(0);

    const incomeList = useLoaderData();
    console.log("incomeList >>>>", incomeList);
    let groupedList = incomeList.reduce((acc, curr) => {
        const { income_id } = curr;
        if(acc[income_id]) acc[income_id].push(curr);
        else acc[income_id] = [curr];
        return acc;
    }, {});
    console.log("groupedList >>>", groupedList);


    ////////////////////////
    let groupedListkeys = Object.keys(groupedList);
    console.log("groupedListkeys >>>",groupedListkeys);
    groupedListkeys.map(key=>{console.log(groupedList[key][0]);})

    //////////////////////
    let emptyArray = [];
    emptyArray[5] = true;
    console.log("emptyArray >>",emptyArray);

    return (
        <>
            <div style={{ height: "92vh", fontFamily: 'Pretendard-Regular' }} className="w-full my-auto overflow-scroll">

                <div style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "5%" }}
                    className="w-3/4 my-4 mx-auto flex justify-between items-center text-lg shadow-lg px-3 text-center font-bold">
                    <i className="w-8"></i>
                    <span className="w-1/12">입고번호</span>
                    <span className="w-2/12">입고일자</span>
                    <span className="w-1/12">입고 총 개수</span>
                    <span className="w-1/12">입고상태</span>
                    <span className="w-1/12">입고목록번호</span>
                    <span className="w-1/12">입고상품번호</span>
                    <span className="w-2/12">입고상품유통기한</span>
                </div>
                {groupedListkeys.map((key, index) => {
                    const isToggled = toggle === key; // 현재 키에 해당하는 아이템이 펼쳐져 있는지 여부
                    return (
                        <>
                            <div
                                style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "6.5%" }}
                                className="w-3/4 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-3 text-center"
                            >
                                <i
                                    className={`fa-solid fa-angle-${isToggled ? 'up' : 'down'} fa-fade fa-lg grow-0 w-8`}
                                    onClick={() => {
                                        setToggle(isToggled ? null : key); // 클릭 시 현재 상태의 반대로 토글
                                        setIncomeId(isToggled ? 0 : groupedList[key][0].income_id);
                                    }}
                                ></i>
                                <span className="w-1/12">{groupedList[key][0].income_id}</span>
                                <span className="w-2/12">{groupedList[key][0].income_date}</span>
                                <span className="w-1/12">{groupedList[key][0].income_amount}</span>
                                <span className="w-1/12">{groupedList[key][0].income_status}</span>
                                <span className="w-1/12">{groupedList[key][0].income_list_id}</span>
                                <span className="w-1/12">{groupedList[key][0].item_id}</span>
                                <span className="w-2/12">{groupedList[key][0].item_exp}</span>
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
            <div className="bg-green-50 w-3/4 p-2 mx-auto">
                {true && groupedDetailList[id].map((row, index) => 
                        <div style={{ border: "1px solid #d5d5d5", borderRadius: "5px", background: "white", height: "5vh" }}
                            className="w-11/12 my-2 mx-auto flex justify-between items-center text-lg shadow-lg px-4">
                            <span className="w-1/6">{index+1}</span>
                            <span className="w-2/6">{row.product_name}</span>
                            <span className="w-1/6">{row.income_list_result}</span>
                            <span className="w-1/6">{row.income_status}</span>
                            <span className="w-1/6">{row.item_exp}</span>
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
