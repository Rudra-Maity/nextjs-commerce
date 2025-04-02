"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ChevronDown, ShoppingCart, Star, Heart, ChevronsLeft, ChevronsRight, ShoppingBag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useCart } from '@/hooks/useCart';
import axios from 'axios';
import Link from 'next/link';
// Sample product data
const productsData = [
  {
    "product_id": 1,
    "name": "Smartphone",
    "description": "High-end smartphone with advanced features.",
    "price": 599.99,
    "unit": "Piece",
    "image": "https://example.com/images/smartphone.jpg",
    "discount": 10,
    "availability": true,
    "brand": "BrandX",
    "category": "Electronics",
    "rating": 4.5,
    "reviews": [
      {
        "user_id": 1,
        "rating": 5,
        "comment": "Great phone with a superb camera!"
      },
      {
        "user_id": 2,
        "rating": 4,
        "comment": "Good performance, but the battery life could be better."
      }
    ]
  },
  {
    "product_id": 2,
    "name": "Laptop",
    "description": "Powerful laptop for work and gaming.",
    "price": 999.99,
    "unit": "Piece",
    "image": "https://example.com/images/laptop.jpg",
    "discount": 5,
    "availability": true,
    "brand": "BrandY",
    "category": "Electronics",
    "rating": 4.7,
    "reviews": [
      {
        "user_id": 3,
        "rating": 5,
        "comment": "Excellent laptop for gaming and work tasks."
      },
      {
        "user_id": 4,
        "rating": 4,
        "comment": "Good value for the price."
      }
    ]
  },
  {
    "product_id": 3,
    "name": "Wireless Headphones",
    "description": "Premium wireless headphones with noise-cancellation.",
    "price": 149.99,
    "unit": "Piece",
    "image": "https://example.com/images/headphones.jpg",
    "discount": 15,
    "availability": true,
    "brand": "SoundMasters",
    "category": "Electronics",
    "rating": 4.8,
    "reviews": [
      {
        "user_id": 5,
        "rating": 5,
        "comment": "Top-notch sound quality and comfort."
      },
      {
        "user_id": 6,
        "rating": 4,
        "comment": "Impressive noise-cancellation, but a bit pricey."
      }
    ]
  },
  {
    "product_id": 4,
    "name": "Smartwatch",
    "description": "Feature-packed smartwatch with fitness tracking.",
    "price": 199.99,
    "unit": "Piece",
    "image": "https://example.com/images/smartwatch.jpg",
    "discount": 10,
    "availability": true,
    "brand": "TechWear",
    "category": "Wearables",
    "rating": 4.6,
    "reviews": [
      {
        "user_id": 7,
        "rating": 4,
        "comment": "Great value for the features it offers."
      },
      {
        "user_id": 8,
        "rating": 5,
        "comment": "Sleek design and accurate fitness tracking."
      }
    ]
  },
  {
    "product_id": 5,
    "name": "Professional DSLR Camera",
    "description": "High-quality DSLR camera for photography enthusiasts.",
    "price": 499.99,
    "unit": "Piece",
    "image": "https://example.com/images/camera.jpg",
    "discount": 5,
    "availability": true,
    "brand": "PhotoPro",
    "category": "Cameras",
    "rating": 4.9,
    "reviews": [
      {
        "user_id": 9,
        "rating": 5,
        "comment": "Exceptional image quality and versatility."
      },
      {
        "user_id": 10,
        "rating": 4,
        "comment": "A bit heavy, but the results are worth it."
      }
    ]
  },
  {
    "product_id": 6,
    "name": "Smart TV",
    "description": "High-definition smart TV with built-in streaming apps.",
    "price": 799.99,
    "unit": "Piece",
    "image": "https://example.com/images/tv.jpg",
    "discount": 8,
    "availability": true,
    "brand": "ViewTech",
    "category": "Electronics",
    "rating": 4.7,
    "reviews": [
      {
        "user_id": 11,
        "rating": 5,
        "comment": "Stunning picture quality and user-friendly interface."
      },
      {
        "user_id": 12,
        "rating": 4,
        "comment": "A great addition to our home entertainment setup."
      }
    ]
  },
  {
    "product_id": 7,
    "name": "Tablet",
    "description": "Compact tablet for productivity and entertainment.",
    "price": 299.99,
    "unit": "Piece",
    "image": "https://example.com/images/tablet.jpg",
    "discount": 12,
    "availability": true,
    "brand": "TabTech",
    "category": "Electronics",
    "rating": 4.4,
    "reviews": [
      {
        "user_id": 13,
        "rating": 4,
        "comment": "Good value for the price, but the battery life could be better."
      },
      {
        "user_id": 14,
        "rating": 5,
        "comment": "Ideal for both work and entertainment on the go."
      }
    ]
  },
  {
    "product_id": 8,
    "name": "Gaming Console",
    "description": "Next-gen gaming console for immersive gaming experiences.",
    "price": 399.99,
    "unit": "Piece",
    "image": "https://example.com/images/console.jpg",
    "discount": 10,
    "availability": true,
    "brand": "GameX",
    "category": "Gaming",
    "rating": 4.8,
    "reviews": [
      {
        "user_id": 15,
        "rating": 5,
        "comment": "Incredible gaming performance and graphics."
      },
      {
        "user_id": 16,
        "rating": 4,
        "comment": "A must-have for gaming enthusiasts."
      }
    ]
  },
  {
    "product_id": 9,
    "name": "Energy-Efficient Refrigerator",
    "description": "Modern refrigerator with energy-saving features.",
    "price": 599.99,
    "unit": "Piece",
    "image": "https://example.com/images/refrigerator.jpg",
    "discount": 5,
    "availability": true,
    "brand": "CoolTech",
    "category": "Appliances",
    "rating": 4.6
  } 
];

