import React, { useState } from 'react';
import './App.css';


function Result() {
 
  return (
    <div>
        <header className="header">
            <h1>ROITs Horoscope</h1>
        </header>
        <div style={{display:'flex'}}>
            <div style={{width:'50%', height:'auto',margin:'10px'}}>
                <p style={{ fontSize: '20px' }}>地球のあなたは...</p>
                <p style={{ fontSize: '20px' }}>結果</p>
                    <div className="horoscope">
                        <img src="https://via.placeholder.com/300" alt="ホロスコープ" />
                    </div>
            </div>
            <div style={{width:'50%', height:'auto',margin:'10px'}}>
                <p style={{ fontSize: '20px' }}>地球のあなたは...</p>
                <p style={{ fontSize: '20px' }}>結果</p>
                    <div className="horoscope">
                        <img src="https://via.placeholder.com/300" alt="ホロスコープ" />
                    </div>
            </div>
        </div>
            <footer className="footer">
            <p>&copy; 2024 ROITs。</p>
            </footer>
    </div>

  );
}


export default Result;

