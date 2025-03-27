import Home from '@/pages/home';
import React from 'react';
import { HomeOutlined, ReadOutlined, RobotOutlined } from '@ant-design/icons';
import App from '@/App';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
export type R = RouteObject & {
  key: string;
  title?: string;
  icon?: React.ReactNode;
  children?: R[];
};
export const routes: R[] = [
  {
    path: '/',
    element: <App />,
    key: 'app',
    children: [
      {
        index: true,
        key: 'index',
        element: <Navigate to='/home' replace />
      },
      {
        path: '/home',
        element: <Home />,
        key: 'home',
        icon: <HomeOutlined />,
        title: '概览'
      },
      {
        path: '/sub-todo',
        key: 'todo',
        title: '待办任务',
        icon: <RobotOutlined />
      },
      {
        path: '/sub-note/*',
        key: 'note',
        title: '云笔记',
        icon: <ReadOutlined />
      }
    ]
  }
];
const router = createBrowserRouter(routes);
export default router;
