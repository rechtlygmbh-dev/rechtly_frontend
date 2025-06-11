import React from 'react';
import './NewSection.css';
import { motion } from 'framer-motion';
import { 
  FaCarAlt, 
  FaBalanceScale, 
  FaCamera, 
  FaFileContract 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NewSection = () => {
  return (
    <section className="new-section">
      <div className="new-section__container">
        <div className="new-section__image">
          <img src="/assets/images/KFZ Gutachten- Benefits.png" alt="KFZ Gutachten Benefits" />
        </div>
        <div className="new-section__content">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Präzise Kfz-Gutachten für jeden Bedarf
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Von der Oldtimerbewertung bis zur Schadensanalyse – professionelle Gutachten für maximale Sicherheit und Wertbestimmung.
          </motion.p>
          <motion.ul
            className="new-section__benefits"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <li>
              <span className="benefit-icon">
                <FaCarAlt />
              </span>
              Oldtimergutachten
            </li>
            <li>
              <span className="benefit-icon">
                <FaBalanceScale />
              </span>
              Wertgutachten
            </li>
            <li>
              <span className="benefit-icon">
                <FaCamera />
              </span>
              Beweissicherungsgutachten
            </li>
            <li>
              <span className="benefit-icon">
                <FaFileContract />
              </span>
              Fahrzeugbewertung
            </li>
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="http://localhost:3001/anfrage/kfz-gutachtenanfrage" className="new-section__cta-button" style={{ marginTop: '2.5rem', display: 'inline-block' }}>
              Jetzt prüfen
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewSection; 