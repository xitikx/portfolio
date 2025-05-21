import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { fetchSingleDocument } from "../firebase/firebaseConfig";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaBaby,
  FaSchool,
  FaGraduationCap,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";
import "../styles/AboutMe.css";

const AboutMe = () => {
  const [profile, setProfile] = useState(null);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [currentInterest, setCurrentInterest] = useState(0);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingTimeline, setLoadingTimeline] = useState(true);

  // Fetch Profile Data
  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileData = await fetchSingleDocument(
          "Introduction",
          "COmHOb0NxKmHH589bxgN"
        );
        setProfile(profileData || {});
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoadingProfile(false);
      }
    };
    getProfile();
  }, []);

  // Rotate Tech Interests
  useEffect(() => {
    if (profile?.techInterests?.length) {
      const interval = setInterval(() => {
        setCurrentInterest((prev) => (prev + 1) % profile.techInterests.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [profile]);

  // Fetch Timeline Data
  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Timeline"));
        const events = querySnapshot.docs.map((doc) => doc.data());
        events.sort((a, b) => a.year - b.year);
        setTimelineEvents(events);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      } finally {
        setLoadingTimeline(false);
      }
    };
    fetchTimeline();
  }, []);

  const getEventIcon = (title) => {
    if (!title) return <FaStar />;
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("birth")) return <FaBaby />;
    if (lowerTitle.includes("school")) return <FaSchool />;
    if (lowerTitle.includes("college") || lowerTitle.includes("graduation"))
      return <FaGraduationCap />;
    if (lowerTitle.includes("job") || lowerTitle.includes("work"))
      return <FaBriefcase />;
    return <FaStar />;
  };

  return (
    <div className="about-me-wrapper">
      <div className="about-me-container">
        <div className="about-me-section">
          <h2 className="section-heading">About Me</h2>
          <div className="section-divider"></div>

          {/* Profile Section */}
          <div className="profile-content">
            {loadingProfile ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
              </div>
            ) : profile ? (
              <div className="profile-inner">
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
                  {profile.funFact && (
                    <p className="fun-fact-text">{profile.funFact}</p>
                  )}
                  {profile.techInterests?.length > 0 && (
                    <p className="tech-interests-text">
                      // I work with{" "}
                      <span className="tech-interest-highlight">
                        {profile.techInterests[currentInterest]}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="no-items">No profile data available yet.</p>
            )}
          </div>

          {/* Timeline Section */}
          <div className="timeline-content">
            <h3 className="sub-heading">My Journey</h3>
            {loadingTimeline ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
              </div>
            ) : timelineEvents.length > 0 ? (
              <div className="timeline">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="timeline-item" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="timeline-icon">
                      {event.icon ? (
                        <img src={event.icon} alt={event.title} className="icon" />
                      ) : (
                        <div className="icon-placeholder">{getEventIcon(event.title)}</div>
                      )}
                    </div>
                    <div className="timeline-details">
                      <div className="timeline-date">
                        {event.year} {event.endYear ? `- ${event.endYear}` : ""}
                      </div>
                      <h4 className="item-title">{event.title || "Untitled Event"}</h4>
                      <p className="item-description">
                        {event.description || "No description available."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-items">No timeline events available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
