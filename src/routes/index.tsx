import Home from '@/pages/home';
import React from 'react';
import { HomeOutlined, ReadOutlined, RobotOutlined } from '@ant-design/icons';
import App from '@/App';
import { createBrowserRouter } from 'react-router-dom';
export interface iRouteProps {
  path: string;
  element?: React.ReactNode;
  key: string;
  title?: string;
  children?: iRouteProps[];
  icon?: React.ReactNode;
}
export const routes: iRouteProps[] = [
  {
    path: '/',
    element: <App />,
    key: 'app',
    children: [
      {
        path: '/',
        element: <Home />,
        key: 'home',
        icon: <HomeOutlined />,
        title: '概览'
      },
      {
        path: '/todo',
        key: 'todo',
        title: '待办任务',
        icon: <RobotOutlined />
      },
      {
        path: '/note',
        key: 'note',
        title: '笔记',
        icon: <ReadOutlined />
      }
    ]
  }
];
const router = createBrowserRouter(routes);
export default router;
