import React from 'react';
import { motion } from 'framer-motion';
import './TrustSection.css';

const pressLogos = [
  { id: 1, name: 'Spiegel', logo: '/assets/images/press/spiegel.svg' },
  { id: 2, name: 'Focus', logo: '/assets/images/press/focus.svg' },
  { id: 3, name: 'Handelsblatt', logo: '/assets/images/press/handelsblatt.svg' }
];

const ratings = [
  { 
    id: 1, 
    platform: 'Trustpilot', 
    score: '4.8/5',
    count: '1.240',
    logo: '/assets/images/ratings/trustpilot.svg'
  },
  { 
    id: 2, 
    platform: 'Google', 
    score: '4.9/5',
    count: '890',
    logo: '/assets/images/ratings/google.svg'
  }
];

const TrustSection = () => {
  return (
    <section className="trust">
      <div className="trust__container">
        {/* Press Logos */}
        <div className="trust__press">
          <p className="trust__subtitle">Bekannt aus</p>
          <div className="trust__press-logos">
            {pressLogos.map((press) => (
              <motion.img
                key={press.id}
                src={press.logo}
                alt={press.name}
                className="trust__press-logo"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </div>

        {/* Success Stats */}
        <div className="trust__stats">
          <motion.div 
            className="trust__stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="trust__stat-number">52M+</span>
            <span className="trust__stat-label">€ Schadensersatz erwirkt</span>
          </motion.div>
          <motion.div 
            className="trust__stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="trust__stat-number">15k+</span>
            <span className="trust__stat-label">zufriedene Kunden</span>
          </motion.div>
          <motion.div 
            className="trust__stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="trust__stat-number">98%</span>
            <span className="trust__stat-label">Erfolgsquote</span>
          </motion.div>
        </div>

        {/* Ratings */}
        <div className="trust__ratings">
          {ratings.map((rating) => (
            <motion.div
              key={rating.id}
              className="trust__rating-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img src={rating.logo} alt={rating.platform} className="trust__rating-logo" />
              <div className="trust__rating-score">
                <span className="trust__rating-number">{rating.score}</span>
                <div className="trust__rating-stars">★★★★★</div>
                <span className="trust__rating-count">{rating.count} Bewertungen</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection; 