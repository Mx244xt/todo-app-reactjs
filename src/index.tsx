import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ConfirmationDialogProvider } from './providers/ConfirmDialogContext';
import { RouterConfig } from './routes/RouterConfig';
import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfirmationDialogProvider>
      <RouterConfig />
      <ToastContainer />
    </ConfirmationDialogProvider>
  </React.StrictMode>
);
