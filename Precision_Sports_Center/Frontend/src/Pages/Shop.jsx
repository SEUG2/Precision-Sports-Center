import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Shop.css";
import logo from "../img/logo.png";
import bg from "../img/bg2.jpg";
import pfBoot from "../img/ProFootballBoot1.webp";
import jerseyImg from "../img/TrainingJersey.jpeg";
import glovesImg from "../img/GoalkeeperGloves.jpeg";
import footballCard from "../img/footbll-card.webp";
import basketballCard from "../img/basketball-card.webp";
import accessoriesCard from "../img/ascessories-card.webp";
import gymCard from "../img/gym-card.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faBagShopping,
  faCartShopping,
  faCircleInfo,
  faEnvelope,
  faMagnifyingGlass,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { formatGHS } from "../lib/formatCurrency";

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

const filterCategories = ["All", ...categories.map((c) => c.title)];

const products = [
  {
    id: 1,
    title: "Precision Pro Football Boots",
    description: "Built for explosive pace with carbon plate spring and molded ankle collar.",
    price: 450,
    originalPrice: 520,
    img: pfBoot,
    category: "Football",
    rating: 4.8,
    reviews: 124,
    isOnSale: true,
    inStock: true,
  },
  {
    id: 2,
    title: "Elite Matchday Goalkeeper Gloves",
    description: "Supreme grip and breathable mesh backing keep you in control until the final whistle.",
    price: 200,
    originalPrice: 0,
    img: glovesImg,
    category: "Football",
    rating: 4.7,
    reviews: 86,
    isOnSale: false,
    inStock: true,
  },
  {
    id: 3,
    title: "All-Court Performance Basketball",
    description: "Composite cover with deep channels for confident ball handling on any surface.",
    price: 160,
    originalPrice: 0,
    img: basketballCard,
    category: "Basketball",
    rating: 4.6,
    reviews: 142,
    isOnSale: false,
    inStock: true,
  },
  {
    id: 4,
    title: "Precision Training Jersey",
    description: "Lightweight moisture-wicking fabric with laser cut ventilation zones.",
    price: 120,
    originalPrice: 150,
    img: jerseyImg,
    category: "Football",
    rating: 4.5,
    reviews: 58,
    isOnSale: true,
    inStock: true,
  },
  {
    id: 5,
    title: "Court Vision Basketball Sneakers",
    description: "Supportive midsole cushioning and radial outsole traction for sharp cuts.",
    price: 380,
    originalPrice: 0,
    img: basketballCard,
    category: "Basketball",
    rating: 4.9,
    reviews: 91,
    isOnSale: false,
    inStock: true,
  },
  {
    id: 6,
    title: "Hybrid Resistance Band Set",
    description: "Stackable resistance levels with ergonomic grips for total-body training.",
    price: 95,
    originalPrice: 0,
    img: gymCard,
    category: "Gym & Fitness",
    rating: 4.4,
    reviews: 73,
    isOnSale: false,
    inStock: true,
  },
  {
    id: 7,
    title: "Performance Recovery Foam Roller",
    description: "High-density core targets deep tissue release and cooldown recovery.",
    price: 65,
    originalPrice: 80,
    img: gymCard,
    category: "Gym & Fitness",
    rating: 4.3,
    reviews: 51,
    isOnSale: true,
    inStock: true,
  },
  {
    id: 8,
    title: "HydroLock Insulated Bottle",
    description: "Keeps drinks cold for 24 hours with leak-proof lock top and carry loop.",
    price: 48,
    originalPrice: 0,
    img: accessoriesCard,
    category: "Accessories",
    rating: 4.2,
    reviews: 39,
    isOnSale: false,
    inStock: false,
  },
];

