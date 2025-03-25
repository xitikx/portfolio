import React, { useEffect, useState } from "react";
import { fetchSingleDocument } from "../firebase/firebaseConfig";

const Hobbies = () => {
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    const getHobbies = async () => {
      const hobbiesData = await fetchSingleDocument("Hobbies", "1"); // Use the document ID
      if (hobbiesData) {
        setHobbies(hobbiesData.hobbies);
      } else {
        console.log("No hobbies found.");
      }
    };
    getHobbies();
  }, []);

  return (
    <div>
      <h2>My Hobbies</h2>
      <ul>
        {hobbies.length > 0 ? (
          hobbies.map((hobby, index) => <li key={index}>{hobby}</li>)
        ) : (
          <p>No hobbies available.</p>
        )}
      </ul>
    </div>
  );
};

export default Hobbies;
