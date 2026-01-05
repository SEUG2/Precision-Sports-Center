export type ProductCategory = "jersey" | "boots" | "equipment";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: ProductCategory;
  league: string;
  team: string;
  sizes: string[];
  inStock: boolean;
  images: string[];
  rating: number;
  reviewCount: number;
  features: string[];
  stock?: number;
  releaseDate: string;
  bestsellerScore: number;
}

const jerseyProducts: Product[] = [
  {
    id: "chelsea-home-2425",
    title: "Chelsea 24/25 Home Jersey",
    description:
      "Official Chelsea FC 24/25 home shirt with breathable Dri-FIT ADV mesh for match-day performance.",
    price: 899,
    discountPrice: 749,
    category: "jersey",
    league: "Premier League",
    team: "Chelsea",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1523380913932-6c6c89f9a3e5?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.8,
    reviewCount: 182,
    features: [
      "Lightweight recycled polyester",
      "Laser cut ventilation zones",
      "Official player name printing available"
    ],
    stock: 6,
    releaseDate: "2024-08-12",
    bestsellerScore: 95
  },
  {
    id: "ghana-afcon-pro",
    title: "Ghana Black Stars Pro Jersey",
    description:
      "Limited AFCON edition jersey for the Black Stars with woven crest and embossed map detailing.",
    price: 720,
    discountPrice: 640,
    category: "jersey",
    league: "AFCON",
    team: "Ghana",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1604671801908-81cbe5398bb0?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1509027936075-1f7ccc660f3a?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.9,
    reviewCount: 264,
    features: [
      "Heat-sealed federation crest",
      "Moisture-wicking mesh back",
      "Includes commemorative AFCON patch"
    ],
    stock: 3,
    releaseDate: "2024-12-01",
    bestsellerScore: 97
  },
  {
    id: "bayern-away-2425",
    title: "Bayern Munich 24/25 Away Jersey",
    description:
      "Sleek Bayern Munich away kit with tonal diamond graphic and AEROREADY cooling.",
    price: 780,
    discountPrice: 699,
    category: "jersey",
    league: "Bundesliga",
    team: "Bayern Munich",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.7,
    reviewCount: 148,
    features: [
      "Ribbed retro-inspired collar",
      "QR-enabled authenticity label",
      "Bayern crest in silicone detail"
    ],
    stock: 9,
    releaseDate: "2024-07-21",
    bestsellerScore: 89
  },
  {
    id: "real-madrid-championship",
    title: "Real Madrid Champions Jersey",
    description:
      "Celebrate Madrid's continental triumph with the champions jersey featuring gold trim.",
    price: 840,
    discountPrice: 780,
    category: "jersey",
    league: "La Liga",
    team: "Real Madrid",
    sizes: ["S", "M", "L", "XL"],
    inStock: false,
    images: [
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.6,
    reviewCount: 201,
    features: [
      "Champions badge on sleeve",
      "Gold accented V-neck",
      "Includes limited edition commemorative box"
    ],
    stock: 0,
    releaseDate: "2024-06-05",
    bestsellerScore: 88
  },
  {
    id: "city-elite-training",
    title: "Manchester City Elite Training Jersey",
    description:
      "Technical training top engineered for City's high-performance sessions with knit side vents.",
    price: 540,
    discountPrice: 480,
    category: "jersey",
    league: "Premier League",
    team: "Manchester City",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1528873981-ffc7f79d5f1d?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.5,
    reviewCount: 96,
    features: [
      "Dynamic stretch panels",
      "Thumbhole cuffs",
      "Club mantra embossed on back hem"
    ],
    stock: 12,
    releaseDate: "2024-09-02",
    bestsellerScore: 82
  },
  {
    id: "barcelona-senyera",
    title: "Barcelona Senyera Fourth Jersey",
    description:
      "Bold senyera stripes with iridescent crest celebrating Catalan pride.",
    price: 860,
    discountPrice: 749,
    category: "jersey",
    league: "La Liga",
    team: "Barcelona",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1523381014739-6ae41aba87b0?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.8,
    reviewCount: 174,
    features: [
      "Iridescent crest treatment",
      "Sustainable yarn blend",
      "Player edition slim profile"
    ],
    stock: 4,
    releaseDate: "2024-10-10",
    bestsellerScore: 91
  },
  {
    id: "arsenal-retro-emirates",
    title: "Arsenal Emirates Retro Jersey",
    description:
      "Throwback inspired Arsenal jersey with contrast hoop sleeves and heritage crest.",
    price: 690,
    discountPrice: 590,
    category: "jersey",
    league: "Premier League",
    team: "Arsenal",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1523380744952-b7a18d7d1c25?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.4,
    reviewCount: 88,
    features: [
      "1989 champions tribute details",
      "Ribbed crew collar",
      "Comes with collectible pin set"
    ],
    stock: 7,
    releaseDate: "2024-08-28",
    bestsellerScore: 78
  },
  {
    id: "dortmund-strike-bold",
    title: "Borussia Dortmund Bold Stripe Jersey",
    description:
      "High-energy stripe graphic with breathable jacquard fabric for BVB supporters.",
    price: 640,
    discountPrice: 580,
    category: "jersey",
    league: "Bundesliga",
    team: "Borussia Dortmund",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1520931737576-7d28cb98efc0?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.3,
    reviewCount: 62,
    features: [
      "Mesh shoulder panelling",
      "Statement sponsor in matte finish",
      "Club founding year under back collar"
    ],
    stock: 5,
    releaseDate: "2024-07-04",
    bestsellerScore: 74
  },
  {
    id: "napoli-mediterranean",
    title: "Napoli Mediterranean Jersey",
    description:
      "Ocean-inspired gradient celebrating Naples coastline with breathable piqué knit.",
    price: 610,
    discountPrice: 530,
    category: "jersey",
    league: "Serie A",
    team: "Napoli",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.6,
    reviewCount: 73,
    features: [
      "Embossed tidal pattern",
      "Scudetto patch option",
      "Anti-odor silver ion treatment"
    ],
    stock: 8,
    releaseDate: "2024-09-18",
    bestsellerScore: 80
  },
  {
    id: "accra-lions-matchday",
    title: "Accra Lions Matchday Jersey",
    description:
      "Performance jersey for Accra Lions featuring kinetic side vents and moisture channels.",
    price: 520,
    discountPrice: 460,
    category: "jersey",
    league: "Ghana Premier League",
    team: "Accra Lions",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.5,
    reviewCount: 54,
    features: [
      "Laser perforated Lion motif",
      "Athlete tested in Accra humidity",
      "Free name personalization for season ticket holders"
    ],
    stock: 11,
    releaseDate: "2024-11-03",
    bestsellerScore: 76
  }
];

const bootProducts: Product[] = [
  {
    id: "predator-velocity-elite",
    title: "Predator Velocity Elite FG",
    description:
      "Carbon-infused soleplate with tactile strike zones for precision ball control on firm ground.",
    price: 1190,
    discountPrice: 999,
    category: "boots",
    league: "Premier League",
    team: "Chelsea",
    sizes: ["EU40", "EU41", "EU42", "EU43", "EU44"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.9,
    reviewCount: 221,
    features: [
      "Forged carbon power spine",
      "Adaptive knit collar",
      "Firm ground stud layout"
    ],
    stock: 5,
    releaseDate: "2024-08-08",
    bestsellerScore: 98
  },
  {
    id: "phantom-strike-elite",
    title: "Nike Phantom Strike Elite",
    description:
      "Hyperquick sole system with gripknit upper for explosive agility.",
    price: 1120,
    discountPrice: 1020,
    category: "boots",
    league: "Premier League",
    team: "Manchester City",
    sizes: ["EU39", "EU40", "EU41", "EU42", "EU43"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.7,
    reviewCount: 178,
    features: [
      "Gripknit textured upper",
      "Responsive agility plate",
      "Dynamic fit collar"
    ],
    stock: 14,
    releaseDate: "2024-07-15",
    bestsellerScore: 92
  },
  {
    id: "puma-ultra-pro",
    title: "Puma Ultra Pro Speed",
    description:
      "Featherlight composite boot engineered for raw pace with PWRTAPE support.",
    price: 980,
    discountPrice: 880,
    category: "boots",
    league: "Bundesliga",
    team: "Borussia Dortmund",
    sizes: ["EU40", "EU41", "EU42", "EU43"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.6,
    reviewCount: 132,
    features: [
      "PWRTAPE zonal support",
      "Ultraweave upper",
      "FG/AG hybrid studs"
    ],
    stock: 10,
    releaseDate: "2024-09-25",
    bestsellerScore: 86
  },
  {
    id: "furon-ghana-special",
    title: "New Balance Furon Ghana Special",
    description:
      "Limited Ghana edition Furon with Kente-inspired knit collar and Hypoknit upper.",
    price: 1050,
    discountPrice: 920,
    category: "boots",
    league: "AFCON",
    team: "Ghana",
    sizes: ["EU40", "EU41", "EU42", "EU43", "EU44"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.8,
    reviewCount: 156,
    features: [
      "Hypoknit precision upper",
      "Infused Kente collar",
      "Lightweight nylon chassis"
    ],
    stock: 7,
    releaseDate: "2024-10-18",
    bestsellerScore: 90
  },
  {
    id: "adidas-x-cobalt",
    title: "Adidas X Cobalt Pro",
    description:
      "Aeropacity speedskin upper with snapback carbon speedframe for instant acceleration.",
    price: 1080,
    discountPrice: 960,
    category: "boots",
    league: "La Liga",
    team: "Barcelona",
    sizes: ["EU39", "EU40", "EU41", "EU42"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.5,
    reviewCount: 101,
    features: [
      "Aeropacity speedskin",
      "Carbon speedframe",
      "Aggressive traction studs"
    ],
    stock: 9,
    releaseDate: "2024-09-30",
    bestsellerScore: 84
  },
  {
    id: "mizuno-morelia-dna",
    title: "Mizuno Morelia DNA",
    description:
      "Premium kangaroo leather touch with stabilized inner cage for elite playmakers.",
    price: 990,
    discountPrice: 930,
    category: "boots",
    league: "Serie A",
    team: "Napoli",
    sizes: ["EU40", "EU41", "EU42", "EU43"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1523380913932-6c6c89f9a3e5?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.7,
    reviewCount: 88,
    features: [
      "Handcrafted K-leather",
      "Stabilized inner cage",
      "Conical stud pattern"
    ],
    stock: 6,
    releaseDate: "2024-05-20",
    bestsellerScore: 77
  },
  {
    id: "magnetico-pro-elite",
    title: "Under Armour Magnetico Pro",
    description:
      "Form-fitting flexskin upper with responsive plate for sharp cuts.",
    price: 870,
    discountPrice: 810,
    category: "boots",
    league: "Premier League",
    team: "Arsenal",
    sizes: ["EU39", "EU40", "EU41", "EU42"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.4,
    reviewCount: 69,
    features: [
      "Form-fitting flexskin",
      "Internal auxetic support",
      "Charged cushioning sockliner"
    ],
    stock: 11,
    releaseDate: "2024-06-17",
    bestsellerScore: 71
  },
  {
    id: "umbro-velocita-v",
    title: "Umbro Velocita V Elite",
    description:
      "Sprint+ outsole plate with layered mesh for multidirectional traction.",
    price: 820,
    discountPrice: 760,
    category: "boots",
    league: "Bundesliga",
    team: "Borussia Dortmund",
    sizes: ["EU39", "EU40", "EU41", "EU42", "EU43"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1523380913932-6c6c89f9a3e5?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1523380744952-b7a18d7d1c25?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.3,
    reviewCount: 58,
    features: [
      "Sprint+ outsole plate",
      "Layered mesh upper",
      "Pro strobe collar"
    ],
    stock: 13,
    releaseDate: "2024-08-03",
    bestsellerScore: 69
  },
  {
    id: "saucony-turf-control",
    title: "Saucony Turf Control",
    description:
      "Hybrid turf outsole for academies training on multi-surface pitches.",
    price: 720,
    discountPrice: 660,
    category: "boots",
    league: "Ghana Premier League",
    team: "Accra Lions",
    sizes: ["EU39", "EU40", "EU41", "EU42"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.2,
    reviewCount: 47,
    features: [
      "Hybrid turf outsole",
      "Reinforced toe bumper",
      "Academy-friendly durability"
    ],
    stock: 16,
    releaseDate: "2024-11-12",
    bestsellerScore: 65
  },
  {
    id: "diadora-heritage-fg",
    title: "Diadora Heritage FG",
    description:
      "Heritage leather boot with modern lightweight plate inspired by Italian craftsmanship.",
    price: 760,
    discountPrice: 720,
    category: "boots",
    league: "Serie A",
    team: "Napoli",
    sizes: ["EU39", "EU40", "EU41", "EU42", "EU43"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1528873981-ffc7f79d5f1d?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.1,
    reviewCount: 41,
    features: [
      "Heritage leather vamp",
      "Lightweight pebax plate",
      "Italian tricolor heel detail"
    ],
    stock: 9,
    releaseDate: "2024-06-29",
    bestsellerScore: 63
  }
];

const equipmentProducts: Product[] = [
  {
    id: "precision-match-ball-viento",
    title: "Precision Match Ball Viento",
    description:
      "FIFA Quality Pro certified match ball with thermal bonded panels for consistent flight.",
    price: 420,
    discountPrice: 360,
    category: "equipment",
    league: "Premier League",
    team: "Neutral",
    sizes: ["Size 5"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1523380915935-0accd6a254bc?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.8,
    reviewCount: 137,
    features: [
      "Thermal bonded construction",
      "Micro-textured shell",
      "FIFA Quality Pro certified"
    ],
    stock: 19,
    releaseDate: "2024-08-14",
    bestsellerScore: 90
  },
  {
    id: "elite-guard-pro-shin",
    title: "Elite Guard Pro Shin Guards",
    description:
      "Carbon shell shin guards with multi-density foam and compression sleeve.",
    price: 260,
    discountPrice: 220,
    category: "equipment",
    league: "La Liga",
    team: "Real Madrid",
    sizes: ["S", "M", "L"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1523380913932-6c6c89f9a3e5?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.6,
    reviewCount: 84,
    features: [
      "Featherweight carbon shell",
      "Compression retention sleeve",
      "Three layer impact protection"
    ],
    stock: 15,
    releaseDate: "2024-05-09",
    bestsellerScore: 75
  },
  {
    id: "hydrocharge-recovery-bottle",
    title: "HydroCharge Recovery Bottle",
    description:
      "Insulated bottle with electrolyte mixing chamber and quick-lock lid.",
    price: 180,
    discountPrice: 150,
    category: "equipment",
    league: "Bundesliga",
    team: "Neutral",
    sizes: ["One Size"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1581578707711-dfed5d9f4deb?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.5,
    reviewCount: 63,
    features: [
      "Double wall insulation",
      "Integrated mixing chamber",
      "Leak proof twist cap"
    ],
    stock: 24,
    releaseDate: "2024-04-18",
    bestsellerScore: 70
  },
  {
    id: "agility-ladder-pro-kit",
    title: "Agility Ladder Pro Kit",
    description:
      "Adjustable 8m ladder with weighted rungs and carry case for club drills.",
    price: 310,
    discountPrice: 275,
    category: "equipment",
    league: "Premier League",
    team: "Neutral",
    sizes: ["One Size"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.4,
    reviewCount: 52,
    features: [
      "Weighted anti-slip rungs",
      "Modular section design",
      "Carry case included"
    ],
    stock: 17,
    releaseDate: "2024-09-07",
    bestsellerScore: 72
  },
  {
    id: "resistance-power-band-stack",
    title: "Resistance Power Band Stack",
    description:
      "Set of five progressive resistance bands with door anchor and training guide.",
    price: 260,
    discountPrice: 210,
    category: "equipment",
    league: "AFCON",
    team: "Ghana",
    sizes: ["One Size"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1517832606294-07a5b98dcb66?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.3,
    reviewCount: 45,
    features: [
      "Five resistance levels",
      "Non-slip handles",
      "Door anchor included"
    ],
    stock: 22,
    releaseDate: "2024-07-27",
    bestsellerScore: 68
  },
  {
    id: "goalkeeper-reflex-trainer",
    title: "Goalkeeper Reflex Trainer",
    description:
      "Rapid response trainer with unpredictable bounces to sharpen reflex saves.",
    price: 460,
    discountPrice: 410,
    category: "equipment",
    league: "Premier League",
    team: "Chelsea",
    sizes: ["One Size"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.7,
    reviewCount: 59,
    features: [
      "Reactive bounce panels",
      "Weighted base for stability",
      "Includes session planner"
    ],
    stock: 8,
    releaseDate: "2024-10-05",
    bestsellerScore: 73
  },
  {
    id: "team-shelter-bench-cover",
    title: "Team Shelter Bench Cover",
    description:
      "Weatherproof shelter cover with UV-resistant panels for technical areas.",
    price: 980,
    discountPrice: 870,
    category: "equipment",
    league: "Bundesliga",
    team: "Bayern Munich",
    sizes: ["Large"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1528873981-ffc7f79d5f1d?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.2,
    reviewCount: 38,
    features: [
      "UV resistant panels",
      "Reinforced stitching",
      "Carrying bag included"
    ],
    stock: 6,
    releaseDate: "2024-11-20",
    bestsellerScore: 64
  },
  {
    id: "smart-gps-performance-vest",
    title: "Smart GPS Performance Vest",
    description:
      "Integrated GPS tracking vest with live telemetry and analytics dashboard access.",
    price: 1650,
    discountPrice: 1480,
    category: "equipment",
    league: "La Liga",
    team: "Barcelona",
    sizes: ["S", "M", "L"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1495712686514-3b7120f83e4c?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.6,
    reviewCount: 66,
    features: [
      "Live GPS telemetry",
      "Cloud analytics dashboard",
      "Machine washable sensor pod"
    ],
    stock: 4,
    releaseDate: "2024-09-29",
    bestsellerScore: 88
  },
  {
    id: "inflatable-recovery-ice-bath",
    title: "Inflatable Recovery Ice Bath",
    description:
      "Portable recovery tub with quick-inflate walls and temperature gauge.",
    price: 1340,
    discountPrice: 1200,
    category: "equipment",
    league: "AFCON",
    team: "Ghana",
    sizes: ["One Size"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1530543787849-128d94430c6b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1517832606294-07a5b98dcb66?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.5,
    reviewCount: 51,
    features: [
      "Quick inflate construction",
      "Integrated temperature gauge",
      "Carry backpack included"
    ],
    stock: 7,
    releaseDate: "2024-10-22",
    bestsellerScore: 79
  },
  {
    id: "stadium-led-coaching-board",
    title: "Stadium LED Coaching Board",
    description:
      "LED illuminated coaching board with magnetic markers and rechargeable battery.",
    price: 760,
    discountPrice: 690,
    category: "equipment",
    league: "Premier League",
    team: "Arsenal",
    sizes: ["One Size"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1514970744200-4f1116406d4e?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1523380915935-0accd6a254bc?auto=format&fit=crop&w=700&q=80"
    ],
    rating: 4.4,
    reviewCount: 43,
    features: [
      "LED illuminated surface",
      "Magnetic pitch markers",
      "12-hour rechargeable battery"
    ],
    stock: 9,
    releaseDate: "2024-08-19",
    bestsellerScore: 74
  }
];

export const products: Product[] = [
  ...jerseyProducts,
  ...bootProducts,
  ...equipmentProducts
];

export const distinctLeagues = Array.from(new Set(products.map((product) => product.league))).sort();
export const distinctTeams = Array.from(new Set(products.map((product) => product.team))).sort();
export const distinctCategories = Array.from(new Set(products.map((product) => product.category))).sort() as ProductCategory[];

export const jerseySizes: string[] = ["S", "M", "L", "XL", "XXL"];