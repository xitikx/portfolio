import React, { useEffect, useState } from "react";
import { fetchSingleDocument } from "../firebase/firebaseConfig";
import "../styles/Hobbies.css";

const Hobbies = () => {
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHobbies = async () => {
      try {
        const hobbiesData = await fetchSingleDocument("Hobbies", "1");
        if (hobbiesData && hobbiesData.hobbies) {
          setHobbies(hobbiesData.hobbies);
        } else {
          console.log("No hobbies found.");
        }
      } catch (error) {
        console.error("Error fetching hobbies:", error);
      } finally {
        setLoading(false);
      }
    };
    getHobbies();
  }, []);

  return (
    <div className="hobbies-wrapper">
      <div className="hobbies-container">
        <div className="hobbies-section">
          <h2 className="hobbies-heading">My Hobbies</h2>
          <div className="hobbies-divider"></div>

          {loading ? (
            <div className="hobbies-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : hobbies.length > 0 ? (
            <div className="hobbies-grid">
              {hobbies.map((hobby, index) => (
                <div key={index} className="hobby-card">
                  <div className="hobby-icon-card">
                    {hobby.icon ? (
                      <img
                        src={hobby.icon}
                        alt={hobby.name}
                        className="hobby-icon"
                      />
                    ) : (
                      <div className="hobby-icon-placeholder">
                        {hobby.name ? hobby.name.charAt(0).toUpperCase() : "H"}
                      </div>
                    )}
                  </div>
                  <h4 className="hobby-name">
                    {hobby.name || "Unnamed Hobby"}
                  </h4>
                  <p className="hobby-description">
                    {hobby.description || "Enjoyable pastime activity"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-hobbies">No hobbies available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hobbies;
