import React from 'react';
import './FuerKfzGutachter.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaRocket, FaFolder, FaRobot, FaComments, FaBalanceScale, FaClock, FaBullseye, FaLaptop, FaMoneyBillWave } from 'react-icons/fa';
import { motion } from 'framer-motion';
import VorteileSection from './VorteileSection';
import SoFunktioniertsSection from './SoFunktioniertsSection';
import TestimonialsGutachter from './TestimonialsGutachter';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import KooperationSection from './KooperationSection';

const FuerKfzHeroSection = () => {
  const heroStyle = {
    backgroundImage: `url(/assets/images/KFZ_Gutachtenherosektion.png)`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };

  return (
    <section className="fuer-kfz-hero" style={heroStyle}>
      <div className="fuer-kfz-hero__container">
        <div className="fuer-kfz-hero__content">
          <div className="fuer-kfz-hero__text">
            <h1 className="fuer-kfz-hero__title-line">Mehr Aufträge. Weniger Aufwand.</h1>
            <p className="fuer-kfz-hero__subtitle" style={{fontSize: "1.8rem", whiteSpace: "nowrap"}}><span className="fuer-kfz-hero__highlight-animated"><strong>Automatische neue Kunden für KFZ Gutachter! </strong></span></p>
            
            <div className="fuer-kfz-benefits">
              <div className="fuer-kfz-benefit-item">
                <div className="fuer-kfz-benefit-icon">
                  <FaBullseye />
                </div>
                <h3>Automatische Gutachterzuteilung</h3>
                <p>Wir finden den passenden Kfz-Gutachter in Ihrer Nähe.</p>
              </div>
              <div className="fuer-kfz-benefit-item">
                <div className="fuer-kfz-benefit-icon">
                  <FaLaptop />
                </div>
                <h3>Digitale Schadensabwicklung</h3>
                <p>Verfolgen Sie den gesamten Prozess bequem online.</p>
              </div>
              <div className="fuer-kfz-benefit-item">
                <div className="fuer-kfz-benefit-icon">
                  <FaMoneyBillWave />
                </div>
                <h3>Maximale Schadenssummen</h3>
                <p>Wir sichern Ihnen die höchstmögliche Entschädigung.</p>
              </div>
            </div>
            
            <a href="https://gutachter.rechtly.de/login" target="_blank" rel="noopener noreferrer">
              <button className="fuer-kfz-hero__cta-button">Jetzt Partner werden</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

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

const faqs = [
  {
    question: "Wie kann ich mich als KFZ-Gutachter registrieren?",
    answer: "Einfach das Anmeldeformular ausfüllen – wir prüfen deine Qualifikation und schalten dich frei."
  },
  {
    question: "Wie bekomme ich Aufträge über Rechtly?",
    answer: "Unser System teilt dir automatisch passende Anfragen in deiner Region zu."
  },
  {
    question: "Wie erfolgt die Kommunikation mit den Mandanten?",
    answer: "Alle Nachrichten, Dokumente & Updates laufen über unser digitales Portal."
  },
  {
    question: "Gibt es eine Mitgliedsgebühr für Gutachter?",
    answer: "Nein! Du zahlst nur eine kleine Provision für abgeschlossene Aufträge."
  }
];

const FuerKfzGutachter = () => {
  return (
    <>
      <FuerKfzHeroSection />
      <VorteileSection />
      <KooperationSection />
      <SoFunktioniertsSection />
      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
};

export default FuerKfzGutachter;
