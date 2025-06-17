import React, { useState, useEffect } from 'react';
import './KfzHeroSection.css';
import { Link } from 'react-router-dom';

const KfzHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Benefits für normalen Grid und Karussell
  const benefitItems = [
    {
      icon: "🎯",
      title: "Automatische Gutachterzuteilung",
      description: "Wir finden den passenden Kfz-Gutachter in Ihrer Nähe."
    },
    {
      icon: "💻",
      title: "Digitale Schadensabwicklung",
      description: "Verfolgen Sie den gesamten Prozess bequem online."
    },
    {
      icon: "💰",
      title: "Maximale Schadenssummen",
      description: "Wir sichern Ihnen die höchstmögliche Entschädigung."
    }
  ];

  // Überprüfen, ob wir auf einem mobilen Gerät sind
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Karussell-Navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === benefitItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? benefitItems.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Automatischer Wechsel alle 5 Sekunden
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, currentSlide]);

  const heroStyle = {
    backgroundImage: `url(/assets/images/KFZ_Gutachtenherosektion.png)`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };

  // Dynamische Klassen basierend auf der Bildschirmgröße
  const contentClass = isMobile ? "hero__content" : "hero__content hero__content--left";
  const textClass = isMobile ? "hero__text" : "hero__text hero__text--left";

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero__container">
        <div className={contentClass}>
          <div className={textClass}>
            <h1 className="hero__title-line">Ihr KFZ-Gutachten</h1>
            <p className="hero__subtitle" style={{ fontSize: "1.8rem", whiteSpace: isMobile ? "normal" : "nowrap" }}>
              <span className="hero__highlight-animated"><strong>Einfach, Schnell und Digital!</strong></span>
            </p>
            
            {/* Desktop/Tablet view: normaler Grid */}
            {!isMobile && (
              <div className="hero__benefits">
                {benefitItems.map((item, index) => (
                  <div className="hero__benefit-item" key={index}>
                    <div className="hero__benefit-icon">
                      {item.icon}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Mobile view: Karussell */}
            {isMobile && (
              <div className="hero__carousel">
                <div className="hero__carousel-container">
                  <div className="hero__carousel-controls">
                    <button className="hero__carousel-button" onClick={prevSlide} aria-label="Vorherige">
                      &#10094;
                    </button>
                    <button className="hero__carousel-button" onClick={nextSlide} aria-label="Nächste">
                      &#10095;
                    </button>
                  </div>
                  <div 
                    className="hero__carousel-track"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {benefitItems.map((item, index) => (
                      <div className="hero__carousel-slide" key={index}>
                        <div className="hero__benefit-item">
                          <div className="hero__benefit-icon">
                            {item.icon}
                          </div>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hero__carousel-indicators">
                  {benefitItems.map((_, index) => (
                    <button 
                      key={index} 
                      className={`hero__carousel-indicator ${currentSlide === index ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Gehe zu Slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <a 
              href="http://localhost:3001/anfrage/kfz-gutachtenanfrage" 
              className="hero__cta-button" 
              style={{ marginTop: '2.5rem', display: 'inline-block' }}
            >
              Jetzt kostenlos prüfen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KfzHeroSection; 