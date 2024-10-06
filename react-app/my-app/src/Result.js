import React, { useState, useEffect } from 'react';
import './App.css';
import { json } from 'react-router-dom';


function Result() {

    const [description, setdescription] =useState('')
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const selectedStarSystem = params.get('selectedStarSystem')
    const selectedPlanet = params.get('selectedPlanet')
    const descriptionRes = params.get('description')
    const result = params.get('result')

    console.log(selectedStarSystem,selectedPlanet,descriptionRes,result)

    useEffect(() => {


        // selectedPlanet,
        // description: data.description,
        // result: JSON.stringify(data.result)


        const fetchData = async () => {

            const response = await fetch('/demo.json');
            const result = await response.json();

            setdescription(result.description)
        }

        fetchData();

    });
 
  return (
    <div>
        <header className="header">
            <h1>ROITs Horoscope</h1>
        </header>
        <div style={{display:'flex'}}>
            <div style={{width:'50%', height:'auto',margin:'10px'}}>
                <p style={{ fontSize: '20px' }}>In Earth, you are...</p>
                <p style={{ fontSize: '20px' }}>結果</p>
                    <div className="horoscope">
                        <img src="https://via.placeholder.com/300" alt="ホロスコープ" />
                    </div>
            </div>
            <div style={{width:'50%', height:'auto',margin:'10px'}}>
                <p style={{ fontSize: '20px' }}>In {selectedPlanet}, you are...</p>
                <p style={{ fontSize: '20px' }}>結果</p>
                    <div>{description}</div>
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

