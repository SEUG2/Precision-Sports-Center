import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../img/logo.png"; // fixed typo
import bg from "../img/bg.jpg"; // hero background
import pfBoot from "../img/ProFootballBoot1.webp";
import jerseyImg from "../img/TrainingJersey.jpeg";
import glovesImg from "../img/GoalkeeperGloves.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSearch,
  faShoppingCart,
  faUser,
  faStore,
  faSignInAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";


export default function Home() {
  const [search, setSearch] = useState("");
  const [shopOpen, setShopOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null); // which main category is expanded
  const shopRef = useRef(null);
  const hoverTimerRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setShopOpen(false);
        setOpenCategory(null);
      }
    };
    window.addEventListener("click", onDoc);
    return () => window.removeEventListener("click", onDoc);
  }, []);

  // clear any hover timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    };
  }, []);

  const handleShopMouseEnter = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setShopOpen(true);
  };

  const handleShopMouseLeave = () => {
    // small delay before closing to avoid flicker when moving between button and menu
    hoverTimerRef.current = setTimeout(() => {
      setShopOpen(false);
      setOpenCategory(null);
      hoverTimerRef.current = null;
    }, 250);
  };

  const categories = [
    { title: "Football", icon: "⚽", items: ["Boots", "Balls", "Gloves", "Jerseys"] },
    { title: "Basketball", icon: "🏀", items: ["Balls", "Shoes", "Nets"] },
    { title: "Gym & Fitness", icon: "🏋️‍♂️", items: ["Weights", "Mats", "Bands"] },
    { title: "Accessories", icon: "🎒", items: ["Bags", "Bottles", "Tape"] },
  ];

  const featured = [
    { id: 1, title: "Pro Football Boots", price: 450, img: pfBoot },
    { id: 2, title: "Training Jersey", price: 120, img: jerseyImg },
    { id: 3, title: "Goalkeeper Gloves", price: 200, img: glovesImg },
  ];

  return (
    <div className="page-root home kitking-like">
      <header className="site-header">
        <div className="header-inner">
          {/* LEFT: Shop dropdown then logo */}
          <div className="left-group">
            <div className="shop-wrap" ref={shopRef} onMouseEnter={handleShopMouseEnter} onMouseLeave={handleShopMouseLeave}>
              <button
                className="shop-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setShopOpen((s) => !s);
                  if (shopOpen) setOpenCategory(null);
                }}
                aria-expanded={shopOpen}
              >
                <FontAwesomeIcon icon={faStore} /> <span className="btn-label">Shop</span>
                <FontAwesomeIcon icon={faChevronDown} className="chev" />
              </button>

              <div className={`shop-mega ${shopOpen ? "open" : ""}`} role="menu" aria-hidden={!shopOpen}>
                <div className="mega-accordion">
                  {categories.map((c) => (
                    <div className="mega-accordion-item" key={c.title}>
                      <button
                        className={`mega-accordion-btn ${openCategory === c.title ? "active" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenCategory((prev) => (prev === c.title ? null : c.title));
                        }}
                        aria-expanded={openCategory === c.title}
                      >
                        <span className="mega-title">{c.title}</span>
                        <FontAwesomeIcon icon={faChevronDown} className="chev small" />
                      </button>

                      <ul className={`mega-sublist ${openCategory === c.title ? "open" : ""}`}>
                        {c.items.map((it) => (
                          <li key={it}>
                            <Link to={`/shop/${c.title.toLowerCase()}`} className="mega-link" onClick={() => setShopOpen(false)}>
                              {it}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/" className="site-brand" aria-label="Home">
              <img src={logo} className="brand-logo" alt="Precision Sports Center" />
            </Link>
          </div>

          {/* CENTER: search */}
          <form
            className="header-search"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Search: " + (search || "[empty]"));
            }}
          >
            <input
              className="header-search-input"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your preferrence here..."
              aria-label="Search products"
            />
            <button className="header-search-btn" aria-label="Search">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          {/* RIGHT: icon + label actions */}
          <div className="right-actions">
            <Link to="/shop" className="nav-action">
              <FontAwesomeIcon icon={faStore} />
              <span className="action-label">Shop</span>
            </Link>

            <Link to="/about" className="nav-action">
              <FontAwesomeIcon icon={faUser} />
              <span className="action-label">About</span>
            </Link>

            <Link to="/login" className="nav-action">
              <FontAwesomeIcon icon={faSignInAlt} />
              <span className="action-label">Login</span>
            </Link>

            <Link to="/cart" className="nav-action cart-action">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="action-label">Cart</span>
              <span className="cart-count">2</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
  <section className="hero" style={{ backgroundImage: `url(${bg})` }}>
          <div className="hero-overlay" />
          <div className="hero-inner">
            <div className="hero-copy">
              <h1>Everything your team needs</h1>
              <p className="lead">
                Quality kits, boots and training equipment. Fast local delivery and team discounts.
              </p>
              <div className="hero-ctas">
                <Link to="/shop" className="btn btn-primary">Shop All</Link>
                <Link to="/shop/football" className="btn btn-ghost">Football</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="categories">
          <div className="container">
            <h2 className="section-title">Shop by category</h2>
            <div className="categories-grid">
              {categories.map((c) => (
                <Link className="cat-card" key={c.title} to={`/shop/${c.title.toLowerCase()}`}>
                  <div className="cat-media" aria-hidden="true">{c.icon}</div>
                  <div className="cat-title">{c.title}</div>
                  <div className="cat-sub">Browse {c.items.length} items</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="featured">
          <div className="container">
            <h2 className="section-title">Featured products</h2>
            <div className="products-grid">
              {featured.map((p) => (
                <article className="product-card" key={p.id}>
                  <Link to={`/product/${p.id}`} className="product-media">
                    <img src={p.img} alt={p.title} />
                  </Link>
                  <div className="product-body">
                    <Link to={`/product/${p.id}`} className="product-title">{p.title}</Link>
                    <div className="product-meta">
                      <span className="price">GHS {p.price}</span>
                      <button className="btn btn-sm">Add</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <img src={logo} alt="Precision logo" className="footer-logo" />
            <p>Precision Sports Center — gear, coaching & community.</p>
          </div>

          <div className="footer-center">
            <div className="social" role="navigation" aria-label="Social links">
              <a href="mailto:xorlaliadogoh@gmail.com" aria-label="Email">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=your.email@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="https://www.instagram.com/precisionsports_gh" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.tiktok.com/@precisionsports_gh" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
            <small>© 2025 Precision Sports Center</small>
          </div>

          <div className="footer-right">
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/about" className="footer-link">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
