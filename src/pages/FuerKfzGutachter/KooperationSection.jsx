import React from 'react';
import './KooperationSection.css';

const KooperationSection = () => {
  return (
    <section className="kooperation-section">
      <div className="kooperation-container">
        <div className="kooperation-text">
          <h2>Digitale Zusammenarbeit mit Kfz-Gutachtern</h2>
          <h3 className="kooperation-subheading">Partnerschaftlich. Transparent. Effizient.</h3>
          <p className="kooperation-description">
            Rechtly bietet Kfz-Gutachtern eine innovative, digitale Plattform für die effiziente Zusammenarbeit. Unser Ziel ist es, Prozesse zu vereinfachen, neue Aufträge zu vermitteln und die anwaltliche Bearbeitung von Fällen so einfach wie möglich zu machen. Sie profitieren von einer transparenten, schnellen und sicheren Abwicklung – ganz ohne Papierkram.<br /><br />
            Wir arbeiten deutschlandweit mit Gutachtern auf zwei Wegen zusammen:
          </p>
          <div className="kooperation-cards">
            <div className="kooperation-card">
              <h4>1. Rechtly vermittelt neue Aufträge an Gutachter</h4>
              <p>Als Partner erhalten Sie regelmäßig neue Schadensfälle aus Ihrer Region – digital, ohne Akquise-Aufwand. Sie können sich auf Ihre Kernkompetenz konzentrieren, während wir für einen stetigen Auftragsfluss sorgen.</p>
            </div>
            <div className="kooperation-card">
              <h4>2. Gutachter leiten Fälle zur anwaltlichen Bearbeitung an Rechtly weiter</h4>
              <p>Mit wenigen Klicks übergeben Sie einen Fall an unsere spezialisierten Anwälte. Die gesamte Kommunikation und Abwicklung erfolgt digital und transparent über unsere Plattform – für maximale Effizienz und Rechtssicherheit.</p>
            </div>
          </div>
          <a href="https://gutachter.rechtly.de/login" target="_blank" rel="noopener noreferrer">
            <button className="partner-button">Jetzt Partner werden</button>
          </a>
        </div>
        <div className="kooperation-image">
          <img src="assets/images/kooperation mit KFZ.png" alt="Digitale Kooperation mit Kfz-Gutachtern" />
        </div>
      </div>
    </section>
  );
};

export default KooperationSection; 