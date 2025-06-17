import React, { useState, useEffect } from 'react';
import './BussgeldHeroSection.css';
import { FiSearch, FiDollarSign, FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const BussgeldHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
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

  const heroStyle = {
    backgroundImage: `url(/assets/images/Bußgeldseitehero.png)`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };

  const heroCards = [
    {
      title: "Online Bußgeldcheck",
      description: "Lassen Sie Ihren Bußgeldbescheid kostenlos prüfen",
      icon: <FiSearch />,
      link: "/anfrage/bussgeldanfrage"
    },
    {
      title: "Online Bußgeldrechner",
      description: "Berechnen Sie die Höhe Ihres Bußgeldes",
      icon: <FiDollarSign />,
      link: "/bussgeldrechner"
    },
    {
      title: "Online Punkteabfrage",
      description: "Erfahren Sie Ihren aktuellen Punktestand",
      icon: <FiActivity />,
      link: "/punkteabfrage"
    }
  ];

  // Karussell-Navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroCards.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroCards.length - 1 : prev - 1));
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

  // Dynamische Klassen basierend auf der Bildschirmgröße
  const contentClass = isMobile ? "hero__content" : "hero__content hero__content--left";
  const textClass = isMobile ? "hero__text" : "hero__text hero__text--left";

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero__container">
        <div className={contentClass}>
          <div className={textClass}>
            <h1 className="hero__title-line">Ihr Bußgeld - Unsere Unterstützung!</h1>
            <p className="hero__subtitle" style={{ fontSize: "1.8rem", whiteSpace: isMobile ? "normal" : "nowrap" }}>
              <span className="hero__highlight-animated"><strong>Einfach, Digital Prüfen lassen!</strong></span>
            </p>
            
            {/* Desktop/Tablet view: normaler Grid */}
            {!isMobile && (
              <div className="hero__benefits">
                {heroCards.map((card, index) => (
                  <Link to={card.link} key={index} className="hero__benefit-item">
                    <div className="hero__benefit-icon">
                      {card.icon}
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </Link>
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
                    {heroCards.map((card, index) => (
                      <div className="hero__carousel-slide" key={index}>
                        <Link to={card.link} className="hero__benefit-item">
                          <div className="hero__benefit-icon">
                            {card.icon}
                          </div>
                          <h3>{card.title}</h3>
                          <p>{card.description}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hero__carousel-indicators">
                  {heroCards.map((_, index) => (
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
              href="/anfrage/bussgeldanfrage" 
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

export default BussgeldHeroSection; 