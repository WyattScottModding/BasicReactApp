import '../styles/UpgradeTab.css'
import {useState, useEffect} from 'react'
import upgradeFrame from '../resources/images/upgrade-frame.png';
import upgradeFrameHover from "../resources/images/upgrade-frame-hover.png";
import upgradeFrameGreyedOut from "../resources/images/upgrade-frame-greyed-out.png";


function CookieMakerTab({upgrade, index, setUpgrades, cookieCount, updateCookies}) {
    
    const [cost, setCost] = useState(upgrade.cost);
    const [isHovered, setIsHovered] = useState(false);
    const [currentTabImage, setCurrentTabImage] = useState(upgradeFrame);
    const [tooltipPosition, setTooltipPosition] = useState({ right: "50%"});
    
    useEffect(() => {
        if (cookieCount < cost) {
            setCurrentTabImage(upgradeFrameGreyedOut);
        }
        else if (isHovered) {
            setCurrentTabImage(upgradeFrameHover);
        }
        else
            setCurrentTabImage(upgradeFrame);
    }, [cookieCount, cost, isHovered]);
    
    const buyUpgrade = () => {
      if (cookieCount >= cost && !upgrade.bought) {
          updateCookies(-upgrade.cost); // Update the cookies we have left
          
          setUpgrades(prevUpgrades => 
          prevUpgrades.map((upg, i) => 
          i === index ? { ...upg, bought: true} : upg));
        
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
             onClick={buyUpgrade}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
            onMouseMove={(e) => handleMouseMove(e)}>
            <div>
                <img src={upgrade.url} className="cookie-maker-image-upgrade" alt={upgrade.name}/>
                <img src={currentTabImage} className="tab-background-upgrade" alt="tab background"/>
            </div>
            {isHovered && (
                <div className="tooltip"
                     style={{
                         right: `${tooltipPosition.right}px`,
                         top: `${tooltipPosition.top}px`,
                     }}
                >
                    {`Cost: ${upgrade.cost} cookies`}<br/>
                    {upgrade.name}
                </div>
            )}
        </div>
    );
}

export default CookieMakerTab;