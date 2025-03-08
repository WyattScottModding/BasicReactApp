import wood from '../resources/images/wood.png'
import woodRotated from '../resources/images/wood-rotated.png'
import '../styles/CookieMakerSection.css'
import CookieMakerRow from "./CookieMakerRow";

function CookieMakerSection({cookieMakers}) {
    return (
      <div className="cookie-maker-section">
          <img src={wood} className="vertical-wood" alt="wood"/>
          <div className="cookie-maker-container">
              {cookieMakers.map((maker, index) => (
                  <div key={index} className="cookie-maker-row-container">
                      {index == 0 && <img src={woodRotated} className="horizontal-wood" alt="wood"/>}
                      <CookieMakerRow cookieMaker={maker}></CookieMakerRow>
                      <img src={woodRotated} className="horizontal-wood" alt="wood"/>
                  </div>
              ))}
          </div>
          <img src={wood} className="vertical-wood" alt="wood"/>
      </div>  
    );
}

export default CookieMakerSection;