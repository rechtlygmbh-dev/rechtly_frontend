import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Benefit-Items Daten
  const benefitItems = [
    {
      icon: "⚖️",
      title: "Sofortige Ersteinschätzung",
      description: "in wenigen Sekunden wissen Sie, ob Sie Anspruch haben."
    },
    {
      icon: "⏱️",
      title: "Rund um die Uhr erreichbar",
      description: "Unsere smarte Assistentin begleitet Sie 24/7."
    },
    {
      icon: "🏆",
      title: "Hohe Erfolgsquote",
      description: "Über 90% erfolgreiche Fälle"
    }
  ];

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

  // Dynamische Klassen basierend auf der Bildschirmgröße
  const contentClass = isMobile ? "hero__content" : "hero__content hero__content--left";
  const textClass = isMobile ? "hero__text" : "hero__text hero__text--left";

  // Karussell-Funktionen
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === benefitItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? benefitItems.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Automatischer Wechsel der Slides alle 5 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero__container">
        <div className={contentClass}>
          <div className={textClass}>
            <h1>
              <span className="hero__title-line">Ihr Experte für <span className="hero__highlight-animated">Verkehrsrecht</span></span>
            </h1>
            <p className="hero__subtitle">Einfach. Digital. Recht bekommen.</p>
            
            {/* Normale Benefit-Items für Desktop/Tablet */}
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
            
            {/* Karussell nur für mobile Geräte */}
            {isMobile && (
              <div className="hero__carousel">
                <div className="hero__carousel-container">
                  <div className="hero__carousel-controls">
                    <button className="hero__carousel-button" onClick={prevSlide}>
                      &#10094;
                    </button>
                    <button className="hero__carousel-button" onClick={nextSlide}>
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
                    <div 
                      key={index} 
                      className={`hero__carousel-indicator ${currentSlide === index ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            )}
            
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
