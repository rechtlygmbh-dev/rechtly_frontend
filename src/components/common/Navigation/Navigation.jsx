import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaComments, FaUserCircle, FaBars, FaChevronDown } from 'react-icons/fa';
import './Navigation.css';

const Navigation = () => {
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
    { title: 'Kontakt', path: '/kontakt' }
  ];

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <Link to="/" className="navigation__brand">
          <img src="/assets/images/logo.svg" alt="Rechtly Logo" className="navigation__logo" />
        </Link>

        <ul className="navigation__menu">
          {menuItems.map((item, index) => (
            <li key={index} className="header__nav-item">
              {item.submenu ? (
                <>
                  <span className="navigation__link">
                    {item.title}
                    <FaChevronDown style={{ marginLeft: 6, fontSize: '0.95em', verticalAlign: 'middle' }} />
                  </span>
                  <div className="services-dropdown">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="services-dropdown__item"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link to={item.path} className="navigation__link">
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="navigation__actions">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="avatar-container"
          >
            <Link to="/login" className="avatar-button">
              <FaUserCircle />
              <span className="avatar-tooltip">Anmelden</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/chat" className="nav-button">
              <FaComments />
              <span>24/7 Chat</span>
            </Link>
          </motion.div>
        </div>

        <button className="mobile-menu-button">
          <FaBars />
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 