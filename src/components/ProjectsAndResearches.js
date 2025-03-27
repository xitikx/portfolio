import React, { useEffect, useState } from "react";
import { fetchCollectionData } from "../firebase/firebaseConfig";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "../styles/ProjectsAndResearches.css";

const ProjectsAndResearches = () => {
  const [projects, setProjects] = useState([]);
  const [researches, setResearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects"); // "projects" or "researches"

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Projects
        const projectsData = await fetchCollectionData("Projects");
        setProjects(projectsData || []);

        // Fetch Researches
        const researchesData = await fetchCollectionData("Researches");
        setResearches(researchesData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="projects-researches-wrapper">
      <div className="projects-researches-container">
        <div className="projects-researches-section">
          <h2 className="section-heading">Projects & Researches</h2>
          <div className="section-divider"></div>

          {/* Tab Switcher */}
          <div className="tab-switcher">
            <button
              className={`tab-button ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => handleTabSwitch("projects")}
            >
              Projects
            </button>
            <button
              className={`tab-button ${activeTab === "researches" ? "active" : ""}`}
              onClick={() => handleTabSwitch("researches")}
            >
              Researches
            </button>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="content-slider">
              {/* Projects Section */}
              <div
                className={`content-slide ${activeTab === "projects" ? "active" : ""}`}
              >
                {projects.length > 0 ? (
                  <div className="projects-grid">
                    {projects.map((project, index) => (
                      <div key={index} className="project-card">
                        <div className="image-container">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="image"
                            />
                          ) : (
                            <div className="image-placeholder">
                              {project.title.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="content">
                          <h3 className="item-title">{project.title}</h3>
                          <p className="item-description">{project.description}</p>
                          <div className="tech-stack">
                            {project.techStack.map((tech, i) => (
                              <span key={i} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="links">
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link github-link"
                            >
                              <FaGithub className="link-icon" /> Code
                            </a>
                            {project.liveDemo && (
                              <a
                                href={project.liveDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link live-link"
                              >
                                <FaExternalLinkAlt className="link-icon" /> Live
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-items">No projects available yet.</p>
                )}
              </div>

              {/* Researches Section */}
              <div
                className={`content-slide ${activeTab === "researches" ? "active" : ""}`}
              >
                {researches.length > 0 ? (
                  <div className="researches-grid">
                    {researches.map((research, index) => (
                      <div key={index} className="research-card">
                        <div className="image-container">
                          {research.image ? (
                            <img
                              src={research.image}
                              alt={research.title}
                              className="image"
                            />
                          ) : (
                            <div className="image-placeholder">
                              {research.title ? research.title.charAt(0) : "R"}
                            </div>
                          )}
                        </div>
                        <div className="content">
                          <h3 className="item-title">{research.title || "Untitled"}</h3>
                          <p className="item-description">
                            {research.description || "No description available."}
                          </p>
                          <div className="metadata">
                            <p>
                              <span className="meta-label">Year:</span> {research.year || "N/A"}
                            </p>
                            <p>
                              <span className="meta-label">Authors:</span>{" "}
                              {research.authors?.join(", ") || "Unknown"}
                            </p>
                            <p>
                              <span className="meta-label">Conference:</span>{" "}
                              {research.conference?.join(", ") || "N/A"}
                            </p>
                          </div>
                          <div className="links">
                            {research.githubLink && (
                              <a
                                href={research.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link github-link"
                              >
                                GitHub
                              </a>
                            )}
                            {research.link && (
                              <a
                                href={research.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link read-more-link"
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
                  <p className="no-items">No research papers available yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsAndResearches;