// src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import WebSocketChat from './pages/WebSocketChat';  // Homeコンポーネントをインポート

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <WebSocketChat /> }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
