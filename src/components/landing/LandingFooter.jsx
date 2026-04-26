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
          <h3>Adherent</h3>
          <p>{t.footer.description}</p>
        </div>

        {footerLinks.map((section, index) => (
          <div key={index} className="footer-section">
            <h3>{t.footer[section.category.toLowerCase().replace(" ", "")] || section.category}</h3>
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

      <div className="footer-bottom">
        <div className="footer-socials">
          <a href="#" className="social-link">
            f
          </a>
          <a href="#" className="social-link">
            𝕏
          </a>
          <a href="#" className="social-link">
            in
          </a>
          <a href="#" className="social-link">
            ig
          </a>
        </div>
        <p>© 2024 Adherent. {t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default LandingFooter;
