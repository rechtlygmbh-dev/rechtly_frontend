import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import VerkehrsunfallAnfrageBanner from './VerkehrsunfallAnfrageBanner';
import './VerkehrsunfallAnfrage.css';

// API URL basierend auf der Umgebung - für Produktionsumgebung relativer Pfad
const BASE_URL = '/api/upload';  // Immer relativer Pfad, wird vom Webserver weitergeleitet

const VerkehrsunfallAnfrage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    unfallverursacher: '',
    unfallDatum: '',
    unfallZeit: '',
    strasse: '',
    plz: '',
    weitereAngaben: '',
    unfallhergang: '',
    reaktion: {
      gebremst: false,
      ausgewichen: false,
      keineReaktion: false
    },
    verkehrszeichen: {
      ampel: false,
      verkehrsschild: false,
      keine: false
    },
    bilder: [],
    fahrzeugDetails: {
      markeModell: '',
      kennzeichen: '',
      farbe: '',
      erstzulassung: '',
      weitereSchaeden: ''
    },
    polizei: {
      verstaendigt: '',
      polizeibericht: []
    },
    zeugen: {
      vorhanden: '',
      details: ''
    },
    personenschaden: '',
    rettungsdienst: '',
    dsgvoEinwilligung: false,
    anwaltEinwilligung: false,
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    ort: ''
  });

  const [errors, setErrors] = useState({});
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Definiere die Schritte für die Progressbar
  const steps = [
    'Verursacher',
    'Zeitpunkt',
    'Ort',
    'Hergang',
    'Reaktion',
    'Verkehr',
    'Bilder',
    'Fahrzeug',
    'Polizei',
    'Zeugen',
    'Verletzte',
    'Rettung',
    'Prüfung',
    'Einwilligung'
  ];

  // Render Progressbar Funktion
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

  const handleInputChange = (field, value) => {
    if (typeof field === 'object') {
      setFormData(prev => ({
        ...prev,
        [field.section]: {
          ...prev[field.section],
          [field.field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  const handleCheckboxChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const uploadFiles = async (files) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('dokumentTyp', 'VERKEHRSUNFALL');
      formData.append('name', formData.kontakt?.name || '');
      formData.append('email', formData.kontakt?.email || '');
      formData.append('telefon', formData.kontakt?.telefon || '');
      
      files.forEach(file => {
        formData.append('files', file);
      });

      console.log('Starte Upload...', {
        url: BASE_URL,
        files: files.map(f => ({ name: f.name, type: f.type, size: f.size }))
      });

      const response = await fetch(BASE_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('Response erhalten:', {
        status: response.status,
        statusText: response.statusText
      });

      let data;
      const textResponse = await response.text();
      console.log('Raw Response:', textResponse);

      try {
        data = JSON.parse(textResponse);
        console.log('Parsed Response:', data);
      } catch (parseError) {
        console.error('JSON Parse Error:', {
          error: parseError,
          responseText: textResponse.substring(0, 200) + '...'
        });
        throw new Error('Fehler beim Verarbeiten der Server-Antwort');
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || 'Upload fehlgeschlagen');
      }

      // Aktualisiere den State mit den neuen Bildern
      setFormData(prev => ({
        ...prev,
        bilder: [
          ...(prev.bilder || []),
          ...data.files.map(file => ({
            id: file.id,
            name: file.originalname,
            path: file.path,
            preview: file.path.startsWith('/') ? file.path : `/${file.path}`
          }))
        ]
      }));

      // Speichere die Anfrage-ID für spätere Verwendung
      if (data.anfrageId) {
        setFormData(prev => ({
          ...prev,
          anfrageId: data.anfrageId
        }));
      }

      setUploadProgress(100);
      setErrors(prev => ({ ...prev, bilder: '' }));
    } catch (error) {
      console.error('Upload-Fehler:', error);
      setErrors(prev => ({
        ...prev,
        bilder: `Fehler beim Upload: ${error.message}`
      }));
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const newFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (newFiles.length > 0) {
      await uploadFiles(newFiles);
    } else {
      setErrors(prev => ({
        ...prev,
        bilder: 'Bitte nur Bilder hochladen.'
      }));
    }
  };

  const handleFileUpload = async (event) => {
    const newFiles = Array.from(event.target.files).filter(file => file.type.startsWith('image/'));
    if (newFiles.length === 0) {
      setErrors(prev => ({
        ...prev,
        bilder: 'Keine gültigen Bilddateien ausgewählt.'
      }));
      return;
    }
    await uploadFiles(newFiles);
    event.target.value = ''; // Reset file input
  };

  const handleRemoveFile = async (indexToRemove) => {
    const fileToRemove = formData.bilder[indexToRemove];
    
    try {
      if (fileToRemove.id) {
        const response = await fetch(`/api/upload/${fileToRemove.id}`, {
          method: 'DELETE',
          credentials: 'same-origin'
        });
        
        if (!response.ok) {
          throw new Error('Fehler beim Löschen der Datei');
        }
      }

      setFormData(prev => ({
        ...prev,
        bilder: prev.bilder.filter((_, index) => index !== indexToRemove)
      }));
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        bilder: `Fehler beim Löschen: ${error.message}`
      }));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const validateStep = () => {
    const newErrors = {};
    switch (currentStep) {
      case 1:
        if (!formData.unfallverursacher) {
          newErrors.unfallverursacher = 'Bitte wählen Sie den Unfallverursacher aus.';
        }
        break;
      case 2:
        if (!formData.unfallDatum) {
          newErrors.unfallDatum = 'Bitte geben Sie das Unfalldatum an.';
        }
        if (!formData.unfallZeit) {
          newErrors.unfallZeit = 'Bitte geben Sie die Unfallzeit an.';
        }
        break;
      case 3:
        if (!formData.strasse) {
          newErrors.strasse = 'Bitte geben Sie die Straße an.';
        }
        if (!formData.plz) {
          newErrors.plz = 'Bitte geben Sie die Postleitzahl an.';
        }
        break;
      case 4:
        if (!formData.unfallhergang) {
          newErrors.unfallhergang = 'Bitte beschreiben Sie den Unfallhergang...';
        }
        break;
      case 5:
        if (!formData.reaktion.gebremst && !formData.reaktion.ausgewichen && !formData.reaktion.keineReaktion) {
          newErrors.reaktion = 'Bitte wählen Sie eine Reaktion aus.';
        }
        break;
      case 6:
        if (!formData.verkehrszeichen.ampel && !formData.verkehrszeichen.verkehrsschild && !formData.verkehrszeichen.keine) {
          newErrors.verkehrszeichen = 'Bitte wählen Sie mindestens ein Verkehrszeichen oder Ampel aus.';
        }
        break;
      case 7:
        if (formData.bilder.length === 0) {
          newErrors.bilder = 'Bitte laden Sie Bilder vom Unfallort oder Schaden hoch.';
        }
        break;
      case 8:
        if (!formData.fahrzeugDetails.markeModell || !formData.fahrzeugDetails.kennzeichen || !formData.fahrzeugDetails.farbe) {
          newErrors.fahrzeugDetails = 'Bitte geben Sie alle Fahrzeugdaten an.';
        }
        break;
      case 9:
        if (!formData.polizei.verstaendigt) {
          newErrors.polizei = 'Bitte geben Sie an, ob die Polizei verständigt wurde.';
        }
        break;
      case 10:
        if (!formData.zeugen.vorhanden) {
          newErrors.zeugen = 'Bitte geben Sie an, ob Zeugen vor Ort waren.';
        }
        break;
      case 11:
        if (!formData.personenschaden) {
          newErrors.personenschaden = 'Bitte geben Sie an, ob verletzte Personen existieren.';
        }
        break;
      case 12:
        if (!formData.rettungsdienst) {
          newErrors.rettungsdienst = 'Bitte geben Sie an, ob ein Rettungsdienst verständigt wurde.';
        }
        break;
      case 13:
        // Remove validation for case 13 to allow transition to case 14
        break;
      case 14:
        if (!formData.dsgvoEinwilligung || !formData.anwaltEinwilligung) {
          newErrors.dsgvoEinwilligung = 'Bitte stimmen Sie der DSGVO-konformen Datenverarbeitung zu.';
          newErrors.anwaltEinwilligung = 'Bitte stimmen Sie der Weiterleitung an einen Anwalt oder Sachverständigen zu.';
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      // Validiere die Pflichtfelder
      const errors = {};
      if (!formData.unfallverursacher) errors.unfallverursacher = 'Bitte wählen Sie den Unfallverursacher aus.';
      if (!formData.unfallDatum) errors.unfallDatum = 'Bitte geben Sie das Unfalldatum an.';
      if (!formData.unfallZeit) errors.unfallZeit = 'Bitte geben Sie die Unfallzeit an.';
      if (!formData.strasse) errors.strasse = 'Bitte geben Sie die Straße an.';
      if (!formData.plz) errors.plz = 'Bitte geben Sie die PLZ an.';
      if (!formData.unfallhergang) errors.unfallhergang = 'Bitte beschreiben Sie den Unfallhergang.';
      if (!formData.bilder || formData.bilder.length === 0) errors.bilder = 'Bitte laden Sie mindestens ein Bild hoch.';
      if (!formData.fahrzeugDetails.markeModell) errors.fahrzeugDetails = 'Bitte geben Sie die Fahrzeugdaten an.';
      if (!formData.dsgvoEinwilligung) errors.dsgvoEinwilligung = 'Bitte stimmen Sie der Datenschutzerklärung zu.';
      if (!formData.anwaltEinwilligung) errors.anwaltEinwilligung = 'Bitte stimmen Sie der Beauftragung zu.';

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      // Nur relevante Felder für Bilder/Dokumente an das Backend schicken
      const bilderClean = (formData.bilder || []).map(bild => ({
        id: bild.id,
        name: bild.name,
        path: bild.path
      }));

      // Sende die Anfrage an den Server
      const response = await fetch('/api/anfrage/verkehrsunfall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          bilder: bilderClean
        })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.details || 'Fehler beim Senden der Anfrage');
      }

      // Zeige die Erfolgsmeldung
      setCurrentStep(steps.length + 1); // Zeige die "Danke"-Seite
    } catch (error) {
      console.error('Fehler beim Senden der Anfrage:', error);
      setErrors(prev => ({
        ...prev,
        submit: `Fehler beim Senden: ${error.message}`
      }));
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-container">
            <h2>🧭 Wer war Ihrer Meinung nach der Unfallverursacher?</h2>
            <div className="option-cards">
              <div
                className={`option-card ${formData.unfallverursacher === 'ich' ? 'selected' : ''}`}
                onClick={() => handleInputChange('unfallverursacher', 'ich')}
              >
                <h3>Ich war es</h3>
              </div>
              <div
                className={`option-card ${formData.unfallverursacher === 'ungeklaert' ? 'selected' : ''}`}
                onClick={() => handleInputChange('unfallverursacher', 'ungeklaert')}
              >
                <h3>Noch nicht geklärt</h3>
              </div>
              <div
                className={`option-card ${formData.unfallverursacher === 'gegenseite' ? 'selected' : ''}`}
                onClick={() => handleInputChange('unfallverursacher', 'gegenseite')}
              >
                <h3>Die Gegenseite</h3>
              </div>
            </div>
            {errors.unfallverursacher && <p className="error">{errors.unfallverursacher}</p>}
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
            <h2>📅 Wann ist der Unfall passiert?</h2>
            <div className="form-group">
              <label>Datum</label>
              <input
                type="date"
                value={formData.unfallDatum}
                onChange={(e) => handleInputChange('unfallDatum', e.target.value)}
              />
              {errors.unfallDatum && <p className="error">{errors.unfallDatum}</p>}
            </div>
            <div className="form-group">
              <label>Uhrzeit</label>
              <input
                type="time"
                value={formData.unfallZeit}
                onChange={(e) => handleInputChange('unfallZeit', e.target.value)}
              />
              {errors.unfallZeit && <p className="error">{errors.unfallZeit}</p>}
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

      case 3:
        return (
          <div className="step-container">
            <h2>📍 Wo hat sich der Unfall ereignet?</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="Straße"
                value={formData.strasse}
                onChange={(e) => handleInputChange('strasse', e.target.value)}
              />
              {errors.strasse && <p className="error">{errors.strasse}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Postleitzahl"
                value={formData.plz}
                onChange={(e) => handleInputChange('plz', e.target.value)}
              />
              {errors.plz && <p className="error">{errors.plz}</p>}
            </div>
            <div className="form-group">
              <textarea
                placeholder="Weitere Angaben (z.B. Autobahnnummer, Fahrspur, Bundesland)"
                value={formData.weitereAngaben}
                onChange={(e) => handleInputChange('weitereAngaben', e.target.value)}
              />
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
            <h2>🛠️ Wie ist der Unfall abgelaufen?</h2>
            <div className="form-group">
              <textarea
                placeholder="Bitte beschreiben Sie den Unfallhergang..."
                value={formData.unfallhergang}
                onChange={(e) => handleInputChange('unfallhergang', e.target.value)}
                rows="6"
              />
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

      case 5:
        return (
          <div className="step-container">
            <h2>🚗 Gab es eine Reaktion vor dem Aufprall?</h2>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.reaktion.gebremst}
                  onChange={(e) => handleCheckboxChange('reaktion', 'gebremst', e.target.checked)}
                />
                Ich habe gebremst
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.reaktion.ausgewichen}
                  onChange={(e) => handleCheckboxChange('reaktion', 'ausgewichen', e.target.checked)}
                />
                Ich bin ausgewichen
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.reaktion.keineReaktion}
                  onChange={(e) => handleCheckboxChange('reaktion', 'keineReaktion', e.target.checked)}
                />
                Keines von beidem
              </label>
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

      case 6:
        return (
          <div className="step-container">
            <h2>🚦 Waren Verkehrszeichen oder Ampeln beteiligt?</h2>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.verkehrszeichen.ampel}
                  onChange={(e) => handleCheckboxChange('verkehrszeichen', 'ampel', e.target.checked)}
                />
                Ja, Ampel war relevant
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.verkehrszeichen.verkehrsschild}
                  onChange={(e) => handleCheckboxChange('verkehrszeichen', 'verkehrsschild', e.target.checked)}
                />
                Ja, ein Verkehrsschild war relevant
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.verkehrszeichen.keine}
                  onChange={(e) => handleCheckboxChange('verkehrszeichen', 'keine', e.target.checked)}
                />
                Nein
              </label>
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

      case 7:
        return (
          <div className="step-container">
            <h2>📸 Bitte laden Sie Bilder vom Unfallort oder Schaden hoch</h2>
            <div 
              className={`file-upload-container ${dragActive ? "drag-active" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              <div className="upload-content">
                <p>Ziehen Sie Bilder hierher oder</p>
                <button 
                  type="button" 
                  className="upload-button"
                  onClick={handleButtonClick}
                  disabled={isUploading}
                >
                  {isUploading ? 'Upload läuft...' : 'Klicken Sie zum Auswählen'}
                </button>
                <p className="upload-hint">Sie können auch mehrere Bilder nacheinander hochladen</p>
              </div>

              {isUploading && (
                <div className="upload-progress">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                  <p>{uploadProgress}% hochgeladen</p>
                </div>
              )}

              {errors.bilder && (
                <p className="error">{errors.bilder}</p>
              )}
              
              {formData.bilder && formData.bilder.length > 0 && (
                <div className="uploaded-files">
                  <h4>Hochgeladene Bilder:</h4>
                  <div className="image-preview-grid">
                    {formData.bilder.map((file, idx) => (
                      <div key={idx} className="image-preview-item">
                        <img 
                          src={file.preview || file.url} 
                          alt={`Vorschau ${idx + 1}`}
                          className="image-preview"
                        />
                        <button
                          type="button"
                          className="remove-image-button"
                          onClick={() => handleRemoveFile(idx)}
                          title="Bild entfernen"
                        >
                          ✕
                        </button>
                        <p className="image-name">{file.originalName || file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>
                Zurück
              </button>
              <button 
                className="next-button" 
                onClick={handleNext}
                disabled={!formData.bilder || formData.bilder.length === 0}
              >
                Weiter
              </button>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="step-container">
            <h2>🚙 Fahrzeugdaten erfassen</h2>
            <div className="form-row">
              <div className="form-group half-width">
                <input
                  type="text"
                  placeholder="Marke & Modell"
                  value={formData.fahrzeugDetails.markeModell}
                  onChange={(e) => handleInputChange({ section: 'fahrzeugDetails', field: 'markeModell' }, e.target.value)}
                />
              </div>
              <div className="form-group half-width">
                <input
                  type="text"
                  placeholder="Kennzeichen"
                  value={formData.fahrzeugDetails.kennzeichen}
                  onChange={(e) => handleInputChange({ section: 'fahrzeugDetails', field: 'kennzeichen' }, e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group half-width">
                <input
                  type="text"
                  placeholder="Farbe"
                  value={formData.fahrzeugDetails.farbe}
                  onChange={(e) => handleInputChange({ section: 'fahrzeugDetails', field: 'farbe' }, e.target.value)}
                />
              </div>
              <div className="form-group half-width">
                <input
                  type="month"
                  placeholder="Erstzulassung"
                  value={formData.fahrzeugDetails.erstzulassung}
                  onChange={(e) => handleInputChange({ section: 'fahrzeugDetails', field: 'erstzulassung' }, e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                placeholder="Weitere Schäden am Fahrzeug?"
                value={formData.fahrzeugDetails.weitereSchaeden}
                onChange={(e) => handleInputChange({ section: 'fahrzeugDetails', field: 'weitereSchaeden' }, e.target.value)}
                rows="4"
              />
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

      case 9:
        return (
          <div className="step-container">
            <h2>👮 Wurde die Polizei verständigt?</h2>
            <div className="option-cards centered">
              <div
                className={`option-card ${formData.polizei.verstaendigt === 'ja' ? 'selected' : ''}`}
                onClick={() => handleInputChange({ section: 'polizei', field: 'verstaendigt' }, 'ja')}
              >
                <h3>Ja</h3>
              </div>
              <div
                className={`option-card ${formData.polizei.verstaendigt === 'nein' ? 'selected' : ''}`}
                onClick={() => handleInputChange({ section: 'polizei', field: 'verstaendigt' }, 'nein')}
              >
                <h3>Nein</h3>
              </div>
            </div>
            {formData.polizei.verstaendigt === 'ja' && (
              <div className="file-upload centered-content">
                <h3>Polizeibericht hochladen</h3>
                <div className="upload-content">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'polizei.polizeibericht')}
                    accept="image/*,.pdf"
                  />
                </div>
              </div>
            )}
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

      case 10:
        return (
          <div className="step-container">
            <h2>👁️‍🗨️ Gab es Zeugen vor Ort?</h2>
            <div className="option-cards centered">
              <div
                className={`option-card ${formData.zeugen.vorhanden === 'ja' ? 'selected' : ''}`}
                onClick={() => handleInputChange({ section: 'zeugen', field: 'vorhanden' }, 'ja')}
              >
                <h3>Ja</h3>
              </div>
              <div
                className={`option-card ${formData.zeugen.vorhanden === 'nein' ? 'selected' : ''}`}
                onClick={() => handleInputChange({ section: 'zeugen', field: 'vorhanden' }, 'nein')}
              >
                <h3>Nein</h3>
              </div>
            </div>
            {formData.zeugen.vorhanden === 'ja' && (
              <div className="form-group centered-content">
                <h3>Kontaktdaten der Zeugen</h3>
                <textarea
                  placeholder="Name, Telefonnummer und E-Mail der Zeugen"
                  value={formData.zeugen.details}
                  onChange={(e) => handleInputChange({ section: 'zeugen', field: 'details' }, e.target.value)}
                  rows="4"
                  className="witness-textarea"
                />
              </div>
            )}
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

      case 11:
        return (
          <div className="step-container">
            <h2>🚑 Gab es verletzte Personen?</h2>
            <div className="option-cards centered">
              <div
                className={`option-card ${formData.personenschaden === 'ja' ? 'selected' : ''}`}
                onClick={() => handleInputChange('personenschaden', 'ja')}
              >
                <h3>Ja</h3>
              </div>
              <div
                className={`option-card ${formData.personenschaden === 'nein' ? 'selected' : ''}`}
                onClick={() => handleInputChange('personenschaden', 'nein')}
              >
                <h3>Nein</h3>
              </div>
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

      case 12:
        return (
          <div className="step-container">
            <h2>🆘 Wurde ein Rettungsdienst verständigt?</h2>
            <div className="option-cards centered">
              <div
                className={`option-card ${formData.rettungsdienst === 'ja' ? 'selected' : ''}`}
                onClick={() => handleInputChange('rettungsdienst', 'ja')}
              >
                <h3>Ja</h3>
              </div>
              <div
                className={`option-card ${formData.rettungsdienst === 'nein' ? 'selected' : ''}`}
                onClick={() => handleInputChange('rettungsdienst', 'nein')}
              >
                <h3>Nein</h3>
              </div>
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

      case 13:
        return (
          <div className="step-container">
            <h2>📄 Bitte prüfen Sie Ihre Angaben</h2>
            <div className="summary-container">
              <div className="summary-section">
                <h3>🧭 Unfallverursacher</h3>
                <p>{formData.unfallverursacher === 'ich' ? 'Ich war es' : 
                    formData.unfallverursacher === 'ungeklaert' ? 'Noch nicht geklärt' : 
                    'Die Gegenseite'}</p>
              </div>

              <div className="summary-section">
                <h3>📅 Unfallzeitpunkt</h3>
                <p>Datum: {formData.unfallDatum}</p>
                <p>Uhrzeit: {formData.unfallZeit}</p>
              </div>

              <div className="summary-section">
                <h3>📍 Unfallort</h3>
                <p>Straße: {formData.strasse}</p>
                <p>PLZ: {formData.plz}</p>
                {formData.weitereAngaben && <p>Weitere Angaben: {formData.weitereAngaben}</p>}
              </div>

              <div className="summary-section">
                <h3>🛠️ Unfallhergang</h3>
                <p>{formData.unfallhergang}</p>
              </div>

              <div className="summary-section">
                <h3>🚗 Reaktion vor dem Aufprall</h3>
                <ul>
                  {formData.reaktion.gebremst && <li>Gebremst</li>}
                  {formData.reaktion.ausgewichen && <li>Ausgewichen</li>}
                  {formData.reaktion.keineReaktion && <li>Keine Reaktion</li>}
                </ul>
              </div>

              <div className="summary-section">
                <h3>🚦 Verkehrszeichen/Ampeln</h3>
                <ul>
                  {formData.verkehrszeichen.ampel && <li>Ampel war relevant</li>}
                  {formData.verkehrszeichen.verkehrsschild && <li>Verkehrsschild war relevant</li>}
                  {formData.verkehrszeichen.keine && <li>Keine Verkehrszeichen relevant</li>}
                </ul>
              </div>

              <div className="summary-section">
                <h3>📸 Hochgeladene Bilder</h3>
                <p>{formData.bilder.length} Bilder hochgeladen</p>
              </div>

              <div className="summary-section">
                <h3>🚙 Fahrzeugdaten</h3>
                <p>Marke & Modell: {formData.fahrzeugDetails.markeModell}</p>
                <p>Kennzeichen: {formData.fahrzeugDetails.kennzeichen}</p>
                <p>Farbe: {formData.fahrzeugDetails.farbe}</p>
                <p>Erstzulassung: {formData.fahrzeugDetails.erstzulassung}</p>
                {formData.fahrzeugDetails.weitereSchaeden && (
                  <p>Weitere Schäden: {formData.fahrzeugDetails.weitereSchaeden}</p>
                )}
              </div>

              <div className="summary-section">
                <h3>👮 Polizei</h3>
                <p>Polizei verständigt: {formData.polizei.verstaendigt === 'ja' ? 'Ja' : 'Nein'}</p>
                {formData.polizei.verstaendigt === 'ja' && formData.polizei.polizeibericht.length > 0 && (
                  <p>Polizeibericht wurde hochgeladen</p>
                )}
              </div>

              <div className="summary-section">
                <h3>👁️‍🗨️ Zeugen</h3>
                <p>Zeugen vorhanden: {formData.zeugen.vorhanden === 'ja' ? 'Ja' : 'Nein'}</p>
                {formData.zeugen.vorhanden === 'ja' && formData.zeugen.details && (
                  <p>Zeugendetails: {formData.zeugen.details}</p>
                )}
              </div>

              <div className="summary-section">
                <h3>🚑 Personenschaden & Rettungsdienst</h3>
                <p>Verletzte Personen: {formData.personenschaden === 'ja' ? 'Ja' : 'Nein'}</p>
                <p>Rettungsdienst verständigt: {formData.rettungsdienst === 'ja' ? 'Ja' : 'Nein'}</p>
              </div>
            </div>

            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>
                Angaben ändern
              </button>
              <button className="next-button" onClick={handleNext}>
                Angaben bestätigen
              </button>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="step-container">
            <h2>🔐 Datenschutz & Weiterleitung</h2>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.dsgvoEinwilligung}
                  onChange={() => handleInputChange('dsgvoEinwilligung', !formData.dsgvoEinwilligung)}
                />
                Ich stimme der DSGVO-konformen Datenverarbeitung zu.
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.anwaltEinwilligung}
                  onChange={() => handleInputChange('anwaltEinwilligung', !formData.anwaltEinwilligung)}
                />
                Ich stimme der Weiterleitung an einen Anwalt oder Sachverständigen zu.
              </label>
            </div>

            {/* Kontaktformular */}
            <div className="form-group">
              <label>Vorname *</label>
              <input
                type="text"
                value={formData.vorname || ''}
                onChange={e => handleInputChange('vorname', e.target.value)}
                placeholder="Vorname"
              />
              {errors.vorname && <p className="error">{errors.vorname}</p>}
            </div>
            <div className="form-group">
              <label>Nachname *</label>
              <input
                type="text"
                value={formData.nachname || ''}
                onChange={e => handleInputChange('nachname', e.target.value)}
                placeholder="Nachname"
              />
              {errors.nachname && <p className="error">{errors.nachname}</p>}
            </div>
            <div className="form-group">
              <label>Straße & Hausnummer *</label>
              <input
                type="text"
                value={formData.strasse || ''}
                onChange={e => handleInputChange('strasse', e.target.value)}
                placeholder="Straße und Hausnummer"
              />
              {errors.strasse && <p className="error">{errors.strasse}</p>}
            </div>
            <div className="form-group">
              <label>PLZ *</label>
              <input
                type="text"
                value={formData.plz || ''}
                onChange={e => handleInputChange('plz', e.target.value)}
                placeholder="Postleitzahl"
              />
              {errors.plz && <p className="error">{errors.plz}</p>}
            </div>
            <div className="form-group">
              <label>Ort *</label>
              <input
                type="text"
                value={formData.ort || ''}
                onChange={e => handleInputChange('ort', e.target.value)}
                placeholder="Ort"
              />
              {errors.ort && <p className="error">{errors.ort}</p>}
            </div>
            <div className="form-group">
              <label>E-Mail *</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="E-Mail-Adresse"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label>Telefonnummer *</label>
              <input
                type="tel"
                value={formData.telefon || ''}
                onChange={e => handleInputChange('telefon', e.target.value)}
                placeholder="Telefonnummer"
              />
              {errors.telefon && <p className="error">{errors.telefon}</p>}
            </div>

            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBack}>
                Zurück
              </button>
              <button className="next-button" onClick={handleSubmit}>
                Jetzt absenden
              </button>
            </div>
          </div>
        );

      case 15:
        return (
          <div className="thankyou-container">
            <h2>Vielen Dank für Ihre Anfrage!</h2>
            <p className="thankyou-hint">Bitte prüfen Sie Ihr E-Mail-Postfach.</p>
            <p>Wir haben Ihre Unfallmeldung erfolgreich erhalten und Ihnen eine Bestätigung per E-Mail geschickt. Unser Team prüft Ihre Angaben und meldet sich schnellstmöglich bei Ihnen.</p>
            <div className="thankyou-divider" />
            <h3>Sie haben auch ein Bußgeld erhalten?</h3>
            <p>Nutzen Sie unseren kostenlosen Bußgeld-Check!</p>
            <div className="bussgeldcheck-box">
              <p>Jetzt <strong>Bußgeld prüfen lassen</strong>:</p>
              <button className="bussgeldcheck-button" onClick={() => window.open('/anfrage/bussgeldanfrage', '_blank')}>Bußgeld prüfen</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <VerkehrsunfallAnfrageBanner />
      <div className="verkehrsunfall-container">
        {currentStep < 15 && renderProgressBar()}
        {renderStep()}
      </div>
    </>
  );
};

export default VerkehrsunfallAnfrage; 