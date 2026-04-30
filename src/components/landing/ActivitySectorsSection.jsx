import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { activitySectorsData } from "../../utils/landingData";

const ActivitySectorsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="landing-sectors">
      <span className="section-label">{t.sectors.label || "Explore"}</span>
      <h2 className="section-title">{t.sectors.title}</h2>
      <p className="section-description">{t.sectors.description}</p>
      <div className="sectors-grid">
        {activitySectorsData.map((sector, index) => {
          const gradientIndex = (index % 9) + 1;
          return (
            <div key={sector.id} className="sector-card">
              <div
                className={`sector-img-placeholder`}
              >
                <img src={sector.icon} alt={sector.name} />
              </div>
              <div className="sector-info">
                <div className="sector-name">{sector.name}</div>
                <div className="sector-count">
                  {sector.count} {t.adherents.viewProfile}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ActivitySectorsSection;
