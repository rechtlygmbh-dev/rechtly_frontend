import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQSection.css';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    id: 1,
    question: 'Wann lohnt sich ein Einspruch gegen einen Bußgeldbescheid?',
    answer: 'Wir prüfen Ihre Erfolgsaussichten kostenlos und unverbindlich.'
  },
  {
    id: 2,
    question: 'Wie finde ich einen Kfz-Gutachter in meiner Nähe?',
    answer: 'Mit Rechtly ist das einfach – wir übernehmen die Suche und Organisation.'
  },
  {
    id: 3,
    question: 'Welche Kosten fallen bei der Nutzung von Rechtly an?',
    answer: 'Unsere transparente Übersicht zeigt Ihnen alle anfallenden Kosten vorab.'
  },
  {
    id: 4,
    question: 'Wie funktioniert die kostenlose Ersteinschätzung?',
    answer: 'Laden Sie einfach Ihre Unterlagen hoch, unsere KI gibt Ihnen sofort Feedback.'
  },
  {
    id: 5,
    question: 'Kann ich mein Anliegen komplett digital abwickeln?',
    answer: 'Ja, von der Fallüberprüfung bis zur Kommunikation läuft alles über unser Portal.'
  },
  {
    id: 6,
    question: 'Wie schnell erhalte ich Unterstützung bei einem Verkehrsunfall?',
    answer: 'Unser System leitet Sie direkt an einen passenden Gutachter oder Anwalt weiter.'
  },
  {
    id: 7,
    question: 'Ist meine Kommunikation über das Mandantenportal sicher?',
    answer: 'Ihre Daten sind geschützt, und Sie haben jederzeit den Überblick.'
  },
  {
    id: 8,
    question: 'Wer trägt die Kosten für ein Kfz-Gutachten nach einem Unfall?',
    answer: 'In den meisten Fällen übernimmt die gegnerische Versicherung die Kosten.'
  },
  {
    id: 9,
    question: 'Wie vermeide ich Fehler bei der Schadenabwicklung?',
    answer: 'Unsere Plattform und Experten begleiten Sie durch jeden Schritt.'
  },
  {
    id: 10,
    question: 'Was passiert, wenn ich Fragen zu meinem Fall habe?',
    answer: 'Unsere KI-Assistentin und Ihr Anwalt stehen Ihnen jederzeit zur Verfügung.'
  }
];

const FAQSection = () => {
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="faq">
      <div className="faq__container">
        <div className="faq__header">
          <h2>Häufig gestellte Fragen</h2>
          <p>Finden Sie schnell Antworten auf Ihre Fragen</p>
        </div>

        <div className="faq__list">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className={`faq__item ${activeId === faq.id ? 'active' : ''}`}
              initial={false}
            >
              <motion.button
                className="faq__question"
                onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
              >
                {faq.question}
                <span className="faq__icon">
                  {activeId === faq.id ? '−' : '+'}
                </span>
              </motion.button>

              <AnimatePresence initial={false}>
                {activeId === faq.id && (
                  <motion.div
                    className="faq__answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="faq__cta">
          <p>Noch Fragen? Wir sind für Sie da!</p>
          <button 
            className="faq__button"
            onClick={() => navigate('/faq')}
          >
            Weitere Fragen und Kundensupport
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 