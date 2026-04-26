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
        <h2>{t.about.title}</h2>
        <p className="section-description">{t.about.description}</p>
        <div className="team-grid">
          {teamData.map((member) => (
            <div
              key={member.id}
              className="team-card"
              onClick={() => setSelectedMember(member)}
            >
              <div className="team-image">{member.image}</div>
              <div className="team-name">{member.firstName} {member.lastName}</div>
              <div className="team-role">{member.role}</div>
              <p className="team-bio">{member.bio}</p>
              <button className="team-btn">{t.about.viewMore}</button>
            </div>
          ))}
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
