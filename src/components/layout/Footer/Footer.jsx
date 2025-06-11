import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/">
              <img 
                src="/assets/images/Logo Weiß.png"
                alt="Rechtly Logo"
                className="footer__logo"
                style={{ maxWidth: '400px', height: 'auto' }}
              />
            </Link>
          </div>

          <div className="footer__links">
            <h4>Schnellzugriff</h4>
            <ul>
              <li><Link to="/bussgeld">Bußgeldbescheid</Link></li>
              <li><Link to="/kfz-gutachten">KFZ Gutachten</Link></li>
              <li><Link to="/verkehrsunfall">Verkehrsunfall</Link></li>
              <li><Link to="/bussgeldrechner">Bußgeldrechner</Link></li>
              <li><Link to="/punkteabfrage">Punkteabfrage</Link></li>
            </ul>
          </div>

          <div className="footer__links">
            <h4>Unternehmen</h4>
            <ul>
              <li><Link to="/ueber-uns">Über uns</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/fuer-kfz-gutachter">Für KFZ Gutachter</Link></li>
            </ul>
          </div>

          <div className="footer__contact">
            <h4>Kontakt</h4>
            <p>Tel: +49 170 7160000</p>
            <p>E-Mail: support@rechtly.de</p>
            <Link to="/anfrage">
              <button className="footer__cta">Jetzt Anliegen prüfen</button>
            </Link>
            <div className="footer__social">
              {/* Social Media Links */}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <Link to="/datenschutz">Datenschutz</Link>
            <Link to="/impressum">Impressum</Link>
          </div>
          <p className="footer__copyright">
            © {new Date().getFullYear()} Rechtly. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
