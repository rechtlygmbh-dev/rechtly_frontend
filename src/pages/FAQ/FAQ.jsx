import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCar, FaGavel, FaCalculator, FaCheckCircle, FaCarCrash, FaSearch } from 'react-icons/fa';
import './FAQ.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('kfz');
  const [activeFaq, setActiveFaq] = useState(null);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const faqData = {
    kfz: {
      icon: <FaCar />,
      title: 'KFZ Gutachten',
      questions: [
        {
          q: 'Wie funktioniert die Beauftragung eines KFZ-Gutachtens bei Rechtly?',
          a: 'Sie geben Ihre Daten online ein und laden Fotos des Schadens hoch. Rechtly übernimmt die restliche Abwicklung.'
        },
        {
          q: 'Was kostet ein KFZ-Gutachten?',
          a: 'Die Kosten werden in der Regel von der gegnerischen Versicherung getragen, wenn Sie nicht der Unfallverursacher sind.'
        },
        {
          q: 'Wie schnell erhalte ich mein Gutachten?',
          a: 'Sie erhalten Ihr Gutachten innerhalb von 48 Stunden nach dem Termin mit dem Gutachter.'
        },
        {
          q: 'Kann ich mein KFZ-Gutachten online abrufen?',
          a: 'Ja, alle Dokumente sind in Ihrem persönlichen Mandantenportal abrufbar.'
        },
        {
          q: 'Muss ich den Gutachter kontaktieren?',
          a: 'Nein, Rechtly übernimmt die Kommunikation und Terminvereinbarung mit dem Gutachter.'
        }
      ]
    },
    unfall: {
      icon: <FaCarCrash />,
      title: 'Verkehrsunfall',
      questions: [
        {
          q: 'Welche Schritte muss ich nach einem Unfall unternehmen?',
          a: 'Melden Sie den Unfall bei uns. Wir kümmern uns um alles Weitere, von der Gutachtervermittlung bis zur Rechtsberatung.'
        },
        {
          q: 'Wann sollte ich einen Anwalt einschalten?',
          a: 'Sobald Unklarheiten bei der Schuldfrage bestehen oder die Versicherung zögert.'
        },
        {
          q: 'Wer übernimmt die Kosten nach einem Unfall?',
          a: 'Die Kosten trägt in der Regel die Versicherung des Unfallverursachers.'
        },
        {
          q: 'Wie melde ich einen Verkehrsunfall online?',
          a: 'Über unser Formular auf der Webseite. Dort laden Sie alle relevanten Daten und Fotos hoch.'
        },
        {
          q: 'Wie lange dauert die Unfallregulierung?',
          a: 'Dies hängt von der Komplexität des Falls ab, aber unsere automatisierten Workflows beschleunigen den Prozess erheblich.'
        }
      ]
    },
    bussgeld: {
      icon: <FaGavel />,
      title: 'Bußgeld',
      questions: [
        {
          q: 'Wann lohnt sich ein Einspruch gegen einen Bußgeldbescheid?',
          a: 'Wenn Punkte, hohe Strafen oder ein Fahrverbot drohen.'
        },
        {
          q: 'Wie lange habe ich Zeit, Einspruch einzulegen?',
          a: 'Sie haben 14 Tage ab Erhalt des Bescheids.'
        },
        {
          q: 'Sind Bußgeldbescheide oft fehlerhaft?',
          a: 'Ja, viele Bescheide enthalten formale oder technische Fehler.'
        },
        {
          q: 'Was kostet ein Einspruch?',
          a: 'Unsere Erstprüfung ist kostenlos. Danach klären wir die Kosten transparent mit Ihnen.'
        },
        {
          q: 'Kann ich auch gegen ein Fahrverbot vorgehen?',
          a: 'Ja, das ist möglich, wenn Fehler oder mildernde Umstände vorliegen.'
        }
      ]
    },
    rechner: {
      icon: <FaCalculator />,
      title: 'Bußgeldrechner',
      questions: [
        {
          q: 'Wie funktioniert der Bußgeldrechner?',
          a: 'Geben Sie die Art des Verstoßes ein, und der Rechner zeigt Ihnen die möglichen Strafen.'
        },
        {
          q: 'Ist die Berechnung verbindlich?',
          a: 'Nein, die Berechnungen sind unverbindlich und dienen als Orientierung.'
        },
        {
          q: 'Kann ich den Rechner anonym nutzen?',
          a: 'Ja, keine persönlichen Daten sind erforderlich.'
        },
        {
          q: 'Welche Verstöße werden abgedeckt?',
          a: 'Geschwindigkeitsverstöße, Rotlichtvergehen, Abstandsverstöße, Handy am Steuer, Alkohol/Drogen.'
        },
        {
          q: 'Wie präzise sind die Ergebnisse?',
          a: 'Die Ergebnisse basieren auf aktuellen Bußgeldkatalogen, sind jedoch ohne Gewähr.'
        }
      ]
    },
    vorteile: {
      icon: <FaCheckCircle />,
      title: 'Unsere Vorteile',
      questions: [
        {
          q: 'Was macht Rechtly besser als andere Anbieter?',
          a: 'Automatisierte Prozesse, KI-gestützte Unterstützung und ein persönliches Mandantenportal.'
        },
        {
          q: 'Wie schnell ist die Bearbeitung?',
          a: 'Erste Einschätzungen erhalten Sie in wenigen Minuten.'
        },
        {
          q: 'Ist Rechtly bundesweit verfügbar?',
          a: 'Ja, unsere Services stehen deutschlandweit zur Verfügung.'
        },
        {
          q: 'Sind meine Daten sicher?',
          a: 'Ja, wir halten uns streng an die DSGVO.'
        },
        {
          q: 'Wie funktioniert die Zusammenarbeit mit Gutachtern?',
          a: 'Wir vermitteln Ihnen qualifizierte Partner in Ihrer Nähe.'
        }
      ]
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const [form, setForm] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    nachricht: '',
    captcha: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [captcha, setCaptcha] = useState(() => {
    // Zufällige Rechenaufgabe generieren
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, solution: a + b };
  });

  const validate = () => {
    const newErrors = {};
    if (!form.vorname.trim()) newErrors.vorname = 'Vorname ist erforderlich.';
    if (!form.nachname.trim()) newErrors.nachname = 'Nachname ist erforderlich.';
    if (!form.email.trim()) newErrors.email = 'E-Mail ist erforderlich.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Bitte eine gültige E-Mail eingeben.';
    if (!form.telefon.trim()) newErrors.telefon = 'Telefonnummer ist erforderlich.';
    else if (!/^\+?[0-9\s\-()]{6,}$/.test(form.telefon)) newErrors.telefon = 'Bitte eine gültige Telefonnummer eingeben.';
    if (!form.nachricht.trim()) newErrors.nachricht = 'Bitte geben Sie eine Nachricht ein.';
    if (parseInt(form.captcha, 10) !== captcha.solution) newErrors.captcha = 'Die Rechenaufgabe wurde nicht korrekt gelöst.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('/api/faq-contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vorname: form.vorname,
            nachname: form.nachname,
            email: form.email,
            telefon: form.telefon,
            nachricht: form.nachricht
          })
        });
        if (response.ok) {
          setSuccess(true);
          setSnackbarOpen(true);
          setForm({ vorname: '', nachname: '', email: '', telefon: '', nachricht: '', captcha: '' });
          setCaptcha(() => {
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            return { a, b, solution: a + b };
          });
          setTimeout(() => setSuccess(false), 5000);
          setErrors({});
        } else {
          setErrors({ submit: 'Versand fehlgeschlagen. Bitte versuchen Sie es später erneut.' });
        }
      } catch (err) {
        setErrors({ submit: 'Versand fehlgeschlagen. Bitte versuchen Sie es später erneut.' });
      }
    }
  };

  // Alle Fragen für die Suche sammeln
  const allQuestions = Object.entries(faqData).flatMap(([catKey, cat]) =>
    cat.questions.map((q, idx) => ({
      ...q,
      catKey,
      catTitle: cat.title,
      index: idx
    }))
  );

  // Suche aktualisieren
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      const results = allQuestions.filter(q =>
        q.q.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  // Klick auf Suchvorschlag
  const handleSuggestionClick = (catKey, idx) => {
    setActiveCategory(catKey);
    setActiveFaq(idx);
    setSearch('');
    setShowDropdown(false);
  };

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="section-container">
          <motion.h1
            className="faq-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Häufig gestellte Fragen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hier finden Sie Antworten auf die wichtigsten Fragen zu unseren Services
          </motion.p>
        </div>
      </section>

      <section className="faq-content">
        <div className="section-container">
          {/* Suchleiste */}
          <div className="faq-searchbar-container">
            <div className="faq-searchbar">
              <FaSearch className="faq-searchbar-icon" />
              <input
                type="text"
                placeholder="Frage suchen..."
                value={search}
                onChange={handleSearchChange}
                onFocus={() => search.length > 0 && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                className="faq-searchbar-input"
                autoComplete="off"
              />
            </div>
            {showDropdown && searchResults.length > 0 && (
              <div className="faq-search-dropdown">
                {searchResults.map((q, i) => (
                  <div
                    key={q.catKey + '-' + q.index}
                    className="faq-search-suggestion"
                    onClick={() => handleSuggestionClick(q.catKey, q.index)}
                  >
                    <span className="faq-search-suggestion-question">{q.q}</span>
                    <span className="faq-search-suggestion-category">({q.catTitle})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="category-tabs">
            {Object.entries(faqData).map(([key, category]) => (
              <motion.button
                key={key}
                className={`category-tab ${activeCategory === key ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(key);
                  setActiveFaq(null);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                {category.title}
              </motion.button>
            ))}
          </div>

          <div className="faq-list">
            {faqData[activeCategory].questions.map((faq, index) => (
              <motion.div
                key={index}
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h3>{faq.q}</h3>
                  <FaChevronDown className={`faq-icon ${activeFaq === index ? 'rotated' : ''}`} />
                </div>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      className="faq-answer"
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontaktformular für weitere Fragen */}
      <section className="faq-contact-form-section">
        <div className="faq-contact-form-container">
          <h2 className="faq-contact-form-title">Weitere Fragen? Jetzt Kontakt aufnehmen:</h2>
          <form className="faq-contact-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="faq-contact-form-row">
              <div className="faq-contact-form-group">
                <label htmlFor="vorname">Vorname*</label>
                <input type="text" id="vorname" name="vorname" value={form.vorname} onChange={handleInputChange} required />
                {errors.vorname && <span className="faq-contact-form-error">{errors.vorname}</span>}
              </div>
              <div className="faq-contact-form-group">
                <label htmlFor="nachname">Nachname*</label>
                <input type="text" id="nachname" name="nachname" value={form.nachname} onChange={handleInputChange} required />
                {errors.nachname && <span className="faq-contact-form-error">{errors.nachname}</span>}
              </div>
            </div>
            <div className="faq-contact-form-row">
              <div className="faq-contact-form-group">
                <label htmlFor="email">E-Mail*</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleInputChange} required />
                {errors.email && <span className="faq-contact-form-error">{errors.email}</span>}
              </div>
              <div className="faq-contact-form-group">
                <label htmlFor="telefon">Telefonnummer*</label>
                <input type="tel" id="telefon" name="telefon" value={form.telefon} onChange={handleInputChange} required />
                {errors.telefon && <span className="faq-contact-form-error">{errors.telefon}</span>}
              </div>
            </div>
            <div className="faq-contact-form-group full-width">
              <label htmlFor="nachricht">Ihre Nachricht*</label>
              <textarea id="nachricht" name="nachricht" rows="5" value={form.nachricht} onChange={handleInputChange} required></textarea>
              {errors.nachricht && <span className="faq-contact-form-error">{errors.nachricht}</span>}
            </div>
            <div className="faq-contact-form-group full-width">
              <label htmlFor="captcha">Sicherheitsfrage: Was ist {captcha.a} + {captcha.b}?*</label>
              <input type="text" id="captcha" name="captcha" value={form.captcha} onChange={handleInputChange} required autoComplete="off" />
              {errors.captcha && <span className="faq-contact-form-error">{errors.captcha}</span>}
            </div>
            <button type="submit" className="faq-contact-form-button">Absenden</button>
            <p className="faq-contact-form-hint">Ihre Anfrage wird an <b>support@rechtly.de</b> gesendet.</p>
            {success && (
              <div className="faq-thankyou-container">
                <h2>Vielen Dank für Ihre Anfrage!</h2>
                <p className="faq-thankyou-hint">Bitte prüfen Sie Ihr E-Mail-Postfach.</p>
                <p>Wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich bei Ihnen. Sie erhalten in Kürze eine Bestätigung per E-Mail.</p>
                <div className="faq-thankyou-divider" />
                <h3>Haben Sie einen Bußgeldbescheid erhalten?</h3>
                <p>Viele Bußgeldbescheide sind fehlerhaft.</p>
                <div className="faq-bussgeldcheck-box">
                  <p>Nutzen Sie unseren <strong>Bußgeldcheck</strong>:</p>
                  <button className="faq-bussgeldcheck-button" onClick={() => window.open('/bussgeldrechner', '_blank')}>Einspruch prüfen</button>
                </div>
              </div>
            )}
            {errors.submit && <p className="faq-contact-form-error">{errors.submit}</p>}
          </form>
        </div>
      </section>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Ihre Anfrage wurde erfolgreich versendet!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FAQ; 