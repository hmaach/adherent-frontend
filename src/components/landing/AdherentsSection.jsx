import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { adherentsData } from "../../utils/landingData";
import AdherentModal from "./AdherentModal";

const AVATAR_GRADS = [
  "avatar-grad-1",
  "avatar-grad-2",
  "avatar-grad-3",
  "avatar-grad-4",
  "avatar-grad-5",
  "avatar-grad-6",
  "avatar-grad-7",
  "avatar-grad-8",
];

const AdherentsSection = () => {
  const { t } = useLanguage();
  const [selectedAdherent, setSelectedAdherent] = useState(null);

  return (
    <>
      <section className="landing-adherents">
        <span className="section-label">
          {t.adherents.label || "Our Community"}
        </span>
        <h2 className="section-title">{t.adherents.title}</h2>
        <p className="section-description">{t.adherents.description}</p>
        <div className="adherents-grid">
          {adherentsData.map((adherent, index) => {
            const gradClass = AVATAR_GRADS[index % AVATAR_GRADS.length];
            const initial = adherent.name?.[0]?.toUpperCase() || "A";
            return (
              <div
                key={adherent.id}
                className="adherent-card"
                onClick={() => setSelectedAdherent(adherent)}
              >
                <div className={`adherent-avatar-placeholder ${gradClass}`}>
                  <span>{initial}</span>
                </div>
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
            );
          })}
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
