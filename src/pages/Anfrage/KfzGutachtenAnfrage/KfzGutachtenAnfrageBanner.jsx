import React from 'react';
import { FaCheckCircle, FaShieldAlt, FaClock } from 'react-icons/fa';
import './KfzGutachtenAnfrageBanner.css';

const KfzGutachtenAnfrageBanner = () => {
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/assets/images/KfzGutachtenHero.png)`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    overflow: 'hidden'
  };

  const heroCards = [
    {
      title: "Kostenlose Schadensanalyse",
      description: "Erhalten Sie eine professionelle Einschätzung Ihres Fahrzeugschadens",
      icon: <FaCheckCircle />
    },
    {
      title: "100% Kostenlos",
      description: "Nutzen Sie unseren Service ohne versteckte Kosten",
      icon: <FaShieldAlt />
    },
    {
      title: "Schnelle Bearbeitung",
      description: "Wir bearbeiten Ihre Anfrage innerhalb von 24 Stunden",
      icon: <FaClock />
    }
  ];

  return (
    <section className="kfz-gutachten-hero" style={heroStyle}>
      <div className="kfz-gutachten-hero__overlay"></div>
      <div className="kfz-gutachten-hero__container">
        <div className="kfz-gutachten-hero__content">
          <div className="kfz-gutachten-hero__text">
            <h1 className="kfz-gutachten-hero__title">
              <span className="kfz-gutachten-hero__title-line">
                KFZ Gutachten Anfrage
              </span>
            </h1>
            <p className="kfz-gutachten-hero__subtitle">
              Professionelle Schadensanalyse für Ihr Fahrzeug - schnell und unkompliziert
            </p>
            <div className="kfz-gutachten-hero__benefits">
              {heroCards.map((card, index) => (
                <div key={index} className="kfz-gutachten-hero__benefit-item">
                  <div className="kfz-gutachten-hero__benefit-icon">
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
      <div className="kfz-gutachten-banner-arrow-container">
        <div className="kfz-gutachten-banner-arrow">↓</div>
      </div>
    </section>
  );
};

export default KfzGutachtenAnfrageBanner; 