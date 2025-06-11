import React from 'react';
import './KfzHeroSection.css';
import { Link } from 'react-router-dom';

const KfzHeroSection = () => {
  const heroStyle = {
    backgroundImage: `url(/assets/images/KFZ_Gutachtenherosektion.png)`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title-line">Ihr KFZ-Gutachten</h1>
            <p className="hero__subtitle" style={{fontSize: "1.8rem", whiteSpace: "nowrap"}}><span className="hero__highlight-animated"><strong>Einfach, Schnell und Digital!</strong></span></p>
            
            <div className="hero__benefits">
              <div className="hero__benefit-item">
                <div className="hero__benefit-icon">
                  🎯
                </div>
                <h3>Automatische Gutachterzuteilung</h3>
                <p>Wir finden den passenden Kfz-Gutachter in Ihrer Nähe.</p>
              </div>
              
              <div className="hero__benefit-item">
                <div className="hero__benefit-icon">
                  💻
                </div>
                <h3>Digitale Schadensabwicklung</h3>
                <p>Verfolgen Sie den gesamten Prozess bequem online.</p>
              </div>
              
              <div className="hero__benefit-item">
                <div className="hero__benefit-icon">
                  💰
                </div>
                <h3>Maximale Schadenssummen</h3>
                <p>Wir sichern Ihnen die höchstmögliche Entschädigung.</p>
              </div>
            </div>
            
            <a href="http://localhost:3001/anfrage/kfz-gutachtenanfrage" className="hero__cta-button" style={{ marginTop: '2.5rem', display: 'inline-block' }}>Jetzt kostenlos prüfen</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KfzHeroSection; 