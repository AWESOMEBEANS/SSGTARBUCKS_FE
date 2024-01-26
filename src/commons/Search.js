import logo from "../sources/image/logo1.png";
import "../sources/css/search.css";
import scanner from "../sources/image/Scanner.png";
import magnifier from "../sources/image/magnifier.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import QRScanner from "../commons/QRScanner";
import Modal_search from "./Modal_search";

export default function Searching(){
    const [modalOpen, setModalOpen] = useState(false);

    const handleButtonClick = () => {
        setModalOpen(false);
    };

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    function handleSearch(){
        console.log("search :", searchQuery);
        const searchUrl = `/search/list/${searchQuery}`;
        navigate(searchUrl);
    };

    function handleOnKeyPress(e){
        if(e.key === "Enter"){
            handleSearch();
        }
    }

    return(
        <>
            <header>
                <Link to="/main">
                    <div className="logo">
                        <img src={logo} alt="logo" id="logo_img" />
                        <h2 id="logo_title">SSGTARBUCKS</h2>
                    </div>
                </Link>
                <div className="header_inn">
                    <div id="search" >
                        <input type="text" id="search_inn" name="search" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} onKeyDown={(e)=> handleOnKeyPress(e)}/>
                        <img src={magnifier} width={35} className="icon magnifier" onClick={handleSearch}/>
                    </div>
                    <a href="#">
                        {/* <i className="fa-solid fa-expand fa-2xl icon" ></i> */}
                        <img src={scanner} width={35} className="icon" onClick={() => setModalOpen(true)}/>
                    </a>
                </div>
            </header>
            {modalOpen &&(
                <Modal_search
                    onSubmit={handleButtonClick}
                    onCancel={handleButtonClick}>
                </Modal_search>)}
        </>
    )
}
