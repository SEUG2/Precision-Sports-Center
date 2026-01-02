import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "./MissionDisclaimer.css";

export default function MissionDisclaimer() {
  return (
    <section className="mission-disclaimer-section">
      <div className="mission-disclaimer-container">
        {/* Our Mission Section */}
        <div className="mission-section">
          <h2 className="mission-title">Our Mission</h2>
          <div className="mission-content">
            <p className="mission-text">
              At Precision Sports Center, we aim to deliver the best sporting needs to our customers
              with high quality. Precision Sports Center provides guaranteed top-quality football kits,
              with fair and affordable prices fitting all people and general sporting products across
              Ghana and beyond with rapid delivery system.
            </p>
            <p className="mission-contact">
              Call/WhatsApp us <a href="tel:+233549807848">0549807848</a> now.
            </p>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="disclaimer-section">
          <div className="disclaimer-header">
            <FontAwesomeIcon icon={faExclamationTriangle} className="disclaimer-icon" />
            <h3 className="disclaimer-title">Disclaimer Notice</h3>
          </div>
          <p className="disclaimer-text">
            <strong>We do not own any of the sports wears or kits or brands posted on this website.</strong>
            All product names, logos, and brands are property of their respective owners. We are an
            independent retailer and are not affiliated with, endorsed by, or sponsored by any of the
            brands featured on our website.
          </p>
        </div>
      </div>
    </section>
  );
}

