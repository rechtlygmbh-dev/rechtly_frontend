import React from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiShield, FiTruck, FiAlertCircle, FiClock, FiAward, 
         FiBookOpen, FiEdit3, FiUsers, FiMail, FiMessageCircle, FiHelpCircle } from 'react-icons/fi';
import './MegaMenu.css';

export const MegaMenu = ({ type, isOpen }) => {
  const menuContent = {
    leistungen: {
      title: 'Unsere Leistungen',
      items: [
        { 
          name: 'KFZ-Gutachten', 
          path: '/kfz-gutachten', 
          icon: <FiFileText />,
          description: 'Professionelle KFZ-Gutachten nach Unfällen'
        },
        { 
          name: 'Verkehrsunfall', 
          path: '/verkehrsunfall', 
          icon: <FiTruck />,
          description: 'Kompetente Unterstützung bei Verkehrsunfällen'
        },
        { 
          name: 'Bußgeld', 
          path: '/bussgeld', 
          icon: <FiAlertCircle />,
          description: 'Einspruch gegen Bußgeldbescheide einlegen'
        },
        {
          name: 'Punkteabfrage',
          path: '/punkteabfrage',
          icon: <FiAward />,
          description: 'Überprüfen Sie Ihre Punktesituation'
        }
      ]
    },
    magazin: {
      title: 'Rechtswissen & Aktuelles',
      items: [
        { 
          name: 'Blog', 
          path: '/blog', 
          icon: <FiEdit3 />,
          description: 'Aktuelle Beiträge'
        },
        { 
          name: 'Ratgeber', 
          path: '/ratgeber', 
          icon: <FiBookOpen />,
          description: 'Hilfreiche Tipps'
        }
      ]
    },
    unternehmen: {
      title: 'Über Rechtly',
      items: [
        { 
          name: 'Über uns', 
          path: '/ueber-uns', 
          icon: <FiUsers />,
          description: 'Lernen Sie uns kennen'
        },
        { 
          name: 'Kontakt', 
          path: '/kontakt', 
          icon: <FiMail />,
          description: 'So erreichen Sie uns'
        },
        { 
          name: '24/7 Chat', 
          path: '#chat', 
          icon: <FiMessageCircle />,
          description: 'Direkter Support',
          isHighlighted: true
        },
        { 
          name: 'FAQ', 
          path: '/faq', 
          icon: <FiHelpCircle />,
          description: 'Häufig gestellte Fragen'
        },
        {
          name: 'Für Kfz Gutachter',
          path: '/fuer-kfz-gutachter',
          icon: <FiHelpCircle />,
          description: 'Informationen für Kfz Gutachter'
        }
      ]
    }
  };

  const content = menuContent[type];
  if (!content) return null;

  return (
    <div className={`megamenu ${isOpen ? 'active' : ''}`}>
      <div className="megamenu__container">
        <h2 className="megamenu__title">{content.title}</h2>
        <div className="megamenu__items">
          {content.items.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className={`megamenu__item ${item.isHighlighted ? 'highlighted' : ''}`}
            >
              <div className="megamenu__item-icon">{item.icon}</div>
              <div className="megamenu__item-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// oder als default export:
// export default MegaMenu; 