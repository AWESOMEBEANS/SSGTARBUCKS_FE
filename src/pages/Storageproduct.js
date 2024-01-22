import React, {useState } from "react";
import Nav from "./../commons/Nav";
import Search from "./../commons/Search";
import '../sources/css/storageproduct.css'
import Modal from "./../commons/Modal";

export default function Storageproduct(){
    const [modalOpen, setModalOpen] = useState(false);
    const handleButtonClick = () => {
        setModalOpen(false);
    };

    return(
        <>
        <Search/>
        <div className="low-opacity-bg-image" style={{display:"flex"}}>
        <Nav/>
            <div style={{ height:"92vh"}} className="w-full my-auto overflow-scroll">
                <div style={{margin:"2% auto",width:"80%"}}>
                    <table>
                        <thead>
                            <div className="th_1 h-16">
                                <tr className="h-full flex justify-between items-center" style={{backgroundColor:"#f6f5efb3"}}>
                                    <th className="w-1/6 text-lg text-center">번호</th>
                                    <th className="w-1/6 text-lg text-center" >
                                        <select className=" text-lg" style={{backgroundColor:"#f6f5efb3"}}>
                                            <option value="보관장소">보관유형</option>
                                            <option value="매장">매장</option>
                                            <option value="창고">창고</option>
                                        </select>
                                    </th>
                                    <th className="w-1/6 text-lg text-center">
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
                                    <th className="w-1/6 text-lg text-center">소분류</th>
                                    <th className="w-1/6 text-lg text-center">보관장소코드</th>
                                    <th className="w-1/6 text-lg text-center">QR/삭제</th>
                                </tr>
                            </div>
                        </thead>
                        <tbody>
                            <tr className="tbody">
                                <td className="text-lg">No.1</td>
                                <td className="text-lg">매장</td>
                                <td className="text-lg">상부장</td>
                                <td className="text-lg">하단옆</td>
                                <td className="text-lg">DA-1233-123123</td>
                                <div className="text-lg" style={{display: "flex",alignitems:"center"}}>
                                    <button className="btn_3" onClick={()=> setModalOpen(true)}>QR</button>
                                    <button className="btn_4">삭제</button>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
