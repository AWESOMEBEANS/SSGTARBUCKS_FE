import Search from "../../commons/Search"
import Nav from "../../commons/Nav"
import { useEffect, useState } from "react"
import axios from "axios";
import "../../sources/css/event.css"
import Pagination from "../../commons/Pagination";


export default function View(){
    const [datas, setDatas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지 당 아이템 수
    const [modalOpen, setModalOpen] = useState(false);

      //보관개수수정
    // const handleQuantityChange = async (index, delta,itemId) => {
    //     try {
    //         const updatedStockList = [...stockList];
    //         const updatedItem = { ...updatedStockList[index] };

    //         updatedItem.stock_quantity += delta;

    //         updatedStockList[index] = updatedItem;
    //         setStockList(updatedStockList);

    //         const token = getAuthToken();
    //         const branch_id = localStorage.getItem("branch_id");
            
    //         const response = await axios({
    //             method: "PUT",
    //             url: `http://localhost:8000/api/v1/stock/quantity/`,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'jwtauthtoken': token
    //             },
    //             params: {
    //                 branch_id: branch_id
    //             },
    //             data: {
    //                 item_id : itemId
    //                 ,stock_quantity: updatedItem.stock_quantity
    //             }
    //     });
    //     console.log("Update Quantity Response:", response.data);
    //     window.location.reload();
    //     } catch (error) {
    //     console.error('Error updating quantity:', error);
    //     }
    // };

    useEffect(()=>{
        axios.get("https://gonookim.github.io/product.json")
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

    const onSubmit = () => {
        setModalOpen(false)
    }
    const onCancel = () => {
        setModalOpen(false)
    }

    return(
        <>
            <div style={{ height:"92vh", fontFamily:'Pretendard-Regular'}} className="w-full mx-auto my-auto  overflow-scroll text-center">
                <div style={{height:"7%"}} 
                        className="w-2/3 my-1 mx-auto flex justify-between items-center text-2xl">
                    <div className="w-4/6 flex justify-around h-12">
                        <select className="text-center text-xl w-56 font-bold shadow-lg" 
                            style={{border:"0.1px solid #d5d5d5", borderRadius:"3px", background:"#f6f5efb3", height:"100%"}}
                            >
                            <option>보관유형</option>
                            <option>매장</option>
                            <option>창고</option>
                        </select>
                        <select className="text-center text-xl w-56 font-bold shadow-lg" style={{border:"0.1px solid #d5d5d5", borderRadius:"3px", background:"#f6f5efb3", height:"100%"}}>
                            <option>보관장소</option>
                            <option>상부장</option>
                            <option>하부장</option>
                            <option>냉장고</option>
                            <option>냉동고</option>
                            <option>쇼케이스</option>
                            <option>매대</option>
                            <option>진열대</option>
                            <option>다용도랙</option>
                            <option>기타</option>
                        </select>
                        <select className="text-center text-xl w-56 font-bold shadow-lg" style={{border:"0.1px solid #d5d5d5", borderRadius:"3px", background:"#f6f5efb3", height:"100%"}}>
                            <option>소분류</option>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                        </select>
                    </div>
                    <input type="button" value="상품스캔" className="text-center text-xl w-28 font-bold shadow-lg" id="hoverBtn"
                    style={{border:"0.1px solid #d5d5d5", borderRadius:"3px", height:"70%"}}/>
                    <input type="button" value="장소스캔" className="text-center text-xl w-28 font-bold shadow-lg" id="hoverBtn"
                    style={{border:"0.1px solid #d5d5d5", borderRadius:"3px", height:"70%"}}/>
                    <input type="button" value="선택이동" className="text-center text-xl w-28 font-bold shadow-lg" id="hoverBtn" onClick={()=>{setModalOpen(true)}}
                    style={{border:"0.1px solid #d5d5d5", borderRadius:"3px", height:"70%"}}/>
                </div>
                {currentItems.map(function(r,i){
                    return(
                    <div style={{border:"0.1px solid #d5d5d5", borderRadius:"3px", background:"#f6f5efb3", height:"6.8%"}} 
                        className="w-2/3 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4"
                        key={i} >
                        <input type="checkbox" className="w-20"></input>
                            <span className="w-1/6">{r.product_id}</span>
                            <span className="w-2/6">{r.product_name}</span>
                            <span className="w-1/6">{r.product_standard}</span>
                            <span className="w-1/6">{r.product_unit}</span>
                        <div className="w-1/6">
                            <input type='hidden' value={r.income_id} />
                            <button /*onClick={() => handleQuantityChange(i, 1, r.income_id)} */ className="border w-8 h-8">+</button>
                                <span>{r.product_quantity}</span>
                            <button /*onClick={() => handleQuantityChange(i, -1, r.income_id)} */ className="border w-8 h-8">-</button>
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
            { modalOpen &&
                <Modal onSubmit={onSubmit} onCancel={onCancel}/>
            }
        </>
    )
}

function Modal({onSubmit, onCancel}){
    return(
        <>
            <div className="modal-container">
                <div className="madal-main">
                    <div className="madal-line">
                        <div className="modal-header">
                            선택한 상품 위치를 이동하시겠습니까?
                        </div>
                        <div className="modal-content">
                        <table>
                            <thead>
                                <div className="modal-th_1">
                                    <tr className="modal-thead">
                                        <div className="modal-head"><th className="modal-h_2"><select className="modal-h_select">
                                                    <option value="보관장소">보관유형</option>
                                                    <option value="매장">매장</option>
                                                    <option value="창고">창고</option>
                                            </select></th></div>
                                        <div className="modal-head"><th className="modal-h_3"><select className="modal-h_select">
                                                    <option value="보관장소">보관장소 </option>
                                                    <option value="상부장">상부장</option>
                                                    <option value="하부장">하부장</option>
                                                    <option value="냉장고">냉장고</option>
                                                    <option value="냉동고">냉동고</option>
                                                    <option value="쇼케이스">쇼케이스</option>
                                                    <option value="다용도랙">다용도랙</option>
                                                    <option value="진열대">진열대</option>
                                                    <option value="매대">매대</option>
                                                    <option value="기타">기타</option>
                                            </select></th></div>
                                        <div className="modal-head"><input className="modal-h4" type="text" placeholder="소분류"></input></div>
                                    </tr>
                                </div>
                            </thead>
                        </table>
                        </div>
                    </div>
                    <div className="madal-footer">
                        <button className="btn btn-submit" onClick={()=> onSubmit()}>이동</button>
                        <button className="btn btn-cancel" onClick={() => onCancel()}>취소</button>
                    </div>
                </div>
            </div>
        </>
    )
}