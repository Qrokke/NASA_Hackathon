import React, { useState, useEffect } from 'react';
import './App.css';
import { json } from 'react-router-dom';
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
    const strongestAspect = { planet1: null, planet2: null, strength: null };
    const secondStrongestAspect = { planet1: null, planet2: null, strength: null };
  
    // Set aspect angle thresholds
    const aspects = [
      { name: "Conjunction", threshold: 8 },
      { name: "Trine", threshold: 8 },
      { name: "Sextile", threshold: 6 }
    ];

    for(let n=0; n<angulerList.length; n++){
       for(let m=0; m<angulerList.length; m++){
            if(n !== m && n !== centerIndex && m !== centerIndex) {
                const aspect = Math.abs(angulerList[n].rad - angulerList[m].rad);
                const normalizedAspect = aspect > 180 ? 360 - aspect : aspect;

                aspects.forEach(({ name, threshold }) => {
                    if (normalizedAspect <= threshold) {
                      if (strongestAspect.strength === null || normalizedAspect < strongestAspect.strength) {
                        secondStrongestAspect.planet1 = strongestAspect.planet1;
                        secondStrongestAspect.planet2 = strongestAspect.planet2;
                        secondStrongestAspect.strength = strongestAspect.strength;
          
                        strongestAspect.planet1 = angulerList[n].planet;
                        strongestAspect.planet2 = angulerList[m].planet;
                        strongestAspect.strength = normalizedAspect;
                      } else if (secondStrongestAspect.strength === null || normalizedAspect < secondStrongestAspect.strength) {
                        secondStrongestAspect.planet1 = angulerList[n].planet;
                        secondStrongestAspect.planet2 = angulerList[m].planet;
                        secondStrongestAspect.strength = normalizedAspect;
                      }
                    }
                  });
            }
        

       }
    }
    return[strongestAspect, secondStrongestAspect];
  }
  
  const explanationList = [
    {
      planet: "sun",
      traits: [
        "",
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
        "Connection between self and intellect enhances independent thinking. You have the ability to organize and express your thoughts.",
        "",
        "Intellect and charm are connected. Your rich sensitivity enhances communication in various settings.",
        "You have improved understanding of natural sciences. Your strength lies in free thinking and ideas that go beyond boundaries.",
        "You have strength in intellectual actions. Acting boldly in discussions can yield positive results.",
        "You excel in intellectual growth. Pursuing knowledge with eagerness positively impacts your thinking.",
        "Being intellectual makes you cautious. It’s important to take your time to think things through."
      ]
    },
    {
      planet: 1,
      traits: [
        "You are a highly attractive presence. You radiate a unique charm in relationships, finding greater happiness through deeper connections.",
        "Intellect and charm are connected. Your rich sensitivity enhances communication in various settings.",
        "",
        "You are loved by various people. By spreading love, you can seek a happier life.",
        "You possess a burning passion for aesthetics. In love, proactive engagement suits you well.",
        "You excel in growth related to beauty. Having a high sensitivity to love and art leads to happiness through diverse interests.",
        "You tend to seek realistic love. Nurturing relationships without haste will likely lead to happiness."
      ]
    },
    {
      planet: 2,
      traits: [
        "You can acquire your unique self in various environments. Your human richness expands through interaction with your surroundings.",
        "You have improved understanding of natural sciences. Your strength lies in free thinking and ideas that go beyond boundaries.",
        "You are loved by various people. By spreading love, you can seek a happier life.",
        "",
        "You can exert abundant passion on those around you, inspiring them and increasing productivity.",
        "You are a person capable of engaging with the world and discovering new insights. If you release your energy outward, you can spread happiness to people all over the world.",
        "You can empathize with others' sense of justice. By holding yourself accountable and imposing rules, you can maintain your environment for a long time."
      ]
    },
    {
      planet: 3,
      traits: [
        "You are a very energetic presence. Acting with confidence should allow you to achieve more challenging goals.",
        "You have strength in intellectual actions. Acting boldly in discussions can yield positive results.",
        "You possess a burning passion for aesthetics. In love, proactive engagement suits you well.",
        "You can exert abundant passion on those around you, inspiring them and increasing productivity.",
        "",
        "You excel at transmitting motivation. Tasks you approach with enthusiasm are likely to attract help from those around you.",
        "You are active while also being disciplined. Particularly, accumulating steady effort leads to success."
      ]
    },
    {
      planet: 4,
      traits: [
        "You are a person with great potential. Facing challenges without fear will lead you to a better future.",
        "You excel in intellectual growth. Pursuing knowledge with eagerness positively impacts your thinking.",
        "You excel in growth related to beauty. Having a high sensitivity to love and art leads to happiness through diverse interests.",
        "You are a person capable of engaging with the world and discovering new insights. If you release your energy outward, you can spread happiness to people all over the world.",
        "You excel at transmitting motivation. Tasks you approach with enthusiasm are likely to attract help from those around you.",
        "",
        "You excel at balancing idealism and realism. By making practical efforts, you can achieve ideal success and growth."
      ]
    },
    {
        planet: 4,
        traits: [
            "You are a very sincere person. If you patiently work through difficulties, you will gain strong trust and stability.",
            "Being intellectual makes you cautious. It’s important to take your time to think things through.",
            "You tend to seek realistic love. Nurturing relationships without haste will likely lead to happiness.",
            "You can empathize with others' sense of justice. By holding yourself accountable and imposing rules, you can maintain your environment for a long time.",
            "You are active while also being disciplined. Particularly, accumulating steady effort leads to success.",
            "You excel at balancing idealism and realism. By making practical efforts, you can achieve ideal success and growth.",
            ""
        ]
      }
  ];
  
  const resultExplanation = (starSystem,strongAspect) => {
    let strongExplanation = null;
    
    if(strongAspect.planet1 === null || strongAspect.planet2 === null) {

      strongExplanation = "There were no special relationships between the planets, but because of that, you can lead a peaceful and stable life. Love your neighbors.";

    }
    else{
        if(strongAspect.planet1 === 'sun') {
  
            if(starSystem === 'sun') {
              const plane1Explanation = explanationList[0].traits;
      
              strongExplanation = plane1Explanation[strongAspect.planet2];
            }
        
            if(starSystem === 'trappist1') {
              const plane1Explanation = explanationList[0].traits;
        
              strongExplanation = plane1Explanation[strongAspect.planet2];
            }
          }
          else{
            if(starSystem === 'sun') {
              const plane1Explanation = explanationList[0].traits;
        
              strongExplanation = plane1Explanation[strongAspect.planet2];
            }
        
            if(starSystem === 'trappist1') {
              const plane1Explanation = explanationList[strongAspect.planet1].traits;
        
              strongExplanation = plane1Explanation[strongAspect.planet2];
            }
          }      
    }

    console.log('strongExplanation', strongExplanation)
    return <>{((typeof  strongExplanation) == 'string') && (<>{strongExplanation}</>) || (<>{strongExplanation}</>)}</>;
  }


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

    const setAngulerList = (result) => {
        let angulerList = [];
        for(let i=1; i<result.length; i++){
            angulerList.push(result[i].rad);
        }
        return angulerList;
    }

    const sunAnguler = result[0].rad;
    const angulerList = setAngulerList(result);
    const horoscopeSize = {width: '300px', height:'300px'};
    const sunPosition = setSunPostion(selectedPlanet, sunAnguler);
    const imagesList = setImagesList(selectedStarSystem);
    const planetsPosition = setPlanetsPosition(selectedPlanet, angulerList);
    const [strongAspect, secondStrongestAspect] = getStrongAspect(result, selectedPlanet);
    const strongExplanation = resultExplanation(selectedStarSystem, strongAspect);
    console.log('strongExplanation', strongExplanation)
    const secondStrongestExplanation = resultExplanation(selectedStarSystem, secondStrongestAspect);
 
  return (
    
    <div>
        <header className="header">
            <h1>ROITs Horoscope</h1>
        </header>
        <div style={{display:'flex'}}>
            <div style={{width:'50%', height:'auto',margin:'10px'}}>
                <p style={{ fontSize: '20px' }}>In Earth, you are...</p>
                <p style={{ fontSize: '20px' }}>{strongExplanation}  {secondStrongestExplanation}</p>
                    {/* <div className="horoscope">
                        
                        <img src="https://via.placeholder.com/300" alt="ホロスコープ" />
                    </div> */}

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
            </div>
            <div style={{width:'50%', height:'auto',margin:'10px'}}>
                <p style={{ fontSize: '20px' }}>In {imagesList[selectedPlanet].alt}, you are...</p>
                <p style={{ fontSize: '20px' }}>{strongExplanation}  {secondStrongestExplanation}</p>
                    <div>{description}</div>
                    
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
            </div>
        </div>
            <footer className="footer">
            <p>&copy; 2024 ROITs。</p>
            </footer>
    </div>

  );
}


export default Result;

