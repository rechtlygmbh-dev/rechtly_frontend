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
      anfrageTyp: 'kfz-gutachten',
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
      kfzGutachten: {
        fahrzeugTyp: formData.fahrzeug.typ,
        marke: formData.fahrzeug.marke,
        modell: formData.fahrzeug.modell,
        baujahr: formData.fahrzeug.baujahr,
        kennzeichen: formData.fahrzeug.kennzeichen,
        schadensart: formData.fahrzeug.schadensart,
        schadensbeschreibung: formData.fahrzeug.schadensbeschreibung,
        versicherung: {
          name: formData.versicherung.name,
          versicherungsnummer: formData.versicherung.nummer
        }
      },
      dokumente: formData.fahrzeug.dokumente ? formData.fahrzeug.dokumente.map(doc => ({
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