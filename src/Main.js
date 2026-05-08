
import React, { useState, useEffect } from 'react';

function Main() {

  const [mainData, setMainData] = useState([]);

  const [mainFormData, setMainFormData] = useState({
    product_id: 0,
    worker_id: 0
  });

  useEffect(() => {
    console.log("MAIN FORM DATA : ", mainFormData);
  }, [mainFormData])

  const getData = () => {
    fetch("http://192.168.1.168:8000/main")
      //서버에 데이터 요청
      .then((response) => response.json()) //JSON 데이터를 JS 객체로 변환
      .then((data) => {
        if (data.success === true) {
          setMainData(data.data); //서버에서 받은 데이터 저장

        }
      })
      .catch((error) => {
        console.error("에러발생:", error);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;    
    setMainFormData({
      ...mainFormData, 
      [name] : value
       // 셀렉트 숫자로 받음
    });
  };

  const handleSave = () => { //저장 버튼 눌렀을 때 실행
    console.log("form data : ", mainFormData);
    fetch("http://192.168.1.168:8000/save_start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //JSON 형식으로 보냄
      },
      body: JSON.stringify({ //JS 객체를 JSON 문자열로 변환
        "type": "save_start",
        "data": mainFormData,
        product_id: mainFormData.product_id,
        worker_id: mainFormData.worker_id
      }),
    })
      .then((res) => res.json()) //서버 응답 받기
      .then((data) => {
        console.log("저장 성공:", data);
        getData(); // 
      })
      .catch((err) => {
        console.error(" 에러:", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <div className="w-[1920px] h-[1080px] bg-[#31363E] p-[20px]`">


      {/* 메인 영역 */}
      <div className="h-[940px] m-[20px] bg-[#454C56] rounded-xl p-[20px]">

        <div className="flex gap-[50px] h-full">

          {/* 왼쪽 영역 */}
          <div className="w-[880px] h-full">

            {/* 상태 박스 */}
            <div className="w-[870px] h-[150px] bg-[#31363E] rounded-lg flex items-center px-[40px] mb-[35px]">
              <div className="w-[200px] text-center border-r-[2px] border-[#454C56]">
                <p className="text-[#9AA4B0] text-[20px]">모드</p>
                <p className="text-[#67A0F0] text-[30px] font-bold">{mainData?.status?.status?.mode}</p>
              </div>

              <div className="w-[200px] text-center">
                <p className="text-[#9AA4B0] text-[20px]">변위</p>
                <p className="text-[#67A0F0] text-[22px] font-bold">{mainData?.status?.status?.displacement_mm}</p>
              </div>

              <div className="w-[200px] text-center">
                <p className="text-[#9AA4B0] text-[20px]">하중</p>
                <p className="text-[#67A0F0] text-[22px] font-bold">{mainData?.status?.status?.load_kgf}</p>
              </div>

              <div className="w-[200px] text-center">
                <p className="text-[#9AA4B0] text-[20px]">최대하중</p>
                <p className="text-[#67A0F0] text-[22px] font-bold">{mainData?.status?.status?.max_load_kgf}</p>
              </div>
            </div>

            {/* 선택 영역 */}
            <div className="flex items-center mb-[15px]">
              <p className="text-white text-[24px] font-bold w-[120px] text-center">품번</p>
              <select alue={mainFormData.product_id} name="product_id" onChange={(e) => handleChange(e) }
              className="w-[540px] h-[55px] bg-[#31363E] text-white text-[18px] rounded-md text-center outline-none">
                {mainData?.product_options?.map((item, id) => {
                  return (
                    <option key={item.id} value={item.id}>{item.product_name}</option>
                  )
                })}
              </select>

              <button onClick={handleSave} className="ml-[30px] w-[180px] h-[120px] bg-[#8C98A6] text-[#454C56] text-[24px] font-bold rounded-md">
                저장 시작
              </button>
            </div>

            <div className="flex items-center mb-[40px]">
              <p className="text-white text-[24px] font-bold w-[120px] text-center">작업자</p>

              <select alue={mainFormData.product_id} name="worker_id" onChange={(e) => handleChange(e) }
              className="w-[540px] h-[55px] bg-[#31363E] text-white text-[18px] rounded-md text-center outline-none">
                {mainData?.worker_options?.map((item, id) => {
                  return (
                    <option key={item.id} value={item.id}>{item.worker_name}</option>
                  )
                })}

              </select>
            </div>


            {/* 테이블 */}
            <div className="w-[870px] h-[450px]">
              <div className="w-full h-[38px] bg-[#31363E] grid grid-cols-4 text-white text-[14px] font-bold text-center items-center">
                <p>순번</p>
                <p>날짜 / 시간</p>
                <p>변위 (mm)</p>
                <p>최대하중 (kgf)</p>
              </div>
            </div>
          </div>

          {/* 오른쪽 영역 */}
          <div className="w-[850px] h-full">

            {/* 공정 단계 */}
            <div className="w-full h-[170px] flex items-center justify-center">
              <div className="w-[700px] h-[80px] relative flex items-center justify-between">

                <div className="absolute top-[28px] left-[45px] w-[610px] h-[8px] bg-[#31363E]"></div>

                <div className="relative z-10 text-center">
                  <div className="w-[58px] h-[58px] rounded-full bg-[#BFD9FF] border-[8px] border-[#67A0F0] mx-auto"></div>
                  <p className="text-white text-[22px] font-bold mt-[20px]">공정 시작</p>
                </div>

                <div className="relative z-10 text-center">
                  <div className="w-[58px] h-[58px] rounded-full bg-[#454C56] border-[8px] border-[#31363E] mx-auto"></div>
                  <p className="text-white text-[22px] font-bold mt-[20px]">클램프 정지</p>
                </div>

                <div className="relative z-10 text-center">
                  <div className="w-[58px] h-[58px] rounded-full bg-[#454C56] border-[8px] border-[#31363E] mx-auto"></div>
                  <p className="text-white text-[22px] font-bold mt-[20px]">공정 종료</p>
                </div>

              </div>
            </div>

            {/* 카메라 이미지 영역 */}
            <div className="w-[850px] h-[600px] bg-[#D8D8D8] rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-[#31363E] text-[40px] font-bold">
                <img src={require("./camera_icon.png")} alt="카메라 이미지" className="w-[200px] opacity-50" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;