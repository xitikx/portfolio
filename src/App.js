import { db } from "./firebase/firebaseConfig"; 
import Skills from "./components/Skills";
import Profile from "./components/Profile";
import Hobbies from "./components/Hobbies";
import Projects from "./components/Projects";
import './App.css';

function App() {
  return (
    <div className="App">
      <Profile />
      <Skills />
      <Hobbies />
      <Projects />
    </div>
  );
}

export default App;
