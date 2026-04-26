import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="landing-hero" id="hero">
      <h1>{t.hero.title}</h1>
      <p>{t.hero.subtitle}</p>
      <div className="hero-buttons">
        <Link to="/login">
          <button className="hero-cta">{t.hero.cta}</button>
        </Link>
        <button className="hero-secondary" onClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
          }
        }}>
          {t.hero.cta_secondary}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
