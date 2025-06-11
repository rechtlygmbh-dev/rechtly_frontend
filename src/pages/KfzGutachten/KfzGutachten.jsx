import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FiClock, FiUsers, FiSmartphone, FiCheckCircle, FiHeadphones, 
         FiCamera, FiCpu, FiFileText, FiCalendar, FiStar, FiChevronDown, FiMessageCircle, FiPhone, FiMail } from 'react-icons/fi';
import './KfzGutachten.css';
import KfzHeroSection from './sections/KfzHeroSection';
import BenefitsSection from './sections/BenefitsSection';
import ProcessSection from './sections/ProcessSection';
import NewSection from './sections/NewSection';
import FAQSection from './sections/FAQSection';
import FinalCTASection from './sections/FinalCTASection';


const KfzGutachten = () => {
  const benefits = [
    {
      image: '/assets/images/Schnelle-Abwicklung.png',
      title: 'Schnelle Abwicklung',
      description: 'KFZ-Gutachten in nur wenigen Klicks'
    },
    {
      image: '/assets/images/Bundesweites Netzwerk.png',
      title: 'Bundesweites Netzwerk',
      description: 'Zertifizierte Gutachter in Ihrer Nähe'
    },
    {
      image: '/assets/images/Digitale Prozesse.png',
      title: 'Digitale Prozesse',
      description: 'Kein Papierkram – alles online'
    },
    {
      image: '/assets/images/Kostenübernahme-prüfen.png',
      title: 'Kostenübernahme prüfen"',
      description: 'Wir klären, ob die gegnerische Versicherung zahlt'
    }
  ];

  const steps = [
    {
      icon: <FiCamera />,
      number: "01",
      title: "Schadenmeldung einreichen",
      description: "Laden Sie Bilder und Details direkt über unser Portal hoch. Einfach, bequem und papierlos."
    },
    {
      icon: <FiCpu />,
      number: "02",
      title: "Automatisierte Vorabanalyse",
      description: "Unsere Digitalen Agenten analysieren Ihren Fall innerhalb von Sekunden und erstellt eine erste Einschätzung – kostenlos."
    },
    {
      icon: <FiFileText />,
      number: "03",
      title: "Beauftragung",
      description: "Entscheiden Sie sich für die Abwicklung und beauftragen Sie das Gutachten direkt online."
    },
    {
      icon: <FiCalendar />,
      number: "04",
      title: "Gutachterzuteilung und Terminvereinbarung",
      description: "Ein passender Gutachter wird zugeteilt. Über unsere Plattform wird automatisch ein Termin mit Ihnen vereinbart – Kommunikation und Abwicklung laufen digital über Rechtly."
    }
  ];

  const testimonials = [
    {
      name: "Hüseyin D.",
      location: "Hamburg",
      image: "/assets/images/Hüseyin dirim.jpeg",
      rating: 5,
      text: "Rechtly hat mir in kürzester Zeit geholfen, ein Gutachten für meinen Unfall zu erhalten. Die Plattform ist super einfach zu bedienen!"
    },
    {
      name: "Sarah K.",
      location: "München",
      image: "/assets/images/Hüseyin dirim.jpeg",
      rating: 5,
      text: "Professionelle Abwicklung von A bis Z. Der Support war immer erreichbar und sehr hilfsbereit. Klare Empfehlung!"
    },
    {
      name: "Thomas B.",
      location: "Berlin",
      image: "/assets/images/Hüseyin dirim.jpeg",
      rating: 5,
      text: "Unkompliziert und schnell. Besonders gut fand ich die transparente Kommunikation und die faire Preisgestaltung."
    }
  ];

  const [openFaq, setOpenFaq] = React.useState(null);

  const faqs = [
    {
      question: "Was kostet ein KFZ-Gutachten?",
      answer: "Die Kosten für ein KFZ-Gutachten richten sich nach dem Schadenumfang und der Art des Gutachtens. Bei einem Unfallschaden übernimmt in der Regel die gegnerische Versicherung die Kosten. Kontaktieren Sie uns für eine individuelle Einschätzung."
    },
    {
      question: "Wie schnell erhalte ich mein Gutachten?",
      answer: "Nach der Begutachtung Ihres Fahrzeugs erhalten Sie das fertige Gutachten in der Regel innerhalb von 24-48 Stunden. In dringenden Fällen bieten wir auch Express-Service an."
    },
    {
      question: "Wird das Gutachten von Versicherungen akzeptiert?",
      answer: "Ja, unsere Gutachten werden von allen Versicherungen anerkannt. Unsere Sachverständigen sind zertifiziert und erstellen Gutachten nach den aktuellen Richtlinien und Standards."
    },
    {
      question: "Wie finde ich den passenden Gutachter in meiner Nähe?",
      answer: "Über unsere Plattform vermitteln wir Ihnen automatisch einen qualifizierten Gutachter in Ihrer Region. Unser bundesweites Netzwerk garantiert kurze Wege und schnelle Termine."
    },
    {
      question: "Wer übernimmt die Kosten für das Gutachten?",
      answer: "Bei einem unverschuldeten Unfall übernimmt die gegnerische Versicherung die Kosten für das Gutachten. Wir prüfen für Sie vorab die Kostenübernahme und beraten Sie zu Ihren Ansprüchen."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const gutachterBenefits = [
    {
      image: "/assets/images/Automatisierte Kundengewinnung.png",
      title: "Automatisierte Kundengewinnung",
      description: "Rechtly übernimmt die gesamte Kundenakquise für Sie – schnell, unkompliziert und digital."
    },
    {
      image: "/assets/images/Digitale Abwicklung-KFZ.png",
      title: "Digitale Abwicklung",
      description: "Mit unserem KFZ-Gutachter-Portal haben Sie jederzeit Zugriff auf alle relevanten Informationen, Dokumente und Statusupdates."
    },
    {
      image: "/assets/images/Benefit3.jpg",
      title: "Benachrichtigungen in Echtzeit",
      description: "Bleiben Sie immer informiert – dank automatisierter E-Mail-Benachrichtigungen und Plattform-Updates."
    },
    {
      image: "/assets/images/Persönliche digitale Assistentin.png",
      title: "Persönliche digitale Assistentin",
      description: "Unsere smarte KI-Agentin begleitet Sie bei jedem Schritt – flexibel und rund um die Uhr verfügbar."
    },
    {
      image: "/assets/images/Neue Aufträge bekommen.png",
      title: "Neue Aufträge sichern",
      description: "Erhalten Sie kontinuierlich passende Aufträge über Rechtly und erweitern Sie Ihre Reichweite."
    }
  ];

  return (
    <div className="kfz-gutachten-page">
      <KfzHeroSection />
      <BenefitsSection benefits={benefits} />
      <ProcessSection steps={steps} />
      <NewSection />
      <section className="gutachter-network-section">
        <div className="gutachter-network-container">
          <div className="gutachter-network-content">
            <motion.div
              className="gutachter-network-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Profitieren Sie als KFZ-Gutachter von unserem Netzwerk</h2>
              <p className="gutachter-network-intro">
                Mit einem der größten Netzwerke von KFZ-Gutachtern in Deutschland verbinden wir Mandanten und Gutachter nahtlos. 
                Unser Ziel: Ihnen neue Aufträge zu sichern und den Prozess effizient und digital zu gestalten.
              </p>

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  }
                }}
                className="gutachter-benefits-slider"
              >
                {gutachterBenefits.map((benefit, index) => (
                  <SwiperSlide key={index} className="benefit-card">
                    <div className="benefit-image">
                      <img src={benefit.image} alt={benefit.title} />
                    </div>
                    <div className="benefit-content">
                      <h3>{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <motion.div
                className="gutachter-cta"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3>Jetzt Mitglied werden – Profitieren Sie von Rechtly!</h3>
                <div className="gutachter-cta-buttons">
                  <motion.a
                    href="https://gutachter.rechtly.de/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gutachter-cta-button primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Als KFZ Gutachter Anmelden und durchstarten
                  </motion.a>
                  <motion.a
                    href="/fuer-kfz-gutachter"
                    className="gutachter-cta-button secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Mehr erfahren
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <FAQSection faqs={faqs} />
      <FinalCTASection />
    </div>
  );
};

export default KfzGutachten;
