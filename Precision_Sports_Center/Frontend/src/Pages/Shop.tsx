import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";
import { Heart, ShoppingBag, ShoppingCart, Star, ArrowUp, Check, X, Loader2 } from "lucide-react";
import { products as fallbackProducts, Product, ProductCategory, jerseySizes } from "./shop-data";
import { calculateDiscountPercentage, getProductPrice } from "./shop-utils";
import { formatGHS } from "@/lib/formatCurrency";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

const PRODUCTS_PER_PAGE = 12;
const STORAGE_WISHLIST_KEY = "psc.shop.wishlist";
const STORAGE_COMPARE_KEY = "psc.shop.compare";
const STORAGE_RECENTS_KEY = "psc.shop.recents";
const SHIPPING_ZONES = [
  { id: "accra", label: "Accra Metro", rate: 25, eta: "Same day courier" },
  { id: "kumasi", label: "Kumasi", rate: 35, eta: "Next day dispatch" },
  { id: "cape-coast", label: "Cape Coast", rate: 40, eta: "48 hr delivery" },
  { id: "tamale", label: "Tamale", rate: 55, eta: "3-4 business days" },
  { id: "takoradi", label: "Takoradi", rate: 45, eta: "2-3 business days" },
];

const FALLBACK_PRICE_FLOOR = fallbackProducts.length
  ? Math.min(...fallbackProducts.map((product) => product.discountPrice ?? product.price))
  : 0;
const FALLBACK_PRICE_CEILING = fallbackProducts.length
  ? Math.max(...fallbackProducts.map((product) => product.discountPrice ?? product.price))
  : 0;

type SortOption = "newest" | "price-asc" | "price-desc" | "bestseller" | "discount-desc";

type FilterState = {
  search: string;
  priceRange: [number, number];
  leagues: string[];
  categories: ProductCategory[];
  teams: string[];
  sizes: string[];
  sort: SortOption;
  page: number;
};

const DEFAULT_FILTERS: FilterState = {
  search: "",
  priceRange: [FALLBACK_PRICE_FLOOR, FALLBACK_PRICE_CEILING],
  leagues: [],
  categories: [],
  teams: [],
  sizes: [],
  sort: "newest",
  page: 1,
};

const ShopQuickView = React.lazy(() => import("./ShopQuickView"));

