import React, { useState, useEffect } from "react";
import Pagination from "../../commons/Pagination";
import axios from "axios";


export default function Inventory(){
    const [datas, setDatas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지 당 아이템 수

    useEffect(()=>{
        axios.get("https://gonookim.github.io/product.json")
        .then((response) => { 
            console.log("check : ", response);
            setDatas(response.data);
        })
    },[]);
    
    const changeCategoryOrder = () => {
        setDatas(
            [...datas].sort(function (a, b) {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
            })
        );
    };
    
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


    console.log(datas);
    return(
        <>
            <div style={{ height:"92vh", fontFamily:'Pretendard-Regular'}} className="w-full mx-auto my-auto  overflow-scroll text-center">
                <div style={{height:"7%"}} 
                        className="w-5/6 mx-auto flex justify-between items-center">
                    <div className="text-center text-lg w-1/12 flex justify-center items-center shadow-lg" 
                        style={{fontSize:"14px", border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"70%"}}
                        onClick={changeCategoryOrder}>
                        <select style={{backgroundColor:"#f6f5efb3"}}>
                        <option style={{textAlign:'center',border:"1px solid #d5d5d5"}} value="">카테고리</option>
                                    <option value="dog">철수</option>
                                    <option value="cat">훈이</option>
                                    <option value="hamster">맹구</option>
                                    <option value="parrot">짱구</option>
                            </select>
                    </div>
                    <div className="text-lg w-1/2 flex justify-around items-center shadow-lg" style={{border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"70%"}}>
                        <span className="w-3/6">
                            상품명
                            
                        </span>
                        <span className="w-2/6">
                            용량
                            
                        </span>
                        <span className="w-2/6">
                            수량
                            
                        </span>
                    </div>
                    <div className="text-center text-lg w-2/5 flex justify-center items-center shadow-lg" style={{border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"70%"}}>
                        <span className="w-3/4">
                            보관장소
                            
                        </span>
                        <span className="w-1/4 mr-3">
                            유통기한
                            
                        </span>
                    </div>
                </div>
                {currentItems.map(function(r,i){
                    return(
                        <div style={{height:"8.5%"}} 
                        className="w-5/6 mx-auto flex justify-between items-center text-2xl">
                            <div className="text-center text-lg w-1/12 flex justify-center items-center shadow-lg" style={{border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"70%"}}>
                                {r.product_id}
                            </div>
                            <div className="text-lg w-1/2 flex justify-around items-center shadow-lg" style={{border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"70%"}}>
                                <span className="w-3/6">{r.product_name}</span>
                                <span className="w-2/6">{r.product_standard}</span>
                                <span className="w-2/6">{r.product_quantity}</span>
                            </div>
                            <div className="text-center text-lg w-2/5 flex justify-center items-center shadow-lg" style={{border:"1px solid #d5d5d5", borderRadius:"7px", background:"#f6f5efb3", height:"70%"}}>
                                <span className="w-3/4">보관장소</span>
                                <span className="w-1/4 bg-red-400 mr-3">2024-01-25</span>
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

