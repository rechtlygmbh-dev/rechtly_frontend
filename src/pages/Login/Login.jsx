import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

// Get the API URL from environment variables
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://rechtly-backend.onrender.com'
  : process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('mandant');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Neue Felder für Gutachter
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [availability, setAvailability] = useState('');
  const [languages, setLanguages] = useState('');
  const [expertiseTypes, setExpertiseTypes] = useState('');
  const [website, setWebsite] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });

      // Token im localStorage speichern
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Weiterleitung basierend auf Rolle
      switch (response.data.user.role) {
        case 'mandant':
          window.location.href = 'https://mandant.rechtly.de';
          break;
        case 'anwalt':
          window.location.href = 'https://anwalt.rechtly.de';
          break;
        case 'gutachter':
          window.location.href = 'https://gutachter.rechtly.de';
          break;
        default:
          navigate('/home');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Anmeldung fehlgeschlagen');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Passwort-Validierung
    if (password !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein');
      return;
    }

    try {
      const userData = {
        email,
        password,
        firstName,
        lastName,
        role
      };

      // Füge Gutachter-spezifische Daten hinzu, wenn die Rolle "gutachter" ist
      if (role === 'gutachter') {
        Object.assign(userData, {
          company,
          address,
          licenseNumber,
          serviceArea,
          availability,
          languages,
          expertiseTypes,
          website
        });
      }

      await axios.post(`${API_URL}/api/auth/register`, userData);
      setSuccess('Registrierung erfolgreich. Bitte aktivieren Sie Ihr Konto über den Link in der E-Mail.');
      setIsRegistering(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Registrierung fehlgeschlagen');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post(`${API_URL}/api/auth/forgot-password`, {
        email
      });
      setSuccess('Eine E-Mail mit Anweisungen zum Zurücksetzen des Passworts wurde gesendet.');
      setIsForgotPassword(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Fehler beim Anfordern des Passwort-Resets');
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="logo-container">
          <Link to="/">
            <img src="/assets/images/LOGO Transparent.png" alt="Rechtly Logo" className="logo" />
          </Link>
        </div>
      </header>
      <div className="login-container">
        <h2>{isRegistering ? 'Registrieren' : isForgotPassword ? 'Passwort vergessen' : 'Anmelden'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={isRegistering ? handleRegister : isForgotPassword ? handleForgotPassword : handleLogin} className="login-form">
          {isRegistering && (
            <div className="register-grid">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Vorname</label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Max"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Nachname</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Mustermann"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="role">Rolle</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="mandant">Mandant</option>
                  <option value="gutachter">KFZ Gutachter</option>
                </select>
              </div>

              {role === 'gutachter' && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Firma</label>
                      <input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="z.B. Auto Gutachten GmbH"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Adresse</label>
                      <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Musterstraße 123, 12345 Stadt"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="licenseNumber">Zulassungsnummer</label>
                    <input
                      id="licenseNumber"
                      type="text"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      placeholder="z.B. TÜV-12345, DEKRA-67890"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="serviceArea">Einsatzgebiet</label>
                    <input
                      id="serviceArea"
                      type="text"
                      value={serviceArea}
                      onChange={(e) => setServiceArea(e.target.value)}
                      placeholder="z.B. Berlin, Brandenburg"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="availability">Erreichbarkeit</label>
                    <input
                      id="availability"
                      type="text"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      placeholder="z.B. Mo-Fr 8-18 Uhr"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="languages">Sprachen</label>
                    <input
                      id="languages"
                      type="text"
                      value={languages}
                      onChange={(e) => setLanguages(e.target.value)}
                      placeholder="z.B. Deutsch, Englisch, Türkisch"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expertiseTypes">Gutachtenarten</label>
                    <input
                      id="expertiseTypes"
                      type="text"
                      value={expertiseTypes}
                      onChange={(e) => setExpertiseTypes(e.target.value)}
                      placeholder="z.B. Unfall, Wertgutachten, Oldtimer"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="website">Webseite</label>
                    <input
                      id="website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://www.example.com"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!isForgotPassword && (
            <>
              <div className="form-group">
                <label htmlFor="password">Passwort</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mindestens 8 Zeichen"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Passwort wiederholen</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Passwort wiederholen"
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="login-button">
            {isRegistering ? 'Registrieren' : isForgotPassword ? 'Passwort zurücksetzen' : 'Anmelden'}
          </button>
        </form>

        <div className="form-links">
          {!isRegistering && !isForgotPassword && (
            <>
              <button onClick={() => setIsRegistering(true)} className="link-button">
                Registrieren
              </button>
              <button onClick={() => setIsForgotPassword(true)} className="link-button">
                Passwort vergessen?
              </button>
            </>
          )}
          {(isRegistering || isForgotPassword) && (
            <button onClick={() => {
              setIsRegistering(false);
              setIsForgotPassword(false);
              setError('');
              setSuccess('');
            }} className="link-button">
              Zurück zum Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login; 