import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BussgeldAnfrageBanner from './BussgeldAnfrageBanner';
import './BussgeldForm.css';

const BussgeldForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    allgemein: {
      vorwurf: '',
      fahrzeugTyp: '',
      punktestand: '',
      probezeit: '',
      schreiben: '',
      dokumente: []
    },
    kosten: {
      kostenuebernahme: ''
    },
    person: {
      anrede: '',
      titel: '',
      vorname: '',
      nachname: '',
      weitereVornamen: '',
      geburtsname: '',
      geburtsdatum: '',
      geburtsort: '',
      strasse: '',
      hausNr: '',
      plz: '',
      wohnort: '',
      email: '',
      emailBestaetigung: '',
      telefon: '',
      aktenzeichen: '',
      zustellungsdatum: '',
      behoerde: '',
      kennzeichen: ''
    },
    kontakt: {
      name: '',
      email: '',
      nachricht: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const serviceOptionen = [
    { 
      id: 'bussgeld', 
      title: 'Bußgeldprüfung', 
      icon: '📋',
      description: 'Lassen Sie Ihren Bußgeldbescheid von unseren Experten prüfen'
    },
    { 
      id: 'individuell', 
      title: 'Individuelle Anfrage', 
      icon: '✍️',
      description: 'Stellen Sie uns Ihre spezifische Anfrage zum Verkehrsrecht'
    }
  ];

  const vorwurfOptionen = [
    { value: 'geschwindigkeit', label: 'Geschwindigkeitsüberschreitung' },
    { value: 'rotlicht', label: 'Rotlichtverstoß' },
    { value: 'abstand', label: 'Abstandsverstoß' },
    { value: 'handy', label: 'Handynutzung' },
    { value: 'alkohol', label: 'Alkohol/Drogen' },
    { value: 'sonstiges', label: 'Sonstiger Verstoß' }
  ];

  const fahrzeugOptionen = [
    { value: 'pkw', label: 'PKW' },
    { value: 'lkw', label: 'LKW' },
    { value: 'motorrad', label: 'Motorrad' },
    { value: 'sonstiges', label: 'Sonstiges' }
  ];

  const schreibenOptionen = [
    { value: 'anhoerung', label: 'Anhörung im Bußgeldverfahren' },
    { value: 'bussgeld', label: 'Bußgeldbescheid' },
    { value: 'zeugenfragebogen', label: 'Zeugenfragebogen' },
    { value: 'sonstiges', label: 'Sonstiges Schreiben' }
  ];

  const handleServiceSelect = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      service: serviceId
    }));
    setCurrentStep(2);
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    validateStep(currentStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/anfrage');
    }
  };

  const handleNext = () => {
    const isStepValid = validateStep(currentStep);
    console.log('Current Step:', currentStep, 'Is Step Valid:', isStepValid);
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    switch (step) {
      case 1:
        // Validierung für Schritt 1 (falls erforderlich)
        break;
      case 2:
        if (!formData.allgemein.vorwurf) {
          newErrors.vorwurf = 'Bitte wählen Sie einen Vorwurf aus.';
          isValid = false;
        }
        if (!formData.allgemein.fahrzeugTyp) {
          newErrors.fahrzeugTyp = 'Bitte wählen Sie einen Fahrzeugtyp aus.';
          isValid = false;
        }
        if (!formData.allgemein.probezeit) {
          newErrors.probezeit = 'Bitte geben Sie an, ob Sie in der Probezeit waren.';
          isValid = false;
        }
        if (!formData.allgemein.schreiben) {
          newErrors.schreiben = 'Bitte wählen Sie ein Schreiben aus.';
          isValid = false;
        }
        break;
      case 3:
        if (!formData.kosten.kostenuebernahme) {
          newErrors.kostenuebernahme = 'Bitte wählen Sie eine Kostenübernahmeoption aus.';
          isValid = false;
        }
        break;
      case 4:
        if (!formData.kontakt.name) {
          newErrors.name = 'Bitte geben Sie Ihren Namen ein.';
          isValid = false;
        }
        if (!formData.kontakt.email) {
          newErrors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
          isValid = false;
        }
        if (!formData.kontakt.nachricht) {
          newErrors.nachricht = 'Bitte geben Sie eine Nachricht ein.';
          isValid = false;
        }
        break;
      case 5:
        return true;
      default:
        break;
    }
    
    setErrors(newErrors);
    setIsValid(isValid);
    return isValid;
  };

  const handleFileUpload = async (event) => {
    try {
      const files = Array.from(event.target.files);
      if (files.length === 0) return;

      const uploadFormData = new FormData();
      uploadFormData.append('dokumentTyp', 'BUSSGELD');
      
      // Kontaktdaten aus dem React-State übernehmen
      const name = formData.person.vorname && formData.person.nachname 
        ? `${formData.person.vorname} ${formData.person.nachname}`
        : 'Anonym';
      const email = formData.person.email || '';
      const telefon = formData.person.telefon || '';
      
      // Kontaktdaten zu den Metadaten hinzufügen
      uploadFormData.append('kontakt', JSON.stringify({
        name: name,
        email: email,
        telefon: telefon
      }));
      
      files.forEach(file => {
        uploadFormData.append('files', file);
      });

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: uploadFormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Upload fehlgeschlagen');
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.details || 'Upload fehlgeschlagen');
      }

      // Speichere die hochgeladenen Dateien im State
      setFormData(prev => ({
        ...prev,
        allgemein: {
          ...prev.allgemein,
          dokumente: [
            ...(prev.allgemein.dokumente || []),
            ...data.files.map(file => ({
              id: file.id,
              name: file.originalname,
              path: file.path
            }))
          ]
        }
      }));

      // Speichere die Anfrage-ID für spätere Verwendung
      if (data.anfrageId) {
        setFormData(prev => ({
          ...prev,
          anfrageId: data.anfrageId
        }));
      }

    } catch (error) {
      console.error('Fehler beim Datei-Upload:', error);
      alert('Fehler beim Upload: ' + error.message);
    }
  };

  const handleRemoveFile = async (index) => {
    try {
      const fileToRemove = formData.allgemein.dokumente[index];
      
      if (fileToRemove.id) {
        const response = await fetch(`http://localhost:5000/api/upload/${fileToRemove.id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Fehler beim Löschen der Datei');
        }
      }

      setFormData(prev => ({
        ...prev,
        allgemein: {
          ...prev.allgemein,
          dokumente: prev.allgemein.dokumente.filter((_, i) => i !== index)
        }
      }));
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      alert('Fehler beim Löschen: ' + error.message);
    }
  };

  const handleStepAllgemeinSubmit = (data) => {
    setFormData(prev => ({
      ...prev,
      allgemein: {
        ...prev.allgemein,
        ...data
      }
    }));
    setCurrentStep(prev => prev + 1);
  };

  const validateEmail = (email) => {
    // Strikte E-Mail-Validierung
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) =>
    phone === "" || /^[0-9+\-() ]{6,}$/.test(phone);

  const validatePlz = (plz) =>
    /^[0-9]{4,5}$/.test(plz);

  const validateForm = () => {
    const newErrors = {};
    
    // Anrede-Validierung
    if (!formData.person.anrede) {
      newErrors.anrede = "Anrede ist erforderlich";
    }
    // E-Mail-Validierung
    if (!formData.person.email) {
      newErrors.email = "E-Mail-Adresse ist erforderlich";
    } else if (!validateEmail(formData.person.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
    }
    // Rest der Validierungen...
    if (!formData.person.vorname) newErrors.vorname = "Vorname ist erforderlich";
    if (!formData.person.nachname) newErrors.nachname = "Nachname ist erforderlich";
    if (!formData.person.strasse) newErrors.strasse = "Straße und Hausnummer sind erforderlich";
    if (!formData.person.plz || !validatePlz(formData.person.plz)) newErrors.plz = "Gültige Postleitzahl erforderlich";
    if (!formData.person.wohnort) newErrors.wohnort = "Ort ist erforderlich";
    if (!formData.person.geburtsdatum) newErrors.geburtsdatum = "Geburtsdatum ist erforderlich";
    if (!validatePhone(formData.person.telefon)) newErrors.telefon = "Telefonnummer ungültig";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAbsenden = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Formatiere die Daten für das Backend
      const backendData = {
        anfrageTyp: 'bussgeld',
        anrede: formData.person.anrede,
        titel: formData.person.titel,
        vorname: formData.person.vorname,
        nachname: formData.person.nachname,
        email: formData.person.email,
        telefon: formData.person.telefon || '',
        strasse: formData.person.strasse,
        hausnummer: formData.person.hausNr || '',
        plz: formData.person.plz,
        ort: formData.person.wohnort,
        bussgeld: {
          vorwurf: formData.allgemein.vorwurf,
          fahrzeugTyp: formData.allgemein.fahrzeugTyp,
          punktestand: formData.allgemein.punktestand,
          probezeit: formData.allgemein.probezeit,
          schreiben: formData.allgemein.schreiben,
          kostenuebernahme: formData.kosten.kostenuebernahme,
          aktenzeichen: formData.person.aktenzeichen,
          zustellungsdatum: formData.person.zustellungsdatum,
          behoerde: formData.person.behoerde,
          kennzeichen: formData.person.kennzeichen
        },
        dokumente: formData.allgemein.dokumente ? formData.allgemein.dokumente.map(doc => ({
          id: doc.id || Math.random().toString(36).substr(2, 9),
          name: typeof doc === 'string' ? doc : doc.name,
          path: typeof doc === 'string' ? doc : doc.path
        })) : [],
        datenschutz: true,
        anwaltEinwilligung: true
      };

      console.log('Sende Daten:', backendData); // Debug-Log

      const response = await fetch('http://localhost:5000/api/anfrage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(backendData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fehler beim Senden der Anfrage');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Fehler beim Senden der Anfrage');
      }

      // Sende E-Mails
      const emailResponse = await fetch('http://localhost:5000/api/anfrage/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          anfrage: {
            person: formData.person,
            allgemein: formData.allgemein,
            kosten: formData.kosten
          },
          dokumente: formData.allgemein.dokumente
        })
      });

      if (!emailResponse.ok) {
        console.error('Fehler beim Senden der E-Mails');
      }

      // Zeige die Erfolgsmeldung
      setCurrentStep(5); // Zeige die "Danke"-Seite
    } catch (error) {
      console.error('Fehler beim Senden der Anfrage:', error);
      setErrors(prev => ({
        ...prev,
        submit: `Fehler beim Senden: ${error.message}`
      }));
    }
  };

  // Fortschrittsbalken-Konfiguration
  const steps = [
    'Service',
    'Angaben',
    'Kosten',
    'Kontakt'
  ];

  const renderProgressBar = () => (
    <div className="progressbar-container">
      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;
        return (
          <div key={label} className={`progressbar-step${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}> 
            <div className="progressbar-circle">{stepNum}</div>
            <div className="progressbar-label">{label}</div>
            {stepNum < steps.length && <div className="progressbar-line" />}
          </div>
        );
      })}
    </div>
  );

  const renderServiceSelection = () => (
    <div className="step-container">
      <div className="step-content">
        <Link to="/anfrage" className="back-link">
          Zurück zur Übersicht
        </Link>
        <div className="service-selection">
          <h2>Welchen Service dürfen wir Ihnen anbieten?</h2>
          <div className="bussgeld-options-grid">
            {serviceOptionen.map(option => (
              <button
                key={option.id}
                className={`option-button ${formData.service === option.id ? 'selected' : ''}`}
                onClick={() => handleServiceSelect(option.id)}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-title">{option.title}</span>
                <span className="option-description">{option.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderServiceSelection();
      case 2:
        return (
          <div className="step-container">
            <div className="step-content">
              <h2>Allgemeine Angaben</h2>
              <form className="form-grid">
                <div className="form-group">
                  <label htmlFor="vorwurf">
                    Was wird Ihnen vorgeworfen? <span className="required">*</span>
                  </label>
                  <select
                    id="vorwurf"
                    value={formData.allgemein.vorwurf}
                    onChange={(e) => handleInputChange('allgemein', 'vorwurf', e.target.value)}
                  >
                    <option value="">Bitte wählen</option>
                    <option value="geschwindigkeit">Geschwindigkeitsüberschreitung</option>
                    <option value="rotlicht">Rotlichtverstoß</option>
                    <option value="abstand">Abstandsverstoß</option>
                    <option value="handy">Handynutzung</option>
                    <option value="alkohol">Alkohol/Drogen</option>
                    <option value="sonstiges">Sonstiger Verstoß</option>
                  </select>
                  {errors.vorwurf && <p className="error">{errors.vorwurf}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="fahrzeugTyp">
                    Mit welchem Fahrzeug waren Sie unterwegs? <span className="required">*</span>
                  </label>
                  <select
                    id="fahrzeugTyp"
                    value={formData.allgemein.fahrzeugTyp}
                    onChange={(e) => handleInputChange('allgemein', 'fahrzeugTyp', e.target.value)}
                  >
                    <option value="">Bitte wählen</option>
                    <option value="pkw">PKW</option>
                    <option value="lkw">LKW</option>
                    <option value="motorrad">Motorrad</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                  {errors.fahrzeugTyp && <p className="error">{errors.fahrzeugTyp}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="punktestand">
                    Wie hoch ist Ihr Punktestand in Flensburg? (falls bekannt)
                  </label>
                  <input
                    type="number"
                    id="punktestand"
                    min="0"
                    max="8"
                    value={formData.allgemein.punktestand}
                    onChange={(e) => handleInputChange('allgemein', 'punktestand', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Waren Sie zum Zeitpunkt des Vorfalls in der Probezeit? <span className="required">*</span>
                  </label>
                  <div className="radio-options">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="probezeit"
                        value="ja"
                        checked={formData.allgemein.probezeit === 'ja'}
                        onChange={(e) => handleInputChange('allgemein', 'probezeit', e.target.value)}
                      />
                      <span>Ja</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="probezeit"
                        value="nein"
                        checked={formData.allgemein.probezeit === 'nein'}
                        onChange={(e) => handleInputChange('allgemein', 'probezeit', e.target.value)}
                      />
                      <span>Nein</span>
                    </label>
                  </div>
                  {errors.probezeit && <p className="error">{errors.probezeit}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="schreiben">
                    Welches Schreiben haben Sie erhalten? <span className="required">*</span>
                  </label>
                  <select
                    id="schreiben"
                    value={formData.allgemein.schreiben}
                    onChange={(e) => handleInputChange('allgemein', 'schreiben', e.target.value)}
                  >
                    <option value="">Bitte wählen</option>
                    <option value="anhoerung">Anhörung im Bußgeldverfahren</option>
                    <option value="bussgeld">Bußgeldbescheid</option>
                    <option value="zeugenfragebogen">Zeugenfragebogen</option>
                    <option value="sonstiges">Sonstiges Schreiben</option>
                  </select>
                  {errors.schreiben && <p className="error">{errors.schreiben}</p>}
                </div>

                <div className="form-group full-width">
                  <button
                    type="button"
                    className="next-button"
                    onClick={handleNext}
                  >
                    Weiter
                  </button>
                </div>
              </form>
              <div className="hint-text">
                <span className="required">*</span> = Pflichtfeld
              </div>
              <div className="navigation-buttons">
                <button className="back-button" onClick={handleBack}>
                  Zurück
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-container">
            <div className="step-content">
              <h2>Wer trägt die Kosten?</h2>
              <div className="bussgeld-options-grid">
                <button
                  className={`option-button ${formData.kosten.kostenuebernahme === 'versicherung' ? 'selected' : ''}`}
                  onClick={() => handleInputChange('kosten', 'kostenuebernahme', 'versicherung')}
                >
                  <span className="option-icon">🛡️</span>
                  <span className="option-title">Ich habe eine Rechtsschutzversicherung</span>
                </button>
                <button
                  className={`option-button ${formData.kosten.kostenuebernahme === 'selbst' ? 'selected' : ''}`}
                  onClick={() => handleInputChange('kosten', 'kostenuebernahme', 'selbst')}
                >
                  <span className="option-icon">💶</span>
                  <span className="option-title">Ich übernehme die Kosten selbst</span>
                </button>
              </div>
              {errors.kostenuebernahme && <p className="error">{errors.kostenuebernahme}</p>}

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
      case 4:
        return (
          <div className="step-container">
            <div className="step-content">
              <h2>Jetzt kostenlose Ersteinschätzung erhalten!</h2>
              <form className="form-grid" onSubmit={handleAbsenden} noValidate>
                <div className="form-group">
                  <label htmlFor="anrede">Anrede *</label>
                  <select
                    id="anrede"
                    value={formData.person.anrede}
                    onChange={e => handleInputChange('person', 'anrede', e.target.value)}
                    required
                  >
                    <option value="">Bitte wählen</option>
                    <option value="Herr">Herr</option>
                    <option value="Frau">Frau</option>
                    <option value="Divers">Divers</option>
                  </select>
                  {errors.anrede && <p className="error">{errors.anrede}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="titel">Titel</label>
                  <input
                    type="text"
                    id="titel"
                    value={formData.person.titel}
                    onChange={e => handleInputChange('person', 'titel', e.target.value)}
                    placeholder="z.B. Dr., Prof."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="geburtsname">Geburtsname</label>
                  <input
                    type="text"
                    id="geburtsname"
                    value={formData.person.geburtsname}
                    onChange={e => handleInputChange('person', 'geburtsname', e.target.value)}
                    placeholder="Geburtsname (optional)"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="geburtsort">Geburtsort</label>
                  <input
                    type="text"
                    id="geburtsort"
                    value={formData.person.geburtsort}
                    onChange={e => handleInputChange('person', 'geburtsort', e.target.value)}
                    placeholder="Geburtsort (optional)"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vorname">Vorname *</label>
                  <input
                    type="text"
                    id="vorname"
                    value={formData.person.vorname}
                    onChange={e => handleInputChange('person', 'vorname', e.target.value)}
                    required
                  />
                  {errors.vorname && <p className="error">{errors.vorname}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="nachname">Nachname *</label>
                  <input
                    type="text"
                    id="nachname"
                    value={formData.person.nachname}
                    onChange={e => handleInputChange('person', 'nachname', e.target.value)}
                    required
                  />
                  {errors.nachname && <p className="error">{errors.nachname}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="strasse">Straße und Hausnummer *</label>
                  <input
                    type="text"
                    id="strasse"
                    value={formData.person.strasse}
                    onChange={e => handleInputChange('person', 'strasse', e.target.value)}
                    required
                  />
                  {errors.strasse && <p className="error">{errors.strasse}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="plz">Postleitzahl *</label>
                  <input
                    type="text"
                    id="plz"
                    value={formData.person.plz}
                    onChange={e => handleInputChange('person', 'plz', e.target.value)}
                    required
                  />
                  {errors.plz && <p className="error">{errors.plz}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="wohnort">Ort *</label>
                  <input
                    type="text"
                    id="wohnort"
                    value={formData.person.wohnort}
                    onChange={e => handleInputChange('person', 'wohnort', e.target.value)}
                    required
                  />
                  {errors.wohnort && <p className="error">{errors.wohnort}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="geburtsdatum">Geburtsdatum *</label>
                  <input
                    type="date"
                    id="geburtsdatum"
                    value={formData.person.geburtsdatum}
                    onChange={e => handleInputChange('person', 'geburtsdatum', e.target.value)}
                    required
                  />
                  {errors.geburtsdatum && <p className="error">{errors.geburtsdatum}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="telefon">Telefonnummer</label>
                  <input
                    type="tel"
                    id="telefon"
                    value={formData.person.telefon}
                    onChange={e => handleInputChange('person', 'telefon', e.target.value)}
                    placeholder="Optional, aber empfehlenswert"
                  />
                  {errors.telefon && <p className="error">{errors.telefon}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-Mail-Adresse *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.person.email}
                    onChange={e => handleInputChange('person', 'email', e.target.value)}
                    required
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="aktenzeichen">Aktenzeichen des Bescheids</label>
                  <input
                    type="text"
                    id="aktenzeichen"
                    value={formData.person.aktenzeichen || ''}
                    onChange={e => handleInputChange('person', 'aktenzeichen', e.target.value)}
                    placeholder="falls vorhanden"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zustellungsdatum">Zustellungsdatum des Bescheids</label>
                  <input
                    type="date"
                    id="zustellungsdatum"
                    value={formData.person.zustellungsdatum || ''}
                    onChange={e => handleInputChange('person', 'zustellungsdatum', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="behoerde">Angegebene Behörde / Polizei</label>
                  <input
                    type="text"
                    id="behoerde"
                    value={formData.person.behoerde || ''}
                    onChange={e => handleInputChange('person', 'behoerde', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="kennzeichen">Kennzeichen des betroffenen Fahrzeugs</label>
                  <input
                    type="text"
                    id="kennzeichen"
                    value={formData.person.kennzeichen || ''}
                    onChange={e => handleInputChange('person', 'kennzeichen', e.target.value)}
                  />
                </div>
                <div className="form-group full-width">
                  <label>PDF oder Foto des Bußgeldbescheids / Beweismaterial</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="upload-hint">
                    PDF, JPG, PNG – Bußgeldbescheid, Blitzerfoto, Schreiben der Behörde etc.
                  </div>
                  {formData.allgemein.dokumente && formData.allgemein.dokumente.length > 0 && (
                    <div className="uploaded-files">
                      {formData.allgemein.dokumente.map((fileName, index) => (
                        <div key={index} className="file-item" style={{ color: '#000000' }}>
                          <span>{typeof fileName === 'string' ? fileName : fileName.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="remove-file"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="form-group full-width">
                  <button type="submit" className="next-button">
                    Absenden
                  </button>
                </div>
              </form>
              <div className="navigation-buttons">
                <button className="back-button" onClick={handleBack}>
                  Zurück
                </button>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="thankyou-container">
            <h2>Vielen Dank für deine Anfrage!</h2>
            <p className="thankyou-hint">Bitte prüfe dein E-Mail Postfach.</p>
            <p>Wir haben dir soeben eine E-Mail mit einer Bestätigung geschickt. Unsere Experten werden deine Anfrage schnellstmöglich prüfen und dich über das weitere Vorgehen informieren.</p>
            <div className="thankyou-divider" />
            <h3>Hast du einen Verkehrsunfall erlitten?</h3>
            <p>Wir helfen dir bei der Schadensabwicklung.</p>
            <div className="bussgeldcheck-box">
              <p>Nutze unseren <strong>Verkehrsunfall-Service</strong>:</p>
              <button className="bussgeldcheck-button" onClick={() => window.open('/anfrage/verkehrsunfallanfrage', '_blank')}>Verkehrsunfall melden</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bussgeld-form-container">
      <BussgeldAnfrageBanner />
      <div className="bussgeld-form">
        {currentStep <= 4 && renderProgressBar()}
        {renderStep()}
      </div>
    </div>
  );
};

export default BussgeldForm; 