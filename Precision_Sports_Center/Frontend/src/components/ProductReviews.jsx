import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "./ProductReviews.css";

/**
 * ProductReviews Component
 * Displays and allows posting of customer reviews with 5-star rating system
 * Reviews are saved to localStorage
 */
export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState({});

  // Load reviews from localStorage on mount
  useEffect(() => {
    const storedReviews = localStorage.getItem(`product_reviews_${productId}`);
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    }
  }, [productId]);

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      reviews.length > 0
        ? (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100
        : 0,
  }));

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle rating selection
  const handleRatingClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.rating;
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (formData.rating === 0) {
      newErrors.rating = "Please select a rating";
    }
    if (!formData.comment.trim()) {
      newErrors.comment = "Review comment is required";
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = "Review must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newReview = {
      id: Date.now().toString(),
      productId,
      name: formData.name.trim(),
      rating: formData.rating,
      comment: formData.comment.trim(),
      date: new Date().toISOString(),
      verified: false, // Could be set to true for verified purchases
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Save to localStorage
    localStorage.setItem(`product_reviews_${productId}`, JSON.stringify(updatedReviews));

    // Reset form
    setFormData({ name: "", rating: 0, comment: "" });
    setShowForm(false);
    setErrors({});
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="product-reviews">
      {/* Reviews Summary */}
      <div className="reviews-summary">
        <div className="summary-left">
          <div className="average-rating">
            <span className="rating-value">{averageRating.toFixed(1)}</span>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`star-icon ${
                    star <= Math.round(averageRating) ? "filled" : "empty"
                  }`}
                />
              ))}
            </div>
            <p className="rating-text">
              Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>

        <div className="summary-right">
          <div className="rating-breakdown">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="rating-bar-item">
                <div className="rating-label">
                  <span>{rating}</span>
                  <Star className="star-icon small filled" />
                </div>
                <div className="rating-bar">
                  <div
                    className="rating-bar-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="rating-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="reviews-actions">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="write-review-btn"
        >
          {showForm ? "Cancel Review" : "Write a Review"}
        </Button>
      </div>

      {/* Review Form */}
      {showForm && (
        <Card className="review-form-card">
          <CardContent className="review-form-content">
            <h3 className="form-title">Write Your Review</h3>
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label htmlFor="review-name">
                  Your Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="review-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? "error" : ""}
                  placeholder="Enter your name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>
                  Your Rating <span className="required">*</span>
                </label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-button ${
                        star <= formData.rating ? "active" : ""
                      } ${star <= hoveredRating ? "hovered" : ""}`}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <Star className="star-icon" />
                    </button>
                  ))}
                  {formData.rating > 0 && (
                    <span className="rating-text-inline">
                      {formData.rating} {formData.rating === 1 ? "star" : "stars"}
                    </span>
                  )}
                </div>
                {errors.rating && <span className="error-message">{errors.rating}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="review-comment">
                  Your Review <span className="required">*</span>
                </label>
                <textarea
                  id="review-comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className={errors.comment ? "error" : ""}
                  placeholder="Share your experience with this product..."
                  rows={5}
                />
                <span className="char-count">
                  {formData.comment.length} characters (minimum 10)
                </span>
                {errors.comment && <span className="error-message">{errors.comment}</span>}
              </div>

              <div className="form-actions">
                <Button type="submit" className="submit-review-btn">
                  Submit Review
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ name: "", rating: 0, comment: "" });
                    setErrors({});
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id} className="review-card">
              <CardContent className="review-card-content">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="reviewer-details">
                      <h4 className="reviewer-name">{review.name}</h4>
                      <p className="review-date">{formatDate(review.date)}</p>
                    </div>
                  </div>
                  <div className="review-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`star-icon small ${
                          star <= review.rating ? "filled" : "empty"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
                {review.verified && (
                  <span className="verified-badge">Verified Purchase</span>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="no-reviews-card">
            <CardContent>
              <div className="no-reviews">
                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

