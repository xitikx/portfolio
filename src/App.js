import { db } from "./firebase/firebaseConfig"; 
import Skills from "./components/Skills";
import Profile from "./components/Profile";
import './App.css';

function App() {
  return (
    <div className="App">
      <Profile />
      <Skills />
    </div>
  );
}

export default App;
