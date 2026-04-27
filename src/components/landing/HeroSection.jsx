import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="landing-hero" id="hero">
      <div className="hero-eyebrow">
        {t.hero.eyebrow || "Professional Network"}
      </div>

      <h1>
        {t.hero.title_before || ""}{" "}
        <span className="hero-accent">
          {t.hero.title_accent || t.hero.title}
        </span>{" "}
        {t.hero.title_after || ""}
      </h1>

      <p>{t.hero.subtitle}</p>

      <div className="hero-buttons">
        <Link to="/login">
          <button className="hero-cta">{t.hero.cta}</button>
        </Link>
        <button className="hero-secondary" onClick={scrollToAbout}>
          {t.hero.cta_secondary}
        </button>
      </div>

      <div className="hero-scroll">
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
};

export default HeroSection;
