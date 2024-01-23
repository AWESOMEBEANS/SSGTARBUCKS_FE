import React, { useState, useEffect } from "react";
import Nav from "./../commons/Nav.js";
import Search from "./../commons/Search.js"
import Pagination from "../commons/Pagination.js";
import axios from "axios";


export default function Store(){
    const [datas, setDatas] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지 당 아이템 수

    useEffect(()=>{
        axios.get("https://gonookim.github.io/product.json")
        .then((response) => { 
            console.log("check : ", response);
            setDatas(response.data);
        })
    },[]);

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

    return(
        <>
            <div style={{ height:"92vh" ,fontFamily:'Pretendard-Regular'}} className="w-full mx-auto my-auto  overflow-scroll text-center">
                <div style={{height:"7%"}} 
                        className="w-3/5 mx-auto flex justify-between items-center text-2xl">
                    <div className="text-center text-xl w-14 font-bold " style={{borderBottom:"3px solid black",  height:"50%"}}>
                        No
                    </div>
                    <div className="text-center text-xl w-3/4 font-bold" style={{borderBottom:"3px solid black",  height:"50%"}}>
                        상품내역
                    </div>

                    <div className="text-center text-xl w-48 font-bold" style={{borderBottom:"3px solid black",  height:"50%"}}>
                        보관장소
                    </div>
                </div>
                {currentItems.map(function(r,i){
                    return(
                        <div style={{height:"8.5%"}} 
                        className="w-3/5 mx-auto flex justify-between items-center text-2xl">
                            <div className="text-center text-xl w-14 font-normal flex justify-center items-center shadow-lg" style={{border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"70%"}}>
                                {r.product_id}
                            </div>
                            <div className="text-lg w-3/4 font-normal flex justify-around items-center shadow-lg" style={{border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"70%"}}>
                                <span className="w-3/6">{r.product_name}</span>
                                <span className="w-1/6">{r.product_standard}</span>
                                <span className="w-1/6">{r.product_unit}</span>
                                <span className="w-1/6">{r.product_quantity}</span>
                            </div>
                            <div className="text-center text-xl w-48 font-bold flex justify-center items-center shadow-lg" style={{border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"70%"}}>
                                <button>
                                    <i className="fa-solid fa-expand fa-xl" ></i>
                                </button>
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
