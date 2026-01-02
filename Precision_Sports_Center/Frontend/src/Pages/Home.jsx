import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import heroBackground from "../img/bg2.jpg";
import bootsImg from "../img/ProFootballBoot1.webp";
import jerseyImg from "../img/TrainingJersey.jpeg";
import glovesImg from "../img/GoalkeeperGloves.jpeg";
import footballCard from "../img/footbll-card.webp";
import basketballCard from "../img/basketball-card.webp";
import gymCard from "../img/gym-card.webp";
import accessoriesCard from "../img/ascessories-card.webp";
import ProductCard from "../components/ProductCard";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


const heroHighlights = [
  { id: "dispatch", label: "24hr Accra dispatch" },
  { id: "authentic", label: "Authentic player & fan editions" },
  { id: "custom", label: "Team & custom bulk orders" },
];

const serviceHighlights = [
  {
    id: "delivery",
    title: "Nationwide delivery",
    description: "Same-day dispatch in Accra and 48hr delivery nationwide via trusted couriers.",
    tag: "Speed",
  },
  {
    id: "authenticity",
    title: "100% authentic",
    description: "Direct club and manufacturer sourcing with player and fan edition options.",
    tag: "Guarantee",
  },
  {
    id: "teamwear",
    title: "Teamwear concierge",
    description: "Dedicated support for schools, academies and corporate bulk kit orders.",
    tag: "Teams",
  },
];

const leagueCategories = [
  {
    id: "premier-league",
    label: "Premier League",
    title: "Premier League Kits",
    description: "Home, away and third drops for the 2025/26 season.",
    to: "/shop/premier-league",
    image: footballCard,
    accent: "rgba(15, 54, 121, 0.92)",
    accentSoft: "rgba(15, 54, 121, 0.65)",
  },
  {
    id: "la-liga",
    label: "La Liga",
    title: "La Liga Kits",
    description: "Barcelona, Madrid, Atlético and the entire Spanish elite.",
    to: "/shop/la-liga",
    image: basketballCard,
    accent: "rgba(191, 20, 21, 0.9)",
    accentSoft: "rgba(191, 20, 21, 0.65)",
  },
  {
    id: "bundesliga",
    label: "Bundesliga",
    title: "Bundesliga Kits",
    description: "Bayern, Dortmund, Leipzig and more German powerhouses.",
    to: "/shop/bundesliga",
    image: gymCard,
    accent: "rgba(9, 26, 58, 0.92)",
    accentSoft: "rgba(9, 26, 58, 0.6)",
  },
  {
    id: "afcon",
    label: "AFCON",
    title: "AFCON & National Teams",
    description: "Black Stars, Nigeria, Ivory Coast and continental pride.",
    to: "/shop/afcon",
    image: accessoriesCard,
    accent: "rgba(191, 20, 21, 0.9)",
    accentSoft: "rgba(191, 20, 21, 0.5)",
  },
  {
    id: "retro",
    label: "Retro Classics",
    title: "Retro Jerseys",
    description: "Iconic throwbacks from club and national archives.",
    to: "/shop/retro",
    image: footballCard,
    accent: "rgba(15, 54, 121, 0.85)",
    accentSoft: "rgba(15, 54, 121, 0.45)",
  },
  {
    id: "equipment",
    label: "Equipment",
    title: "Boots & Training Gear",
    description: "Match-day boots, keeper gloves and training essentials.",
    to: "/shop/equipment",
    image: gymCard,
    accent: "rgba(9, 26, 58, 0.9)",
    accentSoft: "rgba(9, 26, 58, 0.55)",
  },
];