function toNumber(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseList(value: string | null) {
  if (!value) return [];
  return value.split(",").filter(Boolean);
}

function normalizeFilterState(
  state: FilterState,
  bounds: { min: number; max: number } = { min: FALLBACK_PRICE_FLOOR, max: FALLBACK_PRICE_CEILING }
): FilterState {
  const floor = Math.min(bounds.min, bounds.max);
  const ceiling = Math.max(bounds.min, bounds.max);
  const clampedRange: [number, number] = [
    Math.max(floor, state.priceRange[0]),
    Math.min(ceiling, state.priceRange[1]),
  ];

  if (clampedRange[0] > clampedRange[1]) {
    clampedRange[0] = floor;
    clampedRange[1] = ceiling;
  }

  return {
    ...state,
    priceRange: clampedRange,
    leagues: [...new Set(state.leagues)].sort(),
    categories: [...new Set(state.categories)].sort(),
    teams: [...new Set(state.teams)].sort(),
    sizes: [...new Set(state.sizes)].sort(),
    page: Math.max(1, state.page),
  };
}

function parseFiltersFromParams(params: URLSearchParams): FilterState {
  const priceMin = toNumber(params.get("min"), DEFAULT_FILTERS.priceRange[0]);
  const priceMax = toNumber(params.get("max"), DEFAULT_FILTERS.priceRange[1]);

  const filters: FilterState = {
    search: params.get("search")?.trim() ?? DEFAULT_FILTERS.search,
    priceRange: [priceMin, priceMax],
    leagues: parseList(params.get("leagues")),
    categories: parseList(params.get("categories")) as ProductCategory[],
    teams: parseList(params.get("teams")),
    sizes: parseList(params.get("sizes")),
    sort: (params.get("sort") as SortOption) || DEFAULT_FILTERS.sort,
    page: toNumber(params.get("page"), DEFAULT_FILTERS.page),
  };

  return normalizeFilterState(filters);
}

function serializeFilters(
  state: FilterState,
  bounds: { min: number; max: number } = { min: FALLBACK_PRICE_FLOOR, max: FALLBACK_PRICE_CEILING }
) {
  const params = new URLSearchParams();
  if (state.search) params.set("search", state.search);
  const floor = Math.min(bounds.min, bounds.max);
  const ceiling = Math.max(bounds.min, bounds.max);
  if (state.priceRange[0] > floor) params.set("min", String(Math.round(state.priceRange[0])));
  if (state.priceRange[1] < ceiling) params.set("max", String(Math.round(state.priceRange[1])));
  if (state.leagues.length) params.set("leagues", state.leagues.join(","));
  if (state.categories.length) params.set("categories", state.categories.join(","));
  if (state.teams.length) params.set("teams", state.teams.join(","));
  if (state.sizes.length) params.set("sizes", state.sizes.join(","));
  if (state.sort !== DEFAULT_FILTERS.sort) params.set("sort", state.sort);
  if (state.page !== 1) params.set("page", String(state.page));
  return params;
}

function applySorting(list: Product[], sort: SortOption) {
  const cloned = [...list];
  switch (sort) {
    case "price-asc":
      return cloned.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    case "price-desc":
      return cloned.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    case "bestseller":
      return cloned.sort((a, b) => b.bestsellerScore - a.bestsellerScore);
    case "discount-desc":
      return cloned.sort((a, b) => calculateDiscountPercentage(b) - calculateDiscountPercentage(a));
    case "newest":
    default:
      return cloned.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  }
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "bestseller", label: "Best Selling" },
  { value: "discount-desc", label: "Top Discounts" },
];

type WishlistSet = Set<string>;
type CompareSet = Set<string>;

type ShippingSelection = (typeof SHIPPING_ZONES)[number]["id"];

type RecentlyViewedState = string[];

const VALID_CATEGORIES: ProductCategory[] = ["jersey", "boots", "equipment"];
const DEFAULT_PRODUCT_IMAGE = fallbackProducts[0]?.images?.[0] ??
  "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=700&q=80";

type SupabaseProductRecord = Record<string, unknown>;

function mapSupabaseProduct(record: SupabaseProductRecord): Product | null {
  if (!record || record.id === undefined || record.id === null) {
    return null;
  }

  const ensureStringArray = (value: unknown): string[] =>
    Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      : [];

  const rawCategory = typeof record.category === "string" ? record.category.toLowerCase().trim() : "";
  const category = VALID_CATEGORIES.includes(rawCategory as ProductCategory)
    ? (rawCategory as ProductCategory)
    : "jersey";

  const images = ensureStringArray(record.images);
  const sizes = ensureStringArray(record.sizes);
  const features = ensureStringArray(record.features);

  const safePrice = Number(record.price ?? 0);
  const price = Number.isFinite(safePrice) ? safePrice : 0;

  const rawDiscount = record.discount_price === null || record.discount_price === undefined
    ? undefined
    : Number(record.discount_price);
  const discountPrice = rawDiscount !== undefined && Number.isFinite(rawDiscount) ? rawDiscount : undefined;

  const ratingValue = Number(record.rating ?? 0);
  const reviewCountValue = Number(record.review_count ?? 0);
  const stockValue = Number(record.stock ?? NaN);
  const bestsellerScoreValue = Number(record.bestseller_score ?? 0);

  const releaseDate =
    typeof record.release_date === "string" && record.release_date.trim().length > 0
      ? record.release_date
      : new Date().toISOString().slice(0, 10);

  return {
    id: String(record.id),
    title: typeof record.title === "string" && record.title.trim().length > 0 ? record.title : "Unnamed product",
    description: typeof record.description === "string" ? record.description : "",
    price,
    discountPrice,
    category,
    league: typeof record.league === "string" && record.league.trim().length > 0 ? record.league : "Neutral",
    team: typeof record.team === "string" && record.team.trim().length > 0 ? record.team : "Neutral",
    sizes,
    inStock: typeof record.in_stock === "boolean" ? record.in_stock : Boolean(record.in_stock ?? true),
    images: images.length ? images : [DEFAULT_PRODUCT_IMAGE],
    rating: Number.isFinite(ratingValue) ? ratingValue : 0,
    reviewCount: Number.isFinite(reviewCountValue) ? reviewCountValue : 0,
    features: features.length ? features : ["High performance sports gear"],
    stock: Number.isFinite(stockValue) ? stockValue : undefined,
    releaseDate,
    bestsellerScore: Number.isFinite(bestsellerScoreValue) ? bestsellerScoreValue : 0,
  };
}

