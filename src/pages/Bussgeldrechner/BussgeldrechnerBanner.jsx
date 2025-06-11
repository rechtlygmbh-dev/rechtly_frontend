import React from 'react';
import { FaCheckCircle, FaShieldAlt, FaClock, FaChevronDown } from 'react-icons/fa';
import './BussgeldrechnerBanner.css';
import { motion } from 'framer-motion';

const BussgeldrechnerBanner = () => {
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
      title: "Sofortige Berechnung",
      description: "Erhalten Sie sofort eine präzise Einschätzung Ihres Bußgeldes",
      icon: <FaCheckCircle />
    },
    {
      title: "100% Kostenlos",
      description: "Nutzen Sie unseren Rechner ohne versteckte Kosten",
      icon: <FaShieldAlt />
    },
    {
      title: "24/7 Verfügbar",
      description: "Berechnen Sie Ihr Bußgeld rund um die Uhr",
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
                Bußgeldrechner
              </span>
            </h1>
            <p className="bussgeldrechner-hero__subtitle">
              Berechnen Sie Bußgeld, Punkte und Fahrverbot nach aktuellem Bußgeldkatalog
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
        <motion.div
          className="bussgeldrechner-hero__arrow"
          initial={{ y: 0, opacity: 0.7 }}
          animate={{ y: [0, 16, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ position: 'absolute', left: '50%', bottom: 8, transform: 'translateX(-50%)', zIndex: 3 }}
        >
          <FaChevronDown size={32} color="#fff" style={{ filter: 'drop-shadow(0 2px 8px rgba(27,58,75,0.25))' }} />
        </motion.div>
      </div>
    </section>
  );
};

export default BussgeldrechnerBanner; 