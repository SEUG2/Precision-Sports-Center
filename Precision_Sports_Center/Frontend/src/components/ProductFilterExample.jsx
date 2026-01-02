import React from "react";
import ProductFilter from "./ProductFilter";
import "./ProductFilter.css";

// Example product data
const exampleProducts = [
  {
    id: 1,
    title: "Precision Pro Football Boots",
    description: "Built for explosive pace with carbon plate spring and molded ankle collar.",
    price: 450,
    originalPrice: 520,
    img: "/img/ProFootballBoot1.webp",
    category: "Football",
    league: "Premier League",
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
    img: "/img/GoalkeeperGloves.jpeg",
    category: "Football",
    league: "La Liga",
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
    img: "/img/basketball-card.webp",
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
    img: "/img/TrainingJersey.jpeg",
    category: "Football",
    league: "Serie A",
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
    img: "/img/basketball-card.webp",
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
    img: "/img/gym-card.webp",
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
    img: "/img/gym-card.webp",
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
    img: "/img/ascessories-card.webp",
    category: "Accessories",
    rating: 4.2,
    reviews: 39,
    isOnSale: false,
    inStock: false,
  },
];

/**
 * Example usage of ProductFilter component
 * This demonstrates how to use the ProductFilter component with product data
 */
export default function ProductFilterExample() {
  const handleFilterChange = (filteredProducts) => {
    // Optional: Do something with filtered products
    console.log(`Filtered products: ${filteredProducts.length}`);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", fontSize: "2rem", fontWeight: 700 }}>
        Product Filter Example
      </h1>
      <ProductFilter 
        products={exampleProducts} 
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

