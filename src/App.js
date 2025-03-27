import AboutMe from "./components/AboutMe";
import Navbar from "./components/Navbar";
import "./App.css";
import SkillsAndHobbies from "./components/SkillsAndHobbies";
import ProjectsAndResearches from "./components/ProjectsAndResearches";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="about-me">
        <AboutMe />
      </div>
      <div id="skills">
        <SkillsAndHobbies />
      </div>
      <div id="projects">
        <ProjectsAndResearches />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

export default App;