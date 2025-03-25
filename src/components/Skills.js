import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const docRef = doc(db, "Skills", "1"); // Use the same document ID as in Firestore
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSkills(docSnap.data().skills);
      } else {
        console.log("No such document!");
      }
    };

    fetchSkills();
  }, []);

  return (
    <div>
      <h2>My Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
