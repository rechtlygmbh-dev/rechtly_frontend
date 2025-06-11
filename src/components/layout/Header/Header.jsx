import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import { FaComments } from 'react-icons/fa';

const Header = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const menuItems = [
    {
      title: 'Leistungen',
      submenu: [
        {
          title: 'KFZ-Gutachten',
          path: '/kfz-gutachten',
          description: 'Professionelle KFZ-Gutachten nach Unfällen'
        },
        {
          title: 'Verkehrsunfall',
          path: '/verkehrsunfall',
          description: 'Kompetente Unterstützung bei Verkehrsunfällen'
        },
        {
          title: 'Bußgeld',
          path: '/bussgeld',
          description: 'Einspruch gegen Bußgeldbescheide einlegen'
        }
      ]
    },
    { title: 'Über uns', path: '/ueber-uns' },
    { title: 'Kontakt', path: '/kontakt' },
    { 
      title: '24/7 Chat', 
      path: '#chat',
      isHighlighted: true,
      icon: <FaComments />
    }
  ];

  return (
    <header className="header">
      <motion.div 
        className="progress-bar"
        style={{ scaleX }}
      />
      <div className="header__content">
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
