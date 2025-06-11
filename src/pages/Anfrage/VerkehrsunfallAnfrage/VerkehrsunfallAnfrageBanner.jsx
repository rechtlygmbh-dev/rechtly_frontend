import React from 'react';
import { FaCheckCircle, FaShieldAlt, FaClock } from 'react-icons/fa';
import './VerkehrsunfallAnfrageBanner.css';

const VerkehrsunfallAnfrageBanner = () => {
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/assets/images/VerkehrsunfallHero.png)`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    overflow: 'hidden'
  };

  const heroCards = [
    {
      title: "Professionelle Unfallanalyse",
      description: "Lassen Sie Ihren Unfall von unseren Experten analysieren",
      icon: <FaCheckCircle />
    },
    {
      title: "Kostenlose Erstberatung",
      description: "Erhalten Sie eine erste Einschätzung Ihres Falles kostenlos",
      icon: <FaShieldAlt />
    },
    {
      title: "Schnelle Bearbeitung",
      description: "Wir bearbeiten Ihre Anfrage innerhalb von 24 Stunden",
      icon: <FaClock />
    }
  ];

  return (
    <section className="verkehrsunfall-hero" style={heroStyle}>
      <div className="verkehrsunfall-hero__overlay"></div>
      <div className="verkehrsunfall-hero__container">
        <div className="verkehrsunfall-hero__content">
          <div className="verkehrsunfall-hero__text">
            <h1 className="verkehrsunfall-hero__title">
              <span className="verkehrsunfall-hero__title-line">
                Verkehrsunfall Anfrage
              </span>
            </h1>
            <p className="verkehrsunfall-hero__subtitle">
              Professionelle Unterstützung nach Ihrem Verkehrsunfall - schnell und unkompliziert
            </p>
            <div className="verkehrsunfall-hero__benefits">
              {heroCards.map((card, index) => (
                <div key={index} className="verkehrsunfall-hero__benefit-item">
                  <div className="verkehrsunfall-hero__benefit-icon">
                    {card.icon}
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="verkehrsunfall-banner-arrow-container">
        <div className="verkehrsunfall-banner-arrow">↓</div>
      </div>
    </section>
  );
};

export default VerkehrsunfallAnfrageBanner; 