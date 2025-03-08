import cookie from '../resources/images/cookie.png'
import '../styles/CookieSection.css'
import {useState} from "react";


function CookieSection({cookieCount, setCookieCount, getCookieRate, upgrades}) {
    
    const [floatingTexts, setFloatingTexts] = useState([]);
    
    const handleClick = (event) => {
        var clickRate = 1;
        
        if (upgrades[0].bought)
            clickRate++;
        
        setCookieCount(cookieCount + clickRate);
        
        const cookieElement = document.querySelector(".cookie-img");
        
        cookieElement.classList.remove("bounce");
        void cookieElement.offsetWidth; // Forces an animation reset
        cookieElement.classList.add("bounce");
        
        setTimeout(() => cookieElement.classList.remove("bounce"), 800);
        
        const newText = {
            id: Date.now(),
            x: event.clientX,
            y: event.clientY - 12, // Placed slightly above the mouse
        };
        
        setFloatingTexts(prevTexts => [...prevTexts, newText]);
    }
    
    return (
        <div className="cookie-section">
            <div className="cookie-container">
                <p className="cookie-count">{Math.ceil(cookieCount).toLocaleString()} cookies</p>
                <img src={cookie} className="cookie-img" alt="cookie" onClick={handleClick}/>
                <p className="cookie-count">{Math.ceil(getCookieRate()).toLocaleString()} cookies per second</p>
            </div>

            {floatingTexts.map(text => (
                <span key={text.id} className="floating-text" style={{left: text.x, top: text.y}}>
                    +{upgrades[0].bought ? '2' : '1'}
                </span>
            ))}
        </div>
    );
}

export default CookieSection;