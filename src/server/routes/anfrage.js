const express = require('express');
const router = express.Router();
const Anfrage = require('../models/Anfrage');

// Bußgeldanfrage Route
router.post('/bussgeld', async (req, res) => {
  try {
    const {
      service,
      vorname,
      name,
      email,
      telefon,
      strasse,
      hausnummer,
      plz,
      ort,
      bussgeldBeschreibung,
      dokumente,
      datenschutz
    } = req.body;

    // Validierung der Pflichtfelder
    if (!vorname || !name || !email || !strasse || !plz || !ort) {
      return res.status(400).json({
        success: false,
        error: 'Bitte füllen Sie alle Pflichtfelder aus'
      });
    }

    // E-Mail Validierung
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
      });
    }

    // Neue Anfrage erstellen
    const neueAnfrage = new Anfrage({
      typ: 'bussgeld',
      service,
      vorname,
      name,
      email,
      telefon,
      strasse,
      hausnummer,
      plz,
      ort,
      beschreibung: bussgeldBeschreibung,
      dokumente,
      datenschutz,
      status: 'neu'
    });

    // Anfrage speichern
    await neueAnfrage.save();

    // Erfolgreiche Antwort
    res.status(201).json({
      success: true,
      message: 'Ihre Anfrage wurde erfolgreich übermittelt',
      anfrageId: neueAnfrage._id
    });

  } catch (error) {
    console.error('Fehler bei Bußgeldanfrage:', error);
    res.status(500).json({
      success: false,
      error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
    });
  }
});

module.exports = router; 