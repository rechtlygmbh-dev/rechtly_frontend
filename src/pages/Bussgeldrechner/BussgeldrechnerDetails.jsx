import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCalculator } from 'react-icons/fa';
import './Bussgeldrechner.css';
import { berechneBussgeld } from './Bussgeldrechnerfunktion';
import Particles from 'react-tsparticles';

const BussgeldrechnerDetails = () => {
  const navigate = useNavigate();
  const locationHook = useLocation();
  const selectedCategory = locationHook.state?.category;

  const [vehicleType, setVehicleType] = useState('');
  const [violationLocation, setViolationLocation] = useState('');
  const [speed, setSpeed] = useState(30);
  const [distanceSpeed, setDistanceSpeed] = useState('');
  const [redLightDuration, setRedLightDuration] = useState('');
  const [personEndangerment, setPersonEndangerment] = useState('');
  const [phonePersonEndangerment, setPhonePersonEndangerment] = useState('');
  const [phoneDamage, setPhoneDamage] = useState('');
  const [substanceType, setSubstanceType] = useState('');
  const [firstOffense, setFirstOffense] = useState('');
  const [ergebnis, setErgebnis] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleBack = () => {
    navigate('/bussgeldrechner');
  };

  const validateInputs = () => {
    switch (selectedCategory) {
      case 'zu_schnell':
        return vehicleType && violationLocation && speed > 0;
      case 'abstand':
        return !!distanceSpeed;
      case 'rote_ampel':
        return !!redLightDuration && !!personEndangerment;
      case 'handy':
        return !!phonePersonEndangerment && !!phoneDamage;
      case 'alkohol_drogen':
        return !!substanceType;
      default:
        return false;
    }
  };

  const berechneErgebnis = () => {
    if (!validateInputs()) {
      setErgebnis({
        bussgeld: 0,
        punkte: 0,
        fahrverbot: null,
        bemerkung: "Bitte alle Optionen auswählen"
      });
      return;
    }

    const antworten = {
      fahrzeugart: vehicleType,
      ort: violationLocation,
      kmhZuSchnell: parseInt(speed),
      distanceSpeed,
      redLightDuration,
      personEndangerment,
      phonePersonEndangerment,
      phoneDamage,
      substanceType,
      firstOffense
    };

    console.log('Berechnung mit:', {
      kategorie: selectedCategory,
      antworten: antworten
    });

    const result = berechneBussgeld(selectedCategory, antworten);
    setErgebnis(result);
  };

  useEffect(() => {
    setIsValid(validateInputs());
  }, [vehicleType, violationLocation, speed, distanceSpeed, redLightDuration, 
      personEndangerment, phonePersonEndangerment, phoneDamage, substanceType, 
      firstOffense, selectedCategory]);

  useEffect(() => {
    if (isValid) {
      berechneErgebnis();
    }
  }, [isValid]);

  const renderSpeedViolationForm = () => {
    return (
      <div className="violation-form">
        <h2>Zu schnell gefahren</h2>
        
        <div className="form-group">
          <h3>Kraftfahrzeugart</h3>
          <div className="options-grid">
            <button 
              className={`option-button ${vehicleType === 'PKW' ? 'active' : ''}`}
              onClick={() => setVehicleType('PKW')}
            >
              PKW/Motorrad
            </button>
            <button 
              className={`option-button ${vehicleType === 'pkw_lkw' ? 'active' : ''}`}
              onClick={() => setVehicleType('pkw_lkw')}
            >
              PKW mit Anhänger/LKW
            </button>
          </div>
        </div>

        <div className="form-group">
          <h3>Ort des Verstoßes</h3>
          <div className="options-grid">
            <button 
              className={`option-button ${violationLocation === 'innerorts' ? 'active' : ''}`}
              onClick={() => setViolationLocation('innerorts')}
            >
              Innerorts
            </button>
            <button 
              className={`option-button ${violationLocation === 'ausserorts' ? 'active' : ''}`}
              onClick={() => setViolationLocation('ausserorts')}
            >
              Außerorts
            </button>
          </div>
        </div>

        <div className="form-group">
          <h3>Geschwindigkeitsüberschreitung (km/h)</h3>
          <input
            type="number"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="speed-input"
          />
        </div>
      </div>
    );
  };

  const renderSpeedOptions = () => (
    <div className="options-container">
      <h2>Inner- oder außerorts?</h2>
      <div className="options-grid">
        <button className="option-card">
          PKW / Motorrad
        </button>
        <button className="option-card">
          PKW mit Anhänger / LKW
        </button>
      </div>
      <div className="location-options">
        <button className="option-button">Innerorts</button>
        <button className="option-button">Außerorts</button>
      </div>
    </div>
  );

  const renderDistanceOptions = () => (
    <div className="violation-form">
      <h2>Zu nah aufgefahren</h2>
      
      <div className="form-group">
        <h3>Gefahrene Geschwindigkeit in km/h</h3>
        <div className="options-grid">
          <button 
            className={`option-button ${distanceSpeed === 'bis80' ? 'active' : ''}`}
            onClick={() => setDistanceSpeed('bis80')}
          >
            Bis 80
          </button>
          <button 
            className={`option-button ${distanceSpeed === '81-100' ? 'active' : ''}`}
            onClick={() => setDistanceSpeed('81-100')}
          >
            81-100
          </button>
          <button 
            className={`option-button ${distanceSpeed === '101-130' ? 'active' : ''}`}
            onClick={() => setDistanceSpeed('101-130')}
          >
            101-130
          </button>
          <button 
            className={`option-button ${distanceSpeed === 'ueber130' ? 'active' : ''}`}
            onClick={() => setDistanceSpeed('ueber130')}
          >
            über 130
          </button>
        </div>
      </div>
    </div>
  );

  const renderRedLightOptions = () => (
    <div className="violation-form">
      <h2>Rote Ampel überfahren</h2>
      
      <div className="form-group">
        <h3>Wie lange war es schon rot?</h3>
        <div className="options-grid">
          <button 
            className={`option-button ${redLightDuration === 'under1' ? 'active' : ''}`}
            onClick={() => setRedLightDuration('under1')}
          >
            Weniger als 1 Sekunde
          </button>
          <button 
            className={`option-button ${redLightDuration === 'over1' ? 'active' : ''}`}
            onClick={() => setRedLightDuration('over1')}
          >
            1 Sekunde oder länger
          </button>
        </div>
      </div>

      <div className="form-group">
        <h3>Personengefährdung</h3>
        <div className="options-grid">
          <button 
            className={`option-button ${personEndangerment === 'yes' ? 'active' : ''}`}
            onClick={() => setPersonEndangerment('yes')}
          >
            Ja
          </button>
          <button 
            className={`option-button ${personEndangerment === 'no' ? 'active' : ''}`}
            onClick={() => setPersonEndangerment('no')}
          >
            Nein
          </button>
        </div>
      </div>
    </div>
  );

  const renderPhoneOptions = () => (
    <div className="violation-form">
      <h2>Handy am Steuer</h2>
      
      <div className="form-group">
        <h3>Personengefährdung</h3>
        <div className="options-grid">
          <button 
            className={`option-button ${phonePersonEndangerment === 'yes' ? 'active' : ''}`}
            onClick={() => setPhonePersonEndangerment('yes')}
          >
            Ja
          </button>
          <button 
            className={`option-button ${phonePersonEndangerment === 'no' ? 'active' : ''}`}
            onClick={() => setPhonePersonEndangerment('no')}
          >
            Nein
          </button>
        </div>
      </div>

      <div className="form-group">
        <h3>Sachbeschädigung</h3>
        <div className="options-grid">
          <button 
            className={`option-button ${phoneDamage === 'yes' ? 'active' : ''}`}
            onClick={() => setPhoneDamage('yes')}
          >
            Ja
          </button>
          <button 
            className={`option-button ${phoneDamage === 'no' ? 'active' : ''}`}
            onClick={() => setPhoneDamage('no')}
          >
            Nein
          </button>
        </div>
      </div>
    </div>
  );

  const renderAlcoholOptions = () => (
    <div className="violation-form">
      <h2>Alkohol / Drogen beim Fahren</h2>
      
      <div className="form-group">
        <h3>Verstoß</h3>
        <div className="options-grid">
          <button 
            className={`option-button ${substanceType === 'alcohol' ? 'active' : ''}`}
            onClick={() => setSubstanceType('alcohol')}
          >
            Alkohol
          </button>
          <button 
            className={`option-button ${substanceType === 'drugs' ? 'active' : ''}`}
            onClick={() => setSubstanceType('drugs')}
          >
            Drogen
          </button>
        </div>
      </div>
    </div>
  );

  const renderOptions = () => {
    console.log('Selected Category:', selectedCategory);
    switch (selectedCategory) {
      case 'zu_schnell':
        return renderSpeedViolationForm();
      case 'abstand':
        return renderDistanceOptions();
      case 'rote_ampel':
        return renderRedLightOptions();
      case 'handy':
        return renderPhoneOptions();
      case 'alkohol_drogen':
        return renderAlcoholOptions();
      default:
        console.log('No valid category selected');
        return (
          <div className="no-category-message">
            <h2>Bitte wählen Sie eine Kategorie aus</h2>
          </div>
        );
    }
  };

  const particlesOptions = {
    fullScreen: false,
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 30, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      opacity: { value: 0.08, random: true },
      size: { value: 40, random: true },
      move: { enable: true, speed: 0.5, direction: 'none', outModes: 'out' },
      shape: { type: 'circle' },
    },
    detectRetina: true,
  };

  return (
    <div className="bussgeldrechner-details-page">
      <Particles
        className="bussgeldrechner-hero__particles"
        id="tsparticles"
        options={particlesOptions}
      />
      <div className="details-container">
        <div className="bussgeldrechner-progress-bar-container">
          <div className="bussgeldrechner-progress-bar">
            <div className="bussgeldrechner-progress-step">1. Kategorie wählen</div>
            <div className="bussgeldrechner-progress-step active">2. Details beantworten</div>
            <div className="bussgeldrechner-progress-step">3. Einspruch prüfen</div>
            <div className="bussgeldrechner-progress-step">4. Formular ausfüllen</div>
          </div>
        </div>

        <div className="details-content">
          <div className="options-section">
            {renderOptions()}
            <motion.button
              className="back-button"
              onClick={handleBack}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaArrowLeft /> Zurück
            </motion.button>
          </div>

          <div className="calculator-section">
            <h2>Berechnetes Ergebnis</h2>
            <div className="result-container">
              <div className="result-item">
                <span className="result-label">Bußgeld:</span>
                <span className="result-value">
                  {isValid ? `${ergebnis.bussgeld} €` : '-'}
                </span>
              </div>
              <div className="result-item">
                <span className="result-label">Punkte:</span>
                <span className="result-value">
                  {isValid ? ergebnis.punkte : '-'}
                </span>
              </div>
              <div className="result-item">
                <span className="result-label">Fahrverbot:</span>
                <span className="result-value">
                  {isValid ? (ergebnis.fahrverbot || "Kein Fahrverbot") : '-'}
                </span>
              </div>
              {(!isValid || ergebnis.bemerkung) && (
                <div className="result-item">
                  <span className="result-label">Status:</span>
                  <span className="result-value warning">
                    {ergebnis.bemerkung || "Bitte alle erforderlichen Felder ausfüllen"}
                  </span>
                </div>
              )}
            </div>
            
            <div className="disclaimer">
              *Dieser Wert kann in Abhängigkeit von deinem Punktestand in Flensburg oder vorsätzlichen Handelns abweichen. Alle Berechnungen erfolgen ohne Gewähr.
            </div>
            
            <div className="warning-text">
              Bußgeldbescheide sind häufig fehlerhaft!
            </div>

            <button 
              className="check-button"
              onClick={() => navigate('/anfrage')}
            >
              Einspruch kostenfrei prüfen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BussgeldrechnerDetails; 