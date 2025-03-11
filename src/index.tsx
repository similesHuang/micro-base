import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.less';

import ThemeProvider from './hooks/themeProvider';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
const root = document.getElementById('root');
createRoot(root as HTMLElement).render(
  <ThemeProvider>
    <RouterProvider router={router}></RouterProvider>
  </ThemeProvider>
);
