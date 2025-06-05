// src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import WebSocketChat from './pages/WebSocketChat';  // Homeコンポーネントをインポート
import TimeCard from './pages/TimeCard';
import Attendances from './pages/Attendances';
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <WebSocketChat /> },
      { path: 'timecard', element: <TimeCard /> },
      { path: 'attendances', element: <Attendances/>}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
