import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

const LandingNavbar = () => {
  const { t, language, switchLanguage, languages } = useLanguage();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const langRef = useRef(null);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close lang dropdown on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleLangSwitch = (lang) => {
    switchLanguage(lang);
    setIsLangOpen(false);
    setIsMobileOpen(false);
  };

  const navLinks = [
    { label: t.navbar.home, href: "#hero" },
    { label: t.footer.quickLinks, href: "/forum" },
  ];

  const LANG_LABELS = { en: "English", fr: "Français", ar: "العربية" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&display=swap');

        /* ══ NAV BASE ══ */
        .lnav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 900;
          padding: 0 1.5rem;
          height: 64px;
          display: flex;
          align-items: center;
          transition: background 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease;
          background: rgba(10, 10, 15, 0.5);
          backdrop-filter: blur(0px);
        }

        .lnav.scrolled {
          background: rgba(10, 10, 15, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 rgba(255,255,255,0.06);
        }

        .lnav-inner {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        /* ══ LOGO ══ */
        .lnav-logo {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        .lnav-logo img {
          width: 36px;
          height: 36px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          transition: filter 0.2s ease;
        }

        .lnav-logo:hover img {
          filter: brightness(0) saturate(100%) invert(60%) sepia(80%) saturate(500%) hue-rotate(5deg);
        }

        .lnav-wordmark {
          font-family: 'Outfit', sans-serif;
          font-size: 1.2rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .lnav-wordmark span {
          color: #ff8c00;
        }

        /* ══ CENTER LINKS (desktop) ══ */
        .lnav-links {
          display: none;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
        }

        .lnav-link {
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          padding: 0.45rem 0.85rem;
          border-radius: 0.4rem;
          transition: color 0.2s ease, background 0.2s ease;
          position: relative;
        }

        .lnav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0.85rem;
          right: 0.85rem;
          height: 1.5px;
          background: #ff8c00;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }

        .lnav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.05);
        }

        .lnav-link:hover::after {
          transform: scaleX(1);
        }

        /* ══ RIGHT ACTIONS (desktop) ══ */
        .lnav-right {
          display: none;
          align-items: center;
          gap: 0.75rem;
          margin-left: auto;
        }

        /* ══ LANGUAGE PICKER ══ */
        .lnav-lang {
          position: relative;
        }

        .lnav-lang-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.75);
          padding: 0.4rem 0.75rem;
          border-radius: 0.4rem;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .lnav-lang-btn:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.22);
          color: #fff;
        }

        .lnav-lang-btn svg {
          transition: transform 0.25s ease;
        }

        .lnav-lang-btn.open svg {
          transform: rotate(180deg);
        }

        .lnav-lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #16161f;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5);
          min-width: 130px;
          animation: dropIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 901;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .lnav-lang-option {
          display: block;
          width: 100%;
          padding: 0.65rem 1rem;
          background: none;
          border: none;
          text-align: left;
          color: rgba(255,255,255,0.6);
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .lnav-lang-option:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }

        .lnav-lang-option.active {
          color: #ff8c00;
          font-weight: 700;
        }

        html[dir="rtl"] .lnav-lang-dropdown { right: auto; left: 0; }
        html[dir="rtl"] .lnav-lang-option   { text-align: right; }

        /* ══ AUTH BUTTONS ══ */
        .lnav-btn {
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          padding: 0.48rem 1.1rem;
          border-radius: 0.4rem;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.01em;
          transition: all 0.22s ease;
          white-space: nowrap;
        }

        .lnav-btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.18);
        }

        .lnav-btn-ghost:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.05);
        }

        .lnav-btn-primary {
          background: #ff8c00;
          color: #fff;
          box-shadow: 0 2px 12px rgba(255,140,0,0);
        }

        .lnav-btn-primary:hover {
          background: #e07b00;
          box-shadow: 0 4px 20px rgba(255,140,0,0.45);
          transform: translateY(-1px);
        }

        /* ══ HAMBURGER ══ */
        .lnav-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.4rem;
          cursor: pointer;
          margin-left: auto;
          transition: background 0.2s ease;
          flex-shrink: 0;
        }

        .lnav-hamburger:hover {
          background: rgba(255,255,255,0.12);
        }

        .lnav-hamburger span {
          display: block;
          width: 18px;
          height: 1.5px;
          background: rgba(255,255,255,0.8);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
          transform-origin: center;
        }

        .lnav-hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .lnav-hamburger.open span:nth-child(2) {
          opacity: 0;
          width: 0;
        }
        .lnav-hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* ══ MOBILE DRAWER ══ */
        .lnav-drawer {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 10, 15, 0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 899;
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          gap: 0.5rem;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
        }

        .lnav-drawer.open {
          transform: translateX(0);
        }

        .lnav-drawer-link {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: block;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }

        .lnav-drawer-link:hover {
          color: #fff;
          padding-left: 0.5rem;
        }

        .lnav-drawer-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0.5rem 0;
        }

        .lnav-drawer-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .lnav-drawer-actions .lnav-btn {
          justify-content: center;
          padding: 0.8rem 1.5rem;
          font-size: 0.95rem;
        }

        .lnav-drawer-lang {
          margin-top: 1.5rem;
        }

        .lnav-drawer-lang-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 0.75rem;
        }

        .lnav-drawer-lang-options {
          display: flex;
          gap: 0.5rem;
        }

        .lnav-drawer-lang-opt {
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.45rem 1rem;
          border-radius: 0.4rem;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.55);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lnav-drawer-lang-opt:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .lnav-drawer-lang-opt.active {
          background: #ff8c00;
          border-color: #ff8c00;
          color: #fff;
        }

        /* ══ RESPONSIVE BREAKPOINT ══ */
        @media (min-width: 768px) {
          .lnav-hamburger { display: none; }
          .lnav-drawer    { display: none; }
          .lnav-links     { display: flex; }
          .lnav-right     { display: flex; }
        }

        /* ══ SPACER so content isn't under fixed nav ══ */
        .lnav-spacer {
          height: 64px;
          flex-shrink: 0;
        }
      `}</style>

      {/* ── Fixed navbar ── */}
      <nav className={`lnav ${scrolled ? "scrolled" : ""}`}>
        <div className="lnav-inner">
          {/* Logo */}
          <Link to="/" className="lnav-logo">
            <img src="/logo.png" alt="Logo" />
            <span className="lnav-wordmark">
              Adh<span>er</span>ent
            </span>
          </Link>

          {/* Desktop center links */}
          <div className="lnav-links">
            {navLinks.map((nl) => (
              <a key={nl.label} href={nl.href} className="lnav-link">
                {nl.label}
              </a>
            ))}
          </div>

          {/* Desktop right */}
          <div className="lnav-right">
            {/* Language picker */}
            <div className="lnav-lang" ref={langRef}>
              <button
                className={`lnav-lang-btn ${isLangOpen ? "open" : ""}`}
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-label="Switch language"
              >
                {language.toUpperCase()}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isLangOpen && (
                <div className="lnav-lang-dropdown">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      className={`lnav-lang-option ${language === lang ? "active" : ""}`}
                      onClick={() => handleLangSwitch(lang)}
                    >
                      {LANG_LABELS[lang] || lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth buttons */}
            {user ? (
              <button
                className="lnav-btn lnav-btn-primary"
                onClick={() => navigate("/accueil")}
              >
                {t.navbar.home}
              </button>
            ) : (
              <>
                <Link to="/login" className="lnav-btn lnav-btn-ghost">
                  {t.navbar.login}
                </Link>
                <Link to="/login" className="lnav-btn lnav-btn-primary">
                  {t.navbar.signup}
                </Link>
              </>
            )}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className={`lnav-hamburger ${isMobileOpen ? "open" : ""}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className={`lnav-drawer ${isMobileOpen ? "open" : ""}`}
        aria-hidden={!isMobileOpen}
      >
        {navLinks.map((nl) => (
          <a
            key={nl.label}
            href={nl.href}
            className="lnav-drawer-link"
            onClick={() => setIsMobileOpen(false)}
          >
            {nl.label}
          </a>
        ))}

        <div className="lnav-drawer-divider" />

        <div className="lnav-drawer-actions">
          {user ? (
            <button
              className="lnav-btn lnav-btn-primary"
              onClick={() => {
                navigate("/accueil");
                setIsMobileOpen(false);
              }}
            >
              {t.navbar.home}
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="lnav-btn lnav-btn-ghost"
                onClick={() => setIsMobileOpen(false)}
              >
                {t.navbar.login}
              </Link>
              <Link
                to="/login"
                className="lnav-btn lnav-btn-primary"
                onClick={() => setIsMobileOpen(false)}
              >
                {t.navbar.signup}
              </Link>
            </>
          )}
        </div>

        <div className="lnav-drawer-lang">
          <div className="lnav-drawer-lang-label">Language</div>
          <div className="lnav-drawer-lang-options">
            {languages.map((lang) => (
              <button
                key={lang}
                className={`lnav-drawer-lang-opt ${language === lang ? "active" : ""}`}
                onClick={() => handleLangSwitch(lang)}
              >
                {LANG_LABELS[lang] || lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer so content isn't hidden under fixed nav */}
      <div className="lnav-spacer" />
    </>
  );
};

export default LandingNavbar;