function usePersistentSet(key: string, initialValue: string[]): [WishlistSet, (id: string) => void, (next: WishlistSet) => void] {
  const [setState, setSetState] = useState<WishlistSet>(() => new Set(initialValue));

  const toggle = useCallback((id: string) => {
    setSetState((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem(key, JSON.stringify(Array.from(next)));
      return next;
    });
  }, [key]);

  const replace = useCallback((next: WishlistSet) => {
    setSetState(next);
    localStorage.setItem(key, JSON.stringify(Array.from(next)));
  }, [key]);

  return [setState, toggle, replace];
}

function readStoredSet(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value) => typeof value === "string");
  } catch (error) {
    console.error(`Failed to read ${key}`, error);
    return [];
  }
}

const ProductCard: React.FC<{
  product: Product;
  wishlist: WishlistSet;
  compare: CompareSet;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
}> = React.memo(({ product, wishlist, compare, onToggleWishlist, onToggleCompare, onAddToCart, onQuickView }) => {
  const discount = calculateDiscountPercentage(product);
  const [quantity, setQuantity] = useState(1);
  const price = getProductPrice(product);

  useEffect(() => {
    setQuantity(1);
  }, [product.id]);

  return (
    <div className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="h-56 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase text-white">
            Save {discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-x-0 bottom-3 mx-auto w-fit rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">
            Sold out
          </span>
        )}
        <button
          type="button"
          className={cn(
            "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-slate-700 transition hover:text-secondary",
            wishlist.has(product.id) && "text-secondary"
          )}
          aria-pressed={wishlist.has(product.id)}
          aria-label={wishlist.has(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => onToggleWishlist(product.id)}
        >
          <Heart className="h-4 w-4" fill={wishlist.has(product.id) ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {product.league}
            </span>
            <Link to={`/product/${product.id}`} className="line-clamp-2 text-lg font-semibold text-slate-900">
              {product.title}
            </Link>
            <p className="line-clamp-2 text-sm text-slate-600">{product.description}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-amber-500" aria-label={`${product.rating} out of 5`}>
            <Star className="h-4 w-4" />
            <span className="font-semibold text-slate-900">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-500">({product.reviewCount})</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          {product.sizes.length > 0 ? (
            product.sizes.slice(0, 5).map((size) => (
              <span
                key={size}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {size}
              </span>
            ))
          ) : (
            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
              One size
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-xl font-bold text-slate-900">{formatGHS(price)}</span>
          {product.discountPrice && product.discountPrice < product.price && (
            <Fragment>
              <span className="text-sm font-medium text-slate-400 line-through">{formatGHS(product.price)}</span>
              <span className="text-xs font-semibold text-secondary">-{discount}%</span>
            </Fragment>
          )}
        </div>

        {product.stock !== undefined && product.stock > 0 && product.stock <= 3 && (
          <span className="text-xs font-semibold uppercase text-secondary">Only {product.stock} left!</span>
        )}

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <label htmlFor={`qty-${product.id}`} className="sr-only">
              Quantity
            </label>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2">
              <button
                type="button"
                className="text-sm font-semibold text-slate-600 transition hover:text-primary"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                id={`qty-${product.id}`}
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
                className="w-12 border-none bg-transparent text-center text-sm font-semibold text-slate-900 focus:outline-none"
              />
              <button
                type="button"
                className="text-sm font-semibold text-slate-600 transition hover:text-primary"
                onClick={() => setQuantity((prev) => prev + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <input
                type="checkbox"
                checked={compare.has(product.id)}
                onChange={() => onToggleCompare(product.id)}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              Compare
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-400"
              disabled={!product.inStock}
              onClick={() => onAddToCart(product, quantity)}
            >
              <ShoppingCart className="h-4 w-4" />
              {product.inStock ? "Add to Cart" : "Notify Me"}
            </button>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                onClick={() => onQuickView(product)}
              >
                Quick View
              </button>
            </DialogTrigger>
          </div>
        </div>
      </div>
    </div>
  );
});
ProductCard.displayName = "ProductCard";

class ShopErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("Shop page error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-3xl rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-700">
          <h1 className="text-2xl font-bold">We hit a temporary snag</h1>
          <p className="mt-3 text-sm text-red-600">
            Please refresh the page or return home while we recover the latest inventory feeds.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
          >
            Back to homepage
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

const ShopPage: React.FC = () => {
  const { addItem, items: cartItems } = useCart();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => parseFiltersFromParams(searchParams));
  const [catalog, setCatalog] = useState<Product[]>(fallbackProducts);
  const [isCatalogFetching, setIsCatalogFetching] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [wishlist, toggleWishlist] = usePersistentSet(
    STORAGE_WISHLIST_KEY,
    typeof window === "undefined" ? [] : readStoredSet(STORAGE_WISHLIST_KEY)
  );
  const [compare, toggleCompare, replaceCompare] = usePersistentSet(
    STORAGE_COMPARE_KEY,
    typeof window === "undefined" ? [] : readStoredSet(STORAGE_COMPARE_KEY)
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedState>(
    typeof window === "undefined" ? [] : readStoredSet(STORAGE_RECENTS_KEY)
  );
  const [shippingZone, setShippingZone] = useState<ShippingSelection>(SHIPPING_ZONES[0].id);
  const [shippingEstimate, setShippingEstimate] = useState<{ rate: number; eta: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const computedPriceFloor = useMemo(() => {
    if (!catalog.length) return FALLBACK_PRICE_FLOOR;
    const value = Math.min(...catalog.map((product) => product.discountPrice ?? product.price));
    return Number.isFinite(value) ? value : FALLBACK_PRICE_FLOOR;
  }, [catalog]);

  const computedPriceCeiling = useMemo(() => {
    if (!catalog.length) return FALLBACK_PRICE_CEILING;
    const value = Math.max(...catalog.map((product) => product.discountPrice ?? product.price));
    return Number.isFinite(value) ? value : FALLBACK_PRICE_CEILING;
  }, [catalog]);

  const distinctLeagues = useMemo(
    () => Array.from(new Set(catalog.map((product) => product.league))).sort(),
    [catalog]
  );

  const distinctTeams = useMemo(
    () => Array.from(new Set(catalog.map((product) => product.team))).sort(),
    [catalog]
  );

  const distinctCategories = useMemo(
    () => Array.from(new Set(catalog.map((product) => product.category))).sort() as ProductCategory[],
    [catalog]
  );

  const normalizeWithCatalog = useCallback((state: FilterState) => {
    const normalized = normalizeFilterState(state, { min: computedPriceFloor, max: computedPriceCeiling });
    const leagueSet = new Set(distinctLeagues);
    const categorySet = new Set(distinctCategories);
    const teamSet = new Set(distinctTeams);

    return {
      ...normalized,
      leagues: normalized.leagues.filter((league) => leagueSet.has(league)).sort(),
      categories: normalized.categories.filter((category) => categorySet.has(category)).sort(),
      teams: normalized.teams.filter((team) => teamSet.has(team)).sort(),
    };
  }, [computedPriceFloor, computedPriceCeiling, distinctLeagues, distinctCategories, distinctTeams]);

  const filtersSignature = useMemo(() => JSON.stringify(filters), [filters]);
  const hasMounted = useRef(false);

  useEffect(() => {
    let isActive = true;

    const fetchProducts = async () => {
      try {
        setIsCatalogFetching(true);
        const { data, error } = await supabase.from("products").select("*");
        if (error) {
          throw error;
        }

        if (data && Array.isArray(data)) {
          const normalized = data
            .map((record) => mapSupabaseProduct(record as SupabaseProductRecord))
            .filter((value): value is Product => Boolean(value))
            .map((product) => ({
              ...product,
              // Ensure sizes fallback to jerseySizes when absent to keep filters meaningful
              sizes: product.sizes.length ? product.sizes : jerseySizes,
            }));

          if (normalized.length && isActive) {
            setCatalog(normalized);
            setCatalogError(null);
          }

          if (!normalized.length && isActive) {
            setCatalogError("No live products found. Showing cached catalog instead.");
          }
        }
      } catch (error) {
        console.error("Failed to load products from Supabase", error);
        if (isActive) {
          setCatalogError("Unable to load live inventory. Showing cached catalog instead.");
        }
      } finally {
        if (isActive) {
          setIsCatalogFetching(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const parsed = parseFiltersFromParams(searchParams);
    const normalized = normalizeWithCatalog(parsed);
    const normalizedSignature = JSON.stringify(normalized);
    if (normalizedSignature !== filtersSignature) {
      setFilters(normalized);
    }
  }, [searchParams, normalizeWithCatalog, filtersSignature]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setIsLoading(true);
    const timeout = window.setTimeout(() => setIsLoading(false), 220);
    return () => window.clearTimeout(timeout);
  }, [filtersSignature]);

  useEffect(() => {
    setFilters((previous) => {
      const normalized = normalizeWithCatalog(previous);
      if (JSON.stringify(previous) === JSON.stringify(normalized)) {
        return previous;
      }
      setSearchParams(serializeFilters(normalized, { min: computedPriceFloor, max: computedPriceCeiling }));
      return normalized;
    });
    // We intentionally exclude setFilters from deps as we're invoking it here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizeWithCatalog, computedPriceFloor, computedPriceCeiling, setSearchParams]);

  useEffect(() => {
    const scriptId = "shop-structured-data";
    const structured = {
      "@context": "https://schema.org",
      "@type": "ProductCollection",
      name: "Precision Sports Center Shop",
      description: "Elite football jerseys, boots and equipment for clubs, academies and ambitious athletes.",
      url: window.location.href,
      products: applySorting(catalog.slice(0, 6), filters.sort).map((product) => ({
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.images[0],
        brand: product.team,
        offers: {
          "@type": "Offer",
          priceCurrency: "GHS",
          price: getProductPrice(product),
          availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        },
      })),
    };

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structured);
    document.title = "Shop Jerseys, Boots & Equipment | Precision Sports Center";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore Ghana's premier sports shop for elite jerseys, boots and equipment with pro-grade service."
      );
    }
  }, [catalog, filters.sort]);

  const updateFilters = useCallback((partial: Partial<FilterState>) => {
    setFilters((previous) => {
      const merged = { ...previous, ...partial, page: partial.page ?? previous.page };
      const next = normalizeWithCatalog(merged);
      setSearchParams(serializeFilters(next, { min: computedPriceFloor, max: computedPriceCeiling }));
      return next;
    });
  }, [normalizeWithCatalog, setSearchParams, computedPriceFloor, computedPriceCeiling]);

  const filteredProducts = useMemo(() => {
    const { search, priceRange, leagues, categories, teams, sizes } = filters;
    const normalizedSearch = search.trim().toLowerCase();

    const result = catalog.filter((product) => {
      const price = getProductPrice(product);
      if (price < priceRange[0] || price > priceRange[1]) return false;

      if (leagues.length && !leagues.includes(product.league)) return false;
      if (categories.length && !categories.includes(product.category)) return false;
      if (teams.length && !teams.includes(product.team)) return false;
      if (sizes.length) {
        const intersects = product.sizes.some((size) => sizes.includes(size));
        if (!intersects) return false;
      }

      if (normalizedSearch) {
        const haystack = `${product.title} ${product.description} ${product.team} ${product.league}`.toLowerCase();
        if (!haystack.includes(normalizedSearch)) return false;
      }

      return true;
    });

    return applySorting(result, filters.sort);
  }, [catalog, filters]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(filters.page, totalPages);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);
  const showLoadingSkeleton = isLoading || isCatalogFetching;

  const handleAddToCart = useCallback((product: Product, quantity: number) => {
    if (!product.inStock) {
      toast({
        title: "We'll let you know",
        description: `${product.title} is currently out of stock. Use contact form to request a restock alert.`,
        variant: "destructive",
      });
      return;
    }

    addItem(
      {
        id: product.id,
        title: product.title,
        price: getProductPrice(product),
        originalPrice: product.price,
        image: product.images[0],
        inStock: product.inStock,
      },
      quantity
    );

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.title} added successfully`,
    });

    setRecentlyViewed((prev) => {
      const next = [product.id, ...prev.filter((id) => id !== product.id)].slice(0, 8);
      localStorage.setItem(STORAGE_RECENTS_KEY, JSON.stringify(next));
      return next;
    });
  }, [addItem, toast]);

  const handleQuickView = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
    setRecentlyViewed((prev) => {
      const next = [product.id, ...prev.filter((id) => id !== product.id)].slice(0, 8);
      localStorage.setItem(STORAGE_RECENTS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const handleToggleCompare = useCallback((id: string) => {
    toggleCompare(id);
  }, [toggleCompare]);

  const handleClearFilters = useCallback(() => {
    const reset = normalizeWithCatalog({
      ...DEFAULT_FILTERS,
      priceRange: [computedPriceFloor, computedPriceCeiling],
    });
    setFilters(reset);
    setSearchParams(serializeFilters(reset, { min: computedPriceFloor, max: computedPriceCeiling }));
  }, [normalizeWithCatalog, computedPriceFloor, computedPriceCeiling, setSearchParams]);

  const handleShippingEstimate = useCallback(() => {
    const zone = SHIPPING_ZONES.find((item) => item.id === shippingZone) ?? SHIPPING_ZONES[0];
    setShippingEstimate({ rate: zone.rate, eta: zone.eta });
  }, [shippingZone]);

  const selectedForCompare = useMemo(() => Array.from(compare), [compare]);
  const compareDetails = useMemo(
    () => selectedForCompare.map((id) => catalog.find((product) => product.id === id)).filter(Boolean) as Product[],
    [catalog, selectedForCompare]
  );

  const wishlistCount = wishlist.size;
  const inCartCount = cartItems.length;

  const recentlyViewedProducts = useMemo(
    () => recentlyViewed.map((id) => catalog.find((product) => product.id === id)).filter(Boolean) as Product[],
    [catalog, recentlyViewed]
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6 lg:px-10">
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500" aria-label="Breadcrumb">
          <Link to="/" className="transition hover:text-primary">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/shop" className="transition hover:text-primary">Shop</Link>
          <span aria-hidden="true">›</span>
          <span className="text-primary">Jerseys</span>
        </nav>

        {catalogError && (
          <div className="mb-6 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {catalogError}
          </div>
        )}

        <header className="mb-10 flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-primary to-primary/90 p-8 text-white shadow-2xl lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              <ShoppingBag className="h-4 w-4" />
              Sports Center Shop
            </div>
            <h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">
              Elite jerseys, boots & equipment curated for ambitious athletes
            </h1>
            <p className="max-w-2xl text-sm text-white/80">
              Customize your filters, compare must-have gear, and secure delivery nationwide with pro consultant support.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-semibold">
                <Check className="h-4 w-4" /> Wishlist {wishlistCount}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-semibold">
                <ShoppingCart className="h-4 w-4" /> Cart {inCartCount}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-semibold">
                <Star className="h-4 w-4" /> {totalProducts} products found
              </span>
            </div>
          </div>
          <div className="flex w-full max-w-sm flex-col gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
            <label htmlFor="shop-search" className="text-xs font-semibold uppercase tracking-wide text-white">
              Search inventory
            </label>
            <input
              id="shop-search"
              type="search"
              value={filters.search}
              onChange={(event) => updateFilters({ search: event.target.value, page: 1 })}
              placeholder="Search jerseys, boots, equipment..."
              className="w-full rounded-full border-none bg-white/15 px-4 py-3 text-sm font-medium text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary"
            />
            <div className="text-xs text-white/70">Filters sync to the URL so you can share pre-filtered views with teammates.</div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="flex h-fit flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Refine results</h2>
                <p className="text-xs text-slate-500">Combine filters to surface the exact kit your squad needs.</p>
              </div>
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-semibold text-secondary transition hover:text-secondary/80"
              >
                Clear all
              </button>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-600">
                Price range
                <span className="text-slate-900">{formatGHS(filters.priceRange[0])} – {formatGHS(filters.priceRange[1])}</span>
              </div>
              <Slider
                value={filters.priceRange}
                min={computedPriceFloor}
                max={computedPriceCeiling}
                step={10}
                onValueChange={(value) => updateFilters({ priceRange: [value[0], value[1]] as [number, number], page: 1 })}
              />
            </div>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">League</legend>
              <div className="flex flex-wrap gap-2">
                {distinctLeagues.map((league) => {
                  const active = filters.leagues.includes(league);
                  return (
                    <button
                      key={league}
                      type="button"
                      onClick={() => {
                        const next = active
                          ? filters.leagues.filter((item) => item !== league)
                          : [...filters.leagues, league];
                        updateFilters({ leagues: next, page: 1 });
                      }}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-semibold transition",
                        active ? "border-primary bg-primary/10 text-primary" : "border-slate-200 text-slate-600 hover:border-primary/50"
                      )}
                    >
                      {league}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">Type</legend>
              <div className="flex flex-wrap gap-2">
                {distinctCategories.map((category) => {
                  const active = filters.categories.includes(category);
                  const label = category.charAt(0).toUpperCase() + category.slice(1);
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        const next = active
                          ? filters.categories.filter((item) => item !== category)
                          : [...filters.categories, category];
                        updateFilters({ categories: next, page: 1 });
                      }}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-semibold transition",
                        active ? "border-primary bg-primary/10 text-primary" : "border-slate-200 text-slate-600 hover:border-primary/50"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">Team</legend>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {distinctTeams.map((team) => {
                  const active = filters.teams.includes(team);
                  return (
                    <button
                      key={team}
                      type="button"
                      onClick={() => {
                        const next = active
                          ? filters.teams.filter((item) => item !== team)
                          : [...filters.teams, team];
                        updateFilters({ teams: next, page: 1 });
                      }}
                      className={cn(
                        "rounded-full border px-3 py-1 text-left font-semibold transition",
                        active ? "border-primary bg-primary/10 text-primary" : "border-slate-200 text-slate-600 hover:border-primary/50"
                      )}
                    >
                      {team}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">Jersey sizes</legend>
              <div className="flex flex-wrap gap-2">
                {jerseySizes.map((size) => {
                  const active = filters.sizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        const next = active
                          ? filters.sizes.filter((item) => item !== size)
                          : [...filters.sizes, size];
                        updateFilters({ sizes: next, page: 1 });
                      }}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-semibold transition",
                        active ? "border-secondary bg-secondary/10 text-secondary" : "border-slate-200 text-slate-600 hover:border-secondary/50"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-800">Shipping calculator</h3>
              <p className="mt-1 text-xs text-slate-500">Estimate delivery fees based on region.</p>
              <label htmlFor="shipping-zone" className="sr-only">Select region</label>
              <select
                id="shipping-zone"
                value={shippingZone}
                onChange={(event) => setShippingZone(event.target.value as ShippingSelection)}
                className="mt-3 w-full rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 focus:border-primary focus:outline-none"
              >
                {SHIPPING_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleShippingEstimate}
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary/90"
              >
                Calculate
              </button>
              {shippingEstimate && (
                <div className="mt-3 rounded-2xl bg-white p-3 text-xs text-slate-700 shadow">
                  <p className="font-semibold">GH₵ {shippingEstimate.rate.toFixed(2)}</p>
                  <p className="text-slate-500">{shippingEstimate.eta}</p>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-slate-900 p-5 text-white">
              <h3 className="text-sm font-semibold">Need squad support?</h3>
              <p className="mt-1 text-xs text-white/75">
                Chat with a club specialist for bulk kit briefs or academy outfitting.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Talk to a specialist
              </Link>
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-600">
                Showing <span className="font-semibold text-slate-900">{totalProducts}</span> products
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <label htmlFor="sort" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Sort
                </label>
                <select
                  id="sort"
                  value={filters.sort}
                  onChange={(event) => updateFilters({ sort: event.target.value as SortOption })}
                  className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-primary focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {showLoadingSkeleton ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-96 animate-pulse rounded-3xl bg-slate-100" />
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      wishlist={wishlist}
                      compare={compare}
                      onToggleWishlist={toggleWishlist}
                      onToggleCompare={(id) => {
                        if (compare.has(id) && compare.size === 1) {
                          toggleCompare(id);
                          return;
                        }
                        if (!compare.has(id) && compare.size >= 3) {
                          toast({
                            title: "Comparison limit reached",
                            description: "You can compare up to 3 products at a time.",
                            variant: "destructive",
                          });
                          return;
                        }
                        toggleCompare(id);
                      }}
                      onAddToCart={handleAddToCart}
                      onQuickView={handleQuickView}
                    />
                  ))}

                  {selectedProduct && (
                    <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-0">
                      <React.Suspense
                        fallback={
                          <div className="flex h-96 items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          </div>
                        }
                      >
                        <ShopQuickView
                          product={selectedProduct}
                          onAddToCart={(product) => handleAddToCart(product, 1)}
                          onClose={() => setIsQuickViewOpen(false)}
                        />
                      </React.Suspense>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <X className="h-10 w-10 text-slate-300" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">No products matched your filters</h3>
                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Try removing a filter or resetting to browse the full Precision Sports Center catalog.
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                  onClick={handleClearFilters}
                >
                  Reset filters
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === currentPage;
                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => updateFilters({ page: pageNumber })}
                      className={cn(
                        "h-10 w-10 rounded-full border text-sm font-semibold transition",
                        isActive ? "border-primary bg-primary text-white" : "border-slate-200 text-slate-600 hover:border-primary/60"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </nav>
            )}
          </div>
        </section>

        {compareDetails.length >= 2 && (
          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Compare selected products</h2>
              <button
                type="button"
                className="text-xs font-semibold text-secondary"
                onClick={() => replaceCompare(new Set())}
              >
                Clear
              </button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {compareDetails.map((product) => (
                <div key={product.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{product.title}</h3>
                      <p className="text-xs text-slate-500">{product.league} • {product.team}</p>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-semibold text-secondary"
                      onClick={() => toggleCompare(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{product.description}</p>
                  <div className="mt-3 text-sm font-semibold text-slate-900">{formatGHS(getProductPrice(product))}</div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                    {product.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="rounded-full bg-slate-100 px-3 py-1">{feature}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {recentlyViewedProducts.length > 0 && (
          <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Recently viewed</h2>
              <button
                type="button"
                className="text-xs font-semibold text-secondary"
                onClick={() => {
                  setRecentlyViewed([]);
                  localStorage.removeItem(STORAGE_RECENTS_KEY);
                }}
              >
                Clear history
              </button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recentlyViewedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 p-3 transition hover:border-primary/50"
                >
                  <img src={product.images[0]} alt={product.title} className="h-16 w-16 rounded-xl object-cover" loading="lazy" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{product.title}</p>
                    <p className="text-xs text-slate-500">{formatGHS(getProductPrice(product))}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {showBackToTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:bg-primary/90"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

const Shop: React.FC = () => (
  <ShopErrorBoundary>
    <React.Suspense fallback={
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          Loading shop experience...
        </div>
      </div>
    }>
      <ShopPage />
    </React.Suspense>
  </ShopErrorBoundary>
);

export default Shop;
