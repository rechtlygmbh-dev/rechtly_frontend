import React from 'react';
import './BussgeldrechnerIntro.css';

const BussgeldrechnerIntro = ({ step = 1 }) => {
  // step: 1 = Kategorie, 2 = Details, 3 = Einspruch prüfen, 4 = Formular
  return (
    <section className="bussgeldrechner-intro">
      <h1 className="bussgeldrechner-intro-title">Punkte, Bußgeld oder Fahrverbot berechnen – schnell & kostenlos</h1>
      <div className="bussgeldrechner-progress-bar-container">
        <div className="bussgeldrechner-progress-bar">
          <div className={`bussgeldrechner-progress-step ${step >= 1 ? 'active' : ''}`}>1. Kategorie wählen</div>
          <div className={`bussgeldrechner-progress-step ${step >= 2 ? 'active' : ''}`}>2. Details beantworten</div>
          <div className={`bussgeldrechner-progress-step ${step >= 3 ? 'active' : ''}`}>3. Einspruch prüfen</div>
          <div className={`bussgeldrechner-progress-step ${step >= 4 ? 'active' : ''}`}>4. Formular ausfüllen</div>
        </div>
      </div>
      <div className="bussgeldrechner-info">
        <div className="info-hinweis">
          <strong>*Wichtig:</strong> Der Bußgeldrechner kann eine anwaltliche Beratung über die Folgen eines Verkehrsverstoßes nicht ersetzen. Sonder-Regelungen z. B. für Kfz mit Gefahrguttransporten oder Kraftomnibusse mit Fahrgästen werden hier nicht berücksichtigt!<br />
          <strong>Alle Angaben und Berechnungen ohne Gewähr!</strong>
        </div>
      </div>
    </section>
  );
};

export default BussgeldrechnerIntro; 