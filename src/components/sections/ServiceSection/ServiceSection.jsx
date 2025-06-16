import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './ServiceSection.css';

const services = [
  {
    id: 1,
    title: 'KFZ-Gutachten',
    image: '/assets/images/KFZ GUTACHTER.png',
    description: 'Professionelle Begutachtung Ihres Fahrzeugs nach einem Unfall',
    benefits: [
      'Unabhängige Schadensermittlung',
      'Detaillierte Dokumentation',
      'Faire Wertermittlung',
      'Schnelle Bearbeitung'
    ],
    buttonText: 'Kostenlose Einschätzung',
    link: '/anfrage/kfz-gutachtenanfrage'
  },
  {
    id: 2,
    title: 'Bußgeldverfahren',
    image: '/assets/images/Bußgeldbescheid-Bild.png',
    description: 'Kompetente Unterstützung bei Verkehrsordnungswidrigkeiten',
    benefits: [
      'Prüfung des Bußgeldbescheids',
      'Einspruch wenn sinnvoll',
      'Vertretung vor Gericht',
      'Punktereduzierung möglich'
    ],
    buttonText: 'Kostenlose Einschätzung',
    link: '/anfrage/bussgeldanfrage'
  },
  {
    id: 3,
    title: 'Unfallabwicklung',
    image: '/assets/images/Unfallabwicklung-Bild.png',
    description: 'Professionelle Betreuung nach einem Verkehrsunfall',
    benefits: [
      'Komplette Schadenabwicklung',
      'Durchsetzung aller Ansprüche',
      'Verhandlung mit Versicherungen',
      'Persönliche Betreuung'
    ],
    buttonText: 'Kostenlose Einschätzung',
    link: '/anfrage/verkehrsunfallanfrage'
  }
];

const ServiceSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Prüfen, ob das Gerät mobil ist
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Karussell-Funktionen
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Automatischer Wechsel der Slides alle 5 Sekunden
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, currentSlide]);

  return (
    <section className="services">
      <div className="services__container">
        <motion.div 
          className="services__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Unsere Dienstleistungen im Überblick</h2>
          <p className="services__subtitle">
            Professionelle Unterstützung in allen Bereichen des Verkehrsrechts
          </p>
          <p className="services__intro">
            Bei <strong>Rechtly</strong> erhalten Sie kompetente rechtliche Unterstützung - 
            digital, effizient und transparent.
          </p>
        </motion.div>

        {/* Normales Grid für Desktop/Tablet */}
        <div className="services__grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="service-card__image">
                <img src={service.image} alt={service.title} loading="lazy" />
              </div>
              <div className="service-card__content">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                <ul className="service-card__benefits">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="service-card__benefit-item">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="service-card__footer">
                <button 
                  className="service-card__button"
                  onClick={() => navigate(service.link)}
                >
                  {service.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Karussell für mobile Geräte */}
        <div className="services__carousel">
          <div className="services__carousel-container">
            <div className="services__carousel-controls">
              <button className="services__carousel-button" onClick={prevSlide}>
                &#10094;
              </button>
              <button className="services__carousel-button" onClick={nextSlide}>
                &#10095;
              </button>
            </div>
            <div 
              className="services__carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service, index) => (
                <div className="services__carousel-slide" key={index}>
                  <motion.div
                    className="service-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="service-card__image">
                      <img src={service.image} alt={service.title} loading="lazy" />
                    </div>
                    <div className="service-card__content">
                      <h3 className="service-card__title">{service.title}</h3>
                      <p className="service-card__description">{service.description}</p>
                      <ul className="service-card__benefits">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="service-card__benefit-item">
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="service-card__footer">
                      <button 
                        className="service-card__button"
                        onClick={() => navigate(service.link)}
                      >
                        {service.buttonText}
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          <div className="services__carousel-indicators">
            {services.map((_, index) => (
              <div 
                key={index} 
                className={`services__carousel-indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection; 