const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    // Formularvalidierung
    if (!validateForm()) {
      return;
    }

    // Dokumente hochladen
    const uploadedDocs = await Promise.all(
      selectedFiles.map(file => uploadDocument(file))
    );

    // Formulardaten vorbereiten
    const formData = {
      anfrageTyp: 'bussgeld',
      anrede: form.anrede,
      titel: form.titel,
      vorname: form.vorname,
      nachname: form.nachname,
      email: form.email,
      telefon: form.telefon,
      strasse: form.strasse,
      hausnummer: form.hausnummer,
      plz: form.plz,
      ort: form.ort,
      bussgeld: {
        vorwurf: form.vorwurf,
        fahrzeugTyp: form.fahrzeugTyp,
        punktestand: form.punktestand,
        probezeit: form.probezeit,
        schreiben: form.schreiben,
        kostenuebernahme: form.kostenuebernahme,
        aktenzeichen: form.aktenzeichen,
        zustellungsdatum: form.zustellungsdatum,
        behoerde: form.behoerde,
        kennzeichen: form.kennzeichen
      },
      dokumente: uploadedDocs,
      datenschutz: form.datenschutz,
      anwaltEinwilligung: form.anwaltEinwilligung
    };

    // Anfrage senden
    const response = await fetch('/api/anfrage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.details || data.error || 'Ein Fehler ist aufgetreten');
    }

    // Erfolgsmeldung anzeigen
    setSnackbar({
      open: true,
      message: 'Vielen Dank für deine Anfrage! Bitte prüfe dein E-Mail Postfach.',
      severity: 'success'
    });

    // Formular zurücksetzen
    resetForm();
    setSelectedFiles([]);
    setCurrentStep(1);

  } catch (err) {
    console.error('Fehler beim Absenden:', err);
    setError(err.message);
    setSnackbar({
      open: true,
      message: err.message,
      severity: 'error'
    });
  } finally {
    setIsSubmitting(false);
  }
}; 