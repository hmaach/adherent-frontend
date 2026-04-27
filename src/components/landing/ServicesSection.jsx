import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { servicesData } from "../../utils/landingData";

const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="landing-services">
      <span className="section-label">
        {t.services.label || "What We Offer"}
      </span>
      <h2 className="section-title">{t.services.title}</h2>
      <p className="section-description">{t.services.description}</p>
      <div className="services-grid">
        {servicesData.map((service, index) => {
          const gradientIndex = (index % 9) + 1;
          const initial = service.name?.[0]?.toUpperCase() || "S";
          return (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <div
                  className={`service-img-placeholder service-img-${gradientIndex}`}
                >
                  <span>{initial}</span>
                </div>
                <div className="service-details">
                  <div className="service-name">{service.name}</div>
                  <div className="service-category">{service.category}</div>
                </div>
              </div>
              <div className="service-providers">
                {service.providers} {t.adherents.viewProfile}
              </div>
              <button className="service-btn">{t.services.discover}</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
