const mongoose = require('mongoose');

const anfrageSchema = new mongoose.Schema({
  typ: {
    type: String,
    required: true,
    enum: ['bussgeld', 'sonstiges']
  },
  service: {
    type: String,
    required: true
  },
  vorname: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefon: String,
  strasse: {
    type: String,
    required: true
  },
  hausnummer: String,
  plz: {
    type: String,
    required: true
  },
  ort: {
    type: String,
    required: true
  },
  beschreibung: String,
  dokumente: [String],
  datenschutz: {
    type: Boolean,
    required: true,
    default: false
  },
  status: {
    type: String,
    enum: ['neu', 'in_bearbeitung', 'abgeschlossen', 'abgelehnt'],
    default: 'neu'
  },
  erstelltAm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Anfrage', anfrageSchema); 