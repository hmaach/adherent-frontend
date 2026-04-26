import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import LandingNavbar from "./LandingNavbar";
import HeroSection from "./HeroSection";
import StatisticsSection from "./StatisticsSection";
import ActivitySectorsSection from "./ActivitySectorsSection";
import ServicesSection from "./ServicesSection";
import AdherentsSection from "./AdherentsSection";
import AboutSection from "./AboutSection";
import LandingFooter from "./LandingFooter";
import "./landing.css";

const LandingPage = () => {
  const { language } = useLanguage();

  return (
    <div className="landing-page" dir={language === "ar" ? "rtl" : "ltr"}>
      <LandingNavbar />
      <main>
        <HeroSection />
        <StatisticsSection />
        <ActivitySectorsSection />
        <ServicesSection />
        <AdherentsSection />
        <AboutSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
