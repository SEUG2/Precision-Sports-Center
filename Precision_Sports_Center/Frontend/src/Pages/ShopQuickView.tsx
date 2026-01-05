import React from "react";
import { Check, ShoppingCart, Star } from "lucide-react";
import { Product } from "./shop-data";
import { calculateDiscountPercentage, getProductPrice } from "./shop-utils";
import { formatGHS } from "@/lib/formatCurrency";

interface ShopQuickViewProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClose: () => void;
}

const ShopQuickView: React.FC<ShopQuickViewProps> = ({ product, onAddToCart, onClose }) => {
  const discount = calculateDiscountPercentage(product);
  const price = getProductPrice(product);

  return (
    <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
      <div className="relative flex flex-col gap-4 rounded-l-3xl bg-slate-50 p-6">
        {product.images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${product.title} view ${index + 1}`}
            loading="lazy"
            className="h-64 w-full rounded-2xl object-cover"
          />
        ))}
      </div>
      <div className="flex flex-col gap-5 p-6">
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-900">{product.title}</h2>
          <p className="text-sm text-slate-500">{product.description}</p>
        </header>

        <div className="flex items-center gap-2 text-sm">
          <Star className="h-4 w-4 text-amber-500" />
          <span className="font-semibold text-slate-900">{product.rating.toFixed(1)}</span>
          <span className="text-slate-500">({product.reviewCount} reviews)</span>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-slate-900">{formatGHS(price)}</span>
          {product.discountPrice && product.discountPrice < product.price && (
            <>
              <span className="text-sm text-slate-500 line-through">{formatGHS(product.price)}</span>
              <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                Save {discount}%
              </span>
            </>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Size guide</h3>
          <p className="mt-1 text-xs text-slate-500">Jerseys follow a modern athletic fit. Size up for relaxed layering.</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {product.sizes.length > 0 ? (
              product.sizes.map((size) => (
                <span key={size} className="rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600">
                  {size}
                </span>
              ))
            ) : (
              <span className="rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600">
                One size
              </span>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Product features</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="mt-1 h-4 w-4 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Customer reviews</h3>
          <p className="mt-1 text-xs text-slate-500">
            Verified buyers rate this {product.rating.toFixed(1)} / 5 across {product.reviewCount} reviews.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
          onClick={() => {
            onAddToCart(product);
            onClose();
          }}
        >
          <ShoppingCart className="h-4 w-4" /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default ShopQuickView;
