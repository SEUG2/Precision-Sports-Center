import React, { useState } from "react";
import "./About.css";

export default function About() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    alert(`Message sent:\n\n${message || "[empty]"}`);
    setMessage("");
  };

  return (
    <div className="about-page">
      <div className="about-container">
        <section className="about-hero">
          <p className="hero-kicker">Our Story</p>
          <h1>Precision Sports Center</h1>
          <p>
            Precision Sports Center blends elite coaching, sport-specific programming and welcoming community
            spaces to help athletes at every level perform with confidence. From club academies to weekend
            warriors, we focus on skill, recovery and mindset in equal measure.
          </p>
        </section>

        <section className="about-grid">
          <article className="about-card">
            <h3>Coaching & Programs</h3>
            <p>
              Position-specific sessions, youth development labs and performance testing designed by licensed
              coaches who have played and trained at the highest levels.
            </p>
          </article>
          <article className="about-card">
            <h3>Facilities</h3>
            <p>
              Indoor turf, recovery suites and a full-service gym with modern strength & conditioning equipment
              keep athletes prepared for any season.
            </p>
          </article>
          <article className="about-card">
            <h3>Community Impact</h3>
            <p>
              We host leagues, scholarship clinics and mentorship programs so that every athlete feels seen and
              supported on and off the pitch.
            </p>
          </article>
        </section>

        <section className="feedback-card">
          <div>
            <h2>Contact & Feedback</h2>
            <p>Send us a note and our team will reply within one business day.</p>
          </div>
          <form className="feedback-form" onSubmit={(event) => { event.preventDefault(); handleSend(); }}>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your question or feedback..."
            />
            <button type="submit">Send message</button>
          </form>
        </section>
      </div>
    </div>
  );
}
