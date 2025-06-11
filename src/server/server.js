const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const anfrageRoutes = require('./routes/anfrage');
const bussgeldRoutes = require('../../server/src/routes/bussgeld');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Verbindung
mongoose.connect('mongodb://localhost:27017/rechtly', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB verbunden'))
.catch(err => console.error('MongoDB Verbindungsfehler:', err));

// Routes
app.use('/api/anfrage', anfrageRoutes);
app.use('/api/bussgeld', bussgeldRoutes);

// Statische Dateien
app.use(express.static(path.join(__dirname, '../../build')));

// Catch-all Route für React App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/index.html'));
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Ein Fehler ist aufgetreten'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
}); 