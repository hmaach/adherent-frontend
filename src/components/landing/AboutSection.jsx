import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { teamData } from "../../utils/landingData";
import TeamMemberModal from "./TeamMemberModal";

const AboutSection = () => {
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      <section className="landing-about" id="about">
        <span
          className="section-label"
          style={{ color: "rgba(255,140,0,0.9)" }}
        >
          {t.about.label || "The Team"}
        </span>
        <h2 className="section-title" style={{ color: "#fff" }}>
          {t.about.title}
        </h2>
        <p className="section-description">{t.about.description}</p>
        <div className="team-grid">
          {teamData.map((member) => {
            const initial =
              member.firstName?.[0]?.toUpperCase() ||
              member.lastName?.[0]?.toUpperCase() ||
              "T";
            return (
              <div
                key={member.id}
                className="team-card"
                onClick={() => setSelectedMember(member)}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    className="team-image"
                    alt={`${member.firstName} ${member.lastName}`}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="team-avatar-placeholder"
                  style={{ display: member.image ? "none" : "flex" }}
                >
                  {initial}
                </div>

                <div className="team-name">
                  {member.firstName} {member.lastName}
                </div>
                <div className="team-role">{member.role}</div>
                <p className="team-bio">{member.bio}</p>
                <button className="team-btn">{t.about.viewMore}</button>
              </div>
            );
          })}
        </div>
      </section>

      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
};

export default AboutSection;
