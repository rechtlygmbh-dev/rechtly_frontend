import React from 'react';
import { motion } from 'framer-motion';
import './PricingSection.css';

const pricingModels = [
  {
    id: 1,
    title: 'Bestehende Rechtsschutzversicherung',
    image: '/assets/images/Rechtschutzversicherung.png',
    promise: 'Ihre Versicherung übernimmt die Kosten',
    description: 'Wenn Sie über eine bestehende Rechtsschutzversicherung verfügen, werden sämtliche anfallenden Kosten von dieser übernommen. Es fällt für Sie nur eine Selbstbeteiligung an – falls vorgesehen.',
    price: '0 EUR'
  }
];

const pricingPlans = [
  {
    id: 1,
    title: 'Basis-Beratung',
    image: '/assets/images/pricing/basic-consultation.jpg', // Bild für Basis-Beratung
    price: '49',
    description: 'Erste rechtliche Einschätzung Ihres Falles',
    features: [
      'Telefonische Erstberatung',
      'Einschätzung der Erfolgsaussichten',
      'Kostenübersicht',
      'Handlungsempfehlung'
    ]
  },
  {
    id: 2,
    title: 'Premium-Beratung',
    image: '/assets/images/pricing/premium-consultation.jpg', // Bild für Premium-Beratung
    price: '149',
    popular: true,
    description: 'Umfassende rechtliche Unterstützung',
    features: [
      'Alles aus der Basis-Beratung',
      'Schriftliche Fallanalyse',
      'Dokumentenprüfung',
      'Persönliches Beratungsgespräch'
    ]
  },
  {
    id: 3,
    title: 'Business-Paket',
    image: '/assets/images/pricing/business-consultation.jpg', // Bild für Business-Paket
    price: '299',
    description: 'Maßgeschneiderte Unternehmensberatung',
    features: [
      'Alles aus der Premium-Beratung',
      'Vertragsgestaltung',
      'Rechtliche Risikoanalyse',
      'Präventive Rechtsberatung'
    ]
  }
];

const PricingSection = () => {
  return (
    <section className="pricing">
      <div className="pricing__container">
        <motion.div 
          className="pricing__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Unsere Kostenmodelle im Überblick</h2>
          <h3>Was kostet mich rechtly?</h3>
          <p>
            Wir glauben daran, dass Recht für alle zugänglich sein sollte – unabhängig von Einkommen 
            oder Situation. Deshalb bieten wir Ihnen verschiedene flexible Kostenmodelle an, die sich 
            an Ihre Bedürfnisse anpassen. Gemeinsam finden wir die beste Lösung für Ihre rechtlichen 
            Anliegen im Bereich KFZ-Gutachten, Unfallabwicklung und Bußgeldverfahren.
          </p>
        </motion.div>

        <div className="pricing__grid">
          {pricingModels.map((model, index) => (
            <motion.div
              key={model.id}
              className="pricing-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="pricing-card__image">
                <img 
                  src={model.image} 
                  alt={model.title} 
                />
              </div>
              <div className="pricing-card__content">
                <h4>{model.title}</h4>
                <div className="pricing-card__promise">
                  <span className="promise-icon">👉</span>
                  {model.promise}
                </div>
                <p>{model.description}</p>
              </div>
              <div className="pricing-card__footer">
                <div className="pricing-card__price">
                  <span className="label">UNSER PREIS</span>
                  <span className="amount">{model.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p 
          className="pricing__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Alle Modelle sind in Zusammenarbeit mit unseren Finanzierungspartnern verfügbar. 
          Wir garantieren Ihnen maximale Transparenz und Sicherheit bei jedem Schritt.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection; 