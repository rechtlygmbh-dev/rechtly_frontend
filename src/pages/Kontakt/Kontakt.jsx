import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaChevronDown, FaCheck, FaRoute, FaComments
} from 'react-icons/fa';
import Button from '../../components/common/Button';
import './Kontakt.css';

const Kontakt = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefon: '',
    betreff: '',
    nachricht: '',
    datenschutz: false
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <div className="kontakt-page">
      {/* Hero Section */}
      <section className="kontakt-hero">
        <div className="kontakt-container">
          <motion.div 
            className="hero-content"
            {...fadeIn}
          >
            <h1 className="kontakt-hero-title">Unser Support ist für Sie da – persönlich & direkt.</h1>
            <p className="hero-subtitle">
            Sie benötigen Hilfe bei einem Fall oder möchten direkt mit uns sprechen?
            Unser Kundensupport begleitet Sie zuverlässig – per Chat, E-Mail oder Telefon.
            </p>
            <Button variant="primary" size="large">
              Chat starten
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Kontaktmöglichkeiten Section */}
      <section className="kontakt-options">
        <div className="kontakt-container">
          <motion.h2 {...fadeIn}>So erreichen Sie uns</motion.h2>
          <div className="options-grid">
            {[
              {
                icon: <FaPhone />,
                title: "Telefonischer Kontakt",
                description: "Rufen Sie uns an und sprechen Sie direkt mit einem unserer Berater.",
                info: "+49 170 7160000",
                action: "Jetzt anrufen",
                link: "tel:+491707160000"
              },
              {
                icon: <FaEnvelope />,
                title: "E-Mail-Kontakt",
                description: "Senden Sie uns Ihre Anfrage per E-Mail – wir antworten innerhalb von 24 Stunden.",
                info: "support@rechtly.de",
                action: "E-Mail senden",
                link: "mailto:support@rechtly.de"
              },
              {
                icon: <FaComments />,
                title: "24/7 Chat",
                description: "Unser Chat-Support ist rund um die Uhr für Sie verfügbar.",
                info: "Direkt chatten",
                action: "Chat starten",
                link: "#chat"
              }
            ].map((option, index) => (
              <motion.div
                key={index}
                className="contact-option"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="option-icon">{option.icon}</div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <div className="option-info">{option.info}</div>
                <a href={option.link} className="option-action">
                  {option.action}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontaktformular Section */}
      {/* ENTFERNT: <section className="kontakt-form"> ... </section> */}

      {/* FAQ Section */}
      <section className="kontakt-faq">
        <div className="kontakt-container">
          <motion.h2 {...fadeIn}>
            Häufige Fragen zu Kontakt und Anfragen
          </motion.h2>
          <div className="faq-grid">
            {[
              {
                question: "Wie lange dauert es, bis ich eine Antwort erhalte?",
                answer: "Wir antworten in der Regel innerhalb von 24 bis 48 Stunden."
              },
              {
                question: "Kann ich direkt einen Termin vereinbaren?",
                answer: "Ja, gerne. Nutzen Sie unser Formular oder rufen Sie uns direkt an."
              },
              {
                question: "Sind Anfragen kostenfrei?",
                answer: "Die Ersteinschätzung ist bei uns kostenfrei."
              },
              {
                question: "Wie werden meine Daten geschützt?",
                answer: "Ihre Daten werden gemäß unserer Datenschutzrichtlinien sicher verwahrt."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className={`faq-question ${openFaqIndex === index ? 'active' : ''}`}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <FaChevronDown className="faq-icon" />
                </div>
                <motion.div 
                  className="faq-answer"
                  initial={false}
                  animate={{
                    height: openFaqIndex === index ? 'auto' : 0,
                    opacity: openFaqIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <div className="faq-cta">
            <h3>Noch Fragen?</h3>
            <p>Hier finden Sie Antworten auf häufig gestellte Fragen.</p>
            <a href="/faq" className="button button--primary">
              weitere Fragen
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kontakt; 