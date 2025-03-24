import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.less';

import ThemeProvider from './hooks/themeProvider';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { registerMicroApps, start } from 'qiankun';

const root = document.getElementById('root');
createRoot(root as HTMLElement).render(
  <ThemeProvider>
    <RouterProvider router={router}></RouterProvider>
  </ThemeProvider>
);

export interface appProps {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
}
// 微应用列表
const apps: appProps[] = [
  {
    name: 'sub-note',
    entry: '//localhost:3001',
    container: '#sub-app',
    activeRule: '/sub-note'
  }
  // {
  //   name: 'sub-todo',
  //   entry: '//localhost:3002',
  //   container: '#sub-app',
  //   activeRule: '/sub-note'
  // }
];

// 注册子应用
registerMicroApps(apps);

// 启动qiankun
start();
