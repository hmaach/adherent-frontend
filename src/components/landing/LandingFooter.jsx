import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { footerLinks } from "../../utils/landingData";

const LandingFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="landing-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            Adh<span>er</span>ent
          </div>
          <p>{t.footer.description}</p>
        </div>

        {footerLinks.map((section, index) => (
          <div key={index} className="footer-section">
            <h3>
              {t.footer[section.category.toLowerCase().replace(" ", "")] ||
                section.category}
            </h3>
            <div className="footer-links">
              {section.links.map((link, linkIndex) => (
                <Link key={linkIndex} to={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <div className="footer-socials">
          <a
            href="#"
            className="social-link"
            aria-label="Facebook"
            rel="noopener noreferrer"
          >
            f
          </a>
          <a
            href="#"
            className="social-link"
            aria-label="X / Twitter"
            rel="noopener noreferrer"
          >
            𝕏
          </a>
          <a
            href="#"
            className="social-link"
            aria-label="LinkedIn"
            rel="noopener noreferrer"
          >
            in
          </a>
          <a
            href="#"
            className="social-link"
            aria-label="Instagram"
            rel="noopener noreferrer"
          >
            ig
          </a>
        </div>
        <p>
          © {new Date().getFullYear()} Adherent. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