const spotlightProducts = [
  {
    id: "chelsea-25-26-third",
    name: "Chelsea 2025/2026 Third Kit",
    price: 300,
    originalPrice: 340,
    image: jerseyImg,
    category: "Premier League",
    isOnSale: true,
    inStock: true,
  },
  {
    id: "ghana-2025-home",
    name: "Ghana Home Kit 2025 Fan Edition",
    price: 240,
    originalPrice: 260,
    image: jerseyImg,
    category: "AFCON",
    isOnSale: true,
    inStock: true,
  },
  {
    id: "bayern-25-away",
    name: "Bayern 2025/2026 Away Kit",
    price: 270,
    originalPrice: 300,
    image: jerseyImg,
    category: "Bundesliga",
    isOnSale: true,
    inStock: true,
  },
  {
    id: "elite-speed-boots",
    name: "Elite Speed Pro Boots",
    price: 520,
    originalPrice: 560,
    image: bootsImg,
    category: "Footwear",
    isOnSale: true,
    inStock: true,
  },
  {
    id: "gripmax-gloves",
    name: "GripMax Goalkeeper Gloves",
    price: 220,
    originalPrice: 240,
    image: glovesImg,
    category: "Goalkeeping",
    isOnSale: true,
    inStock: true,
  },
  {
    id: "training-bib-pack",
    name: "Training Bibs Bundle (12 Pack)",
    price: 150,
    originalPrice: null,
    image: accessoriesCard,
    category: "Training",
    isOnSale: false,
    inStock: true,
  },
];

const promoStories = [
  {
    id: "club-packages",
    eyebrow: "Club services",
    title: "Bulk kit sourcing & personalization",
    copy:
      "Lock in pre-season bundles, crest embroidery, numbering and sponsor printing with one brief.",
    cta: { label: "Build your team pack", to: "/contact" },
  },
  {
    id: "boot-lab",
    eyebrow: "Boot lab",
    title: "Find the perfect boot fit",
    copy:
      "Expert guidance on firm ground, turf and indoor boots with try-on support in-store.",
    cta: { label: "Book fitting", to: "/contact" },
  },
];

const testimonials = [
  {
    id: "elite-accra",
    quote:
      "Precision Sports kitted the entire academy in record time. Players loved the authentic quality and personalization.",
    name: "Coach Yaw Mensah",
    role: "Elite FC Academy",
  },
  {
    id: "corporate",
    quote:
      "Their corporate wellness bundles made it easy to reward staff with premium training gear that actually gets used.",
    name: "Adwoa Amissah",
    role: "People Lead, Kanda Group",
  },
  {
    id: "supporters",
    quote:
      "Finally a Ghana shop with the latest European drops plus Black Stars editions in every size. Delivery was swift!",
    name: "Kwesi Frimpong",
    role: "Supporters Club Chairman",
  },
];

const brandPartners = ["Nike", "Adidas", "Puma", "New Balance", "Umbro", "Under Armour"];

