import React from 'react';
import './VerkehrsunfallHeroSection.css';

const VerkehrsunfallHeroSection = () => {
  const heroStyle = {
    backgroundImage: `url(/assets/images/Verkehrsunfallhero.png)`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title-line">Ihr Verkehrsunfall - Unsere Unterstützung!</h1>
            <p className="hero__subtitle" style={{fontSize: "1.8rem", whiteSpace: "nowrap"}}><span className="hero__highlight-animated"><strong>Einfach, Digital Prüfen lassen!</strong></span></p>
            
            <div className="hero__benefits">
              <div className="hero__benefit-item">
                <div className="hero__benefit-icon">
                  🎯
                </div>
                <h3>Schnelle Schadensabwicklung</h3>
                <p>Dank unserer digitalen Prozesse erhalten Sie innerhalb kürzester Zeit eine professionelle Einschätzung und Unterstützung.</p>
              </div>
              
              <div className="hero__benefit-item">
                <div className="hero__benefit-icon">
                  💻
                </div>
                <h3>Automatische Gutachter-Zuteilung</h3>
                <p>Wir vermitteln Ihnen den passenden Kfz-Gutachter in Ihrer Nähe – ohne aufwendige Suche.</p>
              </div>
              
              <div className="hero__benefit-item">
                <div className="hero__benefit-icon">
                  💰
                </div>
                <h3>Rechtliche Unterstützung ohne Aufwand</h3>
                <p>Unsere Partner-Anwälte kümmern sich um Ihre Ansprüche – einfach, transparent und digital. 🚀</p>
              </div>
            </div>
            
            <a href="/anfrage/verkehrsunfallanfrage" className="hero__cta-button" style={{ marginTop: '2.5rem', display: 'inline-block' }}>Jetzt kostenlos prüfen</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerkehrsunfallHeroSection; 