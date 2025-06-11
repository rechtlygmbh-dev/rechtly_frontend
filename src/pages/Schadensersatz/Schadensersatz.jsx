import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBalanceScale, FaEuroSign, FaFolder,
  FaClipboardCheck, FaFileUpload, FaUserTie, FaGavel,
  FaPhone, FaEnvelope, FaChevronDown, FaStar, FaChevronLeft, FaChevronRight,
  FaCar, FaUserInjured, FaFileContract, FaCheckCircle, FaRocket, FaShieldAlt, FaTrophy
} from 'react-icons/fa';
import Button from '../../components/common/Button/Button';
import './Schadensersatz.css';

const Schadensersatz = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const steps = [
    {
      icon: <FaClipboardCheck />,
      title: "Schaden melden",
      description: "Füllen Sie unser Online-Formular aus und schildern Sie den Vorfall."
    },
    {
      icon: <FaFileUpload />,
      title: "Unterlagen hochladen",
      description: "Reichen Sie relevante Dokumente, Verträge oder Unfallberichte ein."
    },
    {
      icon: <FaUserTie />,
      title: "Prüfung durch Anwälte",
      description: "Unsere Anwälte prüfen Ihren Fall und erstellen eine Ersteinschätzung."
    },
    {
      icon: <FaGavel />,
      title: "Einspruch und Verhandlung",
      description: "Wir setzen uns direkt mit der Gegenseite auseinander, um Ihren Anspruch durchzusetzen."
    }
  ];

  const testimonials = [
    {
      text: "Dank der Kanzlei habe ich die vollen Reparaturkosten für meinen Unfall ersetzt bekommen.",
      author: "Michael K.",
      rating: 5
    },
    {
      text: "Mein Arbeitgeber hat mir den Lohn einbehalten – die Kanzlei hat sich erfolgreich für mich eingesetzt.",
      author: "Sarah M.",
      rating: 5
    },
    {
      text: "Schnelle und transparente Hilfe. Ich bin sehr zufrieden mit der Abwicklung!",
      author: "Thomas B.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [steps.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="schadensersatz-page">
      {/* Hero Section */}
      <section className="schadensersatz-hero">
        <div className="schadensersatz-container">
          <motion.div 
            className="hero-content"
            {...fadeIn}
          >
            <h1>
              Ihr Recht auf Schadensersatz
              <span className="highlight">Wir holen, was Ihnen zusteht!</span>
            </h1>
            <p className="hero-subtitle">
              Ob Verkehrsunfall, Vertragsbruch oder fehlerhaftes Produkt – 
              wir setzen Ihre Ansprüche durch.
            </p>
            <Button variant="primary" size="large">
              Jetzt kostenlos prüfen lassen
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Section */}
      <section className="schadensersatz-why">
        <div className="schadensersatz-container">
          <motion.h2 {...fadeIn}>
            Warum lohnt sich Schadensersatz?
          </motion.h2>
          <div className="why-grid">
            {[
              {
                icon: <FaEuroSign />,
                title: "Finanzielle Entlastung",
                description: "Schadensersatz hilft, finanzielle Verluste auszugleichen und sorgt für Ihre Absicherung."
              },
              {
                icon: <FaBalanceScale />,
                title: "Gerechtigkeit und Fairness",
                description: "Setzen Sie sich gegen ungerechtes Verhalten oder fahrlässige Schäden zur Wehr."
              },
              {
                icon: <FaFolder />,
                title: "Vermeidung zukünftiger Schäden",
                description: "Durch Ihre Ansprüche tragen Sie dazu bei, dass andere nicht geschädigt werden."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="why-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="why-cta"
            {...fadeIn}
          >
            <Button variant="primary" size="large">
              Jetzt Anspruch prüfen lassen
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="schadensersatz-process">
        <div className="schadensersatz-container">
          <motion.h2 {...fadeIn}>
            In 4 Schritten zu Ihrem Schadensersatz
          </motion.h2>
          <div className="process-steps">
            <div className="step-progress">
              {steps.map((_, index) => (
                <div 
                  key={index} 
                  className={`progress-dot ${currentStep === index ? 'active' : ''}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`process-step ${currentStep === index ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentStep === index ? 1 : 0, y: currentStep === index ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="step-icon">{step.icon}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
            <div className="step-navigation">
              <button 
                onClick={() => setCurrentStep(prev => prev === 0 ? steps.length - 1 : prev - 1)}
                className="nav-button prev"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={() => setCurrentStep(prev => (prev + 1) % steps.length)}
                className="nav-button next"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
          <motion.div 
            className="process-cta"
            {...fadeIn}
          >
            <Button>Jetzt Schadensersatz prüfen lassen</Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="schadensersatz-benefits">
        <div className="schadensersatz-container">
          <div className="benefits-grid">
            <motion.div 
              className="benefits-content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2>Ihre Vorteile mit unserer Kanzlei</h2>
              <div className="benefits-list">
                {[
                  {
                    icon: <FaClipboardCheck />,
                    title: "Individuelle Prüfung",
                    description: "Jeder Fall wird detailliert geprüft und persönlich betreut."
                  },
                  {
                    icon: <FaRocket />,
                    title: "Schnelle Bearbeitung",
                    description: "Wir setzen alles daran, dass Ihr Fall ohne lange Verzögerungen bearbeitet wird."
                  },
                  {
                    icon: <FaShieldAlt />,
                    title: "Risikofrei",
                    description: "Keine Kosten im Misserfolgsfall – Sie zahlen nur bei Erfolg."
                  },
                  {
                    icon: <FaTrophy />,
                    title: "Hohe Erfolgsquote",
                    description: "Profitieren Sie von unserer Erfahrung im Schadensersatzrecht."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="benefit-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="benefit-icon">{benefit.icon}</div>
                    <div className="benefit-text">
                      <h3>{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button>Jetzt unverbindlich beraten lassen</Button>
            </motion.div>
            <motion.div 
              className="benefits-image"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ 
                background: '#f0f0f0', 
                width: '100%', 
                height: '300px', 
                borderRadius: '10px'
              }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="schadensersatz-cases">
        <div className="schadensersatz-container">
          <motion.h2 {...fadeIn}>
            Welche Schadensersatzansprüche vertreten wir?
          </motion.h2>
          <div className="cases-grid">
            {[
              {
                icon: <FaCar />,
                title: "Verkehrsunfälle",
                description: "Schäden durch fremdverschuldete Autounfälle oder mangelnde Verkehrssicherung.",
              },
              {
                icon: <FaUserInjured />,
                title: "Personenschäden",
                description: "Schmerzensgeld und Entschädigung nach Unfällen oder ärztlichen Behandlungsfehlern.",
              },
              {
                icon: <FaFileContract />,
                title: "Vertragsverletzungen",
                description: "Ersatzansprüche bei Nichterfüllung von Verträgen oder Lieferungen.",
              }
            ].map((caseItem, index) => (
              <motion.div
                key={index}
                className="case-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="case-image">
                  <div className="case-overlay">
                    <div className="case-icon">{caseItem.icon}</div>
                  </div>
                </div>
                <div className="case-content">
                  <h3>{caseItem.title}</h3>
                  <p>{caseItem.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="schadensersatz-faq">
        <div className="schadensersatz-container">
          <motion.h2 {...fadeIn}>
            Ihre Fragen zum Schadensersatz
          </motion.h2>
          <div className="faq-grid">
            {[
              {
                question: "Wie lange habe ich Zeit, um Schadensersatz geltend zu machen?",
                answer: "Die Verjährungsfrist beträgt in der Regel 3 Jahre ab Kenntnis des Schadens."
              },
              {
                question: "Welche Kosten entstehen für mich?",
                answer: "Wir arbeiten auf Erfolgsbasis – Sie zahlen nur bei erfolgreicher Durchsetzung Ihrer Ansprüche."
              },
              {
                question: "Was passiert, wenn die Gegenseite den Schadensersatz verweigert?",
                answer: "Falls nötig, setzen wir Ihre Ansprüche gerichtlich durch."
              },
              {
                question: "Welche Beweise benötige ich?",
                answer: "Fotos, Berichte, Zeugenaussagen oder Vertragskopien helfen bei der Beweisführung."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className={`faq-question ${openFaqIndex === index ? 'active' : ''}`}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">
                    {openFaqIndex === index ? '-' : '+'}
                  </span>
                </div>
                <motion.div 
                  className="faq-answer"
                  initial={false}
                  animate={{
                    height: openFaqIndex === index ? 'auto' : 0,
                    opacity: openFaqIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="schadensersatz-testimonials">
        <div className="schadensersatz-container">
          <motion.h2 {...fadeIn}>
            Das sagen unsere Mandanten
          </motion.h2>
          <div className="testimonials-slider">
            {[
              {
                text: "Dank der Kanzlei habe ich die vollen Reparaturkosten für meinen Unfall ersetzt bekommen.",
                author: "Michael K.",
                rating: 5
              },
              {
                text: "Mein Arbeitgeber hat mir den Lohn einbehalten – die Kanzlei hat sich erfolgreich für mich eingesetzt.",
                author: "Sarah M.",
                rating: 5
              },
              {
                text: "Schnelle und transparente Hilfe. Ich bin sehr zufrieden mit der Abwicklung!",
                author: "Thomas B.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className={`testimonial-card ${currentTestimonial === index ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="testimonial-content">
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                  <p>{testimonial.text}</p>
                  <div className="testimonial-author">- {testimonial.author}</div>
                </div>
              </motion.div>
            ))}
            <div className="testimonial-navigation">
              <button onClick={() => setCurrentTestimonial(prev => 
                prev === 0 ? testimonials.length - 1 : prev - 1
              )}>
                <FaChevronLeft />
              </button>
              <button onClick={() => setCurrentTestimonial(prev => 
                (prev + 1) % testimonials.length
              )}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="schadensersatz-final-cta">
        <div className="schadensersatz-container">
          <motion.div 
            className="final-cta-content"
            {...fadeIn}
          >
            <h2>Lassen Sie sich nicht mit weniger abspeisen – setzen Sie Ihren Anspruch durch!</h2>
            <Button variant="primary" size="large">
              Jetzt Schadensersatz prüfen lassen – kostenlos und risikofrei
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Schadensersatz; 