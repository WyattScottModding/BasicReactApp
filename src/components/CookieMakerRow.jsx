import '../styles/CookieMakerRow.css'
import React, { useState, useEffect, useRef } from 'react';

function CookieMakerRow({ cookieMaker }) {
    const rowRef = useRef(null);
    const [positions, setPositions] = useState([]);
    
    useEffect(() => {
        if (!rowRef.current) return;
        
        const imageSize = 50;
        const spacing = imageSize - 8;
        const spacingSmall = 5;
        const imagesPerRow = 4;
        
        setPositions(() => {
           const newPositions = [];
           for (let i = 0; i < cookieMaker.count; i++) {
               const row = Math.floor(i / imagesPerRow);
               const col = i % imagesPerRow;
               
               newPositions.push({
                   top: col * spacing + 7.5,
                   left: row * spacing + col * spacingSmall
               });
           }
           
           return newPositions;
        });
    }, [cookieMaker.count]);
    
    return (
        <div className="cookie-maker-row" ref={rowRef} style={{ background: `radial-gradient(ellipse 80% 100% at center, ${cookieMaker.color} 0%, #091529 100%)`}}>
            {positions.map((pos, index) => (
                <img key={index}
                    src={cookieMaker.url}
                    alt={cookieMaker.name}
                    className="cookie-maker-image"
                     style={{
                         position: 'absolute',
                         top: `${pos.top}px`,
                         left: `${pos.left}px`
                     }}
                />
            ))}
        </div>
    );
}

export default CookieMakerRow;