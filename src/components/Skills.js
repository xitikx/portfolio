import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../styles/Skills.css";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const docRef = doc(db, "Skills", "1");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSkills(docSnap.data().skills || []);
        } else {
          console.error("No document found in 'Skills' collection!");
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="skills-wrapper">
      <div className="skills-container">
        <div className="skills-section">
          <h2 className="skills-heading">My Skills</h2>
          <div className="skills-divider"></div>

          {loading ? (
            <div className="skills-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-card">
                  <div className="skill-icon-card">
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="skill-icon"
                      />
                    ) : (
                      <div className="skill-icon-placeholder">
                        {skill.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <h4 className="skill-name">{skill.name}</h4>
                  <p className="skill-description">
                    {skill.description || "Skill expertise summary"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
