import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { fetchSingleDocument } from "../firebase/firebaseConfig";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [currentInterest, setCurrentInterest] = useState(0);

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

  useEffect(() => {
    if (profile?.techInterests) {
      const interval = setInterval(() => {
        setCurrentInterest((prev) => 
          (prev + 1) % profile.techInterests.length
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [profile]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            {profile ? (
              <>
                <div className="hero-text">
                  <h1 className="hero-title">
                    Hi, I'm <span className="highlight">{profile.name}</span>
                  </h1>
                </div>
                <div className="social-icons">
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="social-icon" />
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="social-icon" />
                    </a>
                  )}
                  {profile.twitter && (
                    <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter className="social-icon" />
                    </a>
                  )}
                </div>
                <button className="see-work-btn" onClick={scrollToProjects}>
                  View My Work <FaArrowDown className="btn-icon" />
                </button>
              </>
            ) : (
              <div className="loading-spinner"></div>
            )}
          </div>
        </section>

        {/* Profile Section */}
        {profile && (
          <section className="profile-section">
            <div className="profile-content">
              <div className="profile-image-container">
                {profile.profilePicture ? (
                  <img
                    src={profile.profilePicture}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : (
                  <div className="profile-image-placeholder">No image</div>
                )}
              </div>
              <div className="profile-details">
                {profile.funFact && (
                  <div className="fun-fact">
                    <p className="fun-fact-text">{profile.funFact}</p>
                  </div>
                )}
                {profile.techInterests && Array.isArray(profile.techInterests) && (
                  <div className="tech-interests-flow">
                    <p className="tech-interests-text">
                      I work with{" "}
                      <span className="tech-interest-highlight">
                        {profile.techInterests[currentInterest]}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Profile;