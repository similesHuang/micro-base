import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.less';
import 'antd/dist/antd.css';
import Provider from './hooks/Provider';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { registerMicroApps, RegistrableApp, start } from 'qiankun';
import actions, { getGlobalState } from './hooks/qiankunGlobal';

const root = document.getElementById('root');
createRoot(root as HTMLElement).render(
  <Provider>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);

// 微应用列表
const microApps = [
  {
    name: 'sub-note',
    entry: '//localhost:3001',
    container: '#sub-app',
    activeRule: '/sub-note'
  }
];

interface AppsExtraProps {
  routerBase: string;
  getGlobalState?: getGlobalState;
}
const apps: Array<RegistrableApp<AppsExtraProps>> = microApps.map(item => {
  return {
    ...item,
    props: {
      routerBase: item.activeRule, //下发基础路由
      getGlobalState: actions.getGlobalState
    }
  };
});

// 注册子应用
registerMicroApps(apps);

// 启动qiankun
start({
  sandbox: {
    experimentalStyleIsolation: true
  }
});
