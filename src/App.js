import "./App.css";

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Info from './Info';
import System from './System';
import NotFound from './NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-[1920px] h-[1080px] bg-[#31363E] overflow-hidden">
        
        {/* 고정 헤더 */}
        <Header />

        {/* 아래 컨텐츠만 변경 */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/info" element={<Info />} />
          <Route path="/system" element={<System />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;