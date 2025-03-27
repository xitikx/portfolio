import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../styles/SkillsAndHobbies.css";

const SkillsAndHobbies = () => {
  const [skills, setSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Skills
        const skillsDocRef = doc(db, "Skills", "1");
        const skillsDocSnap = await getDoc(skillsDocRef);
        if (skillsDocSnap.exists()) {
          const skillsData = skillsDocSnap.data();
          console.log("Skills Data:", skillsData); // Debug: Verify skills data
          setSkills(skillsData.skills || []);
        } else {
          console.error("No document found in 'Skills' collection with ID '1'");
        }

        // Fetch Hobbies
        const hobbiesDocRef = doc(db, "Hobbies", "1");
        const hobbiesDocSnap = await getDoc(hobbiesDocRef);
        if (hobbiesDocSnap.exists()) {
          const hobbiesData = hobbiesDocSnap.data();
          console.log("Hobbies Data:", hobbiesData); // Debug: Verify hobbies data
          const hobbiesArray = hobbiesData.hobbies || [];
          
          // Ensure hobbies are in the correct format
          const formattedHobbies = hobbiesArray.map((hobby) => {
            if (typeof hobby === "string") {
              return { name: hobby, description: "", icon: "" }; // Handle string-only case
            } else if (typeof hobby === "object" && hobby !== null) {
              return {
                name: hobby.name || "Unnamed Hobby",
                description: hobby.description || "",
                icon: hobby.icon || "",
              };
            }
            return { name: "Unnamed Hobby", description: "", icon: "" }; // Fallback
          });

          console.log("Formatted Hobbies:", formattedHobbies); // Debug: Check formatted data
          setHobbies(formattedHobbies);
        } else {
          console.error("No document found in 'Hobbies' collection with ID '1'");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="skills-hobbies-wrapper">
      <div className="skills-hobbies-container">
        <div className="skills-hobbies-section">
          <h2 className="section-heading">Skills & Hobbies</h2>
          <div className="section-divider"></div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="content-wrapper">
              {/* Skills Section */}
              <div className="skills-content">
                <h3 className="sub-heading">My Skills</h3>
                <div className="skills-grid">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <div key={index} className="skill-card">
                        <div className="icon-card">
                          {skill.icon ? (
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="icon"
                            />
                          ) : (
                            <div className="icon-placeholder">
                              {skill.name ? skill.name.charAt(0).toUpperCase() : "S"}
                            </div>
                          )}
                        </div>
                        <h4 className="item-name">{skill.name || "Unnamed Skill"}</h4>
                        <p className="item-description">
                          {skill.description || "Skill expertise summary"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="no-items">No skills available yet.</p>
                  )}
                </div>
              </div>

              {/* Hobbies Section */}
              <div className="hobbies-content">
                <h3 className="sub-heading">My Hobbies</h3>
                <div className="hobbies-grid">
                  {hobbies.length > 0 ? (
                    hobbies.map((hobby, index) => (
                      <div key={index} className="hobby-card">
                        <div className="icon-card">
                          {hobby.icon ? (
                            <img
                              src={hobby.icon}
                              alt={hobby.name}
                              className="icon"
                            />
                          ) : (
                            <div className="icon-placeholder">
                              {hobby.name ? hobby.name.charAt(0).toUpperCase() : "H"}
                            </div>
                          )}
                        </div>
                        <h4 className="item-name">
                          {hobby.name || "Unnamed Hobby"}
                        </h4>
                        <p className="item-description">
                          {hobby.description || "Enjoyable pastime activity"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="no-items">No hobbies available yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsAndHobbies;