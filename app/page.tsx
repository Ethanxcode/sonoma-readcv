'use client';

import React, { FC } from 'react';

import '@fontsource/ia-writer-mono/400.css';
import '@fontsource/ia-writer-mono/700.css';
import '@fontsource/ia-writer-mono/400-italic.css';
import '@fontsource/ia-writer-mono/700-italic.css';
import Desktop from './components/Desktop';
import Toolbar from './components/Toolbar';

// Các biến này giả lập dữ liệu từ bên ngoài (cv, siteSettings).
// Nếu có file định nghĩa riêng, bạn có thể import type/interface chi tiết vào thay thế.

const App: FC = () => {
  return (
    <div className="hero-container">
      <Toolbar />
      <Desktop />
    </div>
  );
};

export default App;
