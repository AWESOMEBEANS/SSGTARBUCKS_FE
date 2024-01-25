import React, { useState, useEffect } from "react";
import Pagination from "../../commons/Pagination";
import axios from "axios";
import { json, useLoaderData } from "react-router";
import { getAuthToken } from "../../util/auth";
import dayjs from "dayjs";


export default function Inventory() {
    const [datas, setDatas] = useState(useLoaderData());
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지 당 아이템 수

    // 현재 페이지의 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 이전 페이지로 이동
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 다음 페이지로 이동
    const handleNextClick = () => {
        const totalPages = Math.ceil(datas.length / itemsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

        // 유통기한 계산
        function isExpired(date){
            return dayjs().isAfter(dayjs(date).format("YYYY-MM-DD"));
        }
        function imminentExpiration(date){
            let compareDate = dayjs(date).diff(dayjs(), "day", true);
            if(compareDate <7 && compareDate > 0){
                return true;
            }
        }

    console.log(datas);
    return (
        <>
            <div style={{ height: "92vh", fontFamily: 'Pretendard-Regular' }} className="w-full mx-auto my-auto  overflow-scroll text-center">
                <div className="w-5/6 mx-auto flex justify-between items-center font-bold h-14 my-4">
                    <div className="text-center text-lg w-40 flex justify-center items-center shadow-lg h-full border rounded-md"
                        style={{ backgroundColor: "#f6f5efb3" }}>
                        <select className="text-center" style={{ backgroundColor: "#f6f5efb3" }}>
                            <option value="">카테고리</option>
                            { currentItems.map(function (r, i) {
                                return <option value={r.category_name}>{r.category_name}</option>
                            })}
                        </select>
                    </div>
                    <div className="text-lg w-11/12 flex border rounded-md justify-around items-center shadow-lg h-full" style={{ background: "#f6f5efb3" }}>
                        <span className="w-2/12">상품명</span>
                        <span className="w-16">상품규격</span>
                        <span className="w-16">상품단위</span>
                        <span className="w-16">상품상세</span>
                        <span className="w-1/12">상품번호</span>
                        <span className="w-1/12">입고일</span>
                        <span className="w-10">개수</span>
                        <span className="w-1/12">유통기한</span>
                    </div>
                </div>
                {currentItems.map(function (r, i) {
                    return (
                        <div style={{ height: "6.5%" }} className="w-5/6 mx-auto flex justify-between items-center my-3">
                            <div className="text-center text-lg w-40 flex justify-center items-center shadow-lg border rounded-md h-full" style={{ background: "#f6f5efb3" }}>
                                {r.category_name}
                            </div>
                            <div className="text-lg w-11/12 flex justify-around items-center shadow-lg border rounded-md text-center h-full" style={{ background: "#f6f5efb3" }}>
                                <span className="w-2/12" style={isExpired(r.item_exp) ?  {textDecoration: 'line-through rgb(255, 80, 80) 2px'} : null} >{r.product_name}</span>
                                <span className="w-16" style={isExpired(r.item_exp) ?  {textDecoration: 'line-through rgb(255, 80, 80) 2px'} : null} >{r.product_standard}</span>
                                <span className="w-16" style={isExpired(r.item_exp) ?  {textDecoration: 'line-through rgb(255, 80, 80) 2px'} : null} >{r.product_unit}</span>
                                <span className="w-16" style={isExpired(r.item_exp) ?  {textDecoration: 'line-through rgb(255, 80, 80) 2px'} : null}>{r.product_spec}</span>
                                <span className="w-1/12" style={isExpired(r.item_exp) ?  {textDecoration: 'line-through rgb(255, 80, 80) 2px'} : null}>{r.item_id}</span>
                                <span className="w-1/12" style={isExpired(r.item_exp) ?  {textDecoration: 'line-through rgb(255, 80, 80) 2px'} : null}>{r.stock_date}</span>
                                <span className="w-10" style={isExpired(r.item_exp) ?  {textDecoration: 'line-through rgb(255, 80, 80) 2px'} : null}>{r.stock_quantity}</span>
                                <span className="w-1/12"
                                style={isExpired(r.item_exp) ?  {textDecoration: 'line-through rgb(255, 80, 80) 2px'} : (imminentExpiration(r.item_exp) ? {boxShadow: 'inset 0 -30px 0 rgb(255, 200, 200)'} : null)}>
                                    {r.item_exp}
                                </span>
                            </div>
                        </div>
                    )
                })}
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={datas.length}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onPrevClick={handlePrevClick}
                    onNextClick={handleNextClick}
                />
            </div>
        </>
    )
}

export async function loader({ request }) {
    console.log("ProductListPage,loader>>>>>>>>>>>>.", request)
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    console.log("token:", token);
    console.log("branch_id:", branch_id);

    const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/v1/product/list/",
        headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
        },
        params: {
            branch_id: branch_id
        }
    });

    console.log("ProductListPage.response >>>>>>>>>>>..", response);

    if (response.status !== 200) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    const resData = response.data;
    console.log("resData", resData);
    return resData;
}