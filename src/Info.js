
import React, { useState, useEffect } from 'react';

import Header from "./Header.js";
import "./App.css";
import { useNavigate } from 'react-router-dom';


function Info() {
  //다른 페이지로 이동할 때 사용
  const navigate = useNavigate();
  const [infoData, setInfoData] = useState([]);


  console.log("렌더링 됨");

  // 서버에서 정보 관리 테이블 데이터를 가져오기
  const getData = () => {
    fetch("http://192.168.1.168:8000/info_setting")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // 서버 요청이 성공했을 때만 테이블 데이터 저장
        if (data.success === true) {
          setInfoData(data.data);

          console.log(infoData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }


  // 새로고침 버튼 클릭 시 실행
  const handlerefresh = () => {
    fetch("http://192.168.1.168:8000/info_refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "info_refresh",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("POST 결과:", data);
        // 새로고침 결과가 성공이면, 서버에서 받은 새 데이터를 테이블에 반영
        if (data.success === true) {
          setInfoData(data.data);
        }
      })
      .catch((err) => {
        console.error("POST 에러:", err);
      });
  };


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
            placeholder="검색하실 내용을 입력해 주세요"
          >
          </input>

          <button

            className="w-[60px] h-[60px] bg-[#454C56] rounded-md flex items-center justify-center text-white text-[34px]"
          > ⌕ </button>

          <button onClick={handlerefresh}
            className="w-[60px] h-[60px] bg-[#454C56] rounded-md flex items-center justify-center text-white text-[34px]">
            ↻ </button>
        </div>

        {/* 테이블 영역 */}
        <div className="w-[1500px] h-[805px] mt-[25px] overflow-y-auto">
          <table className="w-full text-white border-collapse text-center">
            <thead>
              <tr className="bg-[#454C56] h-[55px] text-[17px]">
                {/* idx */}
                <th className="border border-[#555C66] w-[80px]">순번</th>
                {/* car_type */}
                <th className="border border-[#555C66] w-[170px]">차종</th>
                {/* product_name */}
                <th className="border border-[#555C66] w-[300px]">품명</th>
                {/* material_a_name */}
                <th className="border border-[#555C66] w-[200px]">품번</th>
                {/* material_a_name */}
                <th className="border border-[#555C66] w-[160px]">A 이름</th>
                {/* material_a_thin */}
                <th className="border border-[#555C66] w-[130px]">A 두께</th>
                {/* material_b_name */}
                <th className="border border-[#555C66] w-[160px]">B 이름</th>
                {/* material_b_thin */}
                <th className="border border-[#555C66] w-[130px]">B 두께</th>
                {/* judgment_value */}
                <th className="border border-[#555C66] w-[160px]">판정값</th>
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
        </div>

      </div>
    </div>
  );
}

export default Info;