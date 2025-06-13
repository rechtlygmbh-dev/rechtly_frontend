import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KfzGutachtenAnfrageBanner from './KfzGutachtenAnfrageBanner';
import './KfzGutachtenAnfrage.css';
const exampleImage = '/assets/images/3 stofftier.jpg'; // Beispielbild importieren

const KfzGutachtenAnfrage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    schuld: '',
    bilder: {
      vorneRechts: [],
      hintenLinks: [],
      schadenBereich: [],
      detailBilder: [],
      kilometerstand: [],
      fahrzeugschein: [],
      zusatzDokumente: []
    },
    schadenBeschreibung: '',
    name: '',
    email: '',
    telefonnummer: '',
    plz: '',
    datenschutz: false,
    vorname: '',
    nachname: '',
    strasse: '',
    hausnummer: '',
    ort: ''
  });
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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

  const uploadFiles = async (files, kategorie) => {
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('dokumentTyp', 'KFZGUTACHTEN');
      formDataUpload.append('name', formData.kontakt?.name || '');
      formDataUpload.append('email', formData.kontakt?.email || '');
      formDataUpload.append('telefon', formData.kontakt?.telefon || '');
      files.forEach(file => {
        formDataUpload.append('files', file);
      });
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          // Don't set Content-Type header when sending FormData
        },
        body: formDataUpload
      });

      if (!response.ok) {
        // Try to parse error response if available
        let errorMessage = 'Upload fehlgeschlagen';
        try {
          const errorData = await response.json();
          errorMessage = errorData.details || errorData.error || errorMessage;
        } catch (e) {
          // If JSON parsing fails, use status text
          errorMessage = `${response.status}: ${response.statusText || errorMessage}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.details || 'Upload fehlgeschlagen');
      }

      setFormData(prev => ({
        ...prev,
        bilder: {
          ...prev.bilder,
          [kategorie]: [
            ...(prev.bilder[kategorie] || []),
            ...data.files.map(file => ({
              id: file.id,
              name: file.originalname,
              path: file.path
            }))
          ]
        }
      }));
    } catch (error) {
      console.error('Upload-Fehler:', error);
      setErrors(prev => ({
        ...prev,
        bilder: error.message
      }));
      throw error;
    }
  };

  const handleFileUpload = async (event, step) => {
    const files = Array.from(event.target.files);
    
    // Validierung der Dateitypen
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setErrors(prev => ({
        ...prev,
        bilder: 'Bitte nur JPG oder PNG Dateien hochladen.'
      }));
      return;
    }

    // Validierung der Dateigröße (max 5MB pro Bild)
    const maxSize = 5 * 1024 * 1024; // 5MB in Bytes
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      setErrors(prev => ({
        ...prev,
        bilder: 'Bilder dürfen nicht größer als 5MB sein.'
      }));
      return;
    }

    await uploadFiles(files, step);
    event.target.value = ''; // Reset file input
  };

  const handleRemoveFile = async (step, indexToRemove) => {
    try {
      const fileToRemove = formData[step]?.dokumente[indexToRemove];
      
      if (fileToRemove?.id) {
        const response = await fetch(`/api/upload/${fileToRemove.id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Fehler beim Löschen der Datei');
        }
      }

      setFormData(prev => ({
        ...prev,
        [step]: {
          ...prev[step],
          dokumente: prev[step].dokumente.filter((_, index) => index !== indexToRemove)
        }
      }));
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      // Validiere die Pflichtfelder
      const errors = {};
      if (!formData.schuld) errors.schuld = 'Bitte wählen Sie eine Option aus.';
      if (!formData.name) errors.name = 'Bitte geben Sie Ihren Namen ein.';
      if (!formData.email) errors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
      if (!formData.telefonnummer) errors.telefonnummer = 'Bitte geben Sie Ihre Telefonnummer ein.';
      if (!formData.plz) errors.plz = 'Bitte geben Sie Ihre PLZ ein.';
      if (!formData.datenschutz) errors.datenschutz = 'Bitte stimmen Sie der Datenschutzerklärung zu.';

      // Prüfe, ob mindestens ein Bild pro Kategorie hochgeladen wurde
      const bildKategorien = ['vorneRechts', 'hintenLinks', 'schadenBereich', 'detailBilder', 'kilometerstand', 'fahrzeugschein'];
      for (const kategorie of bildKategorien) {
        if (!formData.bilder[kategorie] || formData.bilder[kategorie].length === 0) {
          errors.bilder = `Bitte laden Sie mindestens ein Bild für ${kategorie} hoch.`;
          break;
        }
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      // Sammle alle Bilder/Dokumente in ein gemeinsames Array
      const alleDokumente = [
        ...(formData.bilder.vorneRechts || []),
        ...(formData.bilder.hintenLinks || []),
        ...(formData.bilder.schadenBereich || []),
        ...(formData.bilder.detailBilder || []),
        ...(formData.bilder.kilometerstand || []),
        ...(formData.bilder.fahrzeugschein || []),
        ...(formData.bilder.zusatzDokumente || [])
      ];

      // Baue das Payload-Objekt mit allen Kontakt- und Fahrzeugdaten
      const payload = {
        vorname: formData.vorname,
        nachname: formData.nachname,
        name: formData.name,
        email: formData.email,
        telefon: formData.telefonnummer,
        strasse: formData.strasse,
        hausnummer: formData.hausnummer,
        plz: formData.plz,
        ort: formData.ort,
        datenschutz: formData.datenschutz,
        kfzGutachten: {
          fahrzeugTyp: formData.fahrzeugtyp,
          marke: formData.marke,
          modell: formData.modell,
          baujahr: formData.baujahr,
          kennzeichen: formData.kennzeichen,
          schadensart: formData.schadensart,
          schadensbeschreibung: formData.schadensbeschreibung,
          versicherung: {
            name: formData.versicherung,
            versicherungsnummer: formData.versicherungsnummer
          }
        },
        dokumente: alleDokumente
      };

      // Sende die Anfrage an den Server
      const response = await fetch('/api/anfrage/kfz-gutachten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Fehler beim Senden der Anfrage');
      }

      // Zeige die Erfolgsmeldung
      setCurrentStep(10); // Zur Dankeseite navigieren
    } catch (error) {
      console.error('Fehler beim Senden der Anfrage:', error);
      setErrors(prev => ({
        ...prev,
        submit: `Fehler beim Senden: ${error.message}`
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    switch (currentStep) {
      case 1:
        if (!formData.schuld) {
          newErrors.schuld = 'Bitte wählen Sie eine Option aus.';
        }
        break;
      case 2:
        // Keine Validierung für Schritt 2, da es ein reiner Informationsschritt ist
        break;
      case 3:
        if (!formData.bilder.vorneRechts || formData.bilder.vorneRechts.length === 0) {
          newErrors.bilder = 'Bitte laden Sie mindestens ein Bild hoch.';
        }
        break;
      case 4:
        if (!formData.bilder.hintenLinks || formData.bilder.hintenLinks.length === 0) {
          newErrors.bilder = 'Bitte laden Sie mindestens ein Bild hoch.';
        }
        break;
      case 5:
        if (!formData.bilder.schadenBereich || formData.bilder.schadenBereich.length === 0) {
          newErrors.bilder = 'Bitte laden Sie mindestens ein Bild hoch.';
        }
        break;
      case 6:
        if (!formData.bilder.detailBilder || formData.bilder.detailBilder.length === 0) {
          newErrors.bilder = 'Bitte laden Sie mindestens ein Bild hoch.';
        }
        break;
      case 7:
        if (!formData.bilder.kilometerstand || formData.bilder.kilometerstand.length === 0) {
          newErrors.bilder = 'Bitte laden Sie mindestens ein Bild hoch.';
        }
        break;
      case 8:
        if (!formData.bilder.fahrzeugschein || formData.bilder.fahrzeugschein.length === 0) {
          newErrors.bilder = 'Bitte laden Sie mindestens ein Bild hoch.';
        }
        break;
      case 9:
        if (!formData.vorname) newErrors.vorname = 'Bitte geben Sie Ihren Vornamen ein.';
        if (!formData.nachname) newErrors.nachname = 'Bitte geben Sie Ihren Nachnamen ein.';
        if (!formData.name) newErrors.name = 'Bitte geben Sie Ihren Namen ein.';
        if (!formData.telefonnummer) newErrors.telefonnummer = 'Bitte geben Sie Ihre Telefonnummer ein.';
        if (!formData.email) newErrors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
        if (!formData.fahrzeugtyp) newErrors.fahrzeugtyp = 'Bitte geben Sie den Fahrzeugtyp an.';
        if (!formData.marke) newErrors.marke = 'Bitte geben Sie die Marke an.';
        if (!formData.modell) newErrors.modell = 'Bitte geben Sie das Modell an.';
        if (!formData.baujahr) newErrors.baujahr = 'Bitte geben Sie das Baujahr an.';
        if (!formData.kennzeichen) newErrors.kennzeichen = 'Bitte geben Sie das Kennzeichen an.';
        if (!formData.schadensart) newErrors.schadensart = 'Bitte geben Sie die Schadensart an.';
        if (!formData.schadensbeschreibung) newErrors.schadensbeschreibung = 'Bitte geben Sie eine Schadensbeschreibung an.';
        if (!formData.versicherung) newErrors.versicherung = 'Bitte geben Sie die Versicherung an.';
        if (!formData.versicherungsnummer) newErrors.versicherungsnummer = 'Bitte geben Sie die Versicherungsnummer an.';
        break;
      default:
        return Object.keys(newErrors).length === 0;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep === 9) {
        handleSubmit(); // Verwende die neue handleSubmit Funktion
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const steps = [
    'Schuld',
    'Info',
    'Vorne',
    'Hinten',
    'Schaden',
    'Details',
    'Kilometer',
    'Schein',
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-container">
            <Link to="/anfrage" className="back-link">Zurück zur Übersicht</Link>
            <h2>Was ist passiert?</h2>
            <p className="step-description">
              Gib uns noch kurz eine Info damit wir klären können ob du einen Haftpflicht- oder einen Kaskoschaden erlitten hast.
            </p>
            <div className="option-cards centered">
              <div
                className={`option-card ${formData.schuld === 'unfallgegner' ? 'selected' : ''}`}
                onClick={() => handleInputChange('schuld', 'unfallgegner')}
              >
                <h3>Mein Auto wurde beschädigt. Ich bin nicht schuld und kenne den Verursacher.</h3>
              </div>
              <div
                className={`option-card ${formData.schuld === 'selbst' ? 'selected' : ''}`}
                onClick={() => handleInputChange('schuld', 'selbst')}
              >
                <h3>Ich bin selbst schuld oder der Verursacher ist unbekannt.</h3>
              </div>
            </div>
            {errors.schuld && <p className="error">{errors.schuld}</p>}
            <div className="navigation-buttons">
              <button className="next-button" onClick={handleNext}>
                Weiter
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-container">
            <h2>Schritt 2 von 9 - Jetzt geht´s los</h2>
            <p className="step-description">
              Der SchadenCHECK ist für Dich kostenlos! Wir rechnen mit der Versicherung des Verursachers ab. Selbst wenn wir Dir nicht helfen können, kommen keine Kosten auf Dich zu.
            </p>
            <p className="step-description">
              0% Risiko – 100% Chance: Sollte dein Auto so stark beschädigt sein, dass anhand der Bilder keine Kalkulation möglich ist, helfen wir Dir mit einer Beratung weiter. So weißt Du genau was zu tun ist.
            </p>
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
      case 3:
        return (
          <div className="step-container">
            <h2>Schritt 3 von 9 - Gesamtansicht Vorne Rechts</h2>
            <p className="step-description">Bitte fotografiere das ganze Fahrzeug von vorne rechts.</p>
            <div className="example-image-container">
              <img src="/assets/images/vorne rechts.png" alt="Beispiel Gesamtansicht vorne rechts" className="example-image" />
            </div>
            <div className="file-upload">
              <input 
                type="file" 
                multiple 
                onChange={(e) => handleFileUpload(e, 'vorneRechts')} 
                accept="image/jpeg,image/png,image/jpg" 
              />
              {errors.bilder && <p className="error">{errors.bilder}</p>}
              {formData.bilder.vorneRechts && formData.bilder.vorneRechts.length > 0 && (
                <p className="success">✓ {formData.bilder.vorneRechts.length} Bild(er) hochgeladen</p>
              )}
            </div>
            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>Zurück</button>
              <button className="next-button" onClick={handleNext}>Weiter</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-container">
            <h2>Schritt 4 von 9 - Gesamtansicht Hinten Links</h2>
            <p className="step-description">Bitte fotografiere das ganze Fahrzeug von hinten links.</p>
            <div className="example-image-container">
              <img src="/assets/images/hinten links.png" alt="Beispiel Gesamtansicht hinten links" className="example-image" />
            </div>
            <div className="file-upload">
              <input 
                type="file" 
                multiple 
                onChange={(e) => handleFileUpload(e, 'hintenLinks')} 
                accept="image/jpeg,image/png,image/jpg" 
              />
              {errors.bilder && <p className="error">{errors.bilder}</p>}
              {formData.bilder.hintenLinks && formData.bilder.hintenLinks.length > 0 && (
                <p className="success">✓ {formData.bilder.hintenLinks.length} Bild(er) hochgeladen</p>
              )}
            </div>
            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>Zurück</button>
              <button className="next-button" onClick={handleNext}>Weiter</button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-container">
            <h2>Schritt 5 von 9 - Übersichtsbild Schadenbereich</h2>
            <p className="step-description">Fotografiere bitte aus mehreren Richtungen den Schadenbereich, so dass alle beschädigten Teile zu erkennen sind.</p>
            <div className="example-image-container">
              <img src="/assets/images/nahaufnahme schaden.png" alt="Beispiel Übersichtsbild Schadenbereich" className="example-image" />
            </div>
            <div className="file-upload">
              <input 
                type="file" 
                multiple 
                onChange={(e) => handleFileUpload(e, 'schadenBereich')} 
                accept="image/jpeg,image/png,image/jpg" 
              />
              {errors.bilder && <p className="error">{errors.bilder}</p>}
              {formData.bilder.schadenBereich && formData.bilder.schadenBereich.length > 0 && (
                <p className="success">✓ {formData.bilder.schadenBereich.length} Bild(er) hochgeladen</p>
              )}
            </div>
            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>Zurück</button>
              <button className="next-button" onClick={handleNext}>Weiter</button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="step-container">
            <h2>Schritt 6 von 9 - Detailbilder Schadenbereich</h2>
            <p className="step-description">Fotografiere nun bitte jedes beschädigte Teil einzeln.</p>
            <div className="example-image-container">
              <img src="/assets/images/nahaufnahmen schade 2.png" alt="Beispiel Detailbilder Schadenbereich" className="example-image" />
            </div>
            <div className="file-upload">
              <input 
                type="file" 
                multiple 
                onChange={(e) => handleFileUpload(e, 'detailBilder')} 
                accept="image/jpeg,image/png,image/jpg" 
              />
              {errors.bilder && <p className="error">{errors.bilder}</p>}
              {formData.bilder.detailBilder && formData.bilder.detailBilder.length > 0 && (
                <p className="success">✓ {formData.bilder.detailBilder.length} Bild(er) hochgeladen</p>
              )}
            </div>
            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>Zurück</button>
              <button className="next-button" onClick={handleNext}>Weiter</button>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="step-container">
            <h2>Schritt 7 von 9 - Kilometerstand</h2>
            <p className="step-description">Bitte fotografiere den aktuellen Gesamt-Kilometerstand.</p>
            <div className="example-image-container">
              <img src="/assets/images/Kilometerstand.png" alt="Beispiel Kilometerstand" className="example-image" />
            </div>
            <div className="file-upload">
              <input 
                type="file" 
                multiple 
                onChange={(e) => handleFileUpload(e, 'kilometerstand')} 
                accept="image/jpeg,image/png,image/jpg" 
              />
              {errors.bilder && <p className="error">{errors.bilder}</p>}
              {formData.bilder.kilometerstand && formData.bilder.kilometerstand.length > 0 && (
                <p className="success">✓ {formData.bilder.kilometerstand.length} Bild(er) hochgeladen</p>
              )}
            </div>
            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>Zurück</button>
              <button className="next-button" onClick={handleNext}>Weiter</button>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="step-container">
            <h2>Schritt 8 von 9 - Fahrzeugschein Vorderseite</h2>
            <p className="step-description">Fotografiere bitte den aufgeklappten Fahrzeugschein von vorne.</p>
            <div className="example-image-container">
              <img src="/assets/images/Fahrzeugpapiere.png" alt="Beispiel Fahrzeugschein" className="example-image" />
            </div>
            <div className="file-upload">
              <input 
                type="file" 
                multiple 
                onChange={(e) => handleFileUpload(e, 'fahrzeugschein')} 
                accept="image/jpeg,image/png,image/jpg" 
              />
              {errors.bilder && <p className="error">{errors.bilder}</p>}
              {formData.bilder.fahrzeugschein && formData.bilder.fahrzeugschein.length > 0 && (
                <p className="success">✓ {formData.bilder.fahrzeugschein.length} Bild(er) hochgeladen</p>
              )}
            </div>
            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>Zurück</button>
              <button className="next-button" onClick={handleNext}>Weiter</button>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="step-container">
            <h2>Schritt 9 von 9 - Kontaktdaten</h2>
            <p className="step-description">Fülle nun noch Deine Kontaktdaten aus, wir melden uns umgehend bei dir.</p>
            <div className="form-grid">
              {/* Alle Felder untereinander */}
              <div className="form-group">
                <input type="text" placeholder="Vorname*" value={formData.vorname} onChange={e => handleInputChange('vorname', e.target.value)} />
                <small className="input-description">Bitte gib Deinen Vornamen an.</small>
                {errors.vorname && <p className="error">{errors.vorname}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Nachname*" value={formData.nachname || ''} onChange={e => handleInputChange('nachname', e.target.value)} />
                <small className="input-description">Bitte gib Deinen Nachnamen an.</small>
                {errors.nachname && <p className="error">{errors.nachname}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Name*" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} />
                <small className="input-description">Trage hier Deinen vollständigen Namen ein.</small>
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Straße*" value={formData.strasse} onChange={e => handleInputChange('strasse', e.target.value)} />
                <small className="input-description">Straßenname Deiner Wohnadresse.</small>
                {errors.strasse && <p className="error">{errors.strasse}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Hausnummer*" value={formData.hausnummer} onChange={e => handleInputChange('hausnummer', e.target.value)} />
                <small className="input-description">Hausnummer Deiner Wohnadresse.</small>
                {errors.hausnummer && <p className="error">{errors.hausnummer}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="PLZ*" value={formData.plz} onChange={e => handleInputChange('plz', e.target.value)} />
                <small className="input-description">Postleitzahl Deines Wohnorts.</small>
                {errors.plz && <p className="error">{errors.plz}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Ort*" value={formData.ort} onChange={e => handleInputChange('ort', e.target.value)} />
                <small className="input-description">Wohnort (Stadt oder Gemeinde).</small>
                {errors.ort && <p className="error">{errors.ort}</p>}
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Telefon*" value={formData.telefonnummer} onChange={e => handleInputChange('telefonnummer', e.target.value)} />
                <small className="input-description">Deine Telefonnummer für Rückfragen.</small>
                {errors.telefonnummer && <p className="error">{errors.telefonnummer}</p>}
              </div>
              <div className="form-group">
                <input type="email" placeholder="E-Mail*" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} />
                <small className="input-description">Deine E-Mail-Adresse für die Kontaktaufnahme.</small>
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              {/* Fahrzeugdaten */}
              <div className="form-group">
                <input type="text" placeholder="Fahrzeugtyp*" value={formData.fahrzeugtyp || ''} onChange={e => handleInputChange('fahrzeugtyp', e.target.value)} />
                <small className="input-description">Beispiel: PKW, LKW, Motorrad etc.</small>
                {errors.fahrzeugtyp && <p className="error">{errors.fahrzeugtyp}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Marke*" value={formData.marke || ''} onChange={e => handleInputChange('marke', e.target.value)} />
                <small className="input-description">Fahrzeugmarke, z.B. VW, BMW, Mercedes.</small>
                {errors.marke && <p className="error">{errors.marke}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Modell*" value={formData.modell || ''} onChange={e => handleInputChange('modell', e.target.value)} />
                <small className="input-description">Fahrzeugmodell, z.B. Golf, C-Klasse.</small>
                {errors.modell && <p className="error">{errors.modell}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Baujahr*" value={formData.baujahr || ''} onChange={e => handleInputChange('baujahr', e.target.value)} />
                <small className="input-description">Baujahr des Fahrzeugs (z.B. 2018).</small>
                {errors.baujahr && <p className="error">{errors.baujahr}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Kennzeichen*" value={formData.kennzeichen || ''} onChange={e => handleInputChange('kennzeichen', e.target.value)} />
                <small className="input-description">Amtliches Kennzeichen des Fahrzeugs.</small>
                {errors.kennzeichen && <p className="error">{errors.kennzeichen}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Schadensart*" value={formData.schadensart || ''} onChange={e => handleInputChange('schadensart', e.target.value)} />
                <small className="input-description">Kurze Beschreibung der Schadensart (z.B. Unfallschaden, Hagelschaden).</small>
                {errors.schadensart && <p className="error">{errors.schadensart}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Schadensbeschreibung*" value={formData.schadensbeschreibung || ''} onChange={e => handleInputChange('schadensbeschreibung', e.target.value)} />
                <small className="input-description">Bitte beschreibe den Schaden möglichst genau.</small>
                {errors.schadensbeschreibung && <p className="error">{errors.schadensbeschreibung}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Versicherung*" value={formData.versicherung || ''} onChange={e => handleInputChange('versicherung', e.target.value)} />
                <small className="input-description">Name Deiner Versicherungsgesellschaft.</small>
                {errors.versicherung && <p className="error">{errors.versicherung}</p>}
              </div>
              <div className="form-group">
                <input type="text" placeholder="Versicherungsnummer*" value={formData.versicherungsnummer || ''} onChange={e => handleInputChange('versicherungsnummer', e.target.value)} />
                <small className="input-description">Deine Versicherungsnummer (falls vorhanden).</small>
                {errors.versicherungsnummer && <p className="error">{errors.versicherungsnummer}</p>}
              </div>
              {/* Datenschutz */}
              <div className="form-group checkbox-group">
                <input type="checkbox" id="datenschutz" checked={formData.datenschutz} onChange={e => handleInputChange('datenschutz', e.target.checked)} />
                <label htmlFor="datenschutz">Ich bin mit den Datenschutzbestimmungen einverstanden.</label>
                <small className="input-description">Bitte bestätige, dass Du unsere Datenschutzbestimmungen gelesen hast.</small>
                {errors.datenschutz && <p className="error">{errors.datenschutz}</p>}
              </div>
            </div>
            <div className="file-upload">
              <h3>Weitere Bilder oder Dokumente</h3>
              <p>Ziehe Dateien hier her oder</p>
              <p className="upload-hint">Etwa Schreiben der Versicherung, Fotos des Unfalls, Polizeiakte</p>
              <input 
                type="file" 
                multiple 
                onChange={(e) => handleFileUpload(e, 'zusatzDokumente')} 
                accept="image/*,.pdf" 
              />
            </div>
            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>Zurück</button>
              <button className="next-button" onClick={handleNext}>Absenden</button>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="thankyou-container">
            <h2>Vielen Dank für deine Anfrage!</h2>
            <p className="thankyou-hint">Bitte prüfe dein E-Mail Postfach.</p>
            <p>Wir haben deine Anfrage erfolgreich erhalten. Unsere Gutachter werden sich schnellstmöglich mit dir in Verbindung setzen und dich über das weitere Vorgehen informieren.</p>
            <div className="thankyou-divider" />
            <h3>Wie geht es weiter?</h3>
            <p>Wir prüfen deine Unterlagen und melden uns telefonisch oder per E-Mail bei dir, um die nächsten Schritte zu besprechen.</p>
            <div className="bussgeldcheck-box">
              <p>Du hast Fragen? Unser Team hilft dir gerne weiter:</p>
              <button className="bussgeldcheck-button" onClick={() => window.open('mailto:info@rechtly.de', '_blank')}>Kontakt aufnehmen</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <KfzGutachtenAnfrageBanner />
      <div className="kfz-gutachten-container">
        {currentStep <= 9 && renderProgressBar()}
        {renderStep()}
      </div>
    </>
  );
};

export default KfzGutachtenAnfrage; 