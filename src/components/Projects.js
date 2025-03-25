import React, { useEffect, useState } from "react";
import { fetchCollectionData } from "../firebase/firebaseConfig";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const projectsData = await fetchCollectionData("Projects");
      if (projectsData) {
        setProjects(projectsData);
      } else {
        console.log("No projects found.");
      }
    };
    getProjects();
  }, []);

  return (
    <div>
      <h2>My Projects</h2>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Tech Stack:</strong> {project.techStack.join(", ")}</p>
            {project.imageUrl && <img src={project.imageUrl} alt={project.title} width="200" />}
            <p>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
              {project.liveDemo && (
                <>
                  {" | "}
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo</a>
                </>
              )}
            </p>
          </div>
        ))
      ) : (
        <p>No projects available.</p>
      )}
    </div>
  );
};

export default Projects;
