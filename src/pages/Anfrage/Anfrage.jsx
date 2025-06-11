import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Anfrage.css';

const Anfrage = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      id: 1,
      title: 'KFZ-GUTACHTEN',
      icon: '🚗',
      description: 'Professionelle Begutachtung und Wertermittlung Ihres Fahrzeugs'
    },
    {
      id: 3,
      title: 'BUßGELD',
      icon: '📋',
      description: 'Rechtliche Unterstützung bei Bußgeldbescheiden und Verkehrsordnungswidrigkeiten'
    },
    {
      id: 2,
      title: 'VERKEHRSUNFALL',
      icon: '🚦',
      description: 'Kompetente Beratung und Vertretung nach einem Verkehrsunfall'
    }
  ];

  const handleServiceSelect = (serviceId) => {
    if (serviceId === 1) {
      navigate('/anfrage/kfz-gutachtenanfrage');
    } else if (serviceId === 3) {
      navigate('/anfrage/bussgeldanfrage');
    } else if (serviceId === 2) {
      navigate('/anfrage/verkehrsunfallanfrage');
    }
  };

  return (
    <div className="anfrage-page">
      <div className="service-container">
        <div className="service-hero">
          <div className="hero-content">
            <h1>
              HERZLICH WILLKOMMEN BEI RECHTLY
              <span className="highlight">Womit können wir Ihnen behilflich sein?</span>
            </h1>
          </div>
        </div>
        <div className="service-options">
          <div className="anfrage-options-grid">
            {services.map(service => (
              <div key={service.id} className="anfrage-service-card" onClick={() => handleServiceSelect(service.id)}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anfrage; 