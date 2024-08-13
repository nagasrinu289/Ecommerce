import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './utils/auth';
import App from './App';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
     <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>
  
);

