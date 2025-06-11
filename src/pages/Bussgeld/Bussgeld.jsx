import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaClipboardCheck, FaSearch, FaBalanceScale, FaClock, 
  FaUserTie, FaFileAlt, FaCheckCircle, FaEuroSign,
  FaUpload, FaRobot, FaGavel, FaAward,
  FaCar, FaTrafficLight, FaMobileAlt, FaRulerHorizontal,
  FaWineGlass, FaParking, FaTablet, FaComments,
  FaBell, FaLock, FaStar, FaStarHalf, FaQuoteLeft, FaArrowRight
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

const Bussgeld = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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

          <div className="bussgeldarten-grid">
            <motion.div
              className="bussgeldart-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bussgeldart-icon">
                <FaCar />
              </div>
              <h3>Geschwindigkeitsverstoß</h3>
              <p>Punkte vermeiden und Einspruch einlegen.</p>
              <Link to="/anfrage/bussgeldanfrage" className="bussgeldart-button">
                Jetzt prüfen lassen <FaArrowRight className="arrow-icon" />
              </Link>
            </motion.div>

            <motion.div
              className="bussgeldart-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bussgeldart-icon">
                <FaTrafficLight />
              </div>
              <h3>Rotlichtverstoß</h3>
              <p>Lassen Sie Ihren Bescheid überprüfen.</p>
              <Link to="/anfrage/bussgeldanfrage" className="bussgeldart-button">
                Jetzt prüfen lassen <FaArrowRight className="arrow-icon" />
              </Link>
            </motion.div>

            <motion.div
              className="bussgeldart-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bussgeldart-icon">
                <FaMobileAlt />
              </div>
              <h3>Handy am Steuer</h3>
              <p>Einspruch einlegen und Strafen reduzieren.</p>
              <Link to="/anfrage/bussgeldanfrage" className="bussgeldart-button">
                Jetzt prüfen lassen <FaArrowRight className="arrow-icon" />
              </Link>
            </motion.div>

            <motion.div
              className="bussgeldart-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bussgeldart-icon">
                <FaRulerHorizontal />
              </div>
              <h3>Abstandsverstoß</h3>
              <p>Strafen bei fehlerhaften Messungen vermeiden.</p>
              <Link to="/anfrage/bussgeldanfrage" className="bussgeldart-button">
                Jetzt prüfen lassen <FaArrowRight className="arrow-icon" />
              </Link>
            </motion.div>

            <motion.div
              className="bussgeldart-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="bussgeldart-icon">
                <FaWineGlass />
              </div>
              <h3>Alkohol- und Drogenverstoß</h3>
              <p>Wir prüfen Ihren Fall.</p>
              <Link to="/anfrage/bussgeldanfrage" className="bussgeldart-button">
                Jetzt prüfen lassen <FaArrowRight className="arrow-icon" />
              </Link>
            </motion.div>

            <motion.div
              className="bussgeldart-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="bussgeldart-icon">
                <FaParking />
              </div>
              <h3>Parkverstöße</h3>
              <p>Auch kleine Strafen können rechtlich unzulässig sein.</p>
              <Link to="/anfrage/bussgeldanfrage" className="bussgeldart-button">
                Jetzt prüfen lassen <FaArrowRight className="arrow-icon" />
              </Link>
            </motion.div>
          </div>
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

          <div className="process-steps-grid">
            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="step-number">1</div>
              <div className="step-icon">
                <FaUpload />
              </div>
              <h3>Fall online prüfen</h3>
              <p>Geben Sie Ihre Daten in wenigen Minuten ein und laden Sie Ihren Bußgeldbescheid hoch.</p>
            </motion.div>

            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="step-number">2</div>
              <div className="step-icon">
                <FaRobot />
              </div>
              <h3>Kostenlose Bewertung sichern</h3>
              <p>Erhalten Sie sofort eine persönliche Ersteinschätzung per E-Mail – einfach und unverbindlich.</p>
            </motion.div>

            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="step-number">3</div>
              <div className="step-icon">
                <FaGavel />
              </div>
              <h3>Bußgeld verhindern</h3>
              <p>Beauftragen Sie unsere Experten, die direkt Einspruch einlegen und für Ihre Rechte kämpfen.</p>
            </motion.div>
          </div>

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
              768: { slidesPerView: 1 },
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
