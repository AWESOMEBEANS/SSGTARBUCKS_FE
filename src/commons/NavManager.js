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
                    <div id="w-full flex flex-col justify-center">
                        <Link to="/admin/branch/list" className="w-full flex justify-center">
                            <div className="flex items-center justify-evenly w-8/12 menu_item_color">
                                <i className="fa-solid fa-house fa-lg my-7"></i>
                                { !isActive && 
                                <span className="text-lg font-semibold">
                                    지점정보
                                </span>
                                }
                            </div>
                        </Link>
                        <Link to="/admin/mypage" className="w-full flex justify-center"> 
                            <div className="flex items-center justify-evenly w-8/12 menu_item_color">
                                <i className="fa-solid fa-user fa-lg my-7"></i>
                                { !isActive &&
                                    <span className="text-lg font-semibold">
                                        내정보
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
                    } style={{ marginTop : "20px"}} className="shadow-lg w-7 h-7 text-center flex items-center justify-center rounded-full toggle_icon hover:animate-bounce">
                        <i className={`fa-solid fa-caret-${(isActive ? "right" : "left")} fa-lg toggle_icon` } style={{color:"#343e36"}} ></i>
                    </div>
                    { !isActive && !masterData && !wareHousing && !inventory && !factory &&
                    <>
                        <hr style={{width:"100%", margin:"60vh 0px 10px", color:"#d5d5d5" }}></hr>
                            <div>
                            <Form action="/admin/logout" method="POST">
                                    <span className="menu_item_color text-lg font-semibold">
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
