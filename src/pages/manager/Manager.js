import React, { useState, useEffect } from 'react';
import SearchManager from "../../commons/SearchManager";
import NavManager from "../../commons/NavManager";
import axios from "axios";

export default function Manager(){


    return(
        <>
            {/* <SearchManager/> */}
            <div className="low-opacity-bg-image flex">
            {/* <NavManager/> */}
                <div className="w-full">
                    <div className="h-full text-center flex items-center flex-col">
                        <h1 className="text-5xl h-1/5 flex items-center" style={{fontFamily: 'EASTARJET-Medium'}}>
                            SSGTARBUCKS에 오신것을 환영합니다 :)
                        </h1>

                    </div>
                </div>
            </div>
        </>
    )
}

