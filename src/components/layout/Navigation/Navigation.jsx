import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MegaMenu } from '../../common/MegaMenu/MegaMenu';
import { FiMenu, FiX, FiMessageCircle, FiHome, FiUser, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './Navigation.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSubmenus, setExpandedSubmenus] = useState({});
  const timeoutRef = useRef(null);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const menuRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const mobileMenuOpen = Boolean(mobileAnchorEl);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleMouseEnter = (menuType) => {
    if (window.innerWidth <= 768) return; // Deaktiviere Hover für mobile Geräte
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menuType);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 500);
  };

  const handleMegaMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMegaMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 500);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubmenu = (menuType) => {
    setExpandedSubmenus(prev => ({
      ...prev,
      [menuType]: !prev[menuType]
    }));
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const handleMobileAvatarClick = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileAvatarClose = () => {
    setMobileAnchorEl(null);
  };

  const menuItems = [
    {
      title: 'Home',
      path: '/',
      hasSubmenu: false,
      icon: <FiHome />
    },
    {
      title: 'Leistungen',
      type: 'leistungen',
      hasSubmenu: true,
      megamenu: [
        {
          title: 'KFZ-Gutachten',
          path: '/kfz-gutachten',
          description: 'Professionelle KFZ-Gutachten nach Unfällen'
        },
        {
          title: 'Verkehrsunfall',
          path: '/verkehrsunfall',
          description: 'Kompetente Unterstützung bei Verkehrsunfällen'
        },
        {
          title: 'Bußgeld',
          path: '/bussgeld',
          description: 'Einspruch gegen Bußgeldbescheide einlegen'
        },
        {
          title: 'Punkteabfrage',
          path: '/punkteabfrage',
          description: 'Überprüfen Sie Ihre Punktesituation'
        }
      ]
    },
    {
      title: 'Unternehmen',
      type: 'unternehmen',
      hasSubmenu: true,
      megamenu: [
        {
          title: 'Über uns',
          path: '/ueber-uns',
          description: 'Lernen Sie uns kennen'
        },
        {
          title: 'Kontakt',
          path: '/kontakt',
          description: 'So erreichen Sie uns'
        },
        {
          title: '24/7 Chat',
          path: '#chat',
          description: 'Direkter Support',
          isHighlighted: true
        },
        {
          title: 'FAQ',
          path: '/faq',
          description: 'Häufig gestellte Fragen'
        },
        {
          title: 'Für KFZ Gutachter',
          path: '/fuer-kfz-gutachter',
          description: 'Informationen für KFZ Gutachter'
        }
      ]
    }
  ];

  return (
    <nav className={`navigation ${isLoginPage ? 'login-page-nav' : ''}`}>
      <div className="navigation__container">
        <Link to="/" className="navigation__logo">
          <img 
            src="/assets/images/LOGO Transparent.png" 
            alt="Rechtly Logo"
            className="navigation__logo-image"
          />
        </Link>

        {/* Mobile: Anmelde-Icon und Burger-Menü direkt nebeneinander */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }} className="mobile-only">
          <button
            className="mobile-login-icon"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#1B3A4B', background: 'none', border: 'none', fontSize: 0, padding: 0 }}
            onClick={handleMobileAvatarClick}
            aria-controls={mobileMenuOpen ? 'mobile-avatar-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={mobileMenuOpen ? 'true' : undefined}
          >
            <FiUser size={26} />
          </button>
          <Menu
            id="mobile-avatar-menu"
            anchorEl={mobileAnchorEl}
            open={mobileMenuOpen}
            onClose={handleMobileAvatarClose}
            MenuListProps={{
              'aria-labelledby': 'mobile-login-icon',
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              style: { minWidth: 220, borderRadius: 10, marginTop: 8 },
            }}
          >
            <MenuItem component="a" href="https://www.gutachter.rechtly.de" target="_blank" rel="noopener noreferrer" onClick={handleMobileAvatarClose}>
              <ListItemIcon>
                <FiUser size={20} />
              </ListItemIcon>
              <ListItemText primary="Als Gutachter anmelden" />
            </MenuItem>
            <MenuItem disabled style={{ opacity: 0.6, background: '#f5f5f5' }}>
              <ListItemIcon>
                <FiUser size={20} />
              </ListItemIcon>
              <ListItemText
                primary="Als Mandant anmelden"
                secondary="(coming soon)"
                secondaryTypographyProps={{ style: { fontSize: '0.85em', color: '#888' } }}
              />
            </MenuItem>
          </Menu>
          <button 
            className="mobile-menu-button" 
            onClick={toggleMobileMenu}
            aria-label="Menü öffnen/schließen"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div 
          className={`navigation__menu ${isMobileMenuOpen ? 'active' : ''}`}
          ref={menuRef}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${activeMenu === item.type ? 'active' : ''}`}
              onMouseEnter={() => item.hasSubmenu && handleMouseEnter(item.type)}
              onMouseLeave={item.hasSubmenu ? handleMouseLeave : undefined}
            >
              {item.hasSubmenu ? (
                <>
                  <span className="nav-item desktop-only" onClick={() => setActiveMenu(item.type)}>
                    {item.title}
                    <FiChevronDown style={{ marginLeft: 4 }} />
                  </span>
                  <div className="submenu-header mobile-only">
                    <span 
                      className="submenu-title"
                      onClick={() => toggleSubmenu(item.type)}
                    >
                      {item.title}
                      {expandedSubmenus[item.type] ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    <div className={`submenu-content ${expandedSubmenus[item.type] ? 'expanded' : ''}`}>
                      {item.megamenu && item.megamenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`submenu-item ${subItem.isHighlighted ? 'highlighted' : ''}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="submenu-item-content">
                            <span className="submenu-item-title">{subItem.title}</span>
                            <span className="submenu-item-description">{subItem.description}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link 
                  to={item.path} 
                  className="nav-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && item.icon}
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="navigation__actions desktop-only">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="avatar-container"
          >
            <button
              className="avatar-button"
              aria-controls={open ? 'avatar-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleAvatarClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <FiUser size={24} />
            </button>
            <Menu
              id="avatar-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleAvatarClose}
              MenuListProps={{
                'aria-labelledby': 'avatar-button',
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              PaperProps={{
                style: { minWidth: 220, borderRadius: 10, marginTop: 8 },
              }}
            >
              <MenuItem component="a" href="https://www.gutachter.rechtly.de" target="_blank" rel="noopener noreferrer" onClick={handleAvatarClose}>
                <ListItemIcon>
                  <FiUser size={20} />
                </ListItemIcon>
                <ListItemText primary="Als Gutachter anmelden" />
              </MenuItem>
              <MenuItem disabled style={{ opacity: 0.6, background: '#f5f5f5' }}>
                <ListItemIcon>
                  <FiUser size={20} />
                </ListItemIcon>
                <ListItemText
                  primary="Als Mandant anmelden"
                  secondary="(coming soon)"
                  secondaryTypographyProps={{ style: { fontSize: '0.85em', color: '#888' } }}
                />
              </MenuItem>
            </Menu>
          </motion.div>
          <Link to="/anfrage" className="nav-button">
            <FiMessageCircle size={20} />
            <span>Ihr Anliegen prüfen</span>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div 
            className="mobile-menu-overlay active"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {activeMenu && (
        <div 
          className="megamenu-wrapper desktop-only"
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
        >
          <MegaMenu 
            type={activeMenu}
            isOpen={true}
          />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
