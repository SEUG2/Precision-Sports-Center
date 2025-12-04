import React from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import "./Contact.css";

const infoBlocks = [
  {
    icon: MapPin,
    title: "Address",
    body: [
      "Ghana",
      "Greater Accra - Anyaa Awoshie",
      "AN 44 Deeper Life Street",
    ],
  },
  {
    icon: Phone,
    title: "Phone",
    body: ["+233 50 399 8502"],
    link: "tel:+233503998502",
  },
  {
    icon: Mail,
    title: "Email",
    body: ["xorlaliaddogoh@gmail.com"],
    link: "mailto:xorlaliaddogoh@gmail.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    body: [
      "Monday - Friday: 9:00 AM - 8:00 PM",
      "Saturday: 10:00 AM - 6:00 PM",
      "Sunday: 11:00 AM - 5:00 PM",
    ],
  },
];

const helpLinks = ["Track your order", "Return policy", "Size guide", "FAQ"];

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget).entries());
    console.log("Contact form submitted", formData);
  };

  return (
    <section className="contact-page bg-background">
      <div className="contact-container">
        <header className="contact-hero">
          <p className="contact-eyebrow">Support Team</p>
          <h1>Get in touch</h1>
          <p>
            Have a question about our products or need help with your order? We are here to help you find the perfect
            sports equipment.
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-info-panel">
            {infoBlocks.map(({ icon: Icon, title, body, link }) => (
              <article className="info-card" key={title}>
                <span className="info-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <div>
                  <h3>{title}</h3>
                  {body.map((line) => (
                    <p key={line}>
                      {link ? (
                        <a href={link} target="_blank" rel="noreferrer">
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </article>
            ))}

            <div className="help-card">
              <h4>Quick help</h4>
              <div className="help-actions">
                {helpLinks.map((item) => (
                  <button type="button" className="help-btn" key={item}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <h2>Send us a message</h2>
            <p className="form-subhead">Fill out the form and we will respond within one business day.</p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label className="form-field">
                  <span>First name</span>
                  <input type="text" name="firstName" placeholder="Your first name" required />
                </label>
                <label className="form-field">
                  <span>Last name</span>
                  <input type="text" name="lastName" placeholder="Your last name" required />
                </label>
              </div>

              <div className="form-grid">
                <label className="form-field">
                  <span>Email address</span>
                  <input type="email" name="email" placeholder="your.email@example.com" required />
                </label>
                <label className="form-field">
                  <span>Phone number</span>
                  <input type="tel" name="phone" placeholder="+233 50 399 8502" />
                </label>
              </div>

              <label className="form-field">
                <span>Subject</span>
                <select name="subject" defaultValue="">
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="general">General inquiry</option>
                  <option value="product">Product question</option>
                  <option value="order">Order support</option>
                  <option value="return">Returns & exchanges</option>
                  <option value="technical">Technical support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="form-field">
                <span>Order number (optional)</span>
                <input type="text" name="orderNumber" placeholder="e.g., PSC-12345" />
              </label>

              <label className="form-field">
                <span>Message</span>
                <textarea name="message" placeholder="How can we help?" rows={5} required />
              </label>

              <button type="submit" className="btn btn-primary contact-submit">
                <Send size={18} />
                Send message
              </button>
              <p className="form-note">We typically respond within 24 hours during business days.</p>
            </form>
          </div>
        </div>

        <div className="contact-map-card">
          <div>
            <h2>Visit our store</h2>
            <p>Drop by to experience our latest gear and speak with a specialist.</p>
          </div>
          <div className="map-placeholder">
            <MapPin size={32} />
            <p>Interactive map will appear here.</p>
            <small>123 Sports Avenue, Athletic District, Sports City</small>
          </div>
        </div>
      </div>
    </section>
  );
}