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

const getStrongAspect = (angulerList, centerIndex) => {
  const strongestAspect = {planet1:null, planet2:null}
  const secondStrongestAspect = {planet1:null, planet2:null}

  // Set aspect angle thresholds
  const aspects = [
    { name: "Conjunction", threshold: 8 },
    { name: "Trine", threshold: 8 },
    { name: "Sextile", threshold: 6 }
  ];

  angulerList.forEach((anguler1, index1) => {
    angulerList.forEach((anguler2, index2) => {
      if(index1 !== index2 && index1 !== centerIndex && index2 !== centerIndex) {
        const aspect = Math.abs(anguler1 - anguler2);
        const normalizedAspect = aspect > 180 ? 360 - aspect : aspect;

        aspects.forEach(({ name, threshold }) => {
          if (normalizedAspect <= threshold) {
            if (strongestAspect.strength === null || normalizedAspect < strongestAspect.strength) {
              secondStrongestAspect.planet1 = strongestAspect.planet1;
              secondStrongestAspect.planet2 = strongestAspect.planet2;
              secondStrongestAspect.strength = strongestAspect.strength;

              strongestAspect.planet1 = index1;
              strongestAspect.planet2 = index2;
              strongestAspect.strength = normalizedAspect;
            } else if (secondStrongestAspect.strength === null || normalizedAspect < secondStrongestAspect.strength) {
              secondStrongestAspect.planet1 = index1;
              secondStrongestAspect.planet2 = index2;
              secondStrongestAspect.strength = normalizedAspect;
            }
          }
        });
      }
    });
  });

  resultExplanation(strongestAspect, secondStrongestAspect);
}

const explanationList = [
  {
    planet: "sun",
    traits: [
      "Self and emotions align, leading to inner stability. You should be able to lead a calm family life.",
      "Connection between self and intellect enhances independent thinking. You have the ability to organize and express your thoughts.",
      "You are a highly attractive presence. You radiate a unique charm in relationships, finding greater happiness through deeper connections.",
      "You can acquire your unique self in various environments. Your human richness expands through interaction with your surroundings.",
      "You are a very energetic presence. Acting with confidence should allow you to achieve more challenging goals.",
      "You are a person with great potential. Facing challenges without fear will lead you to a better future.",
      "You are a very sincere person. If you patiently work through difficulties, you will gain strong trust and stability."
    ]
  },
  {
    planet: 0,
    traits: [
      "Intellect and emotions are connected. You can empathize with delicate feelings and engage in considerate conversations.",
      "You are filled with love and emotions. You excel at building ideal relationships with partners based on genuine feelings.",
      "You are skilled at understanding the feelings of those around you and maintaining emotional harmony between people. You have the talent to notice subtle emotional nuances and prevent conflicts.",
      "You have strong motivation driven by emotions. Acting actively on your thoughts enriches your heart.",
      "You are rich in emotions. Finding small happiness in your personal life can lead to a more fulfilling life.",
      "You can maintain a strong sense of responsibility. It is important to be aware of what truly matters."
    ]
  },
  {
    planet: 1,
    traits: [
      "Intellect and charm are connected. Your rich sensitivity enhances communication in various settings.",
      "You have improved understanding of natural sciences. Your strength lies in free thinking and ideas that go beyond boundaries.",
      "You have strength in intellectual actions. Acting boldly in discussions can yield positive results.",
      "You excel in intellectual growth. Pursuing knowledge with eagerness positively impacts your thinking.",
      "Being intellectual makes you cautious. It’s important to take your time to think things through."
    ]
  },
  {
    planet: 2,
    traits: [
      "You are loved by various people. By spreading love, you can seek a happier life.",
      "You possess a burning passion for aesthetics. In love, proactive engagement suits you well.",
      "You excel in growth related to beauty. Having a high sensitivity to love and art leads to happiness through diverse interests.",
      "You tend to seek realistic love. Nurturing relationships without haste will likely lead to happiness."
    ]
  },
  {
    planet: 3,
    traits: [
      "You can exert abundant passion on those around you, inspiring them and increasing productivity.",
      "You are a person capable of engaging with the world and discovering new insights. If you release your energy outward, you can spread happiness to people all over the world.",
      "You can empathize with others' sense of justice. By holding yourself accountable and imposing rules, you can maintain your environment for a long time."
    ]
  },
  {
    planet: 4,
    traits: [
      "You excel at transmitting motivation. Tasks you approach with enthusiasm are likely to attract help from those around you.",
      "You are active while also being disciplined. Particularly, accumulating steady effort leads to success."
    ]
  },
  {
    planet: 5,
    traits: [
      "You excel at balancing idealism and realism. By making practical efforts, you can achieve ideal success and growth."
    ]
  }
];

const resultExplanation = (starSystem,strongAspect) => {
  let strongExplanation = null;
  
  if(strongAspect.planet1 === 'sun') {

    if(starSystem === 'sun') {
      const index = solarsystemImages.findIndex(image => image.alt === strongAspect.planet2);

      strongExplanation = explanationList[0].traits[index];;
    }

    if(starSystem === 'trappist1') {
      const index = trappist1Images.findIndex(image => image.alt === strongAspect.planet2);

      strongExplanation = explanationList[0].traits[index];;
    }
  }
  else{
    if(starSystem === 'sun') {
      const index1 = solarsystemImages.findIndex(image => image.alt === strongAspect.planet1);
      const index2 = solarsystemImages.findIndex(image => image.alt === strongAspect.planet2);

      strongExplanation = explanationList[index1].traits[index2];
    }

    if(starSystem === 'trappist1') {
      const index1 = trappist1Images.findIndex(image => image.alt === strongAspect.planet1);
      const index2 = trappist1Images.findIndex(image => image.alt === strongAspect.planet2);

      strongExplanation = explanationList[index1].traits[index2];
    }
  }
  
  return {strongExplanation};
}

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
