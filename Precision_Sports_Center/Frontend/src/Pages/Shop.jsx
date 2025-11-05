import { useState } from 'react';
import './Shop.css';
import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, Grid, List, Search } from 'lucide-react';

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: "Professional Basketball",
      price: 49.99,
      originalPrice: 59.99,
      image: "/placeholder.svg",
      category: "Basketball",
      rating: 4.8,
      reviewCount: 124,
      isOnSale: true,
      inStock: true
    },
    {
      id: 2,
      name: "Soccer Cleats Pro",
      price: 89.99,
      image: "/placeholder.svg",
      category: "Soccer",
      rating: 4.6,
      reviewCount: 89,
      inStock: true
    },
    {
      id: 3,
      name: "Tennis Racket Elite",
      price: 129.99,
      originalPrice: 149.99,
      image: "/placeholder.svg",
      category: "Tennis",
      rating: 4.9,
      reviewCount: 67,
      isOnSale: true,
      inStock: true
    },
    {
      id: 4,
      name: "Running Shoes Advanced",
      price: 119.99,
      image: "/placeholder.svg",
      category: "Running",
      rating: 4.7,
      reviewCount: 203,
      inStock: true
    },
    {
      id: 5,
      name: "Swimming Goggles Pro",
      price: 24.99,
      image: "/placeholder.svg",
      category: "Swimming",
      rating: 4.5,
      reviewCount: 156,
      inStock: true
    },
    {
      id: 6,
      name: "Cycling Helmet Safety",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg",
      category: "Cycling",
      rating: 4.8,
      reviewCount: 98,
      isOnSale: true,
      inStock: true
    },
    {
      id: 7,
      name: "Baseball Glove Premium",
      price: 159.99,
      image: "/placeholder.svg",
      category: "Baseball",
      rating: 4.9,
      reviewCount: 87,
      inStock: false
    },
    {
      id: 8,
      name: "Volleyball Official",
      price: 34.99,
      image: "/placeholder.svg",
      category: "Volleyball",
      rating: 4.6,
      reviewCount: 134,
      inStock: true
    }
  ];

  const categories = ["All", "Basketball", "Soccer", "Tennis", "Running", "Swimming", "Cycling", "Baseball", "Volleyball"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Sports Equipment Store</h1>
          <p className="text-muted-foreground text-lg">
            Find the perfect gear for your athletic journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Products</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Categories</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Availability</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="in-stock" />
                      <label htmlFor="in-stock" className="text-sm">In Stock</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="on-sale" />
                      <label htmlFor="on-sale" className="text-sm">On Sale</label>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              
              <div className="flex items-center gap-4">
                <Select defaultValue="popular">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;