import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from  "./Search.js"
import Result from "./Result.js";

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

