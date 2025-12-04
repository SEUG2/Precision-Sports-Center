import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import bg from "../img/bg.jpg"; // hero background
import pfBoot from "../img/ProFootballBoot1.webp";
import jerseyImg from "../img/TrainingJersey.jpeg";
import glovesImg from "../img/GoalkeeperGloves.jpeg";
import footballCard from "../img/footbll-card.webp";
import basketballCard from "../img/basketball-card.webp";
import gymCard from "../img/gym-card.webp";
import accessoriesCard from "../img/ascessories-card.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


export default function Home() {
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
      <main>
  <section className="hero" style={{ backgroundImage: `url(${bg})` }}>
          <div className="hero-overlay" />
          <div className="hero-inner">
            <div className="hero-copy">
              <h1>Everything your team needs</h1>
              <p className="lead">
                Quality kits, boots and training equipment. Fast local delivery and team discounts.
              </p>
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
    </div>
  );
}
