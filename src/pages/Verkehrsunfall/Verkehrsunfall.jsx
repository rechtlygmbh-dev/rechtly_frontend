import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCarCrash, FaArrowRight, FaRocket, FaFolder, FaRobot, 
         FaComments, FaBalanceScale, FaClock, FaFileUpload, 
         FaBrain, FaUserCheck, FaLaptopCode, FaChevronDown } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Verkehrsunfall.css';
import VerkehrsunfallHeroSection from './VerkehrsunfallHeroSection';
import VorteileSection from '../FuerKfzGutachter/VorteileSection';

const Verkehrsunfall = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const vorteile = [
    {
      icon: <FaRocket />,
      title: "Moderne Legal-Tech-Plattform",
      description: "Mit automatisierten Prozessen und KI-gestützter Abwicklung wird Ihr Fall schneller und effizienter bearbeitet."
    },
    {
      icon: <FaFolder />,
      title: "Transparente Unfallabwicklung",
      description: "Alle Dokumente und Updates an einem Ort – jederzeit abrufbar in Ihrem Mandantenportal."
    },
    {
      icon: <FaRobot />,
      title: "Automatisierte Vorabanalyse",
      description: "Laden Sie Ihre Unfallbilder hoch, und unsere KI erstellt eine schnelle Ersteinschätzung."
    },
    {
      icon: <FaComments />,
      title: "Direkte Kommunikation",
      description: "Chatten Sie mit Anwälten und Kfz-Gutachtern direkt über unsere Plattform – ohne Umwege."
    },
    {
      icon: <FaBalanceScale />,
      title: "Expertennetzwerk",
      description: "Zugang zu Deutschlands besten Anwälten und Gutachtern für eine reibungslose Abwicklung."
    },
    {
      icon: <FaClock />,
      title: "Zeitersparnis garantiert",
      description: "Kein Suchen nach Gutachtern oder Behördengänge – wir übernehmen alles für Sie."
    }
  ];

  const prozessSchritte = [
    {
      icon: <FaFileUpload />,
      title: "Unfallmeldung einreichen",
      description: "Beschreiben Sie den Unfall und laden Sie Bilder hoch – online und in nur wenigen Minuten."
    },
    {
      icon: <FaBrain />,
      title: "Automatisierte Vorabanalyse",
      description: "Unsere KI prüft Ihre Daten und liefert eine erste Einschätzung – kostenlos und unverbindlich."
    },
    {
      icon: <FaUserCheck />,
      title: "Beauftragung",
      description: "Über unser Portal wählen Sie einen passenden Gutachter aus unserem Netzwerk."
    },
    {
      icon: <FaLaptopCode />,
      title: "Digitale Abwicklung",
      description: "Der Kfz-Gutachter vereinbart einen Termin mit Ihnen, und die weitere Abwicklung läuft digital über die Plattform."
    }
  ];

  const faqs = [
    {
      question: "Wie melde ich meinen Verkehrsunfall bei Rechtly?",
      answer: "Die Unfallmeldung erfolgt einfach und digital über unser Online-Portal. Füllen Sie das Formular aus, laden Sie Ihre Unfallfotos hoch, und unsere KI-gestützte Analyse gibt Ihnen eine erste Einschätzung."
    },
    {
      question: "Was kostet die Unfallabwicklung?",
      answer: "Die erste Analyse Ihres Unfalls ist kostenlos und unverbindlich. Die weiteren Kosten werden in der Regel von der gegnerischen Versicherung übernommen, sofern Sie nicht der Unfallverursacher sind."
    },
    {
      question: "Kann ich meine Unfallfotos hochladen?",
      answer: "Ja, Sie können Ihre Unfallfotos direkt über unser Portal hochladen. Unsere KI analysiert die Bilder und hilft bei der ersten Schadenseinschätzung."
    },
    {
      question: "Wie lange dauert die Bearbeitung?",
      answer: "Die erste KI-gestützte Analyse erhalten Sie innerhalb weniger Minuten. Die Gesamtdauer der Unfallabwicklung hängt von verschiedenen Faktoren ab, wird aber durch unsere digitalen Prozesse deutlich beschleunigt."
    },
    {
      question: "Was passiert nach der Vorabanalyse?",
      answer: "Nach der Vorabanalyse erhalten Sie eine Empfehlung für das weitere Vorgehen. Bei Bedarf können Sie direkt einen Gutachter aus unserem Netzwerk beauftragen oder sich anwaltlich beraten lassen."
    },
    {
      question: "Wie wähle ich einen Gutachter aus?",
      answer: "In unserem Portal finden Sie geprüfte Gutachter mit Bewertungen und Spezialisierungen. Sie können den passenden Experten nach Region und Verfügbarkeit auswählen."
    },
    {
      question: "Wie erhalte ich Statusupdates zu meinem Fall?",
      answer: "Über Ihr persönliches Dashboard im Mandantenportal können Sie jederzeit den aktuellen Status Ihres Falls einsehen und erhalten automatische Benachrichtigungen bei wichtigen Updates."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <div className="verkehrsunfall-page">
        <VerkehrsunfallHeroSection />

        {/* Vorteile Section */}
        <VorteileSection />

        {/* Prozess Section */}
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
              <Link to="/anfrage/verkehrsunfallanfrage" className="cta-button primary large">
                <FaCarCrash className="button-icon" />
                Jetzt Unfall melden
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="section-container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Sie fragen, wir antworten</h2>
            </motion.div>

            <div className="faq-container">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="faq-question" onClick={() => toggleFaq(index)}>
                    <h3>{faq.question}</h3>
                    <FaChevronDown className={`faq-icon ${activeFaq === index ? 'rotated' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="chat-support-box"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="chat-support-content">
                <FaComments className="chat-icon" />
                <h3>Noch Fragen? Unser Support-Team ist rund um die Uhr für Sie da!</h3>
                <button className="chat-button">
                  Jetzt Chat starten
                </button>
                <a href="/faq" className="chat-button secondary" style={{ marginLeft: '1rem' }}>
                  Weitere Fragen
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="final-cta-section">
          <div className="section-container">
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Unfall melden leicht gemacht – starten Sie jetzt!</h2>
              <p>Mit Rechtly wird die Schadensregulierung nach einem Unfall zum Kinderspiel. Melden Sie Ihren Fall online, lassen Sie unsere Experten den Rest erledigen und profitieren Sie von einer modernen, digitalen Lösung.</p>
              <Link to="/anfrage/verkehrsunfallanfrage" className="cta-button primary large">
                <FaCarCrash className="button-icon" />
                Unfall online melden
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Verkehrsunfall; 