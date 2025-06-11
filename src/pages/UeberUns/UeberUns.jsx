import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaLaptop, FaUserTie, FaSearch, FaClipboardCheck, 
  FaUserClock, FaFileContract, FaForward, FaShieldAlt,
  FaBalanceScale, FaChartLine, FaChevronLeft, FaChevronRight, FaClock, FaStar
} from 'react-icons/fa';
import Button from '../../components/common/Button';
import './UeberUns.css';
import { useNavigate } from 'react-router-dom';

const UeberUns = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const testimonials = [
    {
      text: "Dank der Plattform habe ich mein Bußgeld in Rekordzeit prüfen lassen und Geld gespart!",
      author: "Michael K.",
      rating: 5
    },
    {
      text: "Schnelle Gutachten und top Beratung – absolut empfehlenswert!",
      author: "Sandra L.",
      rating: 5
    },
    {
      text: "Ich habe einen erfahrenen Anwalt gefunden, der meinen Fall erfolgreich gelöst hat.",
      author: "Thomas B.",
      rating: 5
    }
  ];

  // Automatisches Weiterschalten
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => 
        (prev + 1) % testimonials.length
      );
    }, 5000); // Alle 5 Sekunden weiterschalten

    return () => clearInterval(timer); // Cleanup beim Unmount
  }, []);

  return (
    <div className="ueber-uns-page">
      {/* Hero Section */}
      <section className="ueber-uns-hero">
        <div className="ueber-uns-container">
          <motion.div 
            className="hero-content"
            {...fadeIn}
          >
            <h1 className="ueberuns-hero-title">Recht einfach. Recht digital. Rechtly!</h1>
            <span className="highlight">Die erste Plattform, die Menschen, Expertise und KI verbindet.</span>
            <p className="hero-subtitle">
            Rechtly ist die digitale Rechtsplattform, auf der Mandanten, Gutachter und Anwälte zusammenkommen – gesteuert von intelligenten Prozessen, unterstützt durch moderne KI.
            So lösen wir Rechtsfragen schneller, einfacher und ohne Umwege.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wer wir sind Section */}
      <section className="ueber-uns-who">
        <div className="ueber-uns-container">
          <div className="who-grid">
            <motion.div 
              className="who-content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Innovation trifft auf Recht</h2>
              <h3>Wenn echte Expertise auf künstliche Intelligenz trifft</h3>
              <p>
              Unser Team aus Anwälten, IT-Profis und Gutachtern hat sich einem gemeinsamen Ziel verschrieben:
Recht zugänglicher, schneller und intelligenter zu gestalten.

