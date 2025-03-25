import React, { useEffect, useState } from "react";
import { fetchSingleDocument } from "../firebase/firebaseConfig";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const profileData = await fetchSingleDocument("Introduction", "COmHOb0NxKmHH589bxgN");
      if (profileData) {
        setProfile(profileData);
      } else {
        console.log("No profile data found.");
      }
    };
    getProfile();
  }, []);

  return (
    <div>
      <h2>About Me</h2>
      {profile ? (
        <>
          <p>{profile.aboutMe}</p>
          {profile.profilePicture ? (
            <img src={profile.profilePicture} alt="Profile" width="150" />
          ) : (
            <p>No profile picture available.</p>
          )}
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
