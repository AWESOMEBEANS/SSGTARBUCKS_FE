import logo from "../sources/image/logo1.png";
import "../sources/css/search.css";
import scanner from "../sources/image/Scanner.png";
import magnifier from "../sources/image/magnifier.png";
import { Link } from "react-router-dom";

export default function searching(){
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
                        <input type="text" id="search_inn" name="search"/>
                        <a href="#">
                            {/* <i className="fa-solid fa-magnifying-glass fa-2xl icon magnifier"></i> */}
                            <img src={magnifier} width={35} className="icon magnifier"/>
                        </a>
                    </div>
                    <a href="#">
                        {/* <i className="fa-solid fa-expand fa-2xl icon" ></i> */}
                        <img src={scanner} width={35} className="icon"/>
                    </a>
                </div>
            </header>
        </>
    )
}