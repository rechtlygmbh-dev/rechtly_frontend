import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMessageCircle } from 'react-icons/fi';
import './FinalCTASection.css';

const FinalCTASection = () => {
  return (
    <section className="final-cta-section-renamed">
      <div className="final-cta-container-renamed">
        <motion.div
          className="final-cta-content-renamed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Jetzt Ihr Gutachten anfordern – <span className="highlight">digital und stressfrei!</span></h2>
          <p>Überlassen Sie uns die Arbeit. Mit wenigen Klicks erhalten Sie Ihr Gutachten und können sich entspannt zurücklehnen.</p>
          
          <motion.a
            href="/anfrage/kfz-gutachtenanfrage"
            className="final-cta-button-renamed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Online KFZ-Gutachten erstellen
          </motion.a>

          <div className="contact-cta">
            <div className="contact-cta__grid">
              <div className="contact-cta__option">
                <FiPhone className="contact-cta__icon" />
                <div className="contact-cta__info">
                  <span>Telefonisch erreichen</span>
                  <a href="tel:+4908945854589">089 / 458 545 89</a>
                </div>
              </div>
              
              <div className="contact-cta__option">
                <FiMail className="contact-cta__icon" />
                <div className="contact-cta__info">
                  <span>Per E-Mail</span>
                  <a href="mailto:info@rechtly.de">info@rechtly.de</a>
                </div>
              </div>
              
              <div className="contact-cta__option">
                <FiMessageCircle className="contact-cta__icon" />
                <div className="contact-cta__info">
                  <span>Live-Chat</span>
                  <button className="chat-link">Chat starten</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection; 