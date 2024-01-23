import { Form, Link } from "react-router-dom";
import "../sources/css/nav.css";
import { useState } from "react";


export default function Nav(){
    let [isActive, setIsActive] = useState(false);
    let [masterData, setMasterData] = useState(false);
    let [wareHousing, setWareHousing] = useState(false);
    let [inventory, setInventory] = useState(false);
    let [factory, setFactory] = useState(false);

    return(
        <>
            <nav style={(isActive ? {width : "3%"} : {width : "11%"})}>
                <div className="content">
                    <div id="menu">
                        <a className="menu_link" onClick={()=>{setMasterData(!masterData)
                                                                setWareHousing(false)
                                                                setInventory(false)
                                                                setFactory(false)}}>
                            <div className="menu_itm">
                                <i className="fa-solid fa-qrcode fa-lg menu_icon"></i>
                                { !isActive && 
                                <span className="menu_name" >
                                    기준정보
                                </span>
                                }
                            </div>
                        </a>
                        {isActive ? null : (masterData ? <MasterData/> : null)}
                        <a className="menu_link" onClick={()=>{setWareHousing(!wareHousing)
                                                                setMasterData(false)
                                                                setInventory(false)
                                                                setFactory(false)}}>
                            <div className="menu_itm">
                                <i className="fa-solid fa-truck fa-lg menu_icon"></i>
                                { !isActive &&
                                <span className="menu_name">
                                    입고관리
                                </span>
                                }
                            </div>
                        </a>
                        {isActive ? null : (wareHousing ? <WareHousing/> : null)}
                        <a className="menu_link" onClick={()=>{setInventory(!inventory)
                                                                setMasterData(false)
                                                                setWareHousing(false)
                                                                setFactory(false)}}>
                            <div className="menu_itm">
                                <i className="fa-solid fa-warehouse fa-lg menu_icon"></i>
                                { !isActive &&
                                    <span className="menu_name">
                                        재고관리
                                    </span>
                                }
                            </div>
                        </a> 
                        {isActive ? null : (inventory ? <Inventory/> : null)}
                        <a className="menu_link" onClick={()=>{setFactory(!factory)
                                                                setMasterData(false)
                                                                setWareHousing(false)
                                                                setInventory(false)}}>
                            <div className="menu_itm">
                                <i className="fa-solid fa-arrow-left fa-lg menu_icon"></i>
                                { !isActive &&
                                    <span className="menu_name">
                                        출고관리
                                    </span>
                                }
                            </div>
                        </a>
                        {isActive ? null : (factory ? <Factory/> : null)}
                        <Link to="/branch/info" className="menu_link">
                            <div className="menu_itm">
                                <i className="fa-solid fa-house fa-lg menu_icon"></i>
                                { !isActive &&
                                    <span className="menu_name">
                                        지점정보
                                    </span>
                                }
                            </div>
                        </Link>
                    </div>
                    <hr style={{width:"100%", margin:"30px 0px"}}></hr>
                    <div onClick={
                        ()=>{
                            // let parent = e.target.parentNode.parentNode;
                            // parent.parentNode.setAttribute("style", "width : 3%");
                            setIsActive(isActive=>!isActive);
                        }
                    } style={{ marginTop : "20px", backgroundColor:"#d5d5d5"}} className="shadow-lg w-7 h-7 text-center flex items-center justify-center rounded-full">
                        <i className={`fa-solid fa-caret-${(isActive ? "right" : "left")} fa-lg toggle_icon` } style={{color:"#343e36"}} ></i>
                    </div>
                    { !isActive && !masterData && !wareHousing && !inventory && !factory &&
                    <>
                        <hr style={{width:"100%", margin:"42vh 0px 10px", color:"#d5d5d5" }}></hr>
                            <div>
                                <Form action="/logout" method="POST">
                                    <span className="menu_name">
                                        <button>로그아웃</button>
                                    </span>
                                </Form>
                            </div>
                    </>
                    }
                </div>
            </nav>
        </>
    )
}


function MasterData(){
    return(
        <>
            <div className="menu_name_itm">
                <Link to="/location/new" className="menu_name menu_name_itms">장소등록</Link>
                <Link to="/location/list" className="menu_name menu_name_itms">장소조회</Link>
            </div>
        </>
    )
}

function WareHousing(){
    return(
        <>
            <div className="menu_name_itm">
                <Link to="/income/list" className="menu_name menu_name_itms">입고내역</Link>
                <Link to="/income/inspection" className="menu_name menu_name_itms">입고하기</Link>
                <Link to="/income/new" className="menu_name menu_name_itms">검수상품등록</Link>
            </div>
        </>
    )
}

function Inventory(){
    return(
        <>
            <div className="menu_name_itm">
                <Link to="/product/list" className="menu_name menu_name_itms">재고조회</Link>
                <Link to="/product/inspection" className="menu_name menu_name_itms">보관장소등록</Link>
                <Link to="/product/move" className="menu_name menu_name_itms">상품이동</Link>
            </div>
        </>
    )
}

function Factory(){
    return(
        <>
            <div className="menu_name_itm">
                <Link to="/discard/product" className="menu_name menu_name_itms">출고/폐기등록</Link>
                <Link to="/sale/product" className="menu_name menu_name_itms">판매갱신</Link>
            </div>
        </>
    )
}