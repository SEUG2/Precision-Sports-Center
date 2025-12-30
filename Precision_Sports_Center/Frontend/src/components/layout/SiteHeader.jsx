import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCircleInfo,
  faArrowRightToBracket,
  faCartShopping,
  faMagnifyingGlass,
  faHouse,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import logo from "../../img/logo.png";
import { useCart } from "../../context/CartContext";

export default function SiteHeader() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { totalItems } = useCart();

  const handleSearch = (event) => {
    event.preventDefault();
    if (!search.trim()) {
      return;
    }
    // Placeholder action for real search wiring
    alert(`Search: ${search}`);
  };

  const currentPath = location.pathname;

  const navItems = [
    {
      label: "Home",
      to: "/",
      icon: faHouse,
      isActive: currentPath === "/",
    },
    {
      label: "Shop",
      to: "/shop",
      icon: faBagShopping,
      isActive: currentPath.startsWith("/shop") || currentPath.startsWith("/product"),
    },
    {
      label: "About",
      to: "/about",
      icon: faCircleInfo,
      isActive: currentPath.startsWith("/about"),
    },
    {
      label: "Login",
      to: "/login",
      icon: faArrowRightToBracket,
      isActive: currentPath.startsWith("/login"),
    },
  ];

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="header-top-inner">
          <div className="header-contact">
            <FontAwesomeIcon icon={faPhoneVolume} aria-hidden="true" />
            <span>Contact 0549807848 / 0530518486</span>
            <span className="dot" aria-hidden="true">•</span>
            <a href="mailto:info@sportsmallgh.com">info@sportsmallgh.com</a>
          </div>
          <div className="header-social" role="navigation" aria-label="Social media links">
            <a href="https://wa.me/233549807848" target="_blank" rel="noopener noreferrer" aria-label="Whatsapp">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
      <div className="header-main">
      <div className="header-inner">
        <div className="left-group">
          <Link to="/" className="site-brand" aria-label="Home">
            <img src={logo} className="brand-logo" alt="Precision Sports Center" />
          </Link>
        </div>

        <form className="header-search" onSubmit={handleSearch}>
          <input
            className="header-search-input"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your preference here..."
            aria-label="Search products"
          />
          <button className="header-search-btn" aria-label="Search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>

        <div className="right-actions">
          {navItems.map(({ label, to, icon, isActive }) => (
            <Link
              key={label}
              to={to}
              className={`nav-action ${isActive ? "active" : ""}`.trim()}
              aria-current={isActive ? "page" : undefined}
            >
              <FontAwesomeIcon icon={icon} />
              <span className="action-label">{label}</span>
            </Link>
          ))}

          <Link
            to="/cart"
            className={`nav-action cart-action ${currentPath.startsWith("/cart") ? "active" : ""}`.trim()}
            aria-current={currentPath.startsWith("/cart") ? "page" : undefined}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="action-label">Cart</span>
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </div>
      </div>
    </header>
  );
}
