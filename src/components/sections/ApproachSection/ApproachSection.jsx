import React, { useState, useEffect } from 'react';
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
    setCurrentSlide((prev) => (prev === values.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? values.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch-Events für Swipe-Funktionalität
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe nach links
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe nach rechts
      prevSlide();
    }
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
          {/* Normales Grid für Desktop/Tablet */}
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

          {/* Karussell für mobile Geräte */}
          <div className="approach__carousel">
            <div className="approach__carousel-container">
              <div className="approach__carousel-controls">
                <button className="approach__carousel-button" onClick={prevSlide} aria-label="Vorherige Karte">
                  &#10094;
                </button>
                <button className="approach__carousel-button" onClick={nextSlide} aria-label="Nächste Karte">
                  &#10095;
                </button>
              </div>
              <div 
                className="approach__carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {values.map((value, index) => (
                  <div className="approach__carousel-slide" key={index}>
                    <motion.div
                      className="value-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="value-card__icon">{value.icon}</div>
                      <h4>{value.title}</h4>
                      <p>{value.description}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            <div className="approach__carousel-indicators">
              {values.map((_, index) => (
                <div 
                  key={index} 
                  className={`approach__carousel-indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Gehe zu Karte ${index + 1}`}
                />
              ))}
            </div>
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

        {/* CTA-Button außerhalb des Inhaltsbereichs für bessere mobile Sichtbarkeit */}
        <motion.div 
          className="approach__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
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