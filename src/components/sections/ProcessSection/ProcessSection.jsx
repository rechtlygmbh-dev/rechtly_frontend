import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCheckCircle, FiUserCheck } from 'react-icons/fi';
import './ProcessSection.css';

const ProcessSection = () => {
  const steps = [
    {
      id: 1,
      icon: <FiSearch size={32} />,
      title: 'Anliegen prüfen',
      description: 'Wählen Sie aus, welche Art von rechtlicher Unterstützung Sie benötigen.',
      bullets: [
        'KFZ Gutachten',
        'Bußgeldbescheid',
        'Schadensregulierung'
      ]
    },
    {
      id: 2,
      icon: <FiCheckCircle size={32} />,
      title: 'Kostenlose Bewertung',
      description: 'Erhalten Sie eine erste kostenlose Einschätzung Ihres Falls von unseren Experten.',
      bullets: [
        'Falldetails übermitteln',
        'Erfolgsaussichten prüfen', 
        'Handlungsempfehlung erhalten'
      ]
    },
    {
      id: 3,
      icon: <FiUserCheck size={32} />,
      title: 'Expertenunterstützung',
      description: 'Profitieren Sie von der Unterstützung unserer erfahrenen Rechtsexperten bei der Durchsetzung Ihrer Ansprüche.',
      bullets: [
        'Professionelle Vertretung',
        'Persönliche Betreuung',
        'Regelmäßige Updates'
      ]
    }
  ];

  return (
    <section className="process">
      <div className="process__container">
        <div className="process__header">
          <h2>In drei einfachen Schritten zum Recht</h2>
          <p>Mit dem Rechtly Prinzip etablieren wir einen Weg, der allen einen einfachen Zugang zum Recht ebnet. 
            Ob telefonisch, digital oder persönlich: Für unsere Mandant:innen sind unsere Dienstleistungen hürdenlos, 
            transparent und auf Augenhöhe.</p>
        </div>

        <div className="process__steps">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="process__step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="process__step-number">{step.id}</div>
              <div className="process__step-icon">{step.icon}</div>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-description">{step.description}</p>
              <ul className="process__step-bullets">
                {step.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              {index < steps.length - 1 && (
                <div className="process__step-arrow">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 