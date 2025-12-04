import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCircleInfo,
  faArrowRightToBracket,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

export default function MobileBottomNav() {
  const location = useLocation();

  const linkClass = (path) =>
    ["nav-action", location.pathname.startsWith(path) ? "active" : null]
      .filter(Boolean)
      .join(" ");

  return (
    <nav className="mobile-bottom-nav">
      <Link to="/shop" className={linkClass("/shop")}>
        <FontAwesomeIcon icon={faBagShopping} />
        <span className="action-label">Shop</span>
      </Link>

      <Link to="/about" className={linkClass("/about")}>
        <FontAwesomeIcon icon={faCircleInfo} />
        <span className="action-label">About</span>
      </Link>

      <Link to="/login" className={linkClass("/login")}>
        <FontAwesomeIcon icon={faArrowRightToBracket} />
        <span className="action-label">Login</span>
      </Link>

      <Link to="/cart" className={linkClass("/cart")}>
        <FontAwesomeIcon icon={faCartShopping} />
        <span className="action-label">Cart</span>
        <span className="cart-count">2</span>
      </Link>
    </nav>
  );
}
