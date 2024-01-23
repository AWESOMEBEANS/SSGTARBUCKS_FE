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

    const loaderDataStorage = useLoaderData().stockLocationDataList;
    console.log("loaderDataStorage >>>", loaderDataStorage);

    return(
        <>
        <div style={{ height:"92vh", fontFamily:'Pretendard-Regular'}} className="w-full my-auto overflow-scroll">
            <div style={{margin:"2% auto",width:"80%"}}>
                <table>
                    <thead>
                        <div className="th_1 h-16">
                            <tr className="h-full flex justify-between items-center" style={{backgroundColor:"#f6f5efb3"}}>
                                <th className="w-1/5 text-lg text-center" >
                                    <select className=" text-lg" style={{backgroundColor:"#f6f5efb3"}}>
                                        <option value="보관장소">보관유형</option>
                                        <option value="매장">매장</option>
                                        <option value="창고">창고</option>
                                    </select>
                                </th>
                                <th className="w-1/5 text-xl text-center">
                                    <select className="" style={{backgroundColor:"#f6f5efb3"}}>
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
                                </th>
                                <th className="w-1/5 text-lg text-center">소분류</th>
                                <th className="w-1/5 text-lg text-center">보관장소코드</th>
                                <th className="w-1/5 text-lg text-center">QR/삭제</th>
                            </tr>
                        </div>
                    </thead>
                    <tbody>
                        {loaderDataStorage.map((row, index) => (
                            <tr className="tbody flex justify-between items-center"  key={`${row.product_id}-${index}`}>
                                <td className="text-lg w-1/5 text-center">{getLocationType(row.location_area)}</td>
                                <td className="text-lg w-1/5 text-center">{getLocationSection(row.location_section)}</td>
                                <td className="text-lg w-1/5 text-center">{row.location_alias}</td>
                                <td className="text-lg w-1/5 text-center">{row.location_code}</td>
                                <div className="text-lg w-1/5 pl-10 text-center flex items-center justify-around">
                                    <button className="btn_3" onClick={()=> setModalOpen(true)}>QR</button>
                                    <button className="btn_4">삭제</button>
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