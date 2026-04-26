import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { statisticsData } from "../../utils/landingData";

const StatisticsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="landing-statistics">
      <h2>{t.statistics.title}</h2>
      <div className="statistics-grid">
        {statisticsData.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">
              {stat.label === "adherents" && t.statistics.adherents}
              {stat.label === "services" && t.statistics.services}
              {stat.label === "sectors" && t.statistics.sectors}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