// Extract unique brands and categories

// Main app component
const ProductListingUI = () => {
  const [products, setProducts] = useState(productsData);
  const { addItem } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    brand: 'all',
    minPrice: 0,
    maxPrice: 1500,
    availability: false,
    discount: false,
    rating: 0,
  });
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const allBrands = [...new Set(productsData.map(product => product.brand))];
  const allCategories = [...new Set(productsData.map(product => product.category))];
  
  // const goToPage = (page) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  useEffect(()=>{
    try {
      async function FetchProduct() {
        const res=await axios.get('https://fake-store-api.mock.beeceptor.com/api/products')
        if(res.data.length>0){
          setProducts(res.data)
        }
      } 
      FetchProduct()
    } catch (error) {
      
    }
   
  },[])
  const handelAddCart=(item)=>{

  }


  // Apply filters
  useEffect(() => {
    let filteredProducts = productsData.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase());
      
      // Category filter
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      
      // Brand filter
      const matchesBrand = filters.brand === 'all' || product.brand === filters.brand;
      
      // Price filter
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      
      // Availability filter
      const matchesAvailability = !filters.availability || product.availability;
      
      // Discount filter
      const matchesDiscount = !filters.discount || product.discount > 0;
      
      // Rating filter
      const matchesRating = product.rating >= filters.rating;
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && 
        matchesAvailability && matchesDiscount && matchesRating;
    });
    
    // Apply sorting
    switch(sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filteredProducts.sort((a, b) => b.discount - a.discount);
        break;
      case 'featured':
      default:
        // Keep original order for featured
        break;
    }
    
    setProducts(filteredProducts);
  }, [filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      brand: 'all',
      minPrice: 0,
      maxPrice: 1500,
      availability: false,
      discount: false,
      rating: 0,
    });
    setSortBy('featured');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Filter component
  const FilterSection = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'p-4' : 'sticky top-4 p-6 bg-white rounded-lg shadow-md'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Filter size={20} /> Filters
        </h2>
        <Button variant="ghost" onClick={resetFilters} size="sm">Reset</Button>
      </div>

      <div className="space-y-6">
        {/* Category filter */}
        <div>
          <h3 className="font-medium mb-2">Category</h3>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Brand filter */}
        <div>
          <h3 className="font-medium mb-2">Brand</h3>
          <Select value={filters.brand} onValueChange={(value) => handleFilterChange('brand', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {allBrands.map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="mb-2 flex items-center justify-between">
            <span>${filters.minPrice}</span>
            <span>${filters.maxPrice}</span>
          </div>
          <Slider 
            defaultValue={[filters.minPrice, filters.maxPrice]} 
            max={1500} 
            step={50}
            onValueChange={(value) => {
              handleFilterChange('minPrice', value[0]);
              handleFilterChange('maxPrice', value[1]);
            }}
            className="mb-4"
          />
        </div>

        {/* Availability */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="availability" 
            checked={filters.availability}
            onCheckedChange={(checked) => handleFilterChange('availability', checked)}
          />
          <label htmlFor="availability" className="text-sm font-medium leading-none cursor-pointer">
            In Stock Only
          </label>
        </div>

        {/* Discount */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="discount" 
            checked={filters.discount}
            onCheckedChange={(checked) => handleFilterChange('discount', checked)}
          />
          <label htmlFor="discount" className="text-sm font-medium leading-none cursor-pointer">
            On Sale
          </label>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-medium mb-2">Minimum Rating</h3>
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4, 5].map(rating => (
              <Button 
                key={rating} 
                variant={filters.rating === rating ? "default" : "outline"} 
                size="sm"
                onClick={() => handleFilterChange('rating', rating)}
                className="min-w-8 h-8 p-0 flex items-center justify-center"
              >
                {rating > 0 ? rating : "All"}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Product card component
  const ProductCard = ({ product }) => {
    const discountedPrice = product.price - (product.price * (product.discount / 100));
   
    return (
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="h-full"
      >
        <Card className="overflow-hidden h-full flex flex-col">
          <CardHeader className="p-0 relative">
            <div className="relative overflow-hidden group">
              <img 
                src={'https://placehold.co/600x440/EEE/31343C'} 
                alt={product.name} 
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex  justify-center items-end gap-2 flex-col pr-2">
                <Button variant="secondary" size="sm" className="rounded-full cursor-pointer w-10 h-10 p-0" onClick={()=>{
                  addItem(product,1)
                  }}>
                  <ShoppingBag size={16} />
                </Button>
                <Button variant="secondary" size="sm" className="rounded-full w-10 h-10 p-0">
                  <Heart size={16} />
                </Button>
                <Button variant="secondary" size="sm" className="rounded-full w-10 h-10 p-0">
                  <Eye size={16} />
                </Button>

              </div>
              {product.discount > 0 && (
                <Badge className="absolute top-2 right-2 bg-red-500">
                  {product.discount}% OFF
                </Badge>
              )}
              {!product.availability && (
                <Badge variant="outline" className="absolute top-2 left-2 bg-gray-800 text-white">
                  Out of Stock
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
            <h3 className="font-bold text-lg mb-1 line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                />
              ))}
              <span className="text-sm text-gray-500">({product.reviews?.length})</span>
            </div>
          <Link href={`/shop/product/${product.product_id}`}>  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p></Link>
          </CardContent>
          <CardFooter className="pt-0 pb-4 px-4">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {product.discount > 0 ? (
                    <>
                      <span className="font-bold text-lg">${discountedPrice.toFixed(2)}</span>
                      <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <Button 
                className="w-full cursor-pointer" 
                disabled={!product.availability}
                onClick={()=>addItem(product,1)}
              >
                {product.availability ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our premium collection of products</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          {/* <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="md:w-64 hidden md:block"
          >
            <FilterSection />
          </motion.div> */}

          {/* Filters - Mobile */}
          <div className="md:hidden mb-4">
            <Drawer open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Filter size={16} /> Filters
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="max-h-[80vh] overflow-y-auto">
                  <FilterSection isMobile={true} />
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search products..." 
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Tabs value={viewMode} onValueChange={setViewMode} className="hidden sm:block">
                  <TabsList>
                    <TabsTrigger value="grid" className="sm:w-12">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                    </TabsTrigger>
                    <TabsTrigger value="list" className="sm:w-12">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                      </svg>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex-shrink-0 flex-grow sm:flex-grow-0 w-full sm:w-auto">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="discount">Discount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Products Grid/List View */}
            <div className="mb-8">
              <Tabs value={viewMode} className="w-full">
                <TabsContent value="grid" className="mt-0">
                  {products.length > 0 ? (
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      <AnimatePresence>
                        {products.map(product => (
                          <ProductCard key={product.product_id} product={product} />
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white p-8 rounded-lg text-center"
                    >
                      <h3 className="text-lg font-medium mb-2">No products found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria.</p>
                      <Button onClick={resetFilters}>Reset Filters</Button>
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="list" className="mt-0">
                  {products.length > 0 ? (
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      <AnimatePresence>
                        {products.map(product => (
                          <motion.div 
                            key={product.product_id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                            className="bg-white rounded-lg shadow-sm overflow-hidden"
                          >
                            <div className="flex flex-col sm:flex-row">
                              <div className="sm:w-48 relative">
                                <img src={'https://placehold.co/600x440/EEE/31343C'} alt={product.name} className="w-full h-48 object-cover" />
                                {product.discount > 0 && (
                                  <Badge className="absolute top-2 right-2 bg-red-500">
                                    {product.discount}% OFF
                                  </Badge>
                                )}
                              </div>
                              <div className="flex-1 p-4 flex flex-col">
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                                      <div className="flex items-center gap-1 mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                          <Star 
                                            key={i} 
                                            size={14} 
                                            className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                                          />
                                        ))}
                                        <span className="text-sm text-gray-500">({product.reviews?.length})</span>
                                      </div>
                                    </div>
                                    <Badge variant="outline">{product.category}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                  <div className="flex items-center gap-2">
                                    {product.discount > 0 ? (
                                      <>
                                        <span className="font-bold text-lg">
                                          ${(product.price - (product.price * (product.discount / 100))).toFixed(2)}
                                        </span>
                                        <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
                                      </>
                                    ) : (
                                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                                    )}
                                  </div>
                                  <Button 
                                    disabled={!product.availability}
                                    className="w-32 cursor-pointer"
                                  >
                                    {product.availability ? 'Add to Cart' : 'Out of Stock'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white p-8 rounded-lg text-center"
                    >
                      <h3 className="text-lg font-medium mb-2">No products found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria.</p>
                      <Button onClick={resetFilters}>Reset Filters</Button>
                    </motion.div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            

            {/* Pagination */}
            {/* dummy Pagination  */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="flex justify-center"
            >
              <div className="flex gap-2">
                <Button variant="outline" size="lg" disabled> <ChevronsLeft /> </Button>
                <Button variant="default" size="lg" className='bg-red-500'>1</Button>
                <Button variant="outline" size="lg" >2</Button>
                <Button variant="outline" size="lg">3</Button>
                <Button variant="outline" size="lg"><ChevronsRight /> </Button>
              </div>
            </motion.div>
          </div>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="md:w-64 hidden md:block"
          >
            <FilterSection />
          </motion.div>
        </div>
        
      </div>
    </div></>
  );
};

export default ProductListingUI;