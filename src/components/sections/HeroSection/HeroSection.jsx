import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const heroStyle = {
    '--desktop-bg': `url(${process.env.PUBLIC_URL}/assets/images/Bannerbild.png)`,
  };

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero__container">
        <div className="hero__content hero__content--left">
          <div className="hero__text hero__text--left">
            <h1>
              <span className="hero__title-line">Ihr Experte für <span className="hero__highlight-animated">Verkehrsrecht</span></span>
            </h1>
            <p className="hero__subtitle">Einfach. Digital. Recht bekommen.</p>
            
            <div className="hero__benefits">
              <div className="hero__benefit-item">
                <div className="hero__benefit-icon">
                  ⚖️
                </div>
                <h3>Sofortige Ersteinschätzung</h3>
                <p>in wenigen Sekunden wissen Sie, ob Sie Anspruch haben.</p>
              </div>
              
              <div className="hero__benefit-item">
                <div className="hero__benefit-icon">
                  ⏱️
                </div>
                <h3>Rund um die Uhr erreichbar</h3>
                <p>Unsere smarte Assistentin begleitet Sie 24/7.</p>
              </div>
              
              <div className="hero__benefit-item">
                <div className="hero__benefit-icon">
                  🏆
                </div>
                <h3>Hohe Erfolgsquote</h3>
                <p>Über 90% erfolgreiche Fälle</p>
              </div>
            </div>
            
            <button 
              className="hero__cta-button" 
              onClick={() => navigate('/anfrage')}
            >
              Jetzt kostenlos prüfen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
