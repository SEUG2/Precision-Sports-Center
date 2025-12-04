import { useState } from "react";
import { Link } from "react-router-dom";
import { formatGHS } from "../lib/formatCurrency";
import { useCart } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const [promoCode, setPromoCode] = useState("");
  const { items: cartItems, changeItemQuantity, removeItem, subtotal } = useCart();

  const discount = cartItems.length > 0 ? 10 : 0;
  const shipping = subtotal > 100 ? 0 : cartItems.length > 0 ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal - discount + shipping + tax;

  const handleQuantityChange = (id, delta, inStock) => {
    if (!inStock) return;
    changeItemQuantity(id, delta);
  };

  if (cartItems.length === 0) {
    return (
      <section className="cart-page bg-background">
        <div className="cart-container cart-empty-state">
          <div className="cart-empty-icon">🛒</div>
          <h1>Your cart is empty</h1>
          <p>Add products to your cart to see them listed here.</p>
          <Link to="/shop" className="btn btn-primary">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page bg-background">
      <div className="cart-container">
        <header className="cart-header">
          <p className="cart-eyebrow">Step 1 of 2</p>
          <h1>Shopping cart</h1>
          <p className="cart-subhead">Review your items and proceed to checkout.</p>
        </header>

        <div className="cart-inner">
          <section className="cart-items-panel">
            <p className="cart-count">Items in cart ({cartItems.length})</p>
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-media">
                  <img src={item.image || "/placeholder.svg"} alt={item.title || item.name} loading="lazy" />
                </div>

                <div className="cart-item-body">
                  <div className="cart-item-top">
                    <h3 className="cart-item-title">{item.title || item.name}</h3>
                    <button type="button" className="cart-remove-btn" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>

                  <div className="cart-item-meta">
                    <span className="price-current">{formatGHS(item.price)}</span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="price-old">{formatGHS(item.originalPrice)}</span>
                    )}
                    {!item.inStock && <span className="badge badge-danger">Out of stock</span>}
                  </div>

                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, -1, item.inStock)}
                        disabled={!item.inStock}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, 1, item.inStock)}
                        disabled={!item.inStock}
                      >
                        +
                      </button>
                    </div>
                    <span className="cart-item-total">{formatGHS(item.price * item.quantity)}</span>
                  </div>
                </div>
              </article>
            ))}

            <div className="cart-continue">
              <Link to="/shop" className="btn btn-ghost">
                Continue shopping
              </Link>
            </div>
          </section>

          <aside className="order-summary sticky-summary" aria-label="Order summary">
            <h2>Order summary</h2>

            <form className="promo-form">
              <label htmlFor="promo" className="promo-label">
                Promo code
              </label>
              <div className="promo-inputs">
                <input
                  id="promo"
                  type="text"
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  placeholder="Enter code"
                />
                <button type="button" className="btn btn-ghost">
                  Apply
                </button>
              </div>
            </form>

            <div className="order-rows">
              <div className="order-row">
                <span>Subtotal</span>
                <span>{formatGHS(subtotal)}</span>
              </div>
              <div className="order-row muted">
                <span>Discount</span>
                <span>-{formatGHS(discount)}</span>
              </div>
              <div className="order-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatGHS(shipping)}</span>
              </div>
              <div className="order-row">
                <span>Tax</span>
                <span>{formatGHS(tax)}</span>
              </div>
            </div>

            <div className="order-total">
              <span>Total</span>
              <span>{formatGHS(total)}</span>
            </div>

            {shipping > 0 && subtotal < 100 && (
              <p className="cart-hint">Add {formatGHS(Math.max(0, 100 - subtotal))} more for free shipping.</p>
            )}

            <button type="button" className="btn btn-primary checkout-btn">
              Proceed to checkout
            </button>
            <p className="order-note">Secure checkout with SSL encryption.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}