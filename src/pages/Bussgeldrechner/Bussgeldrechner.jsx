import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaCar, 
  FaRulerHorizontal, 
  FaTrafficLight, 
  FaMobileAlt, 
  FaWineBottle,
  FaArrowRight
} from 'react-icons/fa';
import './Bussgeldrechner.css';
import BussgeldrechnerBanner from './BussgeldrechnerBanner';
import BussgeldrechnerIntro from './BussgeldrechnerIntro';

const Bussgeldrechner = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'zu_schnell',
      icon: <FaCar />,
      title: 'Zu schnell gefahren',
      description: 'Innerorts oder außerorts? Jetzt berechnen.'
    },
    {
      id: 'abstand',
      icon: <FaRulerHorizontal />,
      title: 'Zu nah aufgefahren',
      description: 'Abstandsmessung und Geschwindigkeit prüfen.'
    },
    {
      id: 'rote_ampel',
      icon: <FaTrafficLight />,
      title: 'Rote Ampel überfahren',
      description: 'Dauer und Gefährdung analysieren.'
    },
    {
      id: 'handy',
      icon: <FaMobileAlt />,
      title: 'Handy am Steuer',
      description: 'Potenzielle Gefährdung oder Sachbeschädigung prüfen.'
    },
    {
      id: 'alkohol_drogen',
      icon: <FaWineBottle />,
      title: 'Alkohol/Drogen beim Fahren',
      description: 'Alkoholpegel oder Drogenverstöße berechnen.'
    }
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSubmit = () => {
    if (selectedCategory) {
      navigate('/bussgeldrechner/details', { 
        state: { category: selectedCategory } 
      });
    }
  };

  return (
    <div className="bussgeldrechner-page">
      <BussgeldrechnerBanner />
      <BussgeldrechnerIntro step={1} />
      <section className="category-selection-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="bussgeldrechner-question">Was ist passiert?</h2>
          </motion.div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
                onClick={() => handleCategorySelect(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="action-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button 
              className={`cta-button ${!selectedCategory ? 'disabled' : ''}`}
              onClick={handleSubmit}
              disabled={!selectedCategory}
            >
              Weiter
              <FaArrowRight className="button-icon" />
            </button>
            <p className="security-note">
              Ihre Angaben werden sicher und anonym verarbeitet.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Bussgeldrechner; 