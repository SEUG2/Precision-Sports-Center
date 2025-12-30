import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Shop.css";
import bg from "../img/bg2.jpg";
import pfBoot from "../img/ProFootballBoot1.webp";
import jerseyImg from "../img/TrainingJersey.jpeg";
import glovesImg from "../img/GoalkeeperGloves.jpeg";
import footballCard from "../img/footbll-card.webp";
import basketballCard from "../img/basketball-card.webp";
import accessoriesCard from "../img/ascessories-card.webp";
import gymCard from "../img/gym-card.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { formatGHS } from "../lib/formatCurrency";
import { useCart } from "../context/CartContext";

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

const heroQuickLinks = [
  {
    label: "Football Store",
    description: "Boots, kits & balls",
    to: "/shop/football",
  },
  {
    label: "Boot Wall",
    description: "Firm ground & turf",
    to: "/shop?q=boots",
  },
  {
    label: "Jersey Hub",
    description: "Club & national drops",
    to: "/shop?q=jersey",
  },
  {
    label: "Basketball Hub",
    description: "Shoes & court gear",
    to: "/shop/basketball",
  },
  {
    label: "Gym Essentials",
    description: "Bands, mats & recovery",
    to: `/shop/${encodeURIComponent("Gym & Fitness")}`,
  },
  {
    label: "Accessories",
    description: "Bags, bottles, tape",
    to: "/shop/accessories",
  },
];

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

const shopStats = [
  { id: "jerseys", value: "450+", label: "Club & national jerseys on hand" },
  { id: "boots", value: "120", label: "Boot styles across all surfaces" },
  { id: "teams", value: "65", label: "Teams outfitted this season" },
  { id: "rating", value: "4.9/5", label: "Customer satisfaction rating" },
];

const categoryPills = [
  { id: "all", label: "All gear", value: "All" },
  ...categories.map((category) => ({
    id: category.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    label: category.title,
    value: category.title,
  })),
];

const serviceAssurance = [
  {
    id: "exchange",
    title: "Size exchanges",
    description: "Swap sizes within seven days on unworn jerseys and boots.",
  },
  {
    id: "support",
    title: "Club specialists",
    description: "Dedicated consultants to manage academy and corporate kit briefs.",
  },
  {
    id: "fulfilment",
    title: "Rapid fulfilment",
    description: "Same-day Accra dispatch with nationwide courier coverage in 48 hours.",
  },
];

function Shop() {
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(600);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const { addItem, items: cartItems } = useCart();
  const { category: categoryParam } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!categoryParam) return;
    const normalized = decodeURIComponent(categoryParam).replace(/-/g, " ").toLowerCase();
    const matchingCategory = filterCategories.find(
      (categoryOption) => categoryOption.toLowerCase() === normalized,
    );

    if (matchingCategory) {
      setSelectedCategory(matchingCategory);
      setProductSearch("");
    } else {
      setSelectedCategory("All");
      setProductSearch(normalized);
    }
  }, [categoryParam]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query !== null) {
      setProductSearch(query);
      setSelectedCategory("All");
    }
  }, [location.search]);
  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.img,
      originalPrice: product.originalPrice,
      inStock: product.inStock,
    });
  };
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

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setProductSearch("");
  };

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

  const renderProductCard = (product) => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);
    return (
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

          <button
            className="btn btn-sm"
            type="button"
            disabled={!product.inStock}
            onClick={() => handleAddToCart(product)}
          >
            {product.inStock ? (isProductInCart ? "Add more" : "Add") : "Notify"}
          </button>
        </div>
      </div>
    </article>
  );
  };

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
      <main className="shop-main">
        <section className="hero shop-hero" style={{ backgroundImage: `url(${bg})` }}>
          <div className="hero-overlay" />
          <div className="hero-inner">
            <div className="hero-card">
              <span className="hero-kicker">Welcome to</span>
              <h1>Precision Sports Center Shop</h1>
              <p className="lead">
                Find gear that keeps pace. Pro-quality kits, footwear and accessories curated for clubs,
                academies and ambitious athletes.
              </p>
              <div className="hero-ctas">
                <Link to="/shop" className="btn btn-primary">
                  Browse latest drops
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Talk to a specialist
                </Link>
              </div>
            </div>
            <div className="hero-links-panel" aria-label="Shop highlights">
              <div className="hero-links-copy">
                <span className="hero-links-kicker">Shop faster</span>
                <h3>Jump into featured collections</h3>
                <p>
                  Shortcut to the gear customers request most—no extra clicks required.
                </p>
              </div>
              <div className="hero-quick-links">
                {heroQuickLinks.map((link) => (
                  <Link key={link.label} to={link.to} className="hero-link-card">
                    <div className="hero-link-text">
                      <span className="hero-link-label">{link.label}</span>
                      <span className="hero-link-desc">{link.description}</span>
                    </div>
                    <span className="hero-link-arrow" aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="shop-stats" aria-label="Store stats">
          <div className="stats-grid">
            {shopStats.map((stat) => (
              <article key={stat.id} className="stat-card">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="shop-section">
          <div className="container">
            <div className="shop-category-pills" role="tablist" aria-label="Browse by category">
              {categoryPills.map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  className={`category-pill ${selectedCategory === pill.value ? "active" : ""}`.trim()}
                  onClick={() => handleSelectCategory(pill.value)}
                >
                  {pill.label}
                </button>
              ))}
            </div>

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

        <section className="shop-services" aria-label="Store services and guarantees">
          <div className="services-grid">
            {serviceAssurance.map((service) => (
              <article key={service.id} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/contact" className="service-link">
                  Speak to support
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Shop;