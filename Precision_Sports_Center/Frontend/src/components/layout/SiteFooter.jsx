import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faWhatsapp,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../img/logo.png";

export default function SiteFooter() {
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Product Categories", to: "/shop" },
    { label: "New Arrivals", to: "/shop" },
  ];

  const customerServiceLinks = [
    { label: "Shipping Policy", to: "/contact" },
    { label: "Return Policy", to: "/contact" },
    { label: "Refund Policy", to: "/contact" },
    { label: "Terms of Service", to: "/contact" },
    { label: "Order Tracking", to: "/contact" },
  ];

  const contactInfo = {
    phone: "0503998502",
    phoneAlt: null,
    email: "xorlaliaddogoh@gmail.com",
    address: "Accra, Ghana",
  };

  const socialLinks = [
    {
      icon: faWhatsapp,
      url: "https://wa.me/233549807848",
      label: "WhatsApp",
    },
    {
      icon: faInstagram,
      url: "https://www.instagram.com/precisionsports_gh",
      label: "Instagram",
    },
    {
      icon: faTiktok,
      url: "https://www.tiktok.com/@precisionsports_gh",
      label: "TikTok",
    },
  ];

  const handleFooterNav = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        {/* Brand Column */}
        <div className="footer-column footer-brand">
          <img src={logo} alt="Precision Sports Center" className="footer-logo" />
          <p className="footer-about">
            Precision Sports Center — Your trusted source for premium sports gear, equipment, and
            accessories. Quality products for athletes and sports enthusiasts.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column footer-quick-links">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-list">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} onClick={handleFooterNav}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service Column */}
        <div className="footer-column footer-customer-service">
          <h4 className="footer-title">Customer Service</h4>
          <ul className="footer-list">
            {customerServiceLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} onClick={handleFooterNav}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="footer-column footer-contact">
          <h4 className="footer-title">Contact Info</h4>
          <div className="contact-details">
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <div className="contact-text">
                <a href={`tel:+233${contactInfo.phone.replace(/\s/g, "")}`}>
                  Tel: {contactInfo.phone}
                </a>
                {contactInfo.phoneAlt && (
                  <a href={`tel:+233${contactInfo.phoneAlt.replace(/\s/g, "")}`}>
                    {contactInfo.phoneAlt}
                  </a>
                )}
              </div>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <div className="contact-text">
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              <div className="contact-text">
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="footer-social-section">
            <h5 className="social-title">Follow Us</h5>
            <div className="footer-social" role="navigation" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-link"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <small>Copyright © 2025 Precision Sports Center. All rights reserved.</small>
          <small>Designed with precision for sports enthusiasts</small>
        </div>
      </div>
    </footer>
  );
}
