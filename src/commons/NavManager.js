import { Link } from "react-router-dom";
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
            <nav style={(isActive ? {width : "3%"} : {width : "10%"})}>
                <div className="content">
                    <div id="menu">
                        <a>
                            <div className="menu_itm">
                                <i className="fa-solid fa-house fa-lg menu_icon"></i>
                                { !isActive && 
                                <span className="menu_name">
                                    <Link to="manager/solstice">지점정보</Link>
                                </span>
                                }
                            </div>
                        </a>
                        <a>
                            <div className="menu_itm">
                                <i className="fa-solid fa-house fa-lg menu_icon"></i>
                                { !isActive &&
                                    <span className="menu_name">
                                        <Link to="manager/shop">내정보</Link>
                                    </span>
                                }
                            </div>
                        </a>
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
                                <a href="#">
                                    <span className="menu_name">
                                        로그아웃
                                    </span>
                                </a>
                            </div>
                    </>
                    }
                </div>
            </nav>
        </>
    )
}
