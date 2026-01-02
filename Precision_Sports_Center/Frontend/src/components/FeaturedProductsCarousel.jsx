import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import "./FeaturedProductsCarousel.css";

/**
 * FeaturedProductsCarousel Component
 * Auto-rotating image carousel for featured products using Swiper.js
 * 
 * @param {Array} products - Array of product objects to display
 * @param {String} title - Section title (default: "Featured Products")
 * @param {String} subtitle - Section subtitle/description
 */
export default function FeaturedProductsCarousel({ 
  products = [], 
  title = "Featured Products",
  subtitle = "Discover our handpicked selection of premium sports gear"
}) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const swiperRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const AUTOPLAY_DELAY = 3000; // 3 seconds

  // Progress bar animation
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      return;
    }

    setProgress(0);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (AUTOPLAY_DELAY / 50)); // Update every 50ms
      });
    }, 50);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPaused]);

  // Reset progress on slide change
  const handleSlideChange = () => {
    setProgress(0);
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="featured-products-carousel-section">
      <div className="featured-products-container">
        {/* Section Header */}
        <div className="featured-products-header">
          <div className="header-content">
            <span className="section-eyebrow">Shop Now</span>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
          <Link to="/shop" className="view-all-link">
            View All Products
            <span className="arrow">→</span>
          </Link>
        </div>

        {/* Swiper Carousel */}
        <div 
          className="carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: AUTOPLAY_DELAY,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={products.length > 4} // Only loop if we have more than 4 products
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onSlideChange={handleSlideChange}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="featured-products-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="featured-product-slide">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-custom"
            aria-label="Previous slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="swiper-button-next-custom"
            aria-label="Next slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="carousel-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

