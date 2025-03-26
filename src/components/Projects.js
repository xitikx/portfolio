import React, { useEffect, useState } from "react";
import { fetchCollectionData } from "../firebase/firebaseConfig";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "../styles/Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const projectsData = await fetchCollectionData("Projects");
        if (projectsData) {
          setProjects(projectsData);
        } else {
          console.log("No projects found.");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  return (
    <div className="projects-wrapper">
      <div className="projects-container">
        <h2 className="projects-heading">My Projects</h2>
        <div className="projects-divider"></div>

        {loading ? (
          <div className="projects-loading">
            <div className="loading-spinner"></div>
          </div>
        ) : projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image-container">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                  ) : (
                    <div className="project-image-placeholder">
                      {project.title.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="tech-stack">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link github-link"
                    >
                      <FaGithub className="link-icon" /> Code
                    </a>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link live-link"
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
          <p className="no-projects">No projects available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
