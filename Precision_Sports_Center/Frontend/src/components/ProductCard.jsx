import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import React from "react";
import { formatGHS } from "../lib/formatCurrency";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    price,
    originalPrice,
    image,
    rating = 4.5,
    reviewCount = 0,
    category,
    isOnSale = false,
    inStock = true
  } = product;
  const { addItem, items } = useCart();
  const isInCart = items.some((item) => item.id === id);

  const handleAddToCart = () => {
    if (!inStock) return;
    addItem({
      id,
      title: name,
      price,
      originalPrice,
      image,
      inStock,
    });
  };

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-card to-card/50">
      <div className="relative overflow-hidden rounded-t-lg">
        <Link to={`/product/${id}`}>
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isOnSale && (
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {!inStock && (
            <Badge variant="secondary" className="text-xs">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Category */}
        {category && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="text-xs bg-background/80">
              {category}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating)
                    ? 'text-accent fill-accent'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-foreground">
            {formatGHS(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatGHS(originalPrice)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          disabled={!inStock}
          size="sm"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {inStock ? (isInCart ? 'Added' : 'Add to Cart') : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;