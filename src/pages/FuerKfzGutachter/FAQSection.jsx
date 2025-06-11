import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiMessageCircle } from 'react-icons/fi';
import './FAQSection.css';

const FAQSection = ({ faqs }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ihre Fragen – <span className="highlight">Unsere Antworten</span>
          </motion.h2>
        </div>

        <motion.div
          className="faq-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${openFaq === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <h3>{faq.question}</h3>
                <FiChevronDown className={`faq-icon ${openFaq === index ? 'active' : ''}`} />
              </div>
              <div className={`faq-answer ${openFaq === index ? 'active' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="faq-support"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FiMessageCircle className="support-icon" />
          <p>Noch Fragen? Unser Support-Team ist rund um die Uhr für Sie da!</p>
          <button className="support-cta">Jetzt Chat starten</button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection; 