import React from 'react';
import './CasesSection.css';

const CasesSection = () => {
  const cases = [
    { title: 'Oldtimergutachten' },
    { title: 'Wertgutachten' },
    { title: 'Beweissicherungsgutachten' },
    { title: 'Fahrzeugbewertung' }
  ];

  return (
    <section className="cases-section">
      <div className="cases-container">
        <div className="cases-header">
          <h2>Unsere Gutachten</h2>
        </div>
        <div className="cases-grid">
          {cases.map((item, index) => (
            <div key={index} className="case-card">
              <div className="case-content">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
