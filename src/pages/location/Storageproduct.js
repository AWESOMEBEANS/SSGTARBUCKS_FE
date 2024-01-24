import React, {useState } from "react";
import Nav from "../../commons/Nav";
import Search from "../../commons/Search";
import '../../sources/css/storageproduct.css'
import Modal from "../../commons/Modal";
import { getAuthToken } from "../../util/auth";
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";

export default function Storageproduct(){
    const [modalOpen, setModalOpen] = useState(false);
    const loaderDataStorage = useLoaderData().stockLocationDataList;
    const [stockList, setStockList] = useState(loaderDataStorage);
    const [selectedStorageType, setSelectedStorageType] = useState('');
    const [selectedStorageLocation, setSelectedLocation] = useState('');
    const [selectedLocationAlias, setSelectedLocationAlias] = useState('');

    console.log("loaderDataStorage >>>", loaderDataStorage);
    const handleButtonClick = () => {
        setModalOpen(false);
    };
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
    const LOCATION_SECTION_MAP = {
        "A": "냉동고",
        "B": "냉장고",
        "C": "다용도렉",
        "D": "매대",
        "E": "상부장",
        "F": "진열대",
        "G": "서랍",
        "H": "수납장",
        "I": "하부장",
        "J": "기타",
    };
    const getLocationSection = (section) => {
        const firstLetter = section.charAt(0).toUpperCase();
        return LOCATION_SECTION_MAP[firstLetter] || section;
    };
    
    //보관유형 셀렉트박스
    const filterStockList = () => {
        if (!selectedStorageType && !selectedStorageLocation && !selectedLocationAlias) {
            return stockList;
        }

        let filteredList = stockList;

        if (selectedStorageType) {
            filteredList = filteredList.filter(stockItem => stockItem.location_area === selectedStorageType);
            if (selectedStorageLocation) {
                filteredList = filteredList.filter(stockItem => stockItem.location_section_name === selectedStorageLocation);
                if (selectedLocationAlias) {
                    filteredList = filteredList.filter(stockItem => stockItem.location_alias === selectedLocationAlias);
                }
            }
        }
        
        return filteredList;
    };

    //장소 리스트 가져오기
    const locationList = () => {
    let filteredLocationList = filterStockList();
    if (Array.isArray(filteredLocationList) && filteredLocationList.length > 0) {
        const uniqueLocations = [...new Set(filteredLocationList.map(item => item.location_section_name))];
        console.log("장소종류 : ",uniqueLocations);
        return uniqueLocations;
    } else {
        return [];
        }
    };
    //소분류 리스트 가져오기
    const aliasList = () => {
    let filteredAliasList = filterStockList();
    if (Array.isArray(filteredAliasList) && filteredAliasList.length > 0) {
        const uniqueAliases = [...new Set(filteredAliasList.map(item => item.location_alias))];
        console.log("소분류종류 : ",uniqueAliases);
        return uniqueAliases;
    } else {
        return [];
        }
    };

    return(
        <>
        <div style={{ height:"92vh", fontFamily:'Pretendard-Regular'}} className="w-full my-auto overflow-scroll">
            <div style={{margin:"2% auto",width:"80%"}}>
                <table>
                    <thead>
                        <div className="th_1 h-16">
                            <tr className="h-full flex justify-between items-center" style={{backgroundColor:"#f6f5efb3"}}>
                                <th className="w-1/5 text-lg text-center" >
                                    <select className="text-lg" style={{backgroundColor:"#f6f5efb3"}}
                                            onChange={(e) => setSelectedStorageType(e.target.value === '매장' ? 'FR' : (e.target.value === '창고' ? 'BA' : '') )}>
                                        <option value="보관장소">보관유형</option>
                                        <option value="매장">매장</option>
                                        <option value="창고">창고</option>
                                    </select>
                                </th>
                                <th className="w-1/5 text-xl text-center">
                                    <select style={{backgroundColor:"#f6f5efb3"}}
                                            onChange={(e) => setSelectedLocation(e.target.value === '구역선택' ? '' : e.target.value)}>
                                            <option value="보관장소">보관장소 </option>
                                            {locationList().map((row, index)=>(
                                                <option key={index}>{row}</option>
                                            ))}
                                    </select>
                                </th>
                                <th className="w-1/5 text-lg text-center">
                                    <select style={{backgroundColor:"#f6f5efb3"}} 
                                    onChange={(e) => setSelectedLocationAlias(e.target.value === '별칭선택' ? '' : e.target.value)}>
                                        <option>소분류</option>
                                        {aliasList().map((alias, index) => (
                                        <option key={index}>{alias}</option>
                                        ))}
                                    </select>
                                </th>
                                <th className="w-1/5 text-lg text-center">보관장소코드</th>
                                <th className="w-1/5 text-lg text-center">QR/삭제</th>
                            </tr>
                        </div>
                    </thead>
                    <tbody>
                        {filterStockList().map((row, index) => (
                            <tr className="tbody flex justify-between items-center"  key={`${row.product_id}-${index}`}>
                                <td className="text-lg w-1/5 text-center">{getLocationType(row.location_area)}</td>
                                <td className="text-lg w-1/5 text-center">{getLocationSection(row.location_section)}</td>
                                <td className="text-lg w-1/5 text-center">{row.location_alias}</td>
                                <td className="text-lg w-1/5 text-center">{row.location_code}</td>
                                <div className="text-lg w-1/5 pl-10 text-center flex items-center justify-around">
                                    <button className="btn_3" id="hoverBtn" onClick={()=> setModalOpen(true)} >QR</button>
                                    <button className="btn_4" id="hoverBtn">삭제</button>
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {modalOpen && (
        <Modal 
            onSubmit={handleButtonClick}
            onCancel={handleButtonClick}>
        </Modal>)}
        </>
    )
}

export async function loader() {
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    const expResponse = await axios({
        method: "GET",
        url: "http://localhost:8000/api/v1/branch/location/list",
        headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
        },
        params: {
            branch_id: branch_id
            , curDate: null
        }
    });

    if (expResponse.status !== 200) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    const stockLocationDataList = expResponse.data;
    return { stockLocationDataList };
}