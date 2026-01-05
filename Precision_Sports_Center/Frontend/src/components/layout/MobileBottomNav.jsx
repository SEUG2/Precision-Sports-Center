import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCircleInfo,
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  const linkClass = (path) =>
    ["nav-action", location.pathname.startsWith(path) ? "active" : null]
      .filter(Boolean)
      .join(" ");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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

      {user ? (
        <button
          onClick={handleSignOut}
          className="nav-action"
          style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <span className="action-label">Logout</span>
        </button>
      ) : (
        <Link to="/login" className={linkClass("/login")}>
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          <span className="action-label">Login</span>
        </Link>
      )}

      <Link to="/cart" className={linkClass("/cart")}>
        <FontAwesomeIcon icon={faCartShopping} />
        <span className="action-label">Cart</span>
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </Link>
    </nav>
  );
}
