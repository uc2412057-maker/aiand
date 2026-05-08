import { useState } from "react";
import sis_logo from "./sis_logo.svg";
import main_icon from "./main_icon.svg";
import info_icon from "./info_icon.svg";
import system_icon from "./system_icon.svg";
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const location = useLocation(); 
  const evtMenuClick = (menu) => {
    navigate(menu);    
    }

    return (<div className="w-full h-[90px] flex items-center">
        <img src={sis_logo} alt="logo" className="w-[100px] ml-[50px]" />

        <h1 className="ml-[40px] mt-[20px] text-white text-[22px] font-semibold">
          생산동 TWB 공정 에릭슨 테스터
        </h1>

        <nav className="ml-auto">
          <ul className="flex mr-[50px] mt-[20px] gap-6 text-white">
            <li
              onClick={() => {(navigate("/main"))  }}
              className="flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-[56px] h-[56px] rounded-xl flex items-center justify-center ${
                  location.pathname === "/main" ? "bg-[#67A0F0]" : "bg-[#454C56]"
                }`}
              >
                <img src={main_icon} alt="메인" className="w-8" />
              </div>
              <span className="text-[12px] mt-1">메인</span>
            </li>

            <li
              onClick={() => {
                navigate("/system");
              }}
              className="flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-[56px] h-[56px] rounded-xl flex items-center justify-center ${
                  location.pathname === "/system" ? "bg-[#67A0F0]" : "bg-[#454C56]"
                }`}
              >
                <img src={system_icon} alt="시스템 설정" className="w-8" />
              </div>
              <span className="text-[12px] mt-1">시스템 설정</span>
            </li>

            <li
              onClick={() => {
                navigate("/info");
              }}
              className="flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-[56px] h-[56px] rounded-xl flex items-center justify-center ${
                  location.pathname === "/info" ? "bg-[#67A0F0]" : "bg-[#454C56]"
                }`}
              >
                <img src={info_icon} alt="정보 관리" className="w-8" />
              </div>
              <span className="text-[12px] mt-1">정보 관리</span>
            </li>
          </ul>
        </nav>
      </div>);
}

export default Header;