function HeroSection({ highlights }) {
  return (
    <section className="home-hero" style={{ "--hero-bg": `url(${heroBackground})` }}>
      <div className="home-hero-inner">
        <div className="home-hero-content">
          <span className="hero-eyebrow">Ghana's No.1 Sports Hub</span>
          <h1>Rep your club with match-day ready gear.</h1>
          <p>
            Shop the latest 2025/26 player and fan editions, boots, and training essentials
            delivered nationwide with rapid fulfillment.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary" to="/shop">
              Shop new kits
            </Link>
            <Link className="btn btn-outline hero-outline" to="/contact">
              Talk to our team
            </Link>
          </div>
          <ul className="hero-highlights">
            {highlights.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
        </div>
        <div className="home-hero-visual">
          <div className="hero-visual-card">
            <span className="hero-card-tag">2025/2026 drop</span>
            <img src={jerseyImg} alt="2025/2026 jerseys" className="primary" loading="lazy" />
            <img src={bootsImg} alt="" aria-hidden="true" className="secondary" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryTiles({ categories }) {
  return (
    <section className="home-section category-section">
      <div className="section-header">
        <div>
          <span className="section-eyebrow">Shop by league</span>
          <h2 className="section-title">Club & tournament collections</h2>
          <p className="section-subtitle">
            Premier League, La Liga, AFCON and more — curated for Ghanaian fans and teams.
          </p>
        </div>
        <Link className="section-link" to="/shop">
          View all jerseys
        </Link>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.to}
            className="category-tile"
            style={{
              "--tile-accent": category.accent,
              "--tile-accent-soft": category.accentSoft,
            }}
          >
            <span className="category-label">{category.label}</span>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <span className="category-cta">Shop now</span>
            <img src={category.image} alt={category.label} loading="lazy" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductRail({ eyebrow, title, description, products }) {
  return (
    <section className="home-section product-rail">
      <div className="section-header">
        <div>
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className="section-title">{title}</h2>
          {description && <p className="section-subtitle">{description}</p>}
        </div>
        <Link className="section-link" to="/shop">
          View full collection
        </Link>
      </div>
      <div className="product-rail-swiper">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 1.6 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function ServiceHighlights({ items }) {
  return (
    <section className="home-section assurance-section">
      <div className="section-header">
        <div>
          <span className="section-eyebrow">Why shop with us</span>
          <h2 className="section-title">Match-day ready service</h2>
          <p className="section-subtitle">
            From the first click to final whistle, every order is supported by Ghana-based gear specialists.
          </p>
        </div>
      </div>
      <div className="assurance-grid">
        {items.map((item) => (
          <article key={item.id} className="assurance-card">
            <span className="assurance-tag">{item.tag}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PromoStories({ stories }) {
  return (
    <section className="home-section promo-section">
      <div className="promo-grid">
        {stories.map((story) => (
          <article key={story.id} className="promo-card">
            <span className="promo-eyebrow">{story.eyebrow}</span>
            <h3>{story.title}</h3>
            <p>{story.copy}</p>
            <Link className="promo-link" to={story.cta.to}>
              {story.cta.label}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection({ quotes }) {
  return (
    <section className="home-section testimonials-section">
      <div className="section-header">
        <div>
          <span className="section-eyebrow">Trusted by clubs</span>
          <h2 className="section-title">Feedback from the field</h2>
        </div>
      </div>
      <div className="testimonial-grid">
        {quotes.map((quote) => (
          <figure key={quote.id} className="testimonial-card">
            <blockquote>{quote.quote}</blockquote>
            <figcaption>
              <strong>{quote.name}</strong>
              <span>{quote.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function BrandStrip({ brands }) {
  return (
    <section className="brand-strip" aria-label="Brand partners">
      <div className="brand-strip-inner">
        {brands.map((brand) => (
          <span key={brand}>{brand}</span>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta-banner">
      <div className="cta-banner-inner">
        <div>
          <span className="section-eyebrow">Ready for kickoff</span>
          <h2>Let&apos;s build your next kit drop</h2>
          <p>
            Share your squad list, sponsors and timelines and we&apos;ll return a tailored proposal within 24 hours.
          </p>
        </div>
        <div className="cta-actions">
          <Link className="btn btn-primary" to="/contact">
            Start a project
          </Link>
          <Link className="btn btn-outline" to="/about">
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // Featured products for the auto-rotating carousel
  const featuredProducts = [
    ...spotlightProducts,
    // Add more products if needed to showcase variety
  ];

  return (
    <div className="page-root home-page">
      <HeroSection highlights={heroHighlights} />
      <ServiceHighlights items={serviceHighlights} />
      <CategoryTiles categories={leagueCategories} />
      <FeaturedProductsCarousel
        products={featuredProducts}
        title="Featured Products"
        subtitle="Handpicked selection of premium sports gear and equipment"
      />
      <ProductRail
        eyebrow="2025/2026 New Kits"
        title="Latest club drops"
        description="Fresh player and fan editions arriving weekly with sizes for every supporter."
        products={spotlightProducts}
      />
      <PromoStories stories={promoStories} />
      <TestimonialsSection quotes={testimonials} />
      <BrandStrip brands={brandPartners} />
      <CTASection />
    </div>
  );
}
