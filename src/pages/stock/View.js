import Search from "../../commons/Search"
import Nav from "../../commons/Nav"
import { useEffect, useState } from "react"
import axios from "axios";
import "../../sources/css/event.css"
import Pagination from "../../commons/Pagination";
import { getAuthToken } from "../../util/auth";
import { json, useLoaderData } from "react-router";
import dayjs from "dayjs";

export default function View() {
    const [datas, setDatas] = useState(useLoaderData());
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(8); // 페이지 당 아이템 수
    const [modalOpen, setModalOpen] = useState(false);
    //////////////////////////////////////////////////////////////////////////
    const loaderDataStorage = useLoaderData();
    //DB에서 조회한 전체 StockList(변경되면안됨)
    const [stockList, setStockList] = useState(loaderDataStorage);
    //카테고리 조회하는 임시 Stock List
    const [tmpStockList, setTmpStockList] = useState(loaderDataStorage);
    const [selectedStorageType, setSelectedStorageType] = useState('');
    const [selectedStorageLocation, setSelectedLocation] = useState('');
    const [selectedLocationAlias, setSelectedLocationAlias] = useState('');
    const [locationList, setLocationList] = useState([]);
    const [aliasList, setAliasList] = useState([]);

    //console.log("stockList>>>", stockList);

    /*보관개수 수정*/
    const handleQuantityChange = async (index, delta,itemId) => {
        try {
            const updatedStockList = [...datas];
            const updatedItem = { ...updatedStockList[index] };

            updatedItem.stock_quantity += delta;

            updatedStockList[index] = updatedItem;
            setDatas(updatedStockList);

            const token = getAuthToken();
            const branch_id = localStorage.getItem("branch_id");

            const response = await axios({
                method: "PUT",
                url: `http://localhost:8000/api/v1/stock/quantity/`,
                headers: {
                    'Content-Type': 'application/json',
                    'jwtauthtoken': token
                },
                params: {
                    branch_id: branch_id
                },
                data: {
                    item_id : itemId
                    ,stock_quantity: updatedItem.stock_quantity
                }
        });
        console.log("Update Quantity Response:", response.data);
        window.location.reload();
        } catch (error) {
        console.error('Error updating quantity:', error);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // 유통기한 표시 계산
    function isExpired(date){
        return dayjs().isAfter(dayjs(date).format("YYYY-MM-DD"));
    }
    function imminentExpiration(date){
        let compareDate = dayjs(date).diff(dayjs(), "day", true);
        if(compareDate <7 && compareDate > 0){
            return true;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /* 페이지네이션 */
    // 현재 페이지의 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tmpStockList.slice(indexOfFirstItem, indexOfLastItem);

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
        const totalPages = Math.ceil(tmpStockList.length / itemsPerPage);
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
    /////////////////////////////////////////////////////////////////////////////////
    /* 카테고리 필터 */
    useEffect(() => {
        doFilter();
       
    }, [selectedStorageType, selectedStorageLocation, selectedLocationAlias]);

    const getLocationType = (area) => {
        switch (area) {
            case 'FR':
                return "매장";
            case 'BA':
                return "창고";
            default:
                return area;
        }
    };

     // 선택한 보관유형 변경 시 처리
     const handleSelectedStorageTypeChange = (value) => {
        setSelectedStorageType(value);
        setSelectedLocation('');
        setSelectedLocationAlias(''); // 별칭 초기화
    };
    // 선택한 보관구역 변경시 처리
    const handleSelectedLocationChange = (value) => {
        setSelectedLocation(value);
        setSelectedLocationAlias(''); // 별칭 초기화
    }

    // 선택한 보관장소 변경 시 처리
    const handleSelectedLocationAliasChange = (value) => {
        setSelectedLocationAlias(value);
    };

    const doFilter = () => {
        console.log("doFilter  시작>>>", selectedStorageType, ", ", selectedStorageLocation, " , ", selectedLocationAlias);
        let filteredList = stockList;  // stockList로부터 필터링을 시작합니다.
        let filterTypeList = stockList; //보관유형까지 필터링된 데이터
        let filteredSectionList = stockList;  // 보관장소까지 필터링된 데이터
        
        if (selectedStorageType === "보관유형") {
            setSelectedStorageType('');
        }
        if (selectedStorageLocation === "보관구역") {
            setSelectedLocation('');
        }
        if (selectedLocationAlias === "보관명칭") {
            setSelectedLocationAlias('');
        }

        if (selectedStorageType && !selectedStorageLocation &&selectedLocationAlias) {
            // 보관유형은 정하고 보관구역을 정하지 않고 보관명칭만 보는 것은 안됨
            alert('보관구역을 선택하세요.');
            setSelectedLocationAlias('');
            return; // 필터링을 하지 않고 종료
        }


        if (selectedStorageType) {
            filteredList = filteredList.filter(stockItem =>  getLocationType(stockItem.location_area)=== selectedStorageType);
            filterTypeList =  filteredList.filter(stockItem => getLocationType(stockItem.location_area) === selectedStorageType);
            console.log("유형 필터링된 리스트", filteredList);
            if (selectedStorageLocation) {
                filteredList = filteredList.filter(stockItem => stockItem.location_section_name === selectedStorageLocation);
                filteredSectionList = filteredList.filter(stockItem => stockItem.location_section_name === selectedStorageLocation);
                console.log("구역 필터링된 리스트", filteredList);
                if (selectedLocationAlias) {
                    filteredList = filteredList.filter(stockItem => stockItem.location_alias === selectedLocationAlias);
                    console.log("보관명칭 필터링된 리스트", filteredList);
                }
            }
        }

        else if (selectedStorageLocation) {
            filteredList = filteredList.filter(stockItem => stockItem.location_section_name === selectedStorageLocation);
            filteredSectionList = filteredList.filter(stockItem => stockItem.location_section_name === selectedStorageLocation);
            console.log("구역 필터링된 리스트", filteredList);
            if (selectedLocationAlias) {
                filteredList = filteredList.filter(stockItem => stockItem.location_alias === selectedLocationAlias);
                console.log("보관명칭 필터링된 리스트", filteredList);
            }
        }
        
        else if (selectedLocationAlias) {
            filteredList = filteredList.filter(stockItem => stockItem.location_alias === selectedLocationAlias);
            console.log("보관명칭 필터링된 리스트", filteredList);
        }
        // 필터링이 완료된 데이터로 tmpStockList 갱신
        setCurrentPage(1);
        setTmpStockList(filteredList);
        locationCategoryList(filterTypeList);
        aliasCategoryList(filteredSectionList);
    };

    /* 필터링된 구역 카테고리  */
    const locationCategoryList = (filteredList) => {
        try {
            if (Array.isArray(filteredList) && filteredList.length > 0) {
                const uniqueLocation = [...new Set(filteredList.map(item => item.location_section_name))];
                setLocationList(uniqueLocation);
            } else {
                setLocationList([]);
            }
        } catch (error) {
            console.error("Error in locationCategoryList:", error);
            setLocationList([]);
        }
    };

    /* 필터링된 보관명칭 카테고리  */
    const aliasCategoryList = (filteredList) => {
        try {
            if (Array.isArray(filteredList) && filteredList.length > 0) {
                const uniqueAliases = [...new Set(filteredList.map(item => item.location_alias))];
                setAliasList(uniqueAliases);
            } else {
                setAliasList([]);
            }
        } catch (error) {
            console.error("Error in aliasCategoryList:", error);
            setAliasList([]);
        }
    };

    /////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <div style={{ height: "92vh", fontFamily: 'Pretendard-Regular' }} className="w-full mx-auto my-auto  overflow-scroll text-center">
                <div style={{ height: "7%" }}
                    className="w-3/4 my-1 mx-auto flex justify-between items-center text-2xl">
                    <div className="w-4/6 flex justify-around h-12">
                        <select className="text-center text-xl w-56 shadow-lg "
                            style={{ border: "0.1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "100%" }}
                            onChange={(e) => handleSelectedStorageTypeChange(e.target.value)}>
                            <option value="보관유형">보관유형</option>
                            <option value="매장">매장</option>
                            <option value="창고">창고</option>
                        </select>
                        <select className="text-center text-xl w-56 shadow-lg" style={{ border: "0.1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "100%" }}
                        onChange={(e) => handleSelectedLocationChange(e.target.value === '구역선택' ? '' : e.target.value)}>
                            <option value="보관구역">보관구역 </option>
                                {locationList.map((row, index) => (
                                    <option key={index}>{row}</option>
                                ))}                                
                            </select>
                        <select className="text-center text-xl w-56 shadow-lg" style={{ border: "0.1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "100%" }}
                            onChange={(e) => handleSelectedLocationAliasChange(e.target.value)}>
                        <option>보관명칭</option>
                            {aliasList.map((alias, index) => (
                                <option key={index}>{alias}</option>
                            ))}
                        </select>
                    </div>
                    <input type="button" value="QR이동" className="text-center text-lg w-28 shadow-lg" id="hoverBtn" 
                        style={{ border: "0.1px solid #d5d5d5", borderRadius: "3px", height: "70%" }} />
                    <input type="button" value="선택이동" className="text-center text-lg w-28 shadow-lg" id="hoverBtn" onClick={() => { setModalOpen(true) }}
                        style={{ border: "0.1px solid #d5d5d5", borderRadius: "3px", height: "70%" }} />
                    <input type="button" value="선택취소" className="text-center text-lg w-28 shadow-lg" id="hoverBtn" 
                        style={{ border: "0.1px solid #d5d5d5", borderRadius: "3px", height: "70%" }} />
                </div>
                <div style={{ border: "0.1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "6.8%" }}
                    className="w-3/4 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4 text-center font-bold">
                        <span className="w-10"></span>
                        <span className="w-1/12">보관유형</span>
                        <span className="w-1/12">보관구역</span>
                        <span className="w-2/12">보관명칭</span>
                        <span className="w-4/12">상품명</span>
                        <span className="w-2/12">유통기한</span>
                        <span className="w-1/12">수량</span>
                </div>
                { currentItems.length === 0 ? <h1 className="text-3xl mt-20">불러올 재고가 없습니다.</h1> :
                currentItems.map(function (r, i) {
                    return (
                        <div style={{ border: "0.1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3", height: "6.8%" }}
                            className="w-3/4 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4 text-center"
                            key={i} >
                            <input type="checkbox" className="w-10" />
                            <span className="w-1/12">{r.location_area === 'FR' ? '매장' : (r.location_area === 'BA' ? '창고' : '')}</span>
                            <span className="w-1/12">{r.location_section_name}</span>
                            <span className="w-2/12">{r.location_alias}</span>
                            <span className="w-4/12"
                                style={isExpired(r.item_exp) ?  {textDecoration: 'line-through rgb(255, 80, 80) 2px'} : null}>
                                {`${r.product_name} (${r.product_standard},${r.product_unit})`}
                            </span>
                            <span className="w-2/12"
                                style={isExpired(r.item_exp) ?  {textDecoration: 'line-through rgb(255, 80, 80) 2px'} : (imminentExpiration(r.item_exp) ? {boxShadow: 'inset 0 -30px 0 rgb(255, 200, 200)'} : null)}>
                                {r.item_exp}
                            </span>
                            <div className="w-1/12">
                                <input type='hidden' value={r.item_id} />
                                <button onClick={() => handleQuantityChange(i, -1, r.item_id)}  className="border w-8 h-8 mr-2 shadow-md page_itms">-</button>
                                <span>{r.stock_quantity}</span>
                                <button onClick={() => handleQuantityChange(i, 1, r.item_id)}  className="border w-8 h-8 ml-2 shadow-md page_itms">+</button>
                            </div>
                        </div>
                    )
                })}
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={tmpStockList.length}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onPrevClick={handlePrevClick}
                    onNextClick={handleNextClick}
                />
            </div>
            {modalOpen &&
                <Modal onSubmit={onSubmit} onCancel={onCancel} />
            }
        </>
    )
}

function Modal({ onSubmit, onCancel }) {
    return (
        <>
            <div className="modal-container" style={{fontFamily: 'Pretendard-Regular'}}>
                <div className="madal-main">
                    <div className="madal-line">
                        <div className="modal-header">
                            선택한 상품 위치를 어느 장소로 이동하시겠습니까?
                        </div>
                        <div className="modal-content">
                            <div className="modal-th_1">
                                <div className="w-full flex items-center">
                                    <div className="w-1/3">
                                        <select className="text-center text-lg w-full font-normal" style={{  background: "#f6f5efb3"}}>
                                            <option value="보관장소">보관유형</option>
                                            <option value="매장">매장</option>
                                            <option value="창고">창고</option>
                                        </select>
                                    </div>
                                    <div className="w-1/3">
                                        <select className="text-center text-lg w-full font-normal" style={{  background: "#f6f5efb3"}}>
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
                                        </select>
                                    </div>
                                    <div className="w-1/3">
                                        <select className="text-center text-lg w-full font-normal" style={{  background: "#f6f5efb3"}}>
                                            <option>보관명칭</option>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="madal-footer">
                        <button className="border-2 w-28 h-11 rounded-md page_itms" onClick={() => onSubmit()}>이동</button>
                        <button className="border-2 w-28 h-11 rounded-md page_itms" onClick={() => onCancel()}>취소</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function loader({ request }) {
    console.log("StockListPage,loader>>>>>>>>>>>>.", request)
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    console.log("token:", token);
    console.log("branch_id:", branch_id);

    const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/v1/stock/list/",
        headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
        },
        params: {
            branch_id: branch_id
        }
    });

    console.log("StockListPage.response >>>>>>>>>>>..", response);

    if (response.status !== 200) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    const resData = response.data;
    console.log("resData", resData);
    return resData;
}