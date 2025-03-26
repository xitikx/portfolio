import React, { useEffect, useState } from "react";
import { fetchCollectionData } from "../firebase/firebaseConfig";
import "../styles/Researches.css";

const Researches = () => {
  const [researches, setResearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResearches = async () => {
      try {
        const data = await fetchCollectionData("Researches");
        setResearches(data || []);
      } catch (error) {
        console.error("Error fetching researches:", error);
      } finally {
        setLoading(false);
      }
    };
    getResearches();
  }, []);

  return (
    <div className="researches-wrapper">
      <div className="researches-container">
        <h2 className="researches-heading">My Research Papers</h2>
        <div className="researches-divider"></div>

        {loading ? (
          <div className="researches-loading">
            <div className="loading-spinner"></div>
          </div>
        ) : researches.length > 0 ? (
          <div className="researches-grid">
            {researches.map((research, index) => (
              <div key={index} className="research-card">
                <div className="research-image-container">
                  {research.image ? (
                    <img src={research.image} alt={research.title} className="research-image" />
                  ) : (
                    <div className="research-image-placeholder">
                      {research.title || "Untitled Research"}
                    </div>
                  )}
                </div>
                <div className="research-content">
                  {/* <h3 className="research-title">{research.title || "Untitled"}</h3> */}
                  <p className="research-description">{research.description || "No description available."}</p>
                  <div className="research-metadata">
                    <p><span className="meta-label">Year:</span> {research.year || "N/A"}</p>
                    <p><span className="meta-label">Authors:</span> {research.authors?.join(", ") || "Unknown"}</p>
                    <p><span className="meta-label">Conference:</span> {research.conference?.join(", ") || "N/A"}</p>
                  </div>
                  <div className="research-links">
                    {research.githubLink && (
                      <a
                        href={research.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="research-link github-link"
                      >
                        GitHub
                      </a>
                    )}
                    {research.link && (
                      <a
                        href={research.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="research-link read-more-link"
                      >
                        Read More
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-researches">No research papers available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Researches;