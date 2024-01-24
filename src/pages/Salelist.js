import React, { useEffect, useState } from "react";
import Nav from "../commons/Nav";
import Search from "../commons/Search"
import '../sources/css/salelist.css';
import axios from 'axios';
import Pagination from "../commons/Pagination";


export default function Salelist(){
    const [datas, setDatas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지 당 아이템 수

    useEffect(()=>{
        axios.get("https://gonookim.github.io/outcome.json")
        .then((a) => { 
            console.log("check : ", a);
            setDatas(a.data);
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
            <div style={{ height:"92vh", fontFamily:'Pretendard-Regular'}} className="w-full mx-auto my-auto  overflow-scroll text-center">
                <div style={{height:"7%"}} 
                        className="w-3/5 my-1 mx-auto flex justify-end items-center text-2xl">
                    <input type="button" value="갱신하기" className="text-center text-xl w-28 font-bold shadow-lg btn_salelist" style={{border:"0.1px solid #d5d5d5", borderRadius:"7px", height:"60%"}}/>
                </div>
                {currentItems.map(function(r,i){
                    return(
                    <div style={{height:"6.8%"}} 
                        className="w-3/5 my-3 mx-auto flex justify-center items-center text-2xl"
                        key={i} >
                        <div style={{border:"0.1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"100%"}} 
                        className="w-11/12  flex justify-between items-center text-lg shadow-lg px-4">
                            <input type="checkbox" className="w-1/6"></input>
                            <span className="w-1/6">{r.outcome_id}</span>
                            <span className="w-2/6">CODE : {r.outcome_code}</span>
                            <span className="w-1/6">수량 : {r.outcome_amount}</span>
                            <span className="w-1/6">{r.outcome_date}</span>
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
