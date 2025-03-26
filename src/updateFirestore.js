import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const updateSkills = async () => {
  const skillsRef = doc(db, "Skills", "1");
  await setDoc(skillsRef, {
    skills: [
      { name: "React", iconUrl: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/react/react-original.svg" },
      { name: "Javascript", iconUrl: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/javascript/javascript-original.svg" },
      { name: "CSS", iconUrl: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/css3/css3-original.svg" },
      { name: "AWS", iconUrl: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/amazonwebservices/amazonwebservices-original.svg" },
      { name: "REST APIs", iconUrl: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/express/express-original.svg" },
      { name: "Firebase Auth", iconUrl: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/firebase/firebase-plain.svg" },
      { name: "Firebase Firestore", iconUrl: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/firebase/firebase-plain.svg" },
    ],
  });
  console.log("Skills updated in Firestore!");
};

updateSkills();