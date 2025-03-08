import '../styles/CookieMakerTab.css'
import {useState, useEffect} from 'react'
import tabBackground from "../resources/images/tab-background.png";
import tabBackgroundHover from "../resources/images/tab-background-hover.png";
import tabBackgroundGreyedOut from "../resources/images/tab-background-greyed-out.png";


function CookieMakerTab({index, cookieMaker, setCookieMakers, updateCookies, cookieCount, upgrade}) {
    
    const [cost, setCost] = useState(cookieMaker.cost);
    const [isHovered, setIsHovered] = useState(false);
    const [currentTabImage, setCurrentTabImage] = useState(tabBackground);
    const [tooltipPosition, setTooltipPosition] = useState({ right: "50%"});
    
    useEffect(() => {
        if (cookieCount < cost) {
            setCurrentTabImage(tabBackgroundGreyedOut);
        }
        else if (isHovered) {
            setCurrentTabImage(tabBackgroundHover);
        }
        else
            setCurrentTabImage(tabBackground);
    }, [cookieCount, cost, isHovered]);
    
    const buyCookieMaker = () => {
      if (cookieCount >= cost) {
          updateCookies(-cost); // Update the cookies we have left
          setCost((prevCost) => Math.ceil(prevCost * 1.15)); // Increase the cost of the cookie maker
      
        setCookieMakers(prevCookieMaker =>
            prevCookieMaker.map((cookieMaker, i) => 
                i === index ? { ...cookieMaker, count: cookieMaker.count + 1 } : cookieMaker
            )
        );
      }  
    };

    const handleMouseMove = (e) => {
        const tab = e.currentTarget.getBoundingClientRect();
        
        let x = window.innerWidth - tab.left - 15;
        let y = e.clientY - 20;
        
        // Prevents the tooltip from going off screen
        if (y < 10) {
            y = 10;
        }
        
        if (y + 30 > window.innerHeight) {
            y = window.innerHeight - 30;
        }
        
        setTooltipPosition({ right: x, top: y});
    };
    
    return (
        <div className="cookie-maker-tab" 
             onClick={buyCookieMaker}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
            onMouseMove={(e) => handleMouseMove(e)}>
            <img src={currentTabImage} className="tab-background" alt="tab background"/>
            <div className="cookie-maker-content">
                <img src={cookieMaker.url} className="cookie-maker-image" alt={cookieMaker.name}/>
                <div className="cookie-maker-info">
                    <p className="cookie-maker-name">{cookieMaker.name}</p>
                    <p className="cookie-maker-cost">{Math.floor(cost).toLocaleString()} cookies</p>
                </div>
                <p className="cookie-maker-count">{(cookieMaker.count || 0).toLocaleString()}</p>
            </div>
            {isHovered && (
                <div className="tooltip"
                     style={{
                         right: `${tooltipPosition.right}px`,
                         top: `${tooltipPosition.top}px`,
                     }}
                >
                    {upgrade.bought ? `${cookieMaker.increment * 2} cookies/sec` : `${cookieMaker.increment} cookies/sec`}<br/>
                    {'Totaling '} {upgrade.bought ? `${cookieMaker.increment * cookieMaker.count * 2} cookies/sec` : `${cookieMaker.increment * cookieMaker.count} cookies/sec`}
                </div>
            )}
        </div>
    );
}

export default CookieMakerTab;