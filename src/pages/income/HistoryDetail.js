import Search from "../../commons/Search"
import Nav from "../../commons/Nav"
import { useEffect, useState } from "react"
import axios from "axios";
import { json, useLoaderData, useParams } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import Modal_search from "../../commons/Modal_search";
//변경사항
export default function HistoryDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [itemCode, setItemCode] = useState('');
  const { incomeId } = useParams();

  const [completeItemCode, setcompleteItemCode] = useState('');
  const [show, setShow] = useState(false);


    const incomeDetailList = useLoaderData();
    console.log("InspectionPage, incomeDetailList >>>>>>>>>>>>.", incomeDetailList);

    const handleButtonClick = () => {
      setModalOpen(false);
  };

  const handleScanWebCam = (result) => {
      setScanResult(result);
  };

    const handleclick = (item_code) => {
        setModalOpen(!modalOpen);
        console.log("스캔시작 with item_code:", item_code);
        setItemCode(item_code);
    };

        //스캔값이 있으면
        useEffect(() => {
          const fetchData = async (itemCodeParam) => {
            if (!scanResult || !itemCodeParam) {
              return;
            }
            console.log("itemCode >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", itemCodeParam);
      
            try {
              const token = getAuthToken();
              const response = await axios.get(
                `http://localhost:8000/api/v1/income/inspection/product`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'jwtauthtoken': token
                  },
                  params: {
                    scanResult: scanResult,
                    itemCode: itemCodeParam
                  }
                }
              );
      
              console.log("ShowIncomeList.response >>>>>>>>>>>..", response);
      
              if (response.status !== 200) {
                throw json({ message: '검색에 실패했습니다.' }, { status: 500 });
              }
      
              const resData = response.data;
              console.log("resData>>>>>>>>>>>>>>", resData);
              if(resData === "성공") {
                  setModalOpen(false);
                  window.location.reload();
              }
  
            } catch (error) {
              console.error("Error during fetchData:", error);
            }
          };
      
          if (scanResult) {
            fetchData(itemCode);
          }
        }, [scanResult, itemCode, incomeId]);
    
         //검수완료버튼
  const handleInspectionComplete = async () => {
    try {
      const token = getAuthToken();
      const branch_id = localStorage.getItem("branch_id");
      const response = await axios.get(
        `http://localhost:8000/api/v1/income/inspection/complete`,
        {
          headers: {
            'Content-Type': 'application/json',
            'jwtauthtoken': token
          }, params: {
            incomeId: incomeId,
            branch_id: branch_id
          }
        }
      );

      console.log("handleInspectionComplete.response >>>>>>>>>>>..", response);

      if (response.status !== 200) {
        throw json({ message: '검색에 실패했습니다.' }, { status: 500 });
      }

      const resData = response.data;
      console.log("resData>>>>>>>>>>>>>>", resData);

        alert(resData);
        window.location.reload();

    } catch (error) {
      console.error("Error during fetchData:", error);
    }

  }
    return (
        <>
            <span><button onClick={handleInspectionComplete}>검수완료</button></span>

            <div style={{ height: "92vh", fontFamily: 'Pretendard-Regular' }} className="w-full my-auto overflow-scroll">
                <div style={{ border: "1px solid #d5d5d5", borderRadius: "3px", background: "#f6f5efb3" }}
                        className="w-2/3 h-14 my-4 mx-auto flex justify-between items-center text-lg shadow-lg px-3 text-center font-bold">
                        <i className="w-8"></i>
                        <span className="w-16">번호</span>
                        <span className="w-1/12">품목명</span>
                        <span className="w-2/12">입고개수</span>
                        <span className="w-1/12">입고상태</span>
                        <span className="w-1/12">상품코드</span>
                        <span className="w-1/12">유통기한</span>
                        <span className="w-1/12">스캔하기</span>

                </div>

                {incomeDetailList.map((incomeItem, index) => (
                  <div style={{ border: "1px solid #d5d5d5", borderRadius: "5px", background: "white", height: "6vh" }}
                        className="w-11/12 my-3 mx-auto flex justify-between items-center text-lg shadow-lg px-4 text-center ">
                    <span className="w-1/16">{index+1}</span>
                    <span className="w-1/6">{incomeItem.item_code}</span>
                    <span className="w-1/6">{incomeItem.product_name}</span>
                    <span className="w-1/6">{incomeItem.item_exp}</span>
                    <span className="w-1/6">{incomeItem.income_list_result}</span>
                    <span><button className="w-1/12 border-2 h-8 shadow-md page_itms rounded-sm" onClick={() => handleclick(incomeItem.item_code)}>스캔</button></span>
                  </div>
                ))}

            </div>


            {modalOpen && (
                <Modal_search
                    onSubmit={handleButtonClick}
                    onCancel={handleButtonClick}
                    onScan={handleScanWebCam}
                    onType={"검수할 상품의"}
                />
            )}

        </>
    )
}

export async function loader({ request, params }) {
    console.log("InspectionPage, loader >>>>>>>>>>>>.", request, params);
    const token = getAuthToken();
    const branch_id = localStorage.getItem("branch_id");
    const incomeId = params.incomeId;
    console.log("incomeId---------->", incomeId);
    
    console.log("token:", token);
    console.log("branch_id:", branch_id);
  
    const response = await axios({
      method: "GET",
      url : `http://localhost:8000/api/v1/income/list/inspection/${incomeId}`,
      headers: {
        'Content-Type': 'application/json',
        'jwtauthtoken': token
      }      
    });
  
    console.log("InspectionPage.response >>>>>>>>>>>..", response);
  
    if (response.status !== 200) {
      throw json({ message: 'Could not save event.' }, { status: 500 });
    }
  
    const resData = response.data;
    console.log("resData", resData);
    return resData;
  }
  