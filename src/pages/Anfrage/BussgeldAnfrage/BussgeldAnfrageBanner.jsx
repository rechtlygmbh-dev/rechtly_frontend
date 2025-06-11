import React from 'react';
import { FaCheckCircle, FaShieldAlt, FaClock } from 'react-icons/fa';
import './BussgeldAnfrageBanner.css';

const BussgeldAnfrageBanner = () => {
  const heroStyle = {
    backgroundImage: `url(/assets/images/BussgeldrechnerHero.png)`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    overflow: 'hidden'
  };

  const heroCards = [
    {
      title: "Professionelle Prüfung",
      description: "Lassen Sie Ihren Fall von Experten analysieren",
      icon: <FaCheckCircle />
    },
    {
      title: "Kostenlose Vorabanalyse",
      description: "Erhalten Sie eine erste Einschätzung kostenlos in wenigen Minuten.",
      icon: <FaShieldAlt />
    },
    {
      title: "Mandantenportal",
      description: "Bei Beauftragung erhalten Sie alle Informationen und können Ihren Fall einfach digital im Mandantenportal verwalten.",
      icon: <FaClock />
    }
  ];

  return (
    <section className="bussgeldrechner-hero" style={heroStyle}>
      <div className="bussgeldrechner-hero__container">
        <div className="bussgeldrechner-hero__content">
          <div className="bussgeldrechner-hero__text">
            <h1 className="bussgeldrechner-hero__title">
              <span className="bussgeldrechner-hero__title-line">
                Bußgeld-Anfrage
              </span>
            </h1>
            <p className="bussgeldrechner-hero__subtitle">
              Lassen Sie Ihren Fall von unseren Experten prüfen und erhalten Sie eine kostenlose Vorabanalyse
            </p>
            <div className="bussgeldrechner-hero__benefits">
              {heroCards.map((card, index) => (
                <div key={index} className="bussgeldrechner-hero__benefit-item">
                  <div className="bussgeldrechner-hero__benefit-icon">
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
      <div className="bussgeld-banner-arrow-container">
        <span className="bussgeld-banner-arrow">↓</span>
      </div>
    </section>
  );
};

export default BussgeldAnfrageBanner; 