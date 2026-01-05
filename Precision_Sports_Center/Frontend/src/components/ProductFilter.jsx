import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./ProductCard";
import "./ProductFilter.css";

/**
 * ProductFilter Component
 * A reusable component with search bar and filter dropdowns that dynamically updates a product grid
 * 
 * @param {Array} products - Array of product objects to filter
 * @param {Object} filterOptions - Configuration for available filters
 * @param {Function} onFilterChange - Optional callback when filters change
 */
export default function ProductFilter({ 
  products = [], 
  filterOptions = {},
  onFilterChange 
}) {
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  // Sort state
  const [sortBy, setSortBy] = useState("default");

  // Default filter options
  const defaultFilterOptions = {
    categories: ["All", "Football", "Basketball", "Gym & Fitness", "Accessories"],
    priceRanges: [
      { label: "All Prices", value: "all" },
      { label: "Under GHS 100", value: "0-100" },
      { label: "GHS 100 - 200", value: "100-200" },
      { label: "GHS 200 - 400", value: "200-400" },
      { label: "Over GHS 400", value: "400+" },
    ],
    leagues: ["All", "Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "AFCON"],
    availability: [
      { label: "All Products", value: "all" },
      { label: "In Stock", value: "inStock" },
      { label: "On Sale", value: "onSale" },
    ],
    ratings: [
      { label: "All Ratings", value: "all" },
      { label: "4+ Stars", value: "4" },
      { label: "4.5+ Stars", value: "4.5" },
      { label: "5 Stars", value: "5" },
    ],
    sortOptions: [
      { label: "Default", value: "default" },
      { label: "Price: Low to High", value: "price-asc" },
      { label: "Price: High to Low", value: "price-desc" },
      { label: "Rating: Highest First", value: "rating-desc" },
      { label: "Name: A to Z", value: "name-asc" },
    ],
  };

  const options = { ...defaultFilterOptions, ...filterOptions };

  // Parse price range
  const parsePriceRange = (range) => {
    if (range === "all") return { min: 0, max: Infinity };
    if (range.includes("+")) {
      const min = parseInt(range.replace("+", ""));
      return { min, max: Infinity };
    }
    const [min, max] = range.split("-").map(Number);
    return { min, max };
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          (product.title || product.name || "").toLowerCase().includes(query) ||
          (product.description || "").toLowerCase().includes(query) ||
          (product.category || "").toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => (product.category || "").toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price range filter
    if (selectedPriceRange !== "all") {
      const { min, max } = parsePriceRange(selectedPriceRange);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // League filter (if product has league property)
    if (selectedLeague !== "all") {
      filtered = filtered.filter(
        (product) => (product.league || product.category || "").toLowerCase() === selectedLeague.toLowerCase()
      );
    }

    // Availability filter
    if (selectedAvailability === "inStock") {
      filtered = filtered.filter((product) => product.inStock !== false);
    } else if (selectedAvailability === "onSale") {
      filtered = filtered.filter((product) => product.isOnSale === true);
    }

    // Rating filter
    if (selectedRating !== "all") {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter((product) => (product.rating || 0) >= minRating);
    }

    // Sort products
    if (sortBy !== "default") {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return (a.price || 0) - (b.price || 0);
          case "price-desc":
            return (b.price || 0) - (a.price || 0);
          case "rating-desc":
            return (b.rating || 0) - (a.rating || 0);
          case "name-asc":
            return ((a.title || a.name || "").localeCompare(b.title || b.name || ""));
          default:
            return 0;
        }
      });
    }

    // Callback for external use
    if (onFilterChange) {
      onFilterChange(filtered);
    }

    return filtered;
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedPriceRange,
    selectedLeague,
    selectedAvailability,
    selectedRating,
    sortBy,
    onFilterChange,
  ]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPriceRange("all");
    setSelectedLeague("all");
    setSelectedAvailability("all");
    setSelectedRating("all");
    setSortBy("default");
  };

  // Count active filters
  const activeFilterCount = [
    searchQuery,
    selectedCategory !== "all",
    selectedPriceRange !== "all",
    selectedLeague !== "all",
    selectedAvailability !== "all",
    selectedRating !== "all",
    sortBy !== "default",
  ].filter(Boolean).length;

  return (
    <div className="product-filter-container">
      {/* Search Bar */}
      <div className="filter-search-bar">
        <div className="search-input-wrapper">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>
        <button
          type="button"
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="filter-badge">{activeFilterCount}</span>
          )}
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`chevron ${showFilters ? "open" : ""}`}
          />
        </button>
      </div>

      {/* Filter Dropdowns */}
      {showFilters && (
        <div className="filter-dropdowns">
          <div className="filter-row">
            {/* Category Filter */}
            <div className="filter-group">
              <label htmlFor="category-filter">Category</label>
              <div className="select-wrapper">
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {options.categories.map((cat) => (
                    <option key={cat} value={cat === "All" ? "all" : cat.toLowerCase()}>
                      {cat}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faChevronDown} className="select-chevron" />
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label htmlFor="price-filter">Price Range</label>
              <div className="select-wrapper">
                <select
                  id="price-filter"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                >
                  {options.priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faChevronDown} className="select-chevron" />
              </div>
            </div>

            {/* League Filter */}
            <div className="filter-group">
              <label htmlFor="league-filter">League</label>
              <div className="select-wrapper">
                <select
                  id="league-filter"
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                >
                  {options.leagues.map((league) => (
                    <option key={league} value={league === "All" ? "all" : league.toLowerCase()}>
                      {league}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faChevronDown} className="select-chevron" />
              </div>
            </div>

            {/* Availability Filter */}
            <div className="filter-group">
              <label htmlFor="availability-filter">Availability</label>
              <div className="select-wrapper">
                <select
                  id="availability-filter"
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                >
                  {options.availability.map((avail) => (
                    <option key={avail.value} value={avail.value}>
                      {avail.label}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faChevronDown} className="select-chevron" />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="filter-group">
              <label htmlFor="rating-filter">Rating</label>
              <div className="select-wrapper">
                <select
                  id="rating-filter"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                >
                  {options.ratings.map((rating) => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faChevronDown} className="select-chevron" />
              </div>
            </div>

            {/* Sort Filter */}
            <div className="filter-group">
              <label htmlFor="sort-filter">Sort By</label>
              <div className="select-wrapper">
                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {options.sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faChevronDown} className="select-chevron" />
              </div>
            </div>
          </div>

          {/* Reset Button */}
          {activeFilterCount > 0 && (
            <div className="filter-actions">
              <button type="button" className="reset-filters-btn" onClick={resetFilters}>
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="filter-results-header">
        <p className="results-count">
          Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
        </p>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.title || product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.img || product.image,
                category: product.category,
                rating: product.rating,
                reviewCount: product.reviews || product.reviewCount,
                isOnSale: product.isOnSale,
                inStock: product.inStock,
              }}
            />
          ))
        ) : (
          <div className="no-products">
            <div className="no-products-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
            {activeFilterCount > 0 && (
              <button type="button" className="reset-filters-btn" onClick={resetFilters}>
                Reset Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


