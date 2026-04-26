import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { adherentsData } from "../../utils/landingData";
import AdherentModal from "./AdherentModal";

const AdherentsSection = () => {
  const { t } = useLanguage();
  const [selectedAdherent, setSelectedAdherent] = useState(null);

  return (
    <>
      <section className="landing-adherents">
        <h2>{t.adherents.title}</h2>
        <p className="section-description">{t.adherents.description}</p>
        <div className="adherents-grid">
          {adherentsData.map((adherent) => (
            <div
              key={adherent.id}
              className="adherent-card"
              onClick={() => setSelectedAdherent(adherent)}
            >
              <div className="adherent-image">{adherent.image}</div>
              <div className="adherent-info">
                <div className="adherent-header">
                  <div className="adherent-name">{adherent.name}</div>
                  {adherent.verified && (
                    <span className="verified-badge">✓</span>
                  )}
                </div>
                <div className="adherent-service">{adherent.service}</div>
                <div className="adherent-rating">
                  <div className="rating-stars">
                    {"★".repeat(Math.floor(adherent.rating))}
                    {adherent.rating % 1 !== 0 && "½"}
                  </div>
                  <div className="rating-value">{adherent.rating}</div>
                  <div className="rating-reviews">
                    ({adherent.reviews} reviews)
                  </div>
                </div>
                <button className="adherent-btn">
                  {t.adherents.viewProfile}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedAdherent && (
        <AdherentModal
          adherent={selectedAdherent}
          onClose={() => setSelectedAdherent(null)}
        />
      )}
    </>
  );
};

export default AdherentsSection;
