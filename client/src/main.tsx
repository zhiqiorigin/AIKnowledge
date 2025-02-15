import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@/plugins/i18n.ts';
// import "./styles/globals.scss"
import '@/assets/app.scss'
import "@/assets/iconfont/iconfont.css"
import 'antd/dist/reset.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
