import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle, faInstagram, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import logo from "../../img/logo.png";

export default function SiteFooter() {
  const popularCategories = [
    "Custom Jerseys",
    "Cricket Custom Jerseys",
    "Football Custom Jerseys",
    "Basketball Custom Jerseys",
    "Best Custom Jerseys",
    "Cricket White Custom Jerseys",
    "Technosport T-Shirts",
  ];

  const infoLinks = [
    { label: "About Us", to: "/about" },
    { label: "Order Process", to: "/about" },
    { label: "Shipping Policy", to: "/contact" },
    { label: "Exchange Policy", to: "/contact" },
    { label: "Privacy Policy", to: "/contact" },
    { label: "Refund Policy", to: "/contact" },
    { label: "Terms of Service", to: "/contact" },
    { label: "Contact us", to: "/contact" },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-column footer-brand">
          <img src={logo} alt="Precision Sports Center" className="footer-logo" />
          <p className="footer-about">Precision Sports Center — gear, coaching & community.</p>
        </div>

        <div className="footer-column footer-categories">
          <h4 className="footer-title">Popular Categories</h4>
          <ul className="footer-list">
            {popularCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>

        <div className="footer-column footer-follow">
          <h4 className="footer-title">Follow Us</h4>
          <div className="footer-social" role="navigation" aria-label="Social links">
            <a href="mailto:xorlaliadogoh@gmail.com" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=your.email@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Gmail"
            >
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a
              href="https://www.instagram.com/precisionsports_gh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://www.tiktok.com/@precisionsports_gh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>
        </div>

        <div className="footer-column footer-policy">
          <h4 className="footer-title">Exchange Policy</h4>
          <p>
            Exchange of a particular product is available in case of sizing issues or if the product is
            found to be defective.
          </p>
        </div>

        <div className="footer-column footer-links">
          <h4 className="footer-title">Links</h4>
          <ul className="footer-list">
            {infoLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <small>Copyright © 2025 Precision Sports Center. All rights reserved.</small>
        <small>Powered by Precision Sports Center</small>
      </div>
    </footer>
  );
}
