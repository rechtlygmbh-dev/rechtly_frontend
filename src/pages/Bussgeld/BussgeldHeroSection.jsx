import React from 'react';
import './BussgeldHeroSection.css';
import { FiSearch, FiDollarSign, FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const BussgeldHeroSection = () => {
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

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title-line">Ihr Bußgeld - Unsere Unterstützung!</h1>
            <p className="hero__subtitle" style={{fontSize: "1.8rem", whiteSpace: "nowrap"}}><span className="hero__highlight-animated"><strong>Einfach, Digital Prüfen lassen!</strong></span></p>
            
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
            
            <a href="/anfrage/bussgeldanfrage" className="hero__cta-button" style={{ marginTop: '2.5rem', display: 'inline-block' }}>Jetzt kostenlos prüfen</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BussgeldHeroSection; 