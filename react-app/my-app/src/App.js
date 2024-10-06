import React from 'react';
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

function App() {
  const starSystem = 'sun';
  const centerIndex = 2;
  const sunAnguler = 0;
  const horoscopeSize = {width: '300px', height:'300px'};
  const sunPosition = setSunPostion(centerIndex, sunAnguler);
  const imagesList = setImagesList(starSystem);
  const planetsPosition = setPlanetsPosition(centerIndex, [0, 45, 90, 135, 180, 225]);

  return (
    <div style={{position:'relative', width:horoscopeSize.width, height:horoscopeSize.height, top: '100px', left: '100px'}}>
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
  );
}

export default App;
