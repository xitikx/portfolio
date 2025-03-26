import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { fetchSingleDocument } from "../firebase/firebaseConfig";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [currentInterest, setCurrentInterest] = useState(0);

  useEffect(() => {
    const getProfile = async () => {
      const profileData = await fetchSingleDocument(
        "Introduction",
        "COmHOb0NxKmHH589bxgN"
      );
      if (profileData) {
        setProfile(profileData);
      } else {
        console.log("No profile data found.");
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    if (profile?.techInterests) {
      const interval = setInterval(() => {
        setCurrentInterest((prev) => (prev + 1) % profile.techInterests.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [profile]);

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <section className="profile-card">
          {profile ? (
            <div className="profile-content">
              <div className="profile-image-container">
                {profile.profilePicture ? (
                  <img
                    src={profile.profilePicture}
                    alt="Ritika Sharma"
                    className="profile-image"
                  />
                ) : (
                  <div className="profile-image-placeholder">No Image</div>
                )}
              </div>
              <div className="profile-details">
                <h1 className="profile-title">
                  Hey, I am <span className="highlight">Ritika Sharma</span>
                </h1>
                <div className="social-icons">
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="social-icon" />
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="social-icon" />
                    </a>
                  )}
                  {profile.twitter && (
                    <a
                      href={profile.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="social-icon" />
                    </a>
                  )}
                </div>
                {profile.funFact && (
                  <p className="fun-fact-text">{profile.funFact}</p>
                )}
                {profile.techInterests &&
                  Array.isArray(profile.techInterests) && (
                    <p className="tech-interests-text">
                      I work with{" "}
                      <span className="tech-interest-highlight">
                        {profile.techInterests[currentInterest]}
                      </span>
                    </p>
                  )}
              </div>
            </div>
          ) : (
            <div className="loading-spinner">
              <div className="spinner-inner"></div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
