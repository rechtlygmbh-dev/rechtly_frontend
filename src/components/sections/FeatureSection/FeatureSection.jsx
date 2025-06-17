import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiMapPin, 
  FiAlertCircle, 
  FiMinus, 
  FiSmartphone, 
  FiDroplet, 
  FiTruck,
  FiUpload,
  FiMessageSquare,
  FiCheckCircle,
  FiFileText
} from 'react-icons/fi';
import Button from '../../common/Button';
import './FeatureSection.css';

const features = [
  {
    id: 1,
    icon: <FiMapPin size={32} />,
    title: "Geschwindigkeitsverstoß",
    description: "Zu schnell unterwegs? Lassen Sie Ihren Fall digital prüfen – schnell und unkompliziert!"
  },
  {
    id: 2,
    icon: <FiAlertCircle size={32} />,
    title: "Rotlichtverstoß",
    description: "Eine rote Ampel übersehen? Wir helfen Ihnen, Einspruch einzulegen. Jetzt online prüfen lassen!"
  },
  {
    id: 3,
    icon: <FiMinus size={32} />,
    title: "Abstandsverstoß",
    description: "Zu wenig Abstand gehalten? Wir analysieren Ihren Fall und klären Ihre Chancen. Jetzt prüfen lassen!"
  },
  {
    id: 4,
    icon: <FiSmartphone size={32} />,
    title: "Handyverstoß",
    description: "Handy am Steuer? Wir prüfen, ob Ihr Bußgeldbescheid gerechtfertigt ist – starten Sie die digitale Prüfung!"
  },
  {
    id: 5,
    icon: <FiDroplet size={32} />,
    title: "Alkohol- / Drogenverstoß",
    description: "Alkohol- oder Drogentest nicht bestanden? Lassen Sie sich von Experten unterstützen – direkt online!"
  },
  {
    id: 6,
    icon: <FiTruck size={32} />,
    title: "Verkehrsunfall",
    description: "Unverschuldet in einen Unfall geraten? Unsere Plattform übernimmt die Abwicklung für Sie – jetzt Fall einreichen!"
  }
];

const prozessSchritte = [
  {
    icon: <FiUpload size={32} />,
    title: "Unfall melden",
    description: "Tragen Sie alle relevanten Informationen zum Unfall in unser Formular ein – bequem und einfach online."
  },
  {
    icon: <FiFileText size={32} />,
    title: "Fotos hochladen",
    description: "Laden Sie aussagekräftige Bilder vom Unfallort, den Schäden und ggf. weiteren relevanten Dokumenten hoch."
  },
  {
    icon: <FiMessageSquare size={32} />,
    title: "Ersteinschätzung erhalten",
    description: "Unsere KI analysiert Ihre Angaben sowie hochgeladene Dokumente und erstellt eine erste juristische und technische Einschätzung Ihres Falls – in Echtzeit."
  },
  {
    icon: <FiCheckCircle size={32} />,
    title: "Professionelle Abwicklung durch uns",
    description: "Wir übernehmen die gesamte Kommunikation mit Gutachtern, Versicherungen und – falls nötig – mit der Gegenseite. Sie können sich zurücklehnen."
  }
];

const FeatureSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -100]
  );

  const navigate = useNavigate();

  // Karussell-Zustand
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
    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
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
    <section className="feature" ref={containerRef}>
      <div className="feature__container">
        <div className="feature__header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Sicher unterwegs mit Rechtly – wir bringen Sie digital auf die Spur
          </motion.h2>
          <motion.p
            className="feature__description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ein Moment der Unachtsamkeit, eine unerwartete Kontrolle – und schon drohen Bußgelder oder Punkte. 
            Ob Geschwindigkeitsverstoß, Rotlichtverstoß, Abstandsverstoß, Handyverstoß, Alkohol- oder Drogenverstoß 
            oder ein Verkehrsunfall – mit Rechtly müssen Sie sich keine Sorgen machen. Unsere digitale Plattform mit 
            automatisierten Workflows und KI-gestützten Assistenten übernimmt die Prüfung und Abwicklung Ihres Falls – 
            schnell, unkompliziert und ohne lästigen Papierkram. Lehnen Sie sich zurück, wir kümmern uns um Ihr Recht!
          </motion.p>
        </div>

        <div className="feature__content">
          <motion.div 
            className="feature__image-wrapper"
            style={{ y }}
          >
            <img 
              src="/assets/frau vor auto.png"
              alt="Frau vor Auto - Rechtly Verkehrsrecht"
              className="feature__image"
              loading="lazy"
            />
          </motion.div>

          {/* Normales Grid für Desktop/Tablet */}
          <div className="feature__cards">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="feature__card"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate('/anfrage/bussgeldanfrage')}
              >
                <div className="feature__card-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature__card-arrow">→</div>
              </motion.div>
            ))}
          </div>

          {/* Karussell für mobile Geräte */}
          <div className="feature__carousel">
            <div className="feature__carousel-container">
              <div className="feature__carousel-controls">
                <button 
                  className="feature__carousel-button" 
                  onClick={prevSlide} 
                  aria-label="Vorherige Karte"
                >
                  &#10094;
                </button>
                <button 
                  className="feature__carousel-button" 
                  onClick={nextSlide} 
                  aria-label="Nächste Karte"
                >
                  &#10095;
                </button>
              </div>
              <div 
                className="feature__carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {features.map((feature, index) => (
                  <div className="feature__carousel-slide" key={index}>
                    <motion.div
                      className="feature__card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      onClick={() => navigate('/anfrage/bussgeldanfrage')}
                    >
                      <div className="feature__card-icon">{feature.icon}</div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                      <div className="feature__card-arrow">→</div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            <div className="feature__carousel-indicators">
              {features.map((_, index) => (
                <div 
                  key={index} 
                  className={`feature__carousel-indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Gehe zu Karte ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          className="feature__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="feature__cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/anfrage/bussgeldanfrage')}
          >
            Kostenloser Bußgeldcheck
          </motion.button>
        </motion.div>
      </div>

      <section className="prozess-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>So läuft Ihre digitale Unfallabwicklung</h2>
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
            <button 
              className="cta-button primary large"
              onClick={() => navigate('/anfrage/verkehrsunfallanfrage')}
            >
              <FiTruck className="button-icon" />
              Jetzt Unfall melden
            </button>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default FeatureSection; 