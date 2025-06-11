import React, { useState } from 'react';
import './Punkteabfrage.css';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

// Hero-Komponente für Punkteabfrage
const PunkteabfrageHero = () => {
  const heroStyle = {
    backgroundImage: `url(/assets/images/PunkteabfrageHero.png)`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    overflow: 'hidden',
  };

  const heroCards = [
    {
      title: "Kostenfrei & digital",
      description: "Punkteauskunft direkt online beantragen",
      icon: <span role="img" aria-label="digital">💻</span>
    },
    {
      title: "Sicher & vertraulich",
      description: "Deine Daten werden verschlüsselt übertragen",
      icon: <span role="img" aria-label="sicher">🔒</span>
    },
    {
      title: "Schnelle Bearbeitung",
      description: "Erhalte deine Auskunft in wenigen Tagen",
      icon: <span role="img" aria-label="schnell">⚡️</span>
    }
  ];

  return (
    <section className="punkteabfrage-hero" style={heroStyle}>
      <div className="bussgeldrechner-hero__container">
        <div className="bussgeldrechner-hero__content">
          <div className="bussgeldrechner-hero__text">
            <h1 className="bussgeldrechner-hero__title">
              <span className="bussgeldrechner-hero__title-line">
                Punkteabfrage
              </span>
            </h1>
            <p className="bussgeldrechner-hero__subtitle">
              Jetzt Punktestand beim KBA kostenfrei abfragen
            </p>
            <div className="bussgeldrechner-hero__benefits">
              {heroCards.map((card, index) => (
                <div key={index} className="bussgeldrechner-hero__benefit-item">
                  <div className="bussgeldrechner-hero__benefit-icon">
                    {card.icon}
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <motion.div
          className="bussgeldrechner-hero__arrow"
          initial={{ y: 0, opacity: 0.7 }}
          animate={{ y: [0, 16, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 3 }}
        >
          <FaChevronDown size={32} color="#fff" style={{ filter: 'drop-shadow(0 2px 8px rgba(27,58,75,0.25))' }} />
        </motion.div>
      </div>
    </section>
  );
};

const Punkteabfrage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    anrede: '',
    vorname: '',
    nachname: '',
    geburtsname: '',
    email: '',
    telefon: '',
    strasse: '',
    hausnummer: '',
    plz: '',
    ort: '',
    geburtsdatum: '',
    geburtsort: '',
    angabenBestaetigt: false,
    agbDatenschutz: false,
    newsletter: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors(prev => ({
      ...prev,
      [field]: '' // Fehler für das Feld zurücksetzen
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.anrede) newErrors.anrede = 'Bitte wählen Sie eine Anrede aus.';
      if (!formData.vorname) newErrors.vorname = 'Bitte geben Sie Ihren Vornamen ein.';
      if (!formData.nachname) newErrors.nachname = 'Bitte geben Sie Ihren Nachnamen ein.';
      if (!formData.email) newErrors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
      if (!formData.telefon) newErrors.telefon = 'Bitte geben Sie Ihre Telefonnummer ein.';
    }
    if (currentStep === 2) {
      if (!formData.strasse) newErrors.strasse = 'Bitte geben Sie Ihre Straße ein.';
      if (!formData.hausnummer) newErrors.hausnummer = 'Bitte geben Sie Ihre Hausnummer ein.';
      if (!formData.plz) newErrors.plz = 'Bitte geben Sie Ihre PLZ ein.';
      if (!formData.ort) newErrors.ort = 'Bitte geben Sie Ihren Wohnort ein.';
      if (!formData.geburtsdatum) newErrors.geburtsdatum = 'Bitte geben Sie Ihr Geburtsdatum ein.';
      if (!formData.geburtsort) newErrors.geburtsort = 'Bitte geben Sie Ihren Geburtsort ein.';
    }
    if (currentStep === 3) {
      if (!formData.angabenBestaetigt) newErrors.angabenBestaetigt = 'Bitte bestätigen Sie die Richtigkeit Ihrer Angaben.';
    }
    if (currentStep === 4) {
      if (!formData.agbDatenschutz) newErrors.agbDatenschutz = 'Bitte bestätigen Sie die rechtlichen Bestimmungen.';
      // Newsletter ist optional
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else if (currentStep === 3) {
        setCurrentStep(4); // Springe direkt zu Bestätigungsschritt
      } else if (currentStep === 4) {
        setCurrentStep(5); // Abschluss-Schritt
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-container">
            <h2>Persönliche Daten</h2>
            <div className="step-content">
              <div className="input-group">
                <label className="input-label">Anrede</label>
                <select
                  className="input-field"
                  value={formData.anrede}
                  onChange={(e) => handleInputChange('anrede', e.target.value)}
                >
                  <option value="">Bitte wählen</option>
                  <option value="Herr">Herr</option>
                  <option value="Frau">Frau</option>
                  <option value="Divers">Divers</option>
                </select>
                {errors.anrede && <p className="error">{errors.anrede}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Vorname</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Max"
                  value={formData.vorname}
                  onChange={(e) => handleInputChange('vorname', e.target.value)}
                />
                {errors.vorname && <p className="error">{errors.vorname}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Nachname</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Mustermann"
                  value={formData.nachname}
                  onChange={(e) => handleInputChange('nachname', e.target.value)}
                />
                {errors.nachname && <p className="error">{errors.nachname}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">E-Mail</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="max.mustermann@beispiel.de"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Telefon</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="01234 567890"
                  value={formData.telefon}
                  onChange={(e) => handleInputChange('telefon', e.target.value)}
                />
                {errors.telefon && <p className="error">{errors.telefon}</p>}
              </div>

              <div className="navigation-buttons">
                <button className="back-button" onClick={handleBack}>
                  Zurück
                </button>
                <button className="next-button" onClick={handleNext}>
                  Weiter
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-container">
            <h2>Adresse & Geburtsdaten</h2>
            <div className="step-content">
              <div className="input-group">
                <label className="input-label">Straße</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Musterstraße"
                  value={formData.strasse}
                  onChange={(e) => handleInputChange('strasse', e.target.value)}
                />
                {errors.strasse && <p className="error">{errors.strasse}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Hausnummer</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="123"
                  value={formData.hausnummer}
                  onChange={(e) => handleInputChange('hausnummer', e.target.value)}
                />
                {errors.hausnummer && <p className="error">{errors.hausnummer}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Postleitzahl</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="12345"
                  value={formData.plz}
                  onChange={(e) => handleInputChange('plz', e.target.value)}
                />
                {errors.plz && <p className="error">{errors.plz}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Ort</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Musterstadt"
                  value={formData.ort}
                  onChange={(e) => handleInputChange('ort', e.target.value)}
                />
                {errors.ort && <p className="error">{errors.ort}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Geburtsdatum</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.geburtsdatum}
                  onChange={(e) => handleInputChange('geburtsdatum', e.target.value)}
                />
                {errors.geburtsdatum && <p className="error">{errors.geburtsdatum}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Geburtsort</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Geburtsstadt"
                  value={formData.geburtsort}
                  onChange={(e) => handleInputChange('geburtsort', e.target.value)}
                />
                {errors.geburtsort && <p className="error">{errors.geburtsort}</p>}
              </div>

              <div className="navigation-buttons">
                <button className="back-button" onClick={handleBack}>
                  Zurück
                </button>
                <button className="next-button" onClick={handleNext}>
                  Weiter
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-container">
            <h2>Zusammenfassung Ihrer Angaben</h2>
            <div className="confirmation-summary">
              <ul>
                <li><strong>Anrede:</strong> {formData.anrede}</li>
                <li><strong>Vorname:</strong> {formData.vorname}</li>
                <li><strong>Nachname:</strong> {formData.nachname}</li>
                <li><strong>E-Mail:</strong> {formData.email}</li>
                <li><strong>Telefon:</strong> {formData.telefon}</li>
                <li><strong>Straße:</strong> {formData.strasse}</li>
                <li><strong>Hausnummer:</strong> {formData.hausnummer}</li>
                <li><strong>PLZ:</strong> {formData.plz}</li>
                <li><strong>Ort:</strong> {formData.ort}</li>
                <li><strong>Geburtsdatum:</strong> {formData.geburtsdatum}</li>
                <li><strong>Geburtsort:</strong> {formData.geburtsort}</li>
              </ul>
            </div>
            <div className="checkbox-container">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.angabenBestaetigt}
                  onChange={e => handleInputChange('angabenBestaetigt', e.target.checked)}
                />
                Ich bestätige, dass die oben stehenden Angaben korrekt sind. <span style={{color: 'red'}}>*</span>
              </label>
              {errors.angabenBestaetigt && <p className="error">{errors.angabenBestaetigt}</p>}
            </div>
            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>
                Zurück
              </button>
              <button className="next-button" onClick={handleNext}>
                Weiter
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-container">
            <h2>Rechtliche Bestätigungen & Newsletter</h2>
            <div className="checkbox-container">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.agbDatenschutz}
                  onChange={e => handleInputChange('agbDatenschutz', e.target.checked)}
                />
                Ich habe die AGB und Verbraucherinformationen zur Kenntnis genommen und erkläre mich damit einverstanden. Ich habe die Bestimmungen zum Datenschutz zur Kenntnis genommen und erkläre mich damit einverstanden. <span style={{color: 'red'}}>*</span>
              </label>
              {errors.agbDatenschutz && <p className="error">{errors.agbDatenschutz}</p>}
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={e => handleInputChange('newsletter', e.target.checked)}
                />
                Bleib auf dem Laufenden und erhalte regelmäßig Infos zu neuen Produkten, exklusiven Angeboten und spannende Informationen zu Verbraucherrechts-Themen aus dem Verkehrs-, Arbeits- und Fluggastrecht per E-Mail von der rechtly GmbH und Qara Legal. Du kannst dich jederzeit abmelden.
              </label>
            </div>
            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>
                Zurück
              </button>
              <button className="next-button" onClick={handleNext}>
                Absenden
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="thankyou-container">
            <h2>Vielen Dank für deine Anfrage!</h2>
            <p className="thankyou-hint">Bitte prüfe dein E-Mail Postfach.</p>
            <p>Wir haben dir soeben eine E-Mail mit einer Vollmacht geschickt. Du kannst diese ganz einfach digital unterschreiben und wir fragen deinen Punktestand ab.</p>
            <div className="thankyou-divider" />
            <h3>Hast du einen Bußgeldbescheid erhalten?</h3>
            <p>Viele Bußgeldbescheide sind fehlerhaft.</p>
            <div className="bussgeldcheck-box">
              <p>Nutze unseren <strong>Bußgeldcheck</strong>:</p>
              <button className="bussgeldcheck-button" onClick={() => window.open('/bussgeldrechner', '_blank')}>Einspruch prüfen</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="punkteabfrage-section">
      <PunkteabfrageHero />
      <div className="punkteabfrage-grid">
        <div className="punkteabfrage-text">
          <h1 className="hero__title-line">Jetzt kostenfrei Punktestand abfragen</h1>
          <p className="hero__subtitle"><span className="hero__highlight-animated"><strong>Erhalte deinen Fahreignungsregisterauszug vom Kraftfahrtbundesamt (KBA).</strong></span></p>
          <div className="trust-labels">
            <img src="/assets/images/trust_mobile-1-1024x64-2.png" alt="Organisation 1" className="trust-label" />
          </div>
        </div>
        <div className={`punkteabfrage-card${currentStep > 0 ? ' active' : ''}`}>
          {currentStep === 0 ? (
            <>
              <h2>Punkteabfrage</h2>
              <p>In 2 min Punktestand anfragen</p>
              <button className="start-request-button" onClick={() => setCurrentStep(1)}>Anfrage starten</button>
            </>
          ) : (
            renderStep()
          )}
        </div>
      </div>
    </section>
  );
};

export default Punkteabfrage;
