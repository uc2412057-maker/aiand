
import React, { useState, useEffect } from 'react';

import Header from "./Header.js";
import "./App.css";
import {useNavigate} from 'react-router-dom';

function Info() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [infoData, setInfoData] = useState([]);

  const evtClickSearch = () => {    
    console.log(searchKeyword); 
  }

  console.log("렌더링 됨");

const getData = () => {
    fetch("http://192.168.1.132:8000/info_setting")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true){
          setInfoData(data.data);

          console.log(infoData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  

  useEffect(() => {
    getData();
  }, []);

  





  return (
    <div className="w-[1920px] h-[1080px] bg-[#31363E] p-[20px] overflow-hidden">

      {/* 메인 영역 */}
      <div className="w-full h-[940px] border-[3px] p-[20px] bg-[#31363E]">
        {/* 검색 영역 */}
        <div className="w-full h-[70px] flex items-center gap-[15px]">
          <button className="w-[130px] h-[60px] bg-[#67A0F0] text-white text-[17px] rounded-md">
            검색 필터
          </button>

          <input className="w-[1180px] h-[60px] bg-[#454C56] rounded-md flex items-center pl-[25px] text-[#B8B8B8] text-[17px]" 
            placeholder="검색하실 내용을 입력해 주세요" onChange={(e)=> 
              setSearchKeyword(e.target.value)         
             }
          >
          </input>

          <div
          className="w-[60px] h-[60px] bg-[#454C56] rounded-md flex items-center justify-center text-white text-[34px]" onClick={() => evtClickSearch()}>
            ⌕
          </div>

          <div className="w-[60px] h-[60px] bg-[#454C56] rounded-md flex items-center justify-center text-white text-[34px]">
            ↻
          </div>
        </div>

        {/* 테이블 영역 */}
        <div className="w-[1500px] h-[805px] mt-[25px] overflow-hidden">
          <table className="w-full text-white border-collapse text-center">
            <thead>
              <tr className="bg-[#454C56] h-[55px] text-[17px]">
                <th className="border border-[#555C66] w-[80px]">순번</th> {/* idx */}
                <th className="border border-[#555C66] w-[170px]">차종</th> {/* car_type */}
                <th className="border border-[#555C66] w-[300px]">품명</th> {/* product_name */}
                <th className="border border-[#555C66] w-[200px]">품번</th> {/* material_a_name */}
                <th className="border border-[#555C66] w-[160px]">A 이름</th>{/* material_a_name */}
                <th className="border border-[#555C66] w-[130px]">A 두께</th>{/* material_a_thin */}
                <th className="border border-[#555C66] w-[160px]">B 이름</th> {/* material_b_name */}
                <th className="border border-[#555C66] w-[130px]">B 두께</th> {/* material_b_thin */}
                <th className="border border-[#555C66] w-[160px]">판정값</th> {/* judgment_value */}
              </tr>
            </thead>
            <tbody>

              {infoData.map((item, index) => (
                <tr key={index} className="h-[50px]">
                  <td className="border border-[#555C66]">{item.idx}</td>
                  <td className="border border-[#555C66]">{item.car_type}</td>
                  <td className="border border-[#555C66]">{item.product_name}</td>
                  <td className="border border-[#555C66]">{item.part_no}</td>                  
                  <td className="border border-[#555C66]">{item.material_a_name}</td>
                  <td className="border border-[#555C66]">{item.material_a_thin}</td>
                  <td className="border border-[#555C66]">{item.material_b_name}</td>
                  <td className="border border-[#555C66]">{item.material_b_thin}</td>
                  <td className="border border-[#555C66]">{item.judgment_value}</td>
                </tr>
              ))}

            </tbody>
          </table>

          {/* 오른쪽 스크롤 모양 */}
          <div className="absolute right-[70px] top-[300px] w-[10px] h-[530px] bg-[#454C56] rounded-full">
          </div>
            <div className="w-[10px] h-[75px] bg-[#5A626D] rounded-full"></div>
          </div>
        </div>
      </div>
        );
}

export default Info;