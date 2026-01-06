import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { formatGHS } from "../lib/formatCurrency";
import { useCart } from "../context/CartContext";
import "./CategoryPage.css";

// Import product images
import pfBoot from "../img/ProFootballBoot1.webp";
import jerseyImg from "../img/TrainingJersey.jpeg";
import glovesImg from "../img/GoalkeeperGloves.jpeg";
import basketballCard from "../img/basketball-card.webp";
import accessoriesCard from "../img/ascessories-card.webp";
import gymCard from "../img/gym-card.webp";

// Product data - in a real app, this would come from an API or context
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

// Category mapping for URL-friendly names
const categoryMap = {
  boots: { main: "Football", sub: "Boots", display: "Football Boots" },
  jerseys: { main: "Football", sub: "Jerseys", display: "Football Jerseys" },
  gloves: { main: "Football", sub: "Gloves", display: "Goalkeeper Gloves" },
  balls: { main: "Basketball", sub: "Balls", display: "Basketball Balls" },
  shoes: { main: "Basketball", sub: "Shoes", display: "Basketball Shoes" },
  basketball: { main: "Basketball", sub: null, display: "Basketball" },
  football: { main: "Football", sub: null, display: "Football" },
  "gym-fitness": { main: "Gym & Fitness", sub: null, display: "Gym & Fitness" },
  accessories: { main: "Accessories", sub: null, display: "Accessories" },
  bands: { main: "Gym & Fitness", sub: "Bands", display: "Resistance Bands" },
  mats: { main: "Gym & Fitness", sub: "Mats", display: "Yoga & Exercise Mats" },
  bottles: { main: "Accessories", sub: "Bottles", display: "Water Bottles" },
};

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { addItem, items: cartItems } = useCart();

  // Get category info from map or use the category name directly
  const categoryInfo = useMemo(() => {
    const mapped = categoryMap[categoryName?.toLowerCase()];
    if (mapped) {
      return mapped;
    }
    // Fallback: try to match by main category or subcategory
    const titleCase = categoryName
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    return {
      main: titleCase,
      sub: null,
      display: titleCase || "All Products",
    };
  }, [categoryName]);

  // Filter products based on category
  const filteredProducts = useMemo(() => {
    if (!categoryInfo) return products;

    return products.filter((product) => {
      // Match main category
      const matchesMain = !categoryInfo.main || product.category === categoryInfo.main;
      
      // Match subcategory if specified (search in title and description)
      const matchesSub = !categoryInfo.sub || 
        product.title.toLowerCase().includes(categoryInfo.sub.toLowerCase()) ||
        product.description.toLowerCase().includes(categoryInfo.sub.toLowerCase());

      return matchesMain && matchesSub;
    });
  }, [categoryInfo]);

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

  return (
    <div className="category-page">
      <div className="category-container">
        {/* Header */}
        <div className="category-header">
          <Link to="/shop" className="back-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back to Shop</span>
          </Link>
          <h1 className="category-title">{categoryInfo?.display || "Category"}</h1>
          <p className="category-subtitle">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="category-products-grid">
            {filteredProducts.map((product) => {
              const isProductInCart = cartItems.some((item) => item.id === product.id);
              
              return (
                <article key={product.id} className="category-product-card">
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
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="price-compare">{formatGHS(product.originalPrice)}</span>
                        )}
                      </div>

                      <button
                        className="btn btn-sm"
                        type="button"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product)}
                      >
                        {product.inStock ? (isProductInCart ? "Add more" : "Add to Cart") : "Notify"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="category-empty-state">
            <div className="empty-icon">🔍</div>
            <h2>No products found</h2>
            <p>We couldn't find any products in this category.</p>
            <Link to="/shop" className="btn btn-primary">
              Browse All Products
            </Link>
          </div>
        )}

        {/* Related Categories */}
        {filteredProducts.length > 0 && (
          <section className="related-categories">
            <h2>Explore Related Categories</h2>
            <div className="related-categories-grid">
              {Object.entries(categoryMap)
                .filter(([key]) => key !== categoryName?.toLowerCase())
                .slice(0, 4)
                .map(([key, info]) => (
                  <Link key={key} to={`/category/${key}`} className="related-category-card">
                    <h3>{info.display}</h3>
                    <span className="category-link">View products →</span>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