function Shop() {
  const [search, setSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(600);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const clampMinPrice = (value) => {
    const numeric = Number.isNaN(Number(value)) ? 0 : Number(value);
    return Math.max(0, Math.min(numeric, maxPrice));
  };

  const clampMaxPrice = (value) => {
    const numeric = Number.isNaN(Number(value)) ? maxPrice : Number(value);
    return Math.max(minPrice, numeric);
  };

  const filteredProducts = products.filter((product) => {
    const normalizedSearch = productSearch.trim().toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      product.title.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch);

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesStock = !inStockOnly || product.inStock;
    const matchesSale = !onSaleOnly || product.isOnSale;

    return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesSale;
  });

  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`star ${index < rounded ? "filled" : ""}`.trim()}
      />
    ));
  };

  const renderProductCard = (product) => (
    <article
      className={`shop-product-card ${viewMode === "list" ? "list" : ""}`.trim()}
      key={product.id}
    >
      <Link to={`/product/${product.id}`} className="product-media" aria-label={product.title}>
        <img src={product.img} alt={product.title} loading="lazy" />
        {product.isOnSale && <span className="product-badge sale">Sale</span>}
        {!product.inStock && <span className="product-badge out">Sold out</span>}
      </Link>

      <div className="product-body">
        <div className="product-subhead">
          <span className="product-category">{product.category}</span>
          <span className="product-rating" aria-label={`${product.rating} out of 5`}>
            {renderStars(product.rating)}
            <span className="rating-value">{product.rating.toFixed(1)}</span>
          </span>
        </div>

        <Link to={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>

        <p className="product-description">{product.description}</p>

        <div className="product-bottom">
          <div className="product-pricing">
            <span className="price">{formatGHS(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price ? (
              <span className="price-compare">{formatGHS(product.originalPrice)}</span>
            ) : null}
          </div>

          <button className="btn btn-sm" type="button" disabled={!product.inStock}>
            {product.inStock ? "Add" : "Notify"}
          </button>
        </div>
      </div>
    </article>
  );

  const resetFilters = () => {
    setSelectedCategory("All");
    setMinPrice(0);
    setMaxPrice(600);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setProductSearch("");
  };

  return (
    <div className="page-root shop kitking-like">
      <header className="site-header">
        <div className="header-inner">
          <div className="left-group">
            <Link to="/" className="site-brand" aria-label="Home">
              <img src={logo} className="brand-logo" alt="Precision Sports Center" />
            </Link>
          </div>

          <form
            className="header-search"
            onSubmit={(event) => {
              event.preventDefault();
              alert("Search: " + (search || "[empty]"));
            }}
          >
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

      <main className="shop-main">
        <section className="hero shop-hero" style={{ backgroundImage: `url(${bg})` }}>
          <div className="hero-overlay" />
          <div className="hero-inner">
            <div className="hero-card">
              <span className="hero-kicker">Welcome to</span>
              <h1>Precision Sports Center SHOP</h1>
              <p className="lead">
                Find gear that keeps pace. Pro-quality kits, footwear and accessories curated for clubs,
                academies and ambitious athletes.
              </p>
              <div className="hero-ctas">
                <Link to="/shop/football" className="btn btn-primary">
                  Football Store
                </Link>
                <Link to="/shop" className="btn btn-ghost">
                  Browse everything
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="shop-section">
          <div className="container">
            <div className="shop-layout">
              <aside className="shop-filters">
                <header className="filters-header">
                  <h2>Refine your search</h2>
                  <p>Dial in by category, price, and availability to match your squad&apos;s needs.</p>
                </header>

                <div className="filter-block">
                  <label htmlFor="product-search">Search products</label>
                  <input
                    id="product-search"
                    type="search"
                    value={productSearch}
                    onChange={(event) => setProductSearch(event.target.value)}
                    placeholder="Boots, jerseys, bottles..."
                    autoComplete="off"
                  />
                </div>

                <div className="filter-block">
                  <label>Category</label>
                  <div className="filter-chips">
                    {filterCategories.map((category) => (
                      <button
                        type="button"
                        className={`filter-chip ${selectedCategory === category ? "active" : ""}`.trim()}
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-block">
                  <label>Price range (GHS)</label>
                  <div className="price-inputs">
                    <input
                      type="number"
                      min="0"
                      value={minPrice}
                      onChange={(event) => setMinPrice(clampMinPrice(event.target.value))}
                    />
                    <span className="divider">to</span>
                    <input
                      type="number"
                      min="0"
                      value={maxPrice}
                      onChange={(event) => setMaxPrice(clampMaxPrice(event.target.value))}
                    />
                  </div>
                </div>

                <div className="filter-block">
                  <label>Availability</label>
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(event) => setInStockOnly(event.target.checked)}
                    />
                    <span>In stock only</span>
                  </label>
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={(event) => setOnSaleOnly(event.target.checked)}
                    />
                    <span>On sale</span>
                  </label>
                </div>

                <button type="button" className="reset-btn" onClick={resetFilters}>
                  Reset filters
                </button>
              </aside>

              <div className="shop-results">
                <div className="shop-toolbar">
                  <p className="result-count">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                  <div className="view-toggle" role="group" aria-label="Toggle product view mode">
                    <button
                      type="button"
                      className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`.trim()}
                      onClick={() => setViewMode("grid")}
                    >
                      Grid
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${viewMode === "list" ? "active" : ""}`.trim()}
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </button>
                  </div>
                </div>

                <div className={`products-grid ${viewMode === "list" ? "list-view" : ""}`.trim()}>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => renderProductCard(product))
                  ) : (
                    <div className="empty-state">
                      <h3>No matching products yet</h3>
                      <p>Broaden your filters or reset to explore the full Precision Sports collection.</p>
                      <button type="button" className="btn btn-primary" onClick={resetFilters}>
                        Reset filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
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
                href="https://www.tiktok.com/@precisionsports_gh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
            <small>© 2025 Precision Sports Center</small>
          </div>

          <div className="footer-right">
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
            <Link to="/about" className="footer-link">
              About
            </Link>
          </div>
        </div>
      </footer>

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

export default Shop;