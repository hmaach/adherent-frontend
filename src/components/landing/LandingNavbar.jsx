import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

const LandingNavbar = () => {
  const { t, language, switchLanguage, languages } = useLanguage();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const handleLanguageSwitch = (lang) => {
    switchLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <nav className="landing-navbar">
      <style>{`
        .landing-navbar {
          width: 100%;
          padding: 1rem 1.5rem;
          background: var(--color-white);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .navbar-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary);
          text-decoration: none;
          white-space: nowrap;
        }

        .navbar-logo:hover {
          color: var(--color-text);
        }

        .navbar-center {
          display: none;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .language-selector {
          position: relative;
        }

        .language-button {
          background: var(--color-primary);
          color: var(--color-white);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.4rem;
          cursor: pointer;
          font-weight: 600;
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .language-button:hover {
          opacity: 0.9;
        }

        .language-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: var(--color-white);
          border: 1px solid #e0e0e0;
          border-radius: 0.4rem;
          margin-top: 0.5rem;
          min-width: 120px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: none;
          flex-direction: column;
          z-index: 101;
        }

        .language-dropdown.active {
          display: flex;
        }

        .language-option {
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: var(--transition);
          font-weight: 500;
          color: var(--color-text);
        }

        .language-option:hover {
          background: var(--color-bg);
          color: var(--color-primary);
        }

        .language-option.active {
          background: var(--color-primary);
          color: var(--color-white);
        }

        .nav-button {
          background: var(--color-primary);
          color: var(--color-white);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.4rem;
          cursor: pointer;
          font-weight: 600;
          transition: var(--transition);
          text-decoration: none;
          display: inline-block;
        }

        .nav-button:hover {
          opacity: 0.9;
        }

        .nav-button-secondary {
          background: transparent;
          color: var(--color-primary);
          border: 2px solid var(--color-primary);
        }

        @media (min-width: 500px) {
          .navbar-container {
            gap: 2rem;
          }

          .navbar-logo {
            font-size: 1.75rem;
          }

          .navbar-center {
            display: flex;
            gap: 1rem;
          }

          .navbar-center a {
            text-decoration: none;
            color: var(--color-text);
            font-weight: 500;
            transition: var(--transition);
          }

          .navbar-center a:hover {
            color: var(--color-primary);
          }
        }

        html[dir="rtl"] .language-dropdown {
          right: auto;
          left: 0;
        }

        html[dir="rtl"] .language-option {
          text-align: right;
        }
      `}</style>

      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Adherent
        </Link>

        <div className="navbar-center">
          <a href="#about">{t.navbar.home}</a>
          <a href="/forum">{t.footer.quickLinks}</a>
        </div>

        <div className="navbar-right">
          <div className="language-selector">
            <button
              className="language-button"
              onClick={() =>
                setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
              }
            >
              {language.toUpperCase()}
            </button>
            <div
              className={`language-dropdown ${
                isLanguageDropdownOpen ? "active" : ""
              }`}
            >
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`language-option ${
                    language === lang ? "active" : ""
                  }`}
                  onClick={() => handleLanguageSwitch(lang)}
                >
                  {lang === "en" && "English"}
                  {lang === "fr" && "Français"}
                  {lang === "ar" && "العربية"}
                </button>
              ))}
            </div>
          </div>

          {user ? (
            <button
              className="nav-button"
              onClick={() => navigate("/accueil")}
            >
              {t.navbar.home}
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-button nav-button-secondary">
                {t.navbar.login}
              </Link>
              <Link to="/login" className="nav-button">
                {t.navbar.signup}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
