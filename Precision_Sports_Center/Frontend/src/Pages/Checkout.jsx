import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { formatGHS } from "../lib/formatCurrency";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const STEPS = {
  CUSTOMER_DETAILS: 1,
  SHIPPING: 2,
  PAYMENT_SUMMARY: 3,
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items: cartItems, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(STEPS.CUSTOMER_DETAILS);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Customer details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Shipping
    address: "",
    city: "",
    region: "",
    postalCode: "",
    country: "Ghana",
    shippingMethod: "standard", // standard or express
    
    // Payment
    paymentMethod: "card", // card, mobile_money, or bank_transfer
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    mobileMoneyProvider: "",
    mobileMoneyNumber: "",
  });

  // Calculate order totals
  const discount = cartItems.length > 0 ? 10 : 0;
  const shippingCost = formData.shippingMethod === "express" ? 19.99 : subtotal > 100 ? 0 : cartItems.length > 0 ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal - discount + shippingCost + tax;

  // Validation functions
  const validateCustomerDetails = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(\+233|0)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid Ghana phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateShipping = () => {
    const newErrors = {};
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Please enter a complete address";
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!formData.region.trim()) {
      newErrors.region = "Region is required";
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^[A-Z0-9\s-]{3,10}$/i.test(formData.postalCode)) {
      newErrors.postalCode = "Please enter a valid postal code";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Please enter a valid card number";
      }
      
      if (!formData.cardName.trim()) {
        newErrors.cardName = "Cardholder name is required";
      }
      
      if (!formData.cardExpiry.trim()) {
        newErrors.cardExpiry = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = "Please enter a valid expiry date (MM/YY)";
      }
      
      if (!formData.cardCvv.trim()) {
        newErrors.cardCvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
        newErrors.cardCvv = "Please enter a valid CVV";
      }
    } else if (formData.paymentMethod === "mobile_money") {
      if (!formData.mobileMoneyProvider.trim()) {
        newErrors.mobileMoneyProvider = "Mobile money provider is required";
      }
      
      if (!formData.mobileMoneyNumber.trim()) {
        newErrors.mobileMoneyNumber = "Mobile money number is required";
      } else if (!/^(\+233|0)[0-9]{9}$/.test(formData.mobileMoneyNumber.replace(/\s/g, ""))) {
        newErrors.mobileMoneyNumber = "Please enter a valid phone number";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const cleaned = value.replace(/\s/g, "");
      processedValue = cleaned.replace(/(.{4})/g, "$1 ").trim();
    }
    
    // Format expiry date with slash
    if (name === "cardExpiry") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length >= 2) {
        processedValue = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
      } else {
        processedValue = cleaned;
      }
    }
    
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (currentStep === STEPS.CUSTOMER_DETAILS) {
      if (validateCustomerDetails()) {
        setCurrentStep(STEPS.SHIPPING);
      }
    } else if (currentStep === STEPS.SHIPPING) {
      if (validateShipping()) {
        setCurrentStep(STEPS.PAYMENT_SUMMARY);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === STEPS.SHIPPING) {
      setCurrentStep(STEPS.CUSTOMER_DETAILS);
    } else if (currentStep === STEPS.PAYMENT_SUMMARY) {
      setCurrentStep(STEPS.SHIPPING);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePayment()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Clear cart and redirect to success page (or home)
    clearCart();
    setIsSubmitting(false);
    navigate("/shop", { state: { orderSuccess: true } });
  };

  if (cartItems.length === 0) {
    return (
      <section className="checkout-page bg-background">
        <div className="checkout-container checkout-empty-state">
          <h1>Your cart is empty</h1>
          <p>Add items to your cart before checkout.</p>
          <Link to="/shop" className="btn btn-primary">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page bg-background">
      <div className="checkout-container">
        <header className="checkout-header">
          <p className="checkout-eyebrow">Secure Checkout</p>
          <h1>Complete your order</h1>
        </header>

        {/* Progress indicator */}
        <div className="checkout-progress">
          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= STEPS.CUSTOMER_DETAILS ? "active" : ""} ${currentStep > STEPS.CUSTOMER_DETAILS ? "completed" : ""}`}>
              <div className="step-number">1</div>
              <div className="step-label">Customer Details</div>
            </div>
            <div className={`progress-step ${currentStep >= STEPS.SHIPPING ? "active" : ""} ${currentStep > STEPS.SHIPPING ? "completed" : ""}`}>
              <div className="step-number">2</div>
              <div className="step-label">Shipping</div>
            </div>
            <div className={`progress-step ${currentStep >= STEPS.PAYMENT_SUMMARY ? "active" : ""}`}>
              <div className="step-number">3</div>
              <div className="step-label">Payment</div>
            </div>
          </div>
        </div>

        <div className="checkout-inner">
          <div className="checkout-form-panel">
            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Step 1: Customer Details */}
              {currentStep === STEPS.CUSTOMER_DETAILS && (
                <div className="checkout-step">
                  <h2>Customer Information</h2>
                  <p className="step-description">Please provide your contact information.</p>
                  
                  <div className="form-grid">
                    <div className="form-field">
                      <label htmlFor="firstName">
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? "error" : ""}
                        placeholder="John"
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>

                    <div className="form-field">
                      <label htmlFor="lastName">
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? "error" : ""}
                        placeholder="Doe"
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "error" : ""}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="phone">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? "error" : ""}
                      placeholder="+233 50 123 4567"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === STEPS.SHIPPING && (
                <div className="checkout-step">
                  <h2>Shipping Address</h2>
                  <p className="step-description">Where should we deliver your order?</p>
                  
                  <div className="form-field">
                    <label htmlFor="address">
                      Street Address <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? "error" : ""}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label htmlFor="city">
                        City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? "error" : ""}
                        placeholder="Accra"
                      />
                      {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>

                    <div className="form-field">
                      <label htmlFor="region">
                        Region <span className="required">*</span>
                      </label>
                      <select
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        className={errors.region ? "error" : ""}
                      >
                        <option value="">Select region</option>
                        <option value="Greater Accra">Greater Accra</option>
                        <option value="Ashanti">Ashanti</option>
                        <option value="Western">Western</option>
                        <option value="Eastern">Eastern</option>
                        <option value="Central">Central</option>
                        <option value="Volta">Volta</option>
                        <option value="Northern">Northern</option>
                        <option value="Upper East">Upper East</option>
                        <option value="Upper West">Upper West</option>
                        <option value="Brong Ahafo">Brong Ahafo</option>
                        <option value="Western North">Western North</option>
                        <option value="Ahafo">Ahafo</option>
                        <option value="Bono">Bono</option>
                        <option value="Bono East">Bono East</option>
                        <option value="Oti">Oti</option>
                        <option value="Savannah">Savannah</option>
                        <option value="North East">North East</option>
                      </select>
                      {errors.region && <span className="error-message">{errors.region}</span>}
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label htmlFor="postalCode">
                        Postal Code <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={errors.postalCode ? "error" : ""}
                        placeholder="GA-123-4567"
                      />
                      {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                    </div>

                    <div className="form-field">
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Shipping Method <span className="required">*</span></label>
                    <div className="shipping-options">
                      <label className="shipping-option">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === "standard"}
                          onChange={handleInputChange}
                        />
                        <div className="option-content">
                          <div className="option-title">Standard Shipping</div>
                          <div className="option-details">
                            {subtotal > 100 ? "Free" : formatGHS(9.99)} • 5-7 business days
                          </div>
                        </div>
                      </label>
                      <label className="shipping-option">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === "express"}
                          onChange={handleInputChange}
                        />
                        <div className="option-content">
                          <div className="option-title">Express Shipping</div>
                          <div className="option-details">
                            {formatGHS(19.99)} • 2-3 business days
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Summary */}
              {currentStep === STEPS.PAYMENT_SUMMARY && (
                <div className="checkout-step">
                  <h2>Payment Information</h2>
                  <p className="step-description">Choose your preferred payment method.</p>
                  
                  <div className="form-field">
                    <label>Payment Method <span className="required">*</span></label>
                    <div className="payment-options">
                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === "card"}
                          onChange={handleInputChange}
                        />
                        <div className="option-content">
                          <div className="option-title">Credit/Debit Card</div>
                        </div>
                      </label>
                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mobile_money"
                          checked={formData.paymentMethod === "mobile_money"}
                          onChange={handleInputChange}
                        />
                        <div className="option-content">
                          <div className="option-title">Mobile Money</div>
                        </div>
                      </label>
                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank_transfer"
                          checked={formData.paymentMethod === "bank_transfer"}
                          onChange={handleInputChange}
                        />
                        <div className="option-content">
                          <div className="option-title">Bank Transfer</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <>
                      <div className="form-field">
                        <label htmlFor="cardNumber">
                          Card Number <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={errors.cardNumber ? "error" : ""}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                        {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                      </div>

                      <div className="form-field">
                        <label htmlFor="cardName">
                          Cardholder Name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className={errors.cardName ? "error" : ""}
                          placeholder="John Doe"
                        />
                        {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                      </div>

                      <div className="form-grid">
                        <div className="form-field">
                          <label htmlFor="cardExpiry">
                            Expiry Date <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className={errors.cardExpiry ? "error" : ""}
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                          {errors.cardExpiry && <span className="error-message">{errors.cardExpiry}</span>}
                        </div>

                        <div className="form-field">
                          <label htmlFor="cardCvv">
                            CVV <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="cardCvv"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            className={errors.cardCvv ? "error" : ""}
                            placeholder="123"
                            maxLength="4"
                          />
                          {errors.cardCvv && <span className="error-message">{errors.cardCvv}</span>}
                        </div>
                      </div>
                    </>
                  )}

                  {formData.paymentMethod === "mobile_money" && (
                    <>
                      <div className="form-field">
                        <label htmlFor="mobileMoneyProvider">
                          Provider <span className="required">*</span>
                        </label>
                        <select
                          id="mobileMoneyProvider"
                          name="mobileMoneyProvider"
                          value={formData.mobileMoneyProvider}
                          onChange={handleInputChange}
                          className={errors.mobileMoneyProvider ? "error" : ""}
                        >
                          <option value="">Select provider</option>
                          <option value="mtn">MTN Mobile Money</option>
                          <option value="vodafone">Vodafone Cash</option>
                          <option value="airteltigo">AirtelTigo Money</option>
                        </select>
                        {errors.mobileMoneyProvider && <span className="error-message">{errors.mobileMoneyProvider}</span>}
                      </div>

                      <div className="form-field">
                        <label htmlFor="mobileMoneyNumber">
                          Mobile Money Number <span className="required">*</span>
                        </label>
                        <input
                          type="tel"
                          id="mobileMoneyNumber"
                          name="mobileMoneyNumber"
                          value={formData.mobileMoneyNumber}
                          onChange={handleInputChange}
                          className={errors.mobileMoneyNumber ? "error" : ""}
                          placeholder="+233 50 123 4567"
                        />
                        {errors.mobileMoneyNumber && <span className="error-message">{errors.mobileMoneyNumber}</span>}
                      </div>
                    </>
                  )}

                  {formData.paymentMethod === "bank_transfer" && (
                    <div className="bank-transfer-info">
                      <p>Please transfer the total amount to:</p>
                      <div className="bank-details">
                        <p><strong>Bank:</strong> Ghana Commercial Bank</p>
                        <p><strong>Account Name:</strong> Precision Sports Center</p>
                        <p><strong>Account Number:</strong> 1234567890</p>
                        <p><strong>Reference:</strong> Order #{Date.now()}</p>
                      </div>
                      <p className="info-note">Your order will be processed once payment is confirmed.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="checkout-actions">
                {currentStep > STEPS.CUSTOMER_DETAILS && (
                  <button type="button" onClick={handleBack} className="btn btn-ghost">
                    Back
                  </button>
                )}
                <div className="actions-right">
                  {currentStep < STEPS.PAYMENT_SUMMARY ? (
                    <button type="button" onClick={handleNext} className="btn btn-primary">
                      Continue
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : `Place Order • ${formatGHS(total)}`}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="checkout-summary sticky-summary" aria-label="Order summary">
            <h2>Order Summary</h2>
            
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image || "/placeholder.svg"} alt={item.title || item.name} />
                  <div className="item-details">
                    <div className="item-name">{item.title || item.name}</div>
                    <div className="item-meta">
                      Qty: {item.quantity} × {formatGHS(item.price)}
                    </div>
                  </div>
                  <div className="item-total">{formatGHS(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatGHS(subtotal)}</span>
              </div>
              <div className="summary-row muted">
                <span>Discount</span>
                <span>-{formatGHS(discount)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : formatGHS(shippingCost)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>{formatGHS(tax)}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{formatGHS(total)}</span>
              </div>
            </div>

            <div className="security-badge">
              <span>🔒</span>
              <span>Secure checkout with SSL encryption</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

