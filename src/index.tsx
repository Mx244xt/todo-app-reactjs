import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { RouterConfig } from './routes/RouterConfig';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterConfig />
    <ToastContainer />
  </React.StrictMode>
);
