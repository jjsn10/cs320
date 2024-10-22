import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Page2 from './Page2';
import Navbar from './Navbar';
import Footer from './Footer';
import Category from './Category';
import EditCategory from './EditCategory';
import Report from './Report';
//import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routers, Router, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element={<App/>} />
              <Route path="/category" element={<Category/>} />
              <Route path="/report" element={<Report/>} />
              <Route path="/edit-category/:id" element={<EditCategory/>} />
          </Routes>
          <Footer/>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
