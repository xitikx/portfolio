import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa"; // Changed FaTwitter to FaInstagram
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");

    try {
      const response = await fetch("https://formspree.io/f/xblgkvwz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("An error occurred. Please try again later.");
    }

    setTimeout(() => setFormStatus(""), 3000); // Clear status after 3 seconds
  };

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/xitikx", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/ritika-sharma-b2ba72271/", label: "LinkedIn" },
    { icon: <FaInstagram />, url: "https://instagram.com/_.xitikx._", label: "Instagram" }, // Changed Twitter to Instagram
    { icon: <FaEnvelope />, url: "mailto:your.cheimonas31@gmail.com", label: "Email" },
  ];

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <div className="contact-section">
          <h2 className="section-heading">Contact Me</h2>
          <div className="section-divider"></div>

          <div className="contact-content">
            {/* Form Section */}
            <div className="form-container">
              <h3 className="sub-heading">Send a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your Message"
                    rows="5"
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">
                  Send Message
                </button>
                {formStatus && <p className="form-status">{formStatus}</p>}
              </form>
            </div>

            {/* Social Links Section */}
            <div className="social-container">
              <h3 className="sub-heading">Connect with Me</h3>
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <span className="social-icon">{link.icon}</span>
                    <span className="social-label">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;