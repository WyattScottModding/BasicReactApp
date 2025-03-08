import '../styles/StoreSection.css'
import woodRotated from '../resources/images/wood-rotated.png'
import CookieMakerTab from "./CookieMakerTab";
import UpgradeTab from "./UpgradeTab";

function StoreSection({cookieMakers, setCookieMakers, updateCookies, cookieCount, upgrades, setUpgrades }) {
    return (
        <div className="store-section">
            <header>Store</header>
            <div className="store-container">
                <img src={woodRotated} className="horizontal-wood" alt="wood"/>
                <div className="upgrade-container">
                    {upgrades.map((upgrade, index) => (
                        !upgrade.bought && <UpgradeTab key={index} index={index} upgrade={upgrade} setUpgrades={setUpgrades} upgrades={upgrades} cookieCount={cookieCount} updateCookies={updateCookies} />
                    ))}
                </div>
                <img src={woodRotated} className="horizontal-wood" alt="wood"/>
            </div>
            <div className="store-container">
                {cookieMakers.map((maker, index) => (
                    <CookieMakerTab key={index} index={index} cookieMaker={maker} setCookieMakers={setCookieMakers} updateCookies={updateCookies} cookieCount={cookieCount} upgrade={upgrades[index]} ></CookieMakerTab>
                ))}
            </div>
        </div>
    );
}

export default StoreSection;