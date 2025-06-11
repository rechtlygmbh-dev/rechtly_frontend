import React from 'react';
import { motion } from 'framer-motion';
import './CTASection.css';

const highlights = [
  {
    id: 1,
    icon: '⚡',
    text: 'Kostenlose Erstprüfung'
  },
  {
    id: 2,
    icon: '✓',
    text: 'Keine Vorkosten'
  },
  {
    id: 3,
    icon: '🏆',
    text: '98% Erfolgsquote'
  }
];

const CTASection = () => {
  return (
    <section className="cta">
      <div className="cta__container">
        <div className="cta__content">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Werde jetzt Rechtly-Partner und erhalte mehr Aufträge!
          </motion.h2>
          
          <motion.p
            className="cta__text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sichere dir deine Kunden automatisch – kostenlos anmelden & starten!
          </motion.p>

          <motion.a
            href="https://gutachter.rechtly.de/login"
            target="_blank"
            rel="noopener noreferrer"
            className="cta__button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Jetzt Partner werden
          </motion.a>
        </div>

        <motion.div 
          className="cta__image-container"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img 
            src="/assets/images/AnwälteCTA.png"
            alt="Rechtliche Beratung" 
            className="cta__image"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection; 