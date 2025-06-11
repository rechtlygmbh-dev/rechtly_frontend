import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaRocket, FaFolder, FaRobot, FaComments, FaBalanceScale, FaClock } from 'react-icons/fa';

const vorteile = [
  {
    icon: <FaRocket />,
    title: "Automatisierte Kundengewinnung",
    description: "Nie wieder mühsame Akquise – Rechtly liefert dir regelmäßig neue Aufträge."
  },
  {
    icon: <FaFolder />,
    title: "Digitale Abwicklung",
    description: "Keine Papierberge – alle Daten, Berichte & Kommunikation zentral in einer Plattform."
  },
  {
    icon: <FaComments />,
    title: "Benachrichtigungen in Echtzeit",
    description: "Erhalte sofort Updates zu neuen Anfragen, Terminen & Dokumenten."
  },
  {
    icon: <FaBalanceScale />,
    title: "Mehr Umsatz durch effiziente Prozesse",
    description: "Reduziere den Verwaltungsaufwand und konzentriere dich auf dein Kerngeschäft."
  },
  {
    icon: <FaRocket />,
    title: "Maximale Sichtbarkeit",
    description: "Automatische Zuweisung von Mandanten basierend auf Standort & Qualifikation."
  },
  {
    icon: <FaFolder />,
    title: "100% Digital",
    description: "Von der Auftragsannahme bis zur Dokumentation – alles online verwalten."
  },
  {
    icon: <FaComments />,
    title: "Schnelle Auszahlung",
    description: "Rechtly beschleunigt den gesamten Abrechnungsprozess."
  },
  {
    icon: <FaBalanceScale />,
    title: "Wachse mit uns",
    description: "Mehr Kunden, weniger Aufwand – werde Teil unseres Experten-Netzwerks."
  }
];

const VorteileSection = () => {
  return (
    <section className="vorteile-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ihre Vorteile mit Rechtly</h2>
        </motion.div>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
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
          {vorteile.map((vorteil, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="vorteil-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="vorteil-icon">
                  {vorteil.icon}
                </div>
                <h3>{vorteil.title}</h3>
                <p>{vorteil.description}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default VorteileSection; 