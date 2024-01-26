import React, { useState, useEffect } from "react";
import Nav from "../../commons/Nav.js";
import Search from "../../commons/Search.js"
import Pagination from "../../commons/Pagination.js";
import axios from "axios";
import { getAuthToken } from "../../util/auth.js";
import { json, useLoaderData, useNavigate } from "react-router";


export default function Store() {
    const [datas, setDatas] = useState(useLoaderData());
    const [scanResult, setScanResult] = useState('');
    const [itemId, setitemId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지 당 아이템 수
    const navigate = useNavigate();

    const handleScanWebCam = (result) => {
        setScanResult(result);
    };
    const handleclick = (itemId) => {
        setModalOpen(!modalOpen);
        setitemId(itemId);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!scanResult) {
                return;
            }
            try {
                console.log("스캔결과값----------------->", scanResult);
                console.log("선택한 검수내역의 아이템 아이디---->", itemId);
                const token = getAuthToken();
                const response = await axios.get(
                    `http://localhost:8000/api/v1/stock/checked/insert/location`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'jwtauthtoken': token
                        }, params: {
                            scanResult: scanResult,
                            item_id: itemId
                        },
                    }
                );
                console.log("LocationInsertPage.response >>>>>>>>>>>..", response);
                if (response.status !== 200) {
                    throw json({ message: '검색에 실패했습니다.' }, { status: 500 });
                }
                const resData = response.data;
                console.log("resData", resData);
                //navigate('/income/list/inspection', { prams: { incomeId: resData } });
                navigate(`/stock/checked/inspection`);
            } catch (error) {
                console.error("Error during fetchData:", error);
                //navigate('/error', { state: { errorMessage: '조회시 없음' } });
            }
        };
        if (scanResult) {
            fetchData();
        }
    }, [scanResult, navigate]);

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

    return (
        <>
            <div style={{ height: "92vh", fontFamily: 'Pretendard-Regular' }} className="w-full mx-auto my-auto  overflow-scroll text-center">
                <div style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3" }}
                    className="w-4/5 h-14 my-4 mx-auto flex justify-between items-center text-lg shadow-lg px-3 text-center font-bold">
                        <span className="w-14">번호</span>
                        <span className="w-16">입고코드</span>
                        <span className="w-1/12">입고일자</span>
                        <span className="w-2/12">입고상품명</span>
                        <span className="w-1/12">입고상품개수</span>
                        <span className="w-1/12">유통기한</span>
                        <span className="w-16">보관장소</span>
                </div>
                {datas.map(function (r, i) {
                    return (
                        <div style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "6.5%" }}
                        className="w-4/5 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-3 text-center">
                                <span className="w-14">{i+1}</span>
                                <span className="w-16">{r.income_code}</span>
                                <span className="w-1/12">{r.income_date}</span>
                                <span className="w-2/12">{r.product_name} ({r.product_standard},{r.product_unit})</span>
                                <span className="w-1/12">{r.income_list_quantity}</span>
                                <span className="w-1/12">{r.item_exp}</span>
                                <button className="w-16 h-10 border shadow-md rounded-md" id="hoverBtn" onClick={handleclick} >
                                    <i className="fa-solid fa-expand fa-xl" ></i>
                                </button>
                        </div>
                    )
                })}
                { datas.length === 0  ? <h1 className="text-3xl mt-20">불러올 데이터가 없습니다.</h1> : 
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={datas.length}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onPrevClick={handlePrevClick}
                    onNextClick={handleNextClick}
                /> 
                }
            </div>
        </>
    )
}

export async function loader({ request, params }) {
    console.log("InspectionPage, loader >>>>>>>>>>>>.", request, params);
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    const incomeId = params.incomeId;
    console.log("incomeId---------->", incomeId);
    console.log("token:", token);
    console.log("branch_id:", branch_id);

    const response = await axios({
        method: "GET",
        url: `http://localhost:8000/api/v1/stock/checked/inspection`,
        headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
        }, params: {
            branch_id: branch_id
        }
    });
    console.log("InspectionPage.response >>>>>>>>>>>..", response);

    if (response.status !== 200) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    const resData = response.data;
    console.log("resData", resData);
    return resData;
}