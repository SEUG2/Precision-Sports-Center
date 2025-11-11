import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../img/logo.png"; // fixed typo
import bg from "../img/bg.jpg"; // hero background
import pfBoot from "../img/ProFootballBoot1.webp";
import jerseyImg from "../img/TrainingJersey.jpeg";
import glovesImg from "../img/GoalkeeperGloves.jpeg";
import footballCard from "../img/footbll-card.webp";
import basketballCard from "../img/basketball-card.webp";
import gymCard from "../img/gym-card.webp";
import accessoriesCard from "../img/ascessories-card.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  faMagnifyingGlass,
  faCartShopping,
  faCircleInfo,
  faBagShopping,
  faArrowRightToBracket,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";


export default function Home() {
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    {
      title: "Football",
      mediaType: "image",
      icon: footballCard,
      imageFit: "contain",
      items: ["Boots", "Balls", "Gloves", "Jerseys"],
    },
    {
      title: "Basketball",
      mediaType: "image",
      icon: basketballCard,
      imageFit: "contain",
      items: ["Balls", "Shoes", "Nets"],
    },
    {
      title: "Gym & Fitness",
      mediaType: "image",
      icon: gymCard,
      imageFit: "cover",
      items: ["Weights", "Mats", "Bands"],
    },
    {
      title: "Accessories",
      mediaType: "image",
      icon: accessoriesCard,
      imageFit: "cover",
      items: ["Bags", "Bottles", "Tape"],
    },
  ];

  const renderCategoryCard = (category, extraClass = "") => (
    <Link
      className={`cat-card ${extraClass}`.trim()}
      key={category.title}
      to={`/shop/${category.title.toLowerCase()}`}
    >
      <div className="cat-media" aria-hidden="true">
        {category.mediaType === "image" ? (
          <img
            src={category.icon}
            alt={`${category.title} category`}
            className={`cat-image ${category.imageFit === "contain" ? "cat-image-contain" : ""}`.trim()}
            loading="lazy"
          />
        ) : (
          <span className="cat-emoji">{category.icon}</span>
        )}
      </div>
      <div className="cat-title">{category.title}</div>
      <ul className="cat-items">
        {category.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <span className="cat-browse-btn">
        Browse all items
      </span>
    </Link>
  );

  const featured = [
    { id: 1, title: "Pro Football Boots", price: 450, img: pfBoot },
    { id: 2, title: "Training Jersey", price: 120, img: jerseyImg },
    { id: 3, title: "Goalkeeper Gloves", price: 200, img: glovesImg },
  ];

  return (
    <div className="page-root home kitking-like">
      <header className="site-header">
        <div className="header-inner">
          {/* LEFT: empty for desktop, logo will be centered on mobile via CSS */}
          <div className="left-group">
            {/* Logo is here for desktop layout */}
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
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          {/* RIGHT: icon + label actions */}
          <div className="right-actions">
            <Link to="/shop" className="nav-action">
              <FontAwesomeIcon icon={faBagShopping} />
              <span className="action-label">Shop</span>
            </Link>

            <Link to="/about" className="nav-action">
              <FontAwesomeIcon icon={faCircleInfo} />
              <span className="action-label">About</span>
            </Link>

            <Link to="/login" className="nav-action">
              <FontAwesomeIcon icon={faArrowRightToBracket} />
              <span className="action-label">Login</span>
            </Link>

            <Link to="/cart" className="nav-action cart-action">
              <FontAwesomeIcon icon={faCartShopping} />
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
            {isMobile ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                className="mobile-category-swiper"
                spaceBetween={16}
              >
                {categories.map((category) => (
                  <SwiperSlide key={category.title}>
                    {renderCategoryCard(category, "cat-card-mobile")}
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="categories-grid">
                {categories.map((category) => renderCategoryCard(category))}
              </div>
            )}
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

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <Link to="/shop" className="nav-action">
          <FontAwesomeIcon icon={faBagShopping} />
          <span className="action-label">Shop</span>
        </Link>

        <Link to="/about" className="nav-action">
          <FontAwesomeIcon icon={faCircleInfo} />
          <span className="action-label">About</span>
        </Link>

        <Link to="/login" className="nav-action">
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          <span className="action-label">Login</span>
        </Link>

        <Link to="/cart" className="nav-action cart-action">
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="action-label">Cart</span>
          <span className="cart-count">2</span>
        </Link>
      </nav>
    </div>
  );
}
