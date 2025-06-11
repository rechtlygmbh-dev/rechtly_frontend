import React from 'react';
import { motion } from 'framer-motion';
import { FaFileUpload, FaBrain, FaUserCheck, FaLaptopCode, FaCarCrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const prozessSchritte = [
  {
    icon: <FaUserCheck />,
    title: "Anmeldung als KFZ-Gutachter",
    description: "Jetzt registrieren und Zugang zu unserem digitalen Portal erhalten."
  },
  {
    icon: <FaBrain />,
    title: "Automatische Auftragserteilung",
    description: "Erhalte neue Kundenanfragen basierend auf Standort & Expertise."
  },
  {
    icon: <FaFileUpload />,
    title: "Digitale Begutachtung & Kommunikation",
    description: "Lade Fotos, Berichte & Dokumente hoch – alles digital & transparent."
  },
  {
    icon: <FaLaptopCode />,
    title: "Abrechnung & Fertigstellung",
    description: "Vollständige Abwicklung mit Mandanten & Versicherungen über unser System."
  }
];

const SoFunktioniertsSection = () => {
  return (
    <section className="prozess-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>In wenigen Minuten zu Ihrer digitalen Unfallabwicklung</h2>
        </motion.div>

        <div className="prozess-schritte">
          {prozessSchritte.map((schritt, index) => (
            <motion.div
              key={index}
              className="prozess-schritt"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="schritt-nummer">{index + 1}</div>
              <div className="schritt-icon">
                {schritt.icon}
              </div>
              <h3>{schritt.title}</h3>
              <p>{schritt.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="prozess-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a href="https://gutachter.rechtly.de/login" target="_blank" rel="noopener noreferrer" className="cta-button primary large">
            <FaCarCrash className="button-icon" />
            Jetzt Partner werden
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SoFunktioniertsSection; 