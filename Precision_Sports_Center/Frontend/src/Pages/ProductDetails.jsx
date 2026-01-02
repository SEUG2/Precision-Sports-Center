import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';
import { formatGHS } from '@/lib/formatCurrency';
import ProductReviews from '@/components/ProductReviews';

const FREE_SHIPPING_THRESHOLD = 100;

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Mock product data - in real app, fetch by ID
  const product = {
    id: 1,
    name: "Professional Basketball",
    price: 49.99,
    originalPrice: 59.99,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    category: "Basketball",
    rating: 4.8,
    reviewCount: 124,
    isOnSale: true,
    inStock: true,
    stockCount: 25,
    description: "Official size basketball perfect for indoor and outdoor play. Made with high-quality composite leather for superior grip and durability.",
    features: [
      "Official size and weight",
      "Composite leather construction",
      "Deep channel design for better grip",
      "Suitable for indoor and outdoor use",
      "Professional tournament quality"
    ],
    sizes: ["Size 5", "Size 6", "Size 7"],
    colors: ["Orange", "Black", "White"],
    specifications: {
      "Material": "Composite Leather",
      "Size": "Official (Size 7)",
      "Weight": "22 oz",
      "Circumference": "29.5 inches",
      "Brand": "Precision Sports",
      "Warranty": "1 Year"
    }
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Basketball Shoes Pro",
      price: 129.99,
      image: "/placeholder.svg",
      category: "Basketball",
      rating: 4.7,
      reviewCount: 89,
      inStock: true
    },
    {
      id: 3,
      name: "Basketball Hoop Set",
      price: 299.99,
      originalPrice: 349.99,
      image: "/placeholder.svg",
      category: "Basketball",
      rating: 4.9,
      reviewCount: 67,
      isOnSale: true,
      inStock: true
    },
    {
      id: 4,
      name: "Training Cones Set",
      price: 24.99,
      image: "/placeholder.svg",
      category: "Training",
      rating: 4.6,
      reviewCount: 156,
      inStock: true
    }
  ];

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li>/</li>
            <li><a href="/shop" className="hover:text-primary">Shop</a></li>
            <li>/</li>
            <li><a href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</a></li>
            <li>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.isOnSale && (
                <Badge variant="destructive" className="absolute top-4 left-4">
                  -{discountPercentage}% OFF
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-accent fill-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-foreground">
                  {formatGHS(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatGHS(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              {/* Size Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Color</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center border border-border rounded-md w-fit">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.stockCount} items in stock
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button size="lg" className="w-full">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart - {formatGHS(product.price * quantity)}
              </Button>
              
              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Orders over {formatGHS(FREE_SHIPPING_THRESHOLD)}</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day policy</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Warranty</p>
                <p className="text-xs text-muted-foreground">1-year coverage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      {product.description}
                    </p>
                    <h3 className="text-lg font-semibold">Key Features:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-muted-foreground">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <ProductReviews productId={product.id} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;