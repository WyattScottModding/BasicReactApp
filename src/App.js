import grandma from './resources/images/grandma.png';
import farm from './resources/images/farm.png';
import factory from './resources/images/factory.png';
import mouseClicker from './resources/images/mouse-clicker.png';
import cookiesFalling from "./resources/videos/cookies-falling.mp4";

import './App.css';
import {useState, useEffect} from 'react'
import CookieSection from "./components/CookieSection";
import CookieMakerSection from "./components/CookieMakerSection";
import StoreSection from "./components/StoreSection";


function App() {
    
    const [cookieCount, setCookieCount] = useState(0);
    const [cookieRate, setCookieRate] = useState(0);
    
    const [cookieMakers, setCookieMakers] = useState([
        { name: "Clicker", url: mouseClicker, increment: 1, cost: 15, count: 0, color: "#3874d8"},
        { name: "Grandma", url: grandma, increment: 5, cost: 100, count: 0, color: "#d86f38"},
        { name: "Farm", url: farm, increment: 20, cost: 1000, count: 0, color: "#3a9d23"},
        { name: "Factory", url: factory, increment: 100, cost: 5000, count: 0, color: "#d8d538"},
    ]);

    const [upgrades, setUpgrades] = useState([
        { name: "Doubles Clicker Rate", url: mouseClicker, cost: 1000, bought: false},
        { name: "Doubles Grandma Rate", url: grandma, cost: 5000, bought: false},
        { name: "Doubles Farm Rate", url: farm, cost: 10000, bought: false},
        { name: "Doubles Factory Rate", url: factory, cost: 20000, bought: false},
    ]);
    
    const updateCookies = (count) => {
        setCookieCount(prevCount => prevCount + count);
    }
    
    const getCookieRate = () => {
        return cookieMakers.reduce((totalRate, maker) => {
            const count = maker.count || 0;
            const upgrade = upgrades.find(upg =>upg.name.includes(maker.name) && upg.bought);
            const multiplier = upgrade ? 2 : 1;
            return totalRate + (count * maker.increment * multiplier);
        }, 0);
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCookieCount(prevCount => prevCount + (getCookieRate() / 100));
        }, 10)
        
        return () => clearInterval(interval);
    }, [cookieMakers]);
    
  return (
      <>
      <video autoPlay loop muted className="video-background">
          <source src={cookiesFalling} type="video/mp4"/>
        </video>
        <header className="App-header">
            <CookieSection cookieCount={cookieCount} setCookieCount={setCookieCount} getCookieRate={getCookieRate} upgrades={upgrades}></CookieSection>
          <CookieMakerSection cookieMakers={cookieMakers}></CookieMakerSection>
          <StoreSection cookieMakers={cookieMakers} setCookieMakers={setCookieMakers} updateCookies={updateCookies} cookieCount={cookieCount} upgrades={upgrades} setUpgrades={setUpgrades} ></StoreSection>
        </header>
      </>
  );
}

export default App;
