import React from 'react';
import './App.css';
//画像のインポート
import horoscope from './images/horoscope.png';
import sun from './images/sun.png';

const initialPosition = 20;

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
  {src:require('./images/trappist1/trappist1h.png'), alt: 'trappist1h'},
];

const setSunPostion = (mode, realSunX, realSunY) => {
  const sunRadians = Math.atan2(realSunX, realSunY) * (180 / Math.PI);
  const sunRadius = initialPosition + 17 * (mode+1);
  const sunX = sunRadius * Math.cos(sunRadians * (Math.PI / 180));
  const sunY = sunRadius * Math.sin(sunRadians * (Math.PI / 180));
  return {top: sunY, left: sunX};
}

const setImagesList = (mode) => {
    if(mode === 1) {
      return solarsystemImages;
    } else if(mode === 2) {
      return trappist1Images;
    }
}

const setPlanetsPosition = (mode, sunAnguler,angulerList) => {
  const centerPlanetIndex = mode + 1;
  return angulerList.map((anguler, index) => {
    const planetRadius = initialPosition + 17 * index;

    if(index === centerPlanetIndex) {
      return {top:'50%', left: '50%', transform: `translate(-50%, -50%)`};
    }
    else{//rotate(${anguler + sunAnguler}deg)
      const totalAnguler = anguler + sunAnguler;
      const radians = (totalAnguler * Math.PI) / 180;
      const x = planetRadius * Math.cos(radians);
      const y = planetRadius * Math.sin(radians);

      return {top:`calc(50% + ${y}px)`, left:`calc(50% + ${x}px)`, transform: `translate(-50%, -50%)`};
    }
  });
};

function App() {
  const mode = 1;
  const horoscopeSize = {width: '300px', height:'300px'};
  const sunPosition = setSunPostion(mode,'150', '204');
  const sunAnguler = 0;
  const imagesList = setImagesList(mode);
  const planetsPosition = setPlanetsPosition(mode, sunAnguler,[0, 45, 90, 135, 180, 225]);

  return (
    <div style={{position:'relative', width:horoscopeSize.width, height:horoscopeSize.height, top: '100px', left: '100px'}}>
      {/* set horoscope */}
      <img src={horoscope} alt="horoscope" style={{ width:horoscopeSize.width, height:horoscopeSize.height}} />
      {/* set sun */}
      <img src={sun} alt="sun" style={{width: '12px', height: 'auto', position: 'absolute', top: '${sunPosition.top}px', left: sunPosition.left, transform: 'translate(-50%, -50%)'}} />

      {/* set planets */}
      {imagesList.map((image, index) => (
        <img key={index} src={image.src} alt={image.alt} style={{width: '12px', height: 'auto',position: 'absolute', top: planetsPosition[index].top, left: planetsPosition[index].left,transform: planetsPosition[index].transform }}/>
      ))};
    </div>
  );
}

export default App;
