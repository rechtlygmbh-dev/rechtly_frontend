import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiZap, 
  FiCpu, 
  FiUser, 
  FiFolder, 
  FiMessageSquare, 
  FiUsers 
} from 'react-icons/fi';
import './ApproachSection.css';

const values = [
  {
    id: 1,
    title: 'Zukunftsweisende Legal-Tech-Plattform',
    description: 'Mit modernster Technologie und automatisierten Workflows digitalisieren wir den gesamten Rechtsprozess – schnell, effizient und fehlerfrei.',
    icon: <FiZap size={32} />
  },
  {
    id: 2,
    title: 'Automatisierte Überprüfung',
    description: 'Unsere KI analysiert Ihren Fall in Sekunden und gibt Ihnen eine erste Einschätzung – sofort und kostenlos.',
    icon: <FiCpu size={32} />
  },
  {
    id: 3,
    title: 'KI-Mitarbeiter begleiten Sie',
    description: 'Lehnen Sie sich zurück! Unsere KI-gestützten Assistenten übernehmen die Abwicklung, damit Sie sich um nichts kümmern müssen.',
    icon: <FiUser size={32} />
  },
  {
    id: 4,
    title: 'Ihr persönliches Mandantenportal',
    description: 'Alle Dokumente, Nachrichten und Statusupdates an einem Ort – jederzeit abrufbar und transparent.',
    icon: <FiFolder size={32} />
  },
  {
    id: 5,
    title: '24/7 KI-gestützter Chat',
    description: 'Unsere smarte KI-Assistentin steht Ihnen rund um die Uhr zur Seite – für schnelle Antworten und sofortige Unterstützung.',
    icon: <FiMessageSquare size={32} />
  },
  {
    id: 6,
    title: 'Direkte Verbindung zu Anwälten & Gutachtern',
    description: 'Kein Warten, keine Umwege – kommunizieren Sie direkt mit unseren Verkehrsrechtsexperten und Kfz-Gutachtern über unsere Plattform.',
    icon: <FiUsers size={32} />
  }
];

const ApproachSection = () => {
  return (
    <section className="approach">
      <div className="approach__container">
        <div className="approach__header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Wir machen Recht digital & unkompliziert
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="approach__subtitle"
          >
            Moderne Rechtsberatung auf Augenhöhe.
          </motion.h3>
          <motion.div 
            className="approach__description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              Bei uns stehen automatisierte Prozesse, digitale Workflows und innovative Technologien im Mittelpunkt – 
              damit Ihr Fall schnell, effizient und fehlerfrei bearbeitet wird. Mit Rechtly erleben Sie eine völlig 
              neue Art der Rechtsberatung: unkompliziert, verständlich und jederzeit zugänglich.
            </p>
            <p>
              Unsere KI-gestützten Assistenten begleiten Sie durch den gesamten Prozess, während Sie sich entspannt 
              zurücklehnen. Alle Dokumente, Nachrichten und Statusupdates finden Sie in Ihrem persönlichen 
              Mandantenportal – jederzeit abrufbar und transparent.
            </p>
            <p>
              Keine langen Wartezeiten, keine Behördengänge – bei uns geht alles digital und mit nur wenigen Klicks! 🚀
            </p>
          </motion.div>
        </div>

        <div className="approach__content">
          <div className="approach__values">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                className="value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="value-card__icon">{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="approach__image"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src="/assets/images/Mission.png"
              alt="Rechtly Innovation"
              loading="lazy"
            />
          </motion.div>
        </div>

        <motion.div 
          className="approach__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/ueber-uns" className="approach__button">
            Mehr über uns
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ApproachSection; 