import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
//画像のインポート
import horoscope from './images/horoscope.png';
import sun from './images/sun.png';

const solarsystemImages = [
  {src:require('./images/solarsystem/mercury.png'), alt: 'mercury'},
  {src:require('./images/solarsystem/venus.png'), alt: 'venus'},
  {src:require('./images/solarsystem/earth.png'), alt: 'earth'},
  {src:require('./images/solarsystem/mars.png'), alt: 'mars'},
  {src:require('./images/solarsystem/jupiter.png'), alt: 'jupiter'},
  {src:require('./images/solarsystem/saturn.png'), alt: 'saturn'},
];

const trappist1Images = [
  {src:require('./images/trappist1/trappist1b.png'), alt: 'trappist1b'},
  {src:require('./images/trappist1/trappist1c.png'), alt: 'trappist1c'},
  {src:require('./images/trappist1/trappist1d.png'), alt: 'trappist1d'},
  {src:require('./images/trappist1/trappist1e.png'), alt: 'trappist1e'},
  {src:require('./images/trappist1/trappist1f.png'), alt: 'trappist1f'},
  {src:require('./images/trappist1/trappist1g.png'), alt: 'trappist1g'},
];

const result = [
  { "name": "sun", "rad": 0 },
  { "name": "mercury", "rad": 30 },
  { "name": "venus", "rad": 60 },
  { "name": "earth", "rad": 90 },
  { "name": "mars", "rad": 120 },
  { "name": "jupiter", "rad": 150 },
  { "name": "saturn", "rad": 180 }
];

const getCenterIndex = (starSystem, centerPlanet) => {
    if(starSystem === 'sun') {
      return solarsystemImages.findIndex(image => image.alt === centerPlanet);
    }
    if(starSystem === 'trappist1') {
      return trappist1Images.findIndex(image => image.alt === centerPlanet);
    }
}

const setSunPostion = (centerIndex, sunAnguler) => {
    const initialAnguler = 150;
    const initialPosition = 20;
    
    const totalAnguler = initialAnguler - sunAnguler;
    const sunRadians = ( totalAnguler * Math.PI) / 180;
    const sunRadius = initialPosition + 17 * centerIndex;
    const x = sunRadius * Math.cos(sunRadians);
    const y = sunRadius * Math.sin(sunRadians);
  
    return {top:`calc(50% + ${y}px)`, left:`calc(50% + ${x}px)`, transform: `translate(-50%, -50%)`};
  }
  
  const setImagesList = (starSystem) => {
      if(starSystem === 'sun') {
        return solarsystemImages;
      } else if(starSystem === 'trappist1') {
        return trappist1Images;
      }
  }
  
  const setPlanetsPosition = (centerIndex, angulerList) => {
    const initialAnguler = 150;
    const initialPosition = 20;
  
    return angulerList.map((anguler, index) => {
      const planetRadius = initialPosition + 17 * index;
  
      if(index === centerIndex) {
        return {top:'50%', left: '50%', transform: `translate(-50%, -50%)`};
      }
      else{
        const totalAnguler = initialAnguler - anguler;
        const sunRadians = (totalAnguler * Math.PI) / 180;
        const x = planetRadius * Math.cos(sunRadians);
        const y = planetRadius * Math.sin(sunRadians);
  
        return {top:`calc(50% + ${y}px)`, left:`calc(50% + ${x}px)`, transform: `translate(-50%, -50%)`};
      }
    });
  };

  const sunAnguler = result[0].rad;
  const angulerList = result.slice(1).map(planet => planet.rad);
  const horoscopeSize = {width: '300px', height:'300px'};
  const sunPosition = setSunPostion(2, sunAnguler);
  const imagesList = setImagesList('sun');
  const planetsPosition = setPlanetsPosition(2, angulerList);


