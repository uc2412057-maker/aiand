import React, { useState, useEffect } from 'react';
import { data, Link } from 'react-router-dom';
import axios from 'axios';

function System() {

  const [systemData, setSystemData] = useState({}); // 시스템 설정 데이터 저장할 상태 변수
  const [formData, setFormData] = useState({ // 폼 데이터 초기값 설정
    ip_address: "", 
    port: 0,
    command_cycle_ms: 0,
    weight_unit: 0,
    judgment_value: 0,
    load_gain_kgf: 0,
    load_gain_n: 0,
    camera_collect_cycle_ms: 0,
    video_size: "",
    offset_size: "",
    report_size: "",
    video_split_size : {
      width: 0, 
      height: 0,
    }
  });
  const [options, setOptions] = useState({ // 서버에서 받아올 옵션 데이터 초기값 설정 - 
  // 무게 단위 select 박스에 서버에서 받은 옵션 데이터 띄워주기 위해서 무게 단위 옵션 데이터 초기값 설정
    weight_unit: [
      { value: "kg", label: "kg" },
    ]
  });


  // 영상 사이즈, 오프셋, 리포트 사이즈 각각 width, height 상태 변수를 만드는 이유 
  // 폼에서 영상 사이즈, 오프셋, 리포트 사이즈 각각 width, height 따로따로 입력받기 위해서

  const [videowidth, setVideowidth] = useState(0);
  const [videoheight, setVideoheight] = useState(0);
  const [offsetwidth, setOffsetwidth] = useState(0);
  const [offsetheight, setOffsetheight] = useState(0);
  const [reportwidth, setReportwidth] = useState(0);
  const [reportheight, setReportheight] = useState(0);



  const getData = () => {
    axios.get('http://192.168.1.168:8000/system_setting')
      .then(function (response) { // 서버에서 응답이 성공적으로 돌아왔을 때 실행
        if (response.data.success === true) {
          // 서버에서 받은 데이터가 성공이면, 시스템 설정 데이터 저장하는 이유 - 폼에 서버에서 받은 데이터 띄워주기 위해서

          setSystemData(response.data.data);
          setFormData({ // 서버에서 받은 데이터로 폼 데이터 초기화하는 이유 - 폼에 서버에서 받은 데이터 띄워주기 위해서 
            ip_address: response.data.data.ip_address,
            port: response.data.data.port, 
            command_cycle_ms: response.data.data.command_cycle_ms,
            weight_unit: response.data.data.weight_unit,
            judgment_value: response.data.data.judgment_value,
            load_gain_kgf: response.data.data.load_gain_kgf,
            load_gain_n: response.data.data.load_gain_n,
            camera_collect_cycle_ms: response.data.data.camera_collect_cycle_ms,
            video_size: response.data.data.video_size,
            offset_size: response.data.data.offset_size,
            report_size: response.data.data.report_size,
            video_split_size: {
              width: parseInt(response.data.data.video_size.split("x")[0]),
              height: parseInt(response.data.data.video_size.split("x")[1])
            },      
            // report_size, video_size, offset_size는 서버에서 "width x height" 형태로 받아오기 때문에 그대로 저장 
            // 폼에서 영상 사이즈, 오프셋, 리포트 사이즈 각각 width, height 따로따로 입력받기 위해서    
          });



          setOptions(response.data.data.options);
          // 서버에서 받은 옵션 데이터 저장하는 이유 - 무게 단위 select 박스에 서버에서 받은 옵션 데이터 띄워주기 위해서

          // 영상 사이즈, 오프셋, 리포트 사이즈 각각 width, height 상태 변수에 저장하는 이유 - 
          // 폼에서 영상 사이즈, 오프셋, 리포트 사이즈 각각 width, height 따로따로 입력받기 위해서
          setVideowidth(response.data.data.video_size.split("x")[0]);
          console.log(response.data.data.video_size.split("x")[0]);
          setVideoheight(response.data.data.video_size.split("x")[1]);
          setOffsetwidth(response.data.data.offset_size.split("x")[0]);
          setOffsetheight(response.data.data.offset_size.split("x")[1]);
          setReportwidth(response.data.data.report_size.split("x")[0]);
          setReportheight(response.data.data.report_size.split("x")[1]); 
          // [] 안에 1 넣는 이유 - 영상 사이즈, 오프셋, 리포트 사이즈 각각 width, height 구분하기 위해서
          // 서버에서 받은 데이터는 "width x height" 형태이기 때문에 split("x")로 나누면 [0]에는 width, [1]에는 height가 저장됨   
        }

        console.log(response);
      })
      .catch(function (error) { // 서버에서 응답이 실패했을 때 실행

        console.log(error);
      })
      .then(function () { // 항상 실행

      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    console.log("name : ", name);
    console.log("value : ", value);

    setFormData({
      ...formData,
      [name]: value,
    });
    
  };


  const handleSave = () => {
    const sendData = {
      ...formData,
      video_size: `${videowidth}x${videoheight}`,
      offset_size: `${offsetwidth}x${offsetheight}`,
      report_size: `${reportwidth}x${reportheight}`,
    };

    console.log("send data : ", sendData)
    fetch("http://192.168.1.168:8000/system_setting", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "system_setting",
        data: sendData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getData();
      })
      .catch((err) => {
        console.error("PUT 에러:", err);
      });
  };


  useEffect(() => {

  }, [formData]);

  

  useEffect(() => {
    getData(); 
  }, []);


  useEffect(() => {
  console.log("systemData : ", systemData);
  console.log("videoWidth : ", typeof(videowidth), videowidth);
  console.log("videoheight : ", typeof(videoheight), videoheight);
  
  }, [getData]);


  return (
    <div className="w-[1920px] h-[1080px] bg-[#31363E] p-[20px] overflow-hidden">


      {/* 메인 영역 */}
      <div className="w-full h-[940px] border-[3px] border-[#008CFF] p-[20px] bg-[#454C56]">
        <div className="flex gap-[20px] h-full">

          {/* 왼쪽 */}

          <div className="w-[910px] h-full bg-[#31363E] rounded-xl p-[25px]">
            <div className="flex items-center">
              <h2 className="flex-1 text-center text-white text-[26px] font-bold">
                검사 설정
              </h2>
              <div className="bg-[#5A626D] w-[90px] h-[40px] rounded-md flex items-center justify-center text-[14px] text-[#ccc]">
                <button onClick={handleSave}>
                  변경 적용
                </button>

              </div>
            </div>

            <div className="h-[2px] bg-[#454C56] my-[20px]"></div>

            <div className="flex items-center pl-[80px] mb-[20px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[150px]">
                IP / 포트 번호
              </p>
              <input onChange={handleChange} type='text' className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px]" value={formData?.ip_address} name="ip_address" />
              <input onChange={handleChange} type='text' className="bg-[#454C56] w-[120px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px]" value={formData?.port} name="port" />
            </div>

            <div className="h-[2px] bg-[#454C56] my-[10px]"></div>

            <div className="flex items-center justify-center mb-[20px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[150px]">
                명령 주기
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px]" value={formData?.command_cycle_ms} name="command_cycle_ms" />
              <span className="text-white text-[18px] font-semibold w-[90px]">
                msec
              </span>
            </div>

            <div className="flex items-center justify-center mb-[20px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[150px]">
                무게 단위
              </p>


              <select className="bg-[#454C56] w-[420px] h-[55px] rounded-md text-white text-[18px] text-center outline-none">
                {systemData?.options?.weight_unit?.map((item, index) => {
                  return (
                    <option key={item.value}>{item.label}</option>
                  )
                }

                )}


              </select>
              <span className="w-[90px]"> </span>
            </div>

            <div className="flex items-center justify-center mb-[20px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[150px]">
                판정도
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px]" value={formData?.judgment_value} name="judgment_value" />
              <span className="text-white text-[18px] font-semibold w-[90px]">
                %
              </span>
            </div>

            <div className="h-[2px] bg-[#454C56] my-[20px]"></div>

            <div className="flex items-center justify-center mb-[15px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[150px]">
                load gain
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px]" value={formData?.load_gain_kgf} name="load_gain_kgf" />
              <span className="text-white text-[18px] font-semibold w-[90px]">
                kgf/mV
              </span>
            </div>

            <div className="flex items-center justify-center mb-[15px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[150px]">
                load gain
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px]" value={formData?.load_gain_n} name="load_gain_n" />
              <span className="text-white text-[18px] font-semibold w-[90px]">
                N/mV
              </span>
            </div>

            <div className="flex items-center justify-center gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[150px]">
                load gain
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px]" value={formData?.load_gain_mm} name="load_gain_mm" />
              <span className="text-white text-[18px] font-semibold w-[90px]">            
                mm/mV
              </span>
            </div>
          </div>

          {/* 오른쪽 */}
          <div className="w-[910px] h-full bg-[#31363E] rounded-xl p-[25px] ">
            <div className="flex items-center ">
              <h2 className="flex-1 text-center text-white text-[26px] font-bold">
                카메라 설정
              </h2>
              <div onClick={handleSave} className="bg-[#5A626D] w-[90px] h-[40px] rounded-md flex text-center justify-center text-[14px] text-[#ccc]">
                변경 적용
              </div>
            </div>

            <div className="h-[2px] bg-[#454C56] my-[20px]"></div>

            <div className="flex items-center mb-[20px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[170px]">
                영상 수집 주기
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px] " defaultValue={formData?.command_cycle_ms} name="camera_collect_cycle_ms" />
              <span className="text-white text-[18px] font-semibold w-[90px]">
                msec
              </span>
            </div>

            <div className="flex items-center mb-[20px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[170px]">
                영상 사이즈
              </p>

              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md text-center text-white text-[18px]" value={formData?.video_split_size.width} name="video_split_size.width" />
              <span className="text-white text-[18px] font-semibold"> * </span>
              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md text-center text-white text-[18px]" value={formData?.video_split_size.height} name="video_split_size.height" />
              <span className="text-white text-[18px] font-semibold w-[90px]"> px </span>
            </div>

            <div className="flex items-center mb-[20px] gap-[13px]">
              <p className="text-white text-[17px] font-semibold w-[170px]">
                오프셋 X,Y
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px]" defaultValue={offsetwidth} name="offsetSize.width" />
              <span className="text-white text-[18px] font-semibold w-[13px]"></span>
              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px]" defaultValue={offsetheight} name="offsetSize.height" />
              <span className="w-[90px]"></span>
            </div>

            <div className="h-[2px] bg-[#454C56] my-[20px]"></div>

            <div className="flex items-center gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[170px]">
                리포트 사이즈
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px]" defaultValue={reportwidth} name="reportSize.width" />
              <span className="text-white text-[18px] font-semibold">*</span>
              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md flex text-center justify-center text-white text-[18px]" defaultValue={reportheight} name="reportSize.height" />
              <span className="text-white text-[18px] font-semibold w-[90px]">
                px
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default System;