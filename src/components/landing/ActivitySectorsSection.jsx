import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { activitySectorsData } from "../../utils/landingData";

const ActivitySectorsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="landing-sectors">
      <h2>{t.sectors.title}</h2>
      <p className="section-description">{t.sectors.description}</p>
      <div className="sectors-grid">
        {activitySectorsData.map((sector) => (
          <div key={sector.id} className="sector-card">
            <div className="sector-icon">{sector.icon}</div>
            <div className="sector-info">
              <div className="sector-name">{sector.name}</div>
              <div className="sector-count">
                {sector.count} {t.adherents.viewProfile}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitySectorsSection;