Mit Rechtly nutzen wir KI nicht nur zur Automatisierung, sondern zur echten Unterstützung – damit jeder Fall effizient, nachvollziehbar und fachlich geprüft bearbeitet wird.
              </p>
            </motion.div>
            <motion.div 
              className="who-image"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/assets/images/innovation.webp" 
                alt="Innovation bei Rechtly"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Neue Sektion: Bild links, Text rechts */}
      <section className="ueber-uns-who">
        <div className="ueber-uns-container">
          <div className="who-grid">
            <motion.div 
              className="who-image"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/assets/images/Automatisierte Kundengewinnung.png" 
                alt="Innovation bei Rechtly"
                loading="lazy"
              />
            </motion.div>
            <motion.div 
              className="who-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Was ist Rechtly?</h2>
              <p>Rechtly ist Ihre digitale Schnittstelle zur Rechtswelt – kombiniert mit der Kraft künstlicher Intelligenz.</p>
              <p>Mandanten erhalten automatisierte Ersteinschätzungen, Gutachter werden gezielt mit passenden Aufträgen versorgt, und Anwälte profitieren von einer Plattform, die nicht nur organisiert, sondern auch mitdenkt.</p>
              <p>Unsere KI versteht Fälle, strukturiert Daten, erkennt Zusammenhänge – und macht die Zusammenarbeit einfacher denn je.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unsere Vision & Mission Section */}
      <section className="ueber-uns-vision">
        <div className="ueber-uns-container">
          <h2>Unsere Vision & Mission</h2>
          <div className="vision-grid">
            <motion.div 
              className="vision-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/assets/images/vision.png" 
                alt="Unsere Vision"
                loading="lazy"
              />
              <h3>Unsere Vision</h3>
              <p>Ein Rechtswesen, das nicht nur digitalisiert, sondern durch KI intelligent gesteuert wird – für maximale Gerechtigkeit und minimale Reibung.</p>
            </motion.div>
            <motion.div 
              className="vision-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/assets/images/Mission.png" 
                alt="Unsere Mission"
                loading="lazy"
              />
              <h3>Unsere Mission</h3>
              <p>Wir verbinden Menschen mit Rechtsexpertise und intelligenter Technologie, um Abläufe zu automatisieren, Fehler zu minimieren und Lösungen zu beschleunigen.</p>
              <p>Unsere KI begleitet Mandanten, entlastet Gutachter und stärkt Anwälte.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unser Ansatz Section */}
      <section className="ueber-uns-approach">
        <div className="ueber-uns-container">
          <motion.h2 {...fadeIn}>
            Warum unsere Plattform einzigartig ist
          </motion.h2>
          <div className="approach-grid">
            {[
              {
                icon: <FaLaptop />,
                title: "Künstliche Intelligenz für echte Effizienz",
                description: "Unsere KI analysiert Anliegen, kategorisiert Fälle, erstellt Einschätzungen und unterstützt Gutachter & Anwälte bei der Fallbearbeitung."
              },
              {
                icon: <FaUserTie />,
                title: "Prozesse ohne Reibung",
                description: "Automatische Verteilung, digitale Kommunikation und transparente Abläufe – von der Anfrage bis zur Lösung."
              },
              {
                icon: <FaSearch />,
                title: "Entlastung für alle Seiten",
                description: "Mandanten erhalten sofort Rückmeldung, Gutachter sparen sich die Akquise und Anwälte gewinnen Zeit für das Wesentliche."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="approach-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="approach-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="approach-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
          </motion.div>
        </div>
      </section>

      {/* Vorteile der Plattform Section */}
      <section className="ueber-uns-benefits">
        <div className="ueber-uns-container">
          <div className="benefits-grid">
            <motion.div 
              className="benefits-content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Vorteile für Mandanten, Anwälte und Gutachter</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <FaShieldAlt className="benefit-icon" />
                  <div className="benefit-text">
                    <h3>Mandanten</h3>
                    <p>Automatisierte Ersteinschätzung und klare Handlungsempfehlung in Minuten – mit menschlicher Nachbegleitung.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaBalanceScale className="benefit-icon" />
                  <div className="benefit-text">
                    <h3>Gutachter</h3>
                    <p>Passende Aufträge direkt ins Postfach – digital übermittelt, KI-gestützt zugewiesen, stressfrei koordiniert.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaSearch className="benefit-icon" />
                  <div className="benefit-text">
                    <h3>Anwälte</h3>
                    <p>Intelligente Fallkategorisierung, automatische Zuweisung, strukturierte Akten – mehr Effizienz, mehr Zeit für Strategie.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="benefits-image"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/assets/images/gutachteranwaltmandant.webp" 
                alt="Zusammenarbeit zwischen Gutachtern, Anwälten und Mandanten"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zukunft Section */}
      <section className="ueber-uns-future">
        <div className="ueber-uns-container">
          <motion.h2 {...fadeIn}>
            Digital, schnell und effizient – das ist unsere Plattform
          </motion.h2>
          <div className="future-stats">
            {[
              {
                icon: <FaClock />,
                number: "48h",
                title: "Reaktionszeit",
                description: "Unsere KI verarbeitet Anfragen sofort – Experten übernehmen innerhalb von zwei Tagen."
              },
              {
                icon: <FaLaptop />,
                number: "100%",
                title: "digital & automatisiert",
                description: "Alle Prozesse laufen digital, KI-gestützt und nahtlos ab."
              },
              {
                icon: <FaChartLine />,
                number: "30.000+",
                title: "Fälle verarbeitet",
                description: "Intelligente Automatisierung mit echter Erfahrung im Rücken."
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <h3>{stat.title}</h3>
                <p>{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ueber-uns-cta">
        <div className="ueber-uns-container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Bereit für moderne Rechtslösungen?</h2>
            <p>Verlassen Sie sich auf echte Menschen – und smarte Maschinen.Rechtly verbindet Verstand, Erfahrung und Technologie.Schnell. Effizient. Rechtlich auf den Punkt.</p>
            <button className="cta-button" onClick={() => navigate('/anfrage')}>
              Ihr Anliegen prüfen
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default UeberUns; 