import React, { useState, useEffect } from 'react';
import { data, Link } from 'react-router-dom';

function System() {

  const [systemData, setSystemData] = useState({});
  const [formData, setFormData] = useState({
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
  });

  const videoSize = systemData?.video_size || "0x0";
  const offsetsize = systemData?.offset_size || "0x0";
  const reportSize = systemData?.report_size || "0x0";
  const [videowidth, videoheight] = videoSize.split("x");
  const [offsetwidth, offsetheight] = offsetsize.split("x");
  const [reportwidth, reportheight] = reportSize.split("x");


  useEffect(() => {
    console.log(formData)
  }, [formData])


  const getData = () => {
    fetch("http://192.168.1.168:8000/system_setting")
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          setSystemData(data.data);

        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSave = () => {
    const sendData = {
      ...formData,
      video_size: `${formData.video_width || videowidth}x${formData.video_height || videoheight}`,
      offset_size: `${formData.offset_width || offsetwidth}x${formData.offset_height || offsetheight}`,
      report_size: `${formData.report_width || reportwidth}x${formData.report_height || reportheight}`,
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
    getData();
  }, []);



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
              <input onChange={handleChange} type='text' className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex items-center justify-center text-white text-[18px]" defaultValue={systemData?.ip_address} name="ip_address" />
              <input onChange={handleChange} type='text' className="bg-[#454C56] w-[120px] h-[55px] rounded-md flex items-center text-center justify-center text-white text-[18px]" defaultValue={systemData?.port} name="port" />
            </div>

            <div className="h-[2px] bg-[#454C56] my-[10px]"></div>

            <div className="flex items-center justify-center mb-[20px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[150px]">
                명령 주기
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex items-center justify-center text-white text-[18px]" defaultValue={systemData?.command_cycle_ms} name="command_cycle_ms" />
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
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex items-center justify-center text-white text-[18px]" defaultValue={systemData?.judgment_value} name="judgment_value" />
              <span className="text-white text-[18px] font-semibold w-[90px]">
                %
              </span>
            </div>

            <div className="h-[2px] bg-[#454C56] my-[20px]"></div>

            <div className="flex items-center justify-center mb-[15px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[150px]">
                load gain
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex items-center justify-center text-white text-[18px]" defaultValue={systemData?.load_gain_kgf} name="load_gain_kgf" />
              <span className="text-white text-[18px] font-semibold w-[90px]">
                kgf/mV
              </span>
            </div>

            <div className="flex items-center justify-center mb-[15px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[150px]">
                load gain
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex items-center justify-center text-white text-[18px]" defaultValue={systemData?.load_gain_n} name="load_gain_n" />
              <span className="text-white text-[18px] font-semibold w-[90px]">
                N/mV
              </span>
            </div>

            <div className="flex items-center justify-center gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[150px]">
                load gain
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex items-center justify-center text-white text-[18px]" defaultValue={systemData?.load_gain_mm} name="load_gain_mm" />
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
              <div onClick={handleSave} className="bg-[#5A626D] w-[90px] h-[40px] rounded-md flex items-center justify-center text-[14px] text-[#ccc]">
                변경 적용
              </div>
            </div>

            <div className="h-[2px] bg-[#454C56] my-[20px]"></div>

            <div className="flex items-center mb-[20px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[170px]">
                영상 수집 주기
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[420px] h-[55px] rounded-md flex items-center justify-center text-white text-[18px] " defaultValue={systemData?.command_cycle_ms} name="camera_collect_cycle_ms" />
              <span className="text-white text-[18px] font-semibold w-[90px]">
                msec
              </span>
            </div>

            <div className="flex items-center mb-[20px] gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[170px]">
                영상 사이즈
              </p>

              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md text-center text-white text-[18px]" defaultValue={systemData?.width} name="videoSize.width" />
              <span className="text-white text-[18px] font-semibold"> * </span>
              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md text-center text-white text-[18px]" defaultValue={systemData?.height} name="videoSize.height" />
              <span className="text-white text-[18px] font-semibold w-[90px]"> px </span>
            </div>

            <div className="flex items-center mb-[20px] gap-[13px]">
              <p className="text-white text-[17px] font-semibold w-[170px]">
                오프셋 X,Y
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md flex items-center justify-center text-white text-[18px]" defaultValue={systemData?.width} name="offsetSize.width" />
              <span className="text-white text-[18px] font-semibold w-[13px]"></span>
              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md flex items-center justify-center text-white text-[18px]" defaultValue={systemData?.height} name="offsetSize.height" />
              <span className="w-[90px]"></span>
            </div>

            <div className="h-[2px] bg-[#454C56] my-[20px]"></div>

            <div className="flex items-center gap-[15px]">
              <p className="text-white text-[17px] font-semibold w-[170px]">
                리포트 사이즈
              </p>
              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md flex items-center justify-center text-white text-[18px]" defaultValue={systemData?.width} name="reportSize.width" />
              <span className="text-white text-[18px] font-semibold">*</span>
              <input onChange={handleChange} className="bg-[#454C56] w-[190px] h-[55px] rounded-md flex items-center justify-center text-white text-[18px]" defaultValue={systemData?.height} name="reportSize.height" />
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