import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaClipboardCheck, FaSearch, FaBalanceScale, FaClock, 
  FaUserTie, FaFileAlt, FaCheckCircle, FaEuroSign,
  FaUpload, FaRobot, FaGavel, FaAward,
  FaCar, FaTrafficLight, FaMobileAlt, FaRulerHorizontal,
  FaWineGlass, FaParking, FaTablet, FaComments,
  FaBell, FaLock, FaStar, FaStarHalf, FaQuoteLeft, FaArrowRight,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { FiSearch, FiDollarSign, FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Bussgeld.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import BussgeldHeroSection from './BussgeldHeroSection';
import { useSwiper } from 'swiper/react';

// Komponenten für Leistungen-Karussell Navigation
function LeistungenPrevButton() {
  const swiper = useSwiper();
  return (
    <button 
      className="carousel-button prev" 
      onClick={() => swiper.slidePrev()} 
      aria-label="Vorherige"
    >
      <FaChevronLeft />
    </button>
  );
}

function LeistungenNextButton() {
  const swiper = useSwiper();
  return (
    <button 
      className="carousel-button next" 
      onClick={() => swiper.slideNext()} 
      aria-label="Nächste"
    >
      <FaChevronRight />
    </button>
  );
}

const Bussgeld = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBussgeldSlide, setCurrentBussgeldSlide] = useState(0);
  const [currentStepSlide, setCurrentStepSlide] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const leistungen = [
    {
      icon: <FaClipboardCheck />,
      title: "Kostenlose Ersteinschätzung",
      description: "Wir prüfen Ihren Bußgeldbescheid und geben eine klare Einschätzung."
    },
    {
      icon: <FaClock />,
      title: "Automatisierte Abläufe",
      description: "Digital und effizient – Sie sparen Zeit und Aufwand."
    },
    {
      icon: <FaUserTie />,
      title: "Rechtsanwälte & Experten",
      description: "Top-Verkehrsrechtsexperten unterstützen Sie."
    },
    {
      icon: <FaFileAlt />,
      title: "Kein Papierkram",
      description: "Alles läuft digital – direkt über unsere Plattform."
    },
    {
      icon: <FaCheckCircle />,
      title: "Hohe Erfolgsquote",
      description: "Wir setzen Ihre Rechte durch – schnell und zuverlässig."
    },
    {
      icon: <FaEuroSign />,
      title: "Keine versteckten Kosten",
      description: "Klare Preisstruktur, damit Sie sicher planen können."
    }
  ];

  const heroCards = [
    {
      title: "Online Bußgeldcheck",
      description: "Lassen Sie Ihren Bußgeldbescheid kostenlos prüfen",
      icon: <FiSearch />,
      link: "/anfrage/bussgeldanfrage"
    },
    {
      title: "Online Bußgeldrechner",
      description: "Berechnen Sie die Höhe Ihres Bußgeldes",
      icon: <FiDollarSign />,
      link: "/bussgeldrechner"
    },
    {
      title: "Online Punkteabfrage",
      description: "Erfahren Sie Ihren aktuellen Punktestand",
      icon: <FiActivity />,
      link: "/punkteabfrage"
    }
  ];

  // Bußgeldarten für Grid und Karussell
  const bussgeldarten = [
    {
      icon: <FaCar />,
      title: "Geschwindigkeitsverstoß",
      description: "Punkte vermeiden und Einspruch einlegen.",
      link: "/anfrage/bussgeldanfrage"
    },
    {
      icon: <FaTrafficLight />,
      title: "Rotlichtverstoß",
      description: "Lassen Sie Ihren Bescheid überprüfen.",
      link: "/anfrage/bussgeldanfrage"
    },
    {
      icon: <FaMobileAlt />,
      title: "Handy am Steuer",
      description: "Einspruch einlegen und Strafen reduzieren.",
      link: "/anfrage/bussgeldanfrage"
    },
    {
      icon: <FaRulerHorizontal />,
      title: "Abstandsverstoß",
      description: "Strafen bei fehlerhaften Messungen vermeiden.",
      link: "/anfrage/bussgeldanfrage"
    },
    {
      icon: <FaWineGlass />,
      title: "Alkohol- und Drogenverstoß",
      description: "Wir prüfen Ihren Fall.",
      link: "/anfrage/bussgeldanfrage"
    },
    {
      icon: <FaParking />,
      title: "Parkverstöße",
      description: "Auch kleine Strafen können rechtlich unzulässig sein.",
      link: "/anfrage/bussgeldanfrage"
    }
  ];
  
  // Process steps für Grid und Karussell
  const processSteps = [
    {
      number: "1",
      icon: <FaUpload />,
      title: "Fall online prüfen",
      description: "Geben Sie Ihre Daten in wenigen Minuten ein und laden Sie Ihren Bußgeldbescheid hoch."
    },
    {
      number: "2",
      icon: <FaRobot />,
      title: "Kostenlose Bewertung sichern",
      description: "Erhalten Sie sofort eine persönliche Ersteinschätzung per E-Mail – einfach und unverbindlich."
    },
    {
      number: "3",
      icon: <FaGavel />,
      title: "Bußgeld verhindern",
      description: "Beauftragen Sie unsere Experten, die direkt Einspruch einlegen und für Ihre Rechte kämpfen."
    }
  ];

  // Karussell-Navigation für Bussgeldarten
  const nextBussgeldSlide = () => {
    setCurrentBussgeldSlide((prev) => (prev === bussgeldarten.length - 1 ? 0 : prev + 1));
  };

  const prevBussgeldSlide = () => {
    setCurrentBussgeldSlide((prev) => (prev === 0 ? bussgeldarten.length - 1 : prev - 1));
  };

  const goToBussgeldSlide = (index) => {
    setCurrentBussgeldSlide(index);
  };

  // Karussell-Navigation für Process Steps
  const nextStepSlide = () => {
    setCurrentStepSlide((prev) => (prev === processSteps.length - 1 ? 0 : prev + 1));
  };

  const prevStepSlide = () => {
    setCurrentStepSlide((prev) => (prev === 0 ? processSteps.length - 1 : prev - 1));
  };

  const goToStepSlide = (index) => {
    setCurrentStepSlide(index);
  };

  // Automatischer Wechsel alle 5 Sekunden für Bussgeldarten
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        nextBussgeldSlide();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, currentBussgeldSlide]);
  
  // Automatischer Wechsel alle 5 Sekunden für Process Steps
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        nextStepSlide();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, currentStepSlide]);

  return (
    <div className="bussgeld-page">
      <BussgeldHeroSection />
      {/* Häufige Bußgeldarten Section */}
      <section className="bussgeldarten-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Welche Bußgeldarten prüfen wir?</h2>
          </motion.div>

          {/* Desktop-Version: Grid */}
          {!isMobile && (
            <div className="bussgeldarten-grid">
              {bussgeldarten.map((art, index) => (
                <motion.div
                  key={index}
                  className="bussgeldart-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <div className="bussgeldart-icon">
                    {art.icon}
                  </div>
                  <h3>{art.title}</h3>
                  <p>{art.description}</p>
                  <Link to={art.link} className="bussgeldart-button">
                    Jetzt prüfen lassen <FaArrowRight className="arrow-icon" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Mobile-Version: Karussell */}
          {isMobile && (
            <div className="bussgeldarten-carousel">
              <div className="carousel-container">
                <div className="carousel-controls">
                  <button className="carousel-button prev" onClick={prevBussgeldSlide} aria-label="Vorherige">
                    <FaChevronLeft />
                  </button>
                  <button className="carousel-button next" onClick={nextBussgeldSlide} aria-label="Nächste">
                    <FaChevronRight />
                  </button>
                </div>
                <div 
                  className="carousel-track"
                  style={{ transform: `translateX(-${currentBussgeldSlide * 100}%)` }}
                >
                  {bussgeldarten.map((art, index) => (
                    <div className="carousel-slide" key={index}>
                      <motion.div
                        className="bussgeldart-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="bussgeldart-icon">
                          {art.icon}
                        </div>
                        <h3>{art.title}</h3>
                        <p>{art.description}</p>
                        <Link to={art.link} className="bussgeldart-button">
                          Jetzt prüfen lassen <FaArrowRight className="arrow-icon" />
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="carousel-indicators">
                {bussgeldarten.map((_, index) => (
                  <button 
                    key={index} 
                    className={`carousel-indicator ${currentBussgeldSlide === index ? 'active' : ''}`}
                    onClick={() => goToBussgeldSlide(index)}
                    aria-label={`Gehe zu Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="process-steps-section">
        <div className="process-steps-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>So einfach geht's – In nur 3 Schritten zu Ihrem Recht</h2>
          </motion.div>

          {/* Desktop-Version: Grid */}
          {!isMobile && (
            <div className="process-steps-grid">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="step-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <div className="step-number">{step.number}</div>
                  <div className="step-icon">
                    {step.icon}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Mobile-Version: Karussell */}
          {isMobile && (
            <div className="steps-carousel">
              <div className="carousel-container">
                <div className="carousel-controls">
                  <button className="carousel-button prev" onClick={prevStepSlide} aria-label="Vorherige">
                    <FaChevronLeft />
                  </button>
                  <button className="carousel-button next" onClick={nextStepSlide} aria-label="Nächste">
                    <FaChevronRight />
                  </button>
                </div>
                <div 
                  className="carousel-track"
                  style={{ transform: `translateX(-${currentStepSlide * 100}%)` }}
                >
                  {processSteps.map((step, index) => (
                    <div className="carousel-slide" key={index}>
                      <motion.div
                        className="step-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="step-number">{step.number}</div>
                        <div className="step-icon">
                          {step.icon}
                        </div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="carousel-indicators">
                {processSteps.map((_, index) => (
                  <button 
                    key={index} 
                    className={`carousel-indicator ${currentStepSlide === index ? 'active' : ''}`}
                    onClick={() => goToStepSlide(index)}
                    aria-label={`Gehe zu Schritt ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <Link to="/anfrage/bussgeldanfrage" className="quick-check-button">
              <FaClipboardCheck className="button-icon" />
              Jetzt prüfen lassen
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="cta">
        <div className="cta__container">
          <div className="cta__content">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Lassen Sie uns gemeinsam Ihr Recht durchsetzen
            </motion.h2>
            
            <motion.p
              className="cta__text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Unsere Experten prüfen Ihren Fall kostenlos und unverbindlich. 
              Erfahren Sie innerhalb von 24 Stunden, wie wir Ihnen helfen können.
            </motion.p>

            <Link to="/anfrage" className="cta__button">
              Kostenlose Einschätzung
            </Link>
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

      {/* Unsere Leistungen Section */}
      <section className="leistungen-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Warum Rechtly?</h2>
          </motion.div>

          {/* Desktop-Version: Slider mit mehreren Karten */}
          {!isMobile && (
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={3}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              breakpoints={{
                1024: { slidesPerView: 2 },
                1400: { slidesPerView: 3 },
              }}
            >
              {leistungen.map((leistung, index) => (
                <SwiperSlide key={index}>
                  <div className="leistung-card">
                    <div className="leistung-icon">{leistung.icon}</div>
                    <h3>{leistung.title}</h3>
                    <p>{leistung.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Mobile-Version: Karussell wie bei anderen Sektionen */}
          {isMobile && (
            <div className="leistungen-carousel">
              <div className="carousel-container">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={10}
                  slidesPerView={1}
                  pagination={{ 
                    clickable: true,
                    el: '.leistungen-carousel .swiper-pagination'
                  }}
                  navigation={false}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                  }}
                  loop={true}
                  className="leistung-swiper"
                >
                  <div className="carousel-controls">
                    <LeistungenPrevButton />
                    <LeistungenNextButton />
                  </div>
                  
                  {leistungen.map((leistung, index) => (
                    <SwiperSlide key={index}>
                      <div className="leistung-card mobile">
                        <div className="leistung-icon">{leistung.icon}</div>
                        <h3>{leistung.title}</h3>
                        <p>{leistung.description}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="swiper-pagination leistungen-pagination"></div>
            </div>
          )}
        </div>
      </section>

      {/* Gebühren Section */}
      <section className="gebuehren-section">
        <div className="gebuehren-background"></div>
        <div className="gebuehren-content">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            FAIRE GEBÜHREN
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Kostenlose Ersteinschätzung & transparente Kosten
            <br /><br />
            Lassen Sie Ihren Bußgeldbescheid kostenlos von Rechtly überprüfen und profitieren Sie von unserer unverbindlichen Beratung, sei es per Telefon oder E-Mail. Bei einer Beauftragung übernimmt entweder Ihre Rechtsschutzversicherung die anfallenden Gebühren, oder diese werden von Ihnen als Selbstzahler getragen. Sie können sicher sein, dass wir Sie im Rahmen unserer kostenfreien Ersteinschätzung stets transparent über sämtliche Kosten informieren.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/anfrage/bussgeldanfrage" className="gebuehren-check-button">
              <FaClipboardCheck className="button-icon" />
              Kostenloser Bußgeldcheck
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="section-container">
          <div className="final-cta-content">
            <div className="background-symbols">
              <div className="symbol-waage">
                <FaBalanceScale />
              </div>
              <div className="symbol-blitzer">
                <div className="blitzer-icon">
                  <div className="flash-effect"></div>
                </div>
              </div>
            </div>
            
            <motion.div
              className="cta-text-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Lassen Sie uns Ihren Fall übernehmen</h2>
              <p>
                Nutzen Sie unsere digitale Plattform und profitieren Sie von automatisierten Workflows, 
                schnellen Einsprüchen und einer hohen Erfolgsquote. Lassen Sie uns gemeinsam für Ihr 
                Recht kämpfen – ohne Papierkram, ohne Stress.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Link to="/anfrage/bussgeldanfrage" className="cta-button primary large">
                  <FaClipboardCheck className="button-icon" />
                  Bußgeldbescheid prüfen lassen
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bussgeld;
