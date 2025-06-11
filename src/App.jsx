import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home/Home';
import Bussgeld from './pages/Bussgeld/Bussgeld';
import KfzGutachten from './pages/KfzGutachten/KfzGutachten';
import Verkehrsunfall from './pages/Verkehrsunfall/Verkehrsunfall';
import Schadensersatz from './pages/Schadensersatz/Schadensersatz';
import UeberUns from './pages/UeberUns/UeberUns';
import Kontakt from './pages/Kontakt/Kontakt';
import Magazin from './pages/Magazin/Magazin';
import Unternehmen from './pages/Unternehmen/Unternehmen';
import Leistungen from './pages/Leistungen/Leistungen';
import Bussgeldrechner from './pages/Bussgeldrechner/Bussgeldrechner';
import BussgeldrechnerDetails from './pages/Bussgeldrechner/BussgeldrechnerDetails';
import FAQ from './pages/FAQ/FAQ';
import Punkteabfrage from './pages/Punkteabfrage/Punkteabfrage';
import Login from './pages/Login/Login';
import FuerKfzGutachter from './pages/FuerKfzGutachter/FuerKfzGutachter';
import Anfrage from './pages/Anfrage/Anfrage';
import BussgeldForm from './pages/Anfrage/BussgeldAnfrage/BussgeldForm';
import KfzGutachtenAnfrage from './pages/Anfrage/KfzGutachtenAnfrage/KfzGutachtenAnfrage';
import VerkehrsunfallAnfrage from './pages/Anfrage/VerkehrsunfallAnfrage/VerkehrsunfallAnfrage';
import Impressum from './pages/Impressum/Impressum';
import Datenschutz from './pages/Datenschutz/Datenschutz';
import './App.css';

// Komponente für Header-Logik
const HeaderWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  
  return !isLoginPage ? <Header /> : null;
};

// Komponente für Footer-Logik
const FooterWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  
  return !isLoginPage ? <Footer /> : null;
};

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app">
        <div className="app-background">
          <div className="animated-shape shape-1"></div>
          <div className="animated-shape shape-2"></div>
          <div className="animated-shape shape-3"></div>
          <div className="animated-shape shape-4"></div>
        </div>

        <HeaderWrapper />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bussgeld" element={<Bussgeld />} />
            <Route path="/kfz-gutachten" element={<KfzGutachten />} />
            <Route path="/verkehrsunfall" element={<Verkehrsunfall />} />
            <Route path="/schadensersatz" element={<Schadensersatz />} />
            <Route path="/ueber-uns" element={<UeberUns />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/magazin" element={<Magazin />} />
            <Route path="/unternehmen" element={<Unternehmen />} />
            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/bussgeldrechner" element={<Bussgeldrechner />} />
            <Route path="/bussgeldrechner/details" element={<BussgeldrechnerDetails />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/punkteabfrage" element={<Punkteabfrage />} />
            <Route path="/fuer-kfz-gutachter" element={<FuerKfzGutachter />} />
            <Route path="/anfrage" element={<Anfrage />} />
            <Route path="/anfrage/bussgeldanfrage" element={<BussgeldForm />} />
            <Route path="/anfrage/kfz-gutachtenanfrage" element={<KfzGutachtenAnfrage />} />
            <Route path="/anfrage/verkehrsunfallanfrage" element={<VerkehrsunfallAnfrage />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <FooterWrapper />
      </div>
    </Router>
  );
}

export default App;
