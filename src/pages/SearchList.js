import React, { useState, useEffect } from "react";
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../util/auth.js";
import dayjs from "dayjs";


export default function SearchList() {

    //초기 검색 데이터(변경X)
    const initialData = useLoaderData();
    //정렬을 위해 쓸 데이터 (변경O)
    const [sortedSearchResult, setSortedSearchResult] = useState(useLoaderData());

    const [isExpAscending, setIsExpAscending] = useState(true);
    const [isQtyAscending, setIsQtyAscending] = useState(true);


    //console.log("현재시각 : ", dayjs());
    //console.log(dayjs().isAfter(dayjs("2024-01-23").format("YYYY-MM-DD")));

    function isExpired(date) {
        return dayjs().isAfter(dayjs(date).format("YYYY-MM-DD"));
    }
    function imminentExpiration(date) {
        let compareDate = dayjs(date).diff(dayjs(), "day", true);
        if (compareDate < 7 && compareDate > 0) {
            return true;
        }
    }
    //console.log("isExpired >>", isExpired("2024-01-23"));
    //console.log("imminentExpiration >>", imminentExpiration("2024-01-25"));

    //////////////////////////////////////////////////////////////////////////////
    /* 유통기한&수량별 상품 정렬 */
    const handleExpButtonClick = () => {
        console.log("유통기한순 정렬(오름차순 유무) : ", isExpAscending);
        setIsExpAscending(!isExpAscending);
        sortExpSearchResult();
    };

    const handleQtyButtonClick = () => {
        console.log("수량순 정렬(오름차순 유무) : ", isQtyAscending);
        setIsQtyAscending(!isQtyAscending);
        sortQtySearchResult();
    };

    const sortExpSearchResult = () => {
        const sortedResult = [...initialData].sort((a, b) => {
            const dateA = new Date(a.item_exp);
            const dateB = new Date(b.item_exp);

            return isExpAscending ? dateA - dateB : dateB - dateA;
        });

        setSortedSearchResult([...sortedResult]);
    };

    const sortQtySearchResult = () => {
        const sortedResult = [...initialData].sort((a, b) => {
          const qtyComparison = isQtyAscending ? a.stock_quantity - b.stock_quantity : b.stock_quantity - a.stock_quantity;
          return qtyComparison;
        });
      
        setSortedSearchResult([...sortedResult]);
      };


    ////////////////////////////////////////////////////////////////////////////////
    console.log("여기>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SearchListReLoad()");
    console.log(sortedSearchResult);
    return (

        <>
            <div style={{ height: "92vh", fontFamily: 'Pretendard-Regular' }} className="w-full mx-auto my-auto  overflow-scroll text-center ">
                <div style={{ height: "8%" }}
                    className="w-5/6 mx-auto flex justify-between items-center mt-5">
                    <div className="text-center text-lg w-10 flex justify-center items-center shadow-lg font-bold"
                        style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "70%" }}
                    >
                        번호
                    </div>
                    <div className="text-lg w-7/12 flex justify-around items-center shadow-lg font-bold text-center" style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "70%" }}>
                        <span className="w-1/4">
                            카테고리
                        </span>
                        <span className="w-3/6">
                            상품명
                        </span>
                        <span className="w-1/12">
                            상세
                        </span>
                        <span className="w-1/6 mx-3" onClick={handleExpButtonClick}>
                            유통기한
                            <i className={`fa-solid fa-sort ml-2`}></i>
                        </span>
                        <span className="w-1/6 mr-3">
                            상품상태
                        </span>
                    </div>
                    <div className="text-center text-lg w-2/6 flex justify-center items-center shadow-lg font-bold" style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "70%" }}>
                        <span className="w-1/4">
                            저장유형
                        </span>
                        <span className="w-1/4">
                            저장장소
                        </span>
                        <span className="w-1/4">
                            저장별칭
                        </span>
                        <span className="w-1/4 mx-2" onClick={handleQtyButtonClick}>
                            수량
                            <i className={`fa-solid fa-sort ml-2`}></i>
                        </span>
                    </div>
                </div>
                {sortedSearchResult.map(function (r, i) {
                    return (
                        <div style={{ height: "8.5%" }}
                            className="w-5/6 mx-auto flex justify-between items-center text-2xl" key={`${r.product_id}-${i}`}>
                            <div className="text-center text-lg w-10 flex justify-center items-center shadow-lg" style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "70%" }}>
                                {i + 1}
                            </div>
                            <div className="text-lg w-7/12 flex justify-around items-center shadow-lg text-center" style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "70%" }}>
                                <span className="w-1/4"
                                    style={isExpired(r.item_exp) ? { textDecoration: 'line-through rgb(255, 80, 80) 2px' } : null}>{r.category_name}</span>
                                <span className="w-3/6"
                                style={isExpired(r.item_exp) ?  {textDecoration: 'line-through rgb(255, 80, 80) 2px'} : null}>{`${r.product_name} (${r.product_standard} , ${r.product_unit})`}</span>
                                <span className="w-1/12"
                                >{r.product_spec}</span>
                                <span className="w-1/6 mx-3"
                                    style={isExpired(r.item_exp) ? { textDecoration: 'line-through rgb(255, 80, 80) 2px' } : (imminentExpiration(r.item_exp) ? { boxShadow: 'inset 0 -30px 0 rgb(255, 200, 200)' } : null)}>
                                    {r.item_exp}
                                </span>
                                <span className="w-1/6 mr-3" style={{ boxShadow: "inset 0 -30px 0 rgb(255, 245, 160)" }}>{r.item_status}</span>
                            </div>
                            <div className="text-center text-lg w-2/6 flex justify-center items-center shadow-lg" style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "70%" }}>
                                <span className="w-1/4">{r.location_area === "FR" ? "매장" : "창고"}</span>
                                <span className="w-1/4">{r.location_section_name}</span>
                                <span className="w-1/4">{r.location_alias}</span>
                                <span className="w-1/4">{r.stock_quantity}</span>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export async function loader({ request, params }) {
    console.log("SearchResultPage,loader>>>>>>>>>>>>.", request, params);
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    console.log("token:", token);
    console.log("branch_id:", branch_id);
    const searchWord = params['searchWord'];

    if (searchWord == null) {
        searchWord = '';
    }
    const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/v1/branch/integrate/search/",
        headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
        },
        params: {
            branch_id: branch_id
            , searchWord: searchWord
        }
    });
    console.log("SearchResultPage.response >>>>>>>>>>>..", response);

    if (response.status !== 200) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    const resData = response.data;
    console.log("resData", resData);
    return resData;
}
