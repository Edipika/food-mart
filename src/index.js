import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import App from './app';
import { store } from './app/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store} >
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

{/* <RouterProvider router={routes}>
    </RouterProvider> */}










