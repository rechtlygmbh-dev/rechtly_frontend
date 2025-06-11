import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExpertiseSection.css';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { 
  FaCar, 
  FaBalanceScale, 
  FaTrafficLight, 
  FaFileContract,
  FaShieldAlt
} from 'react-icons/fa';

const ExpertiseSection = () => {
  const navigate = useNavigate();

  const advantages = [
    {
      icon: '🚗',
      title: "Alles aus einer Hand",
      description: "Kfz-Gutachten, Rechtliche Unterstützung & Digitale Prozesse"
    },
    {
      icon: '📸',
      title: "Digitale Vorabanalyse",
      description: "Einfach Bilder hochladen und eine erste Einschätzung erhalten"
    },
    {
      icon: '🎯',
      title: "Automatische Gutachter-Vermittlung",
      description: "Kein Telefonieren, kein Suchen, wir übernehmen das für Sie"
    },
    {
      icon: '📅',
      title: "Direkte Terminvereinbarung",
      description: "Ein Termin wird automatisch mit dem passenden Kfz-Gutachter koordiniert"
    },
    {
      icon: '💬',
      title: "Direkte Kommunikation",
      description: "Alle Nachrichten, Infos und Dokumente im Mandantenportal"
    },
    {
      icon: '🔔',
      title: "Automatische Benachrichtigungen",
      description: "Mandant & Gutachter bleiben stets informiert"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Digitale Vorabanalyse",
      description: "Hochladen von Fotos & Informationen"
    },
    {
      number: "2",
      title: "Passenden Gutachter finden",
      description: "Automatische Vermittlung ohne Aufwand"
    },
    {
      number: "3",
      title: "Terminvereinbarung",
      description: "Alles geschieht digital über Rechtly"
    },
    {
      number: "4",
      title: "Digitale Abwicklung",
      description: "Gutachten und Kommunikation über die Plattform"
    },
    {
      number: "5",
      title: "Benachrichtigungen & Updates",
      description: "Mandant & Gutachter werden automatisch informiert"
    }
  ];

  const cards = [
    {
      icon: <FaCar />,
      title: "Digital & unkompliziert",
      description: "KFZ-Gutachten bequem online – kein Papierkram, keine Wartezeiten."
    },
    {
      icon: <FaBalanceScale />,
      title: "Kostenlose Ersteinschätzung",
      description: "Laden Sie Ihre Schadenbilder hoch und erhalten Sie eine erste Einschätzung – völlig kostenlos. "
    },
    {
      icon: <FaTrafficLight />,
      title: "Direkter Kontakt zu KFZ-Gutachtern",
      description: "Kommunikation leicht gemacht – alle Updates & Rückfragen in einem Portal."
    },
    {
      icon: <FaFileContract />,
      title: "Automatische Gutachter-Zuteilung",
      description: "Wir finden den passenden Gutachter für Sie – schnell & zuverlässig. "
    },
    {
      icon: <FaShieldAlt />,
      title: "Höchstmögliche Schadenssumme sichern",
      description: "Optimierte Schadensbewertung für eine maximale Erstattung durch die Versicherung. "
    }
  ];

  return (
    <section className="expertise-section">
      <div className="expertise__container">
        <div className="expertise__header">
          <h2>Ihr Kfz-Gutachten – Einfach, Schnell & Digital mit Rechtly</h2>
          <p className="expertise__intro">
            Schluss mit mühsamer Suche nach einem Kfz-Gutachter, endlosen Telefonaten und langen Wartezeiten. 
            Mit Rechtly bieten wir Ihnen eine All-in-One Lösung: Von der Kfz-Gutachtenerstellung über anwaltliche 
            Unterstützung bis hin zur vollständig digitalen Abwicklung – alles automatisiert und stressfrei.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          speed={800}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            968: {
              slidesPerView: 3,
              spaceBetween: 30,
            }
          }}
          className="vorteile-slider"
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="advantage-card">
                <div className="advantage-card__icon">
                  {card.icon}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="expertise__cta">
          <div className="expertise__button-group">
            <button 
              className="expertise__button" 
              onClick={() => navigate('/anfrage/bussgeldanfrage')}
            >
              Kfz-Gutachten Online anfordern
            </button>
            <button 
              className="expertise__button expertise__button--secondary"
              onClick={() => navigate('/kfz-gutachten')}
            >
              Mehr dazu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection; 