function Search() {
  const [name, setName] = useState('');  // 名前の状態を管理
  const [selectedYear, setSelectedYear] = useState('');  // 年の状態を管理
  const [selectedMonth, setSelectedMonth] = useState('');  // 月の状態を管理
  const [selectedDay, setSelectedDay] = useState('');  // 日の状態を管理
  const [selectedStarSystem, setSelectedStarSystem] = useState('');  // 星系の状態を管理
  const [selectedPlanet, setSelectedPlanet] = useState('');  // 惑星の状態を管理
  const [message, setMessage] = useState('');  // メッセージの状態を管理
  const navigate = useNavigate();

  const handleStarSystemChange = (e) => {
    setSelectedStarSystem(e.target.value);
    setSelectedPlanet('');  // 星系が変わったら惑星をリセット
  };

  const handleSubmit = (event) => {
    event.preventDefault();  // フォーム送信のデフォルト動作をキャンセル
    let birthdate ='';

    if (name.trim() === "" || selectedYear === "" || selectedMonth === "" || selectedDay === "" || selectedPlanet === "") {
      setMessage("Please enter your name, date of birth, zodiac sign, and planet.");  // すべてのフィールドが必要
    } else {
      birthdate = `${selectedYear}-${selectedMonth}-${selectedDay}`;  // 生年月日を生成
      setMessage(`Hello, ${name}！Your date of birth is ${birthdate}、and your selected planet is  ${selectedPlanet} .`);
    }

    setName('');  // フォームのリセット
    setSelectedYear('');
    setSelectedMonth('');
    setSelectedDay('');
    setSelectedPlanet('');
    setSelectedStarSystem('');

    console.log(name, birthdate, selectedPlanet);

    fetch('/demo.json')
    //  fetch(`https://ppf6j3b4z2.execute-api.us-east-2.amazonaws.com/v1/test?name=${name}&birthday=${birthdate}&starsytem=${selectedPlanet}`)  // APIのURLを指定
     .then(response => response.json())  // レスポンスをJSON形式に変換
     .then(data => {

      const queryString = new URLSearchParams({
        selectedStarSystem,
        selectedPlanet,
        description: data.description,
        result: JSON.stringify(data.result)
      }).toString();

      navigate('/result?' + queryString);
     })
     .catch(error => {
       console.error('error:', error);  // エラー処理
     });

  };

  




  return (
    <div className="App">
      <header className="header">
        <h1>ROITs Horoscope</h1>
      </header>

      <div className="container">
        {/* 左側に標準のホロスコープ画像を表示 */}
        <div style={{position:'relative', width:horoscopeSize.width, height:horoscopeSize.height, top: '100px', left: '100px', marginRight: '300px'}}>
          {/* set horoscope */}
          <img src={horoscope} alt="horoscope" style={{ width:horoscopeSize.width, height:horoscopeSize.height}} />
          {/* set sun */}
          <img src={sun} alt="sun" style={{width: '14px', height: 'auto', position: 'absolute', top: sunPosition.top, left:sunPosition.left, transform:sunPosition.transform}} />

          {/* set planets */}
          {imagesList.map((image, index) => (
              <img
              key={index}
              src={image.src}
              alt={image.alt}
              style={{
                  width: '12px',
                  height: 'auto',
                  position: 'absolute',
                  top: planetsPosition[index].top,
                  left: planetsPosition[index].left,
                  transform: planetsPosition[index].transform
              }}
              />
          ))}
      </div>

        {/* 右側に入力フォームを表示 */}
        <div className="form-container">
          <form onSubmit={handleSubmit} id="nameForm">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name">Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}  // 名前の入力を管理
                      placeholder="Please enter your name."
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="birthdate">Date of Birth:</label>
                  </td>
                  <td>
                    {/* 年、月、日を選択するためのドロップダウン */}
                    <select id="birthdate-year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                      <option value="">Year</option>
                      {Array.from({ length: 100 }, (_, i) => (
                        <option key={i} value={2023 - i}>{2023 - i}</option>
                      ))}
                    </select>
                    <select id="birthdate-month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
                      ))}
                    </select>
                    <select id="birthdate-day" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                  <label htmlFor="star-system">Star System:</label>
                  </td>
                  <td>
                    <select
                      id="star-system"
                      value={selectedStarSystem}
                      onChange={handleStarSystemChange}  // 星系の選択を管理
                    >
                      <option value="">Please select a star system.</option>
                      <option value="trappist1">TRAPPIST-1</option>
                      <option value="sun">Sun</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="planet">Planet:</label>
                  </td>
                  <td>
                    <select
                      id="planet"
                      value={selectedPlanet}
                      onChange={(e) => setSelectedPlanet(e.target.value)}  // 惑星の選択を管理
                    >
                      <option value="">Please select a planet.</option>
                      {selectedStarSystem === "trappist1" && (
                        <>
                          <option value="0">TRAPPIST-1b</option>
                          <option value="1">TRAPPIST-1c</option>
                          <option value="2">TRAPPIST-1d</option>
                          <option value="3">TRAPPIST-1e</option>
                          <option value="4">TRAPPIST-1f</option>
                          <option value="5">TRAPPIST-1g</option>
                        </>
                      )}
                      {selectedStarSystem === "sun" && (
                        <>
                          <option value="0">Mercury</option>
                          <option value="1">Venus</option>
                          <option value="2">Earth</option>
                          <option value="3">Mars</option>
                          <option value="4">Jupiter</option>
                          <option value="5">Saturn</option>
                        </>
                      )}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <button>Find</button>
          </form>
          <div id="message">{message}</div>  {/* メッセージを表示 */}
        </div>
      </div>
        <footer className="footer">
          <p>&copy; 2024 ROITs。</p>
        </footer>
    </div>
  );
}


export default Search;

