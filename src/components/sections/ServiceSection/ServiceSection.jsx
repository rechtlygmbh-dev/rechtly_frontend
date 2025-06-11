import React from 'react';
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
      </div>
    </section>
  );
};

export default ServiceSection; 