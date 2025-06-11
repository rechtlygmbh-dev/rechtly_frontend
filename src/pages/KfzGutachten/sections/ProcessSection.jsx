import React from 'react';
import { motion } from 'framer-motion';
import './ProcessSection.css';

const ProcessSection = ({ steps }) => {
  return (
    <section className="process-section">
      <div className="process-container">
        <div className="process-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            In 4 Schritten zum KFZ-Gutachten – <span className="highlight">Schnell, Digital, Unkompliziert</span>
          </motion.h2>
        </div>
        
        <div className="process-grid">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="process-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="process-card-header">
                <div className="process-icon">
                  {step.icon}
                </div>
                <div className="process-number">{step.number}</div>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="http://localhost:3001/anfrage/kfz-gutachtenanfrage"
          className="process-cta process-cta--small"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Jetzt starten – KFZ-Gutachten in 4 Schritten
        </motion.a>
      </div>
    </section>
  );
};

export default ProcessSection; 