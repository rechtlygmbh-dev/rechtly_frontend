// Get the API URL from environment variables
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://rechtly-backend.onrender.com'
  : process.env.REACT_APP_API_URL || 'http://localhost:5000';

const handleAbsenden = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  try {
    // Formatiere die Daten für das Backend
    const backendData = {
      anfrageTyp: 'verkehrsunfall',
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
      verkehrsunfall: {
        unfallverursacher: formData.unfall.verursacher,
        unfallDatum: formData.unfall.datum,
        unfallZeit: formData.unfall.zeit,
        unfallort: {
          strasse: formData.unfall.strasse,
          plz: formData.unfall.plz,
          weitereAngaben: formData.unfall.weitereAngaben
        },
        unfallhergang: formData.unfall.hergang,
        reaktion: {
          gebremst: formData.unfall.reaktion === 'gebremst',
          ausgewichen: formData.unfall.reaktion === 'ausgewichen',
          keineReaktion: formData.unfall.reaktion === 'keine'
        },
        verkehrszeichen: {
          ampel: formData.unfall.verkehrszeichen === 'ampel',
          verkehrsschild: formData.unfall.verkehrszeichen === 'schild',
          keine: formData.unfall.verkehrszeichen === 'keine'
        },
        fahrzeugDetails: {
          markeModell: formData.unfall.fahrzeug.markeModell,
          kennzeichen: formData.unfall.fahrzeug.kennzeichen,
          farbe: formData.unfall.fahrzeug.farbe,
          erstzulassung: formData.unfall.fahrzeug.erstzulassung,
          weitereSchaeden: formData.unfall.fahrzeug.weitereSchaeden
        },
        polizei: {
          verstaendigt: formData.unfall.polizei.verstaendigt,
          polizeibericht: formData.unfall.polizei.bericht
        },
        zeugen: {
          vorhanden: formData.unfall.zeugen.vorhanden,
          details: formData.unfall.zeugen.details
        },
        personenschaden: formData.unfall.personenschaden,
        rettungsdienst: formData.unfall.rettungsdienst
      },
      dokumente: formData.unfall.dokumente ? formData.unfall.dokumente.map(doc => ({
        id: doc.id || Math.random().toString(36).substr(2, 9),
        name: typeof doc === 'string' ? doc : doc.name,
        path: typeof doc === 'string' ? doc : doc.path
      })) : [],
      datenschutz: true,
      anwaltEinwilligung: true
    };

    console.log('Sende Daten:', backendData); // Debug-Log

    const response = await fetch(`${API_URL}/api/anfrage`, {
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