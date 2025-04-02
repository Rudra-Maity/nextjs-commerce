// app/page.jsx
"use client";
// 3aeddd0ee5a74b91956ccdc72cc7d043
import { useEffect, useState,useRef } from "react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarIcon, ShoppingCartIcon, HeartIcon, MenuIcon, ChevronLeft, ChevronRight, ChevronDown, Phone, ShoppingCart, Menu, X, Heart, Search, CalendarDays, Tag, Tags, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Collections from "@/components/Collections";
import LogoGrid from "@/components/LogoGrid";
import axios from "axios";

// import {Link} from "next/link"
// import ProductListingUI from "./shop/Shops";
// Search
// Sample product data
// const products = [
  // {
  //   product_id: 1,
  //   name: "Elegant Summer Dress",
  //   description: "Perfect for warm weather occasions.",
  //   price: 89.99,
  //   unit: "Piece",
  //   image: "/api/placeholder/400/500",
  //   discount: 15,
  //   availability: true,
  //   brand: "StyleChic",
  //   category: "Women's Fashion",
  //   rating: 4.8,
  //   reviews: [
  //     {
  //       user_id: 1,
  //       rating: 5,
  //       comment: "Beautiful dress, fits perfectly!"
  //     },
  //     {
  //       user_id: 2,
  //       rating: 4.5,
  //       comment: "Great quality material, very comfortable."
  //     }
  //   ]
  // },
  // {
  //   product_id: 2,
  //   name: "Classic Leather Handbag",
  //   description: "Timeless accessory for any outfit.",
  //   price: 129.99,
  //   unit: "Piece",
  //   image: "/api/placeholder/400/500",
  //   discount: 10,
  //   availability: true,
  //   brand: "LuxuryLife",
  //   category: "Accessories",
  //   rating: 4.7,
  //   reviews: [
  //     {
  //       user_id: 3,
  //       rating: 5,
  //       comment: "Excellent quality and craftsmanship!"
  //     }
  //   ]
  // },
  // {
  //   product_id: 3,
  //   name: "Casual Denim Jacket",
  //   description: "Versatile piece for layering.",
  //   price: 69.99,
  //   unit: "Piece",
  //   image: "/api/placeholder/400/500",
  //   discount: 5,
  //   availability: true,
  //   brand: "UrbanStyle",
  //   category: "Women's Fashion",
  //   rating: 4.5,
  //   reviews: []
  // }
// ];

export default function Home() {
  const [products,setProducts] = useState([]);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header isMobile={isMobile} /> */}
      
      <main>
        <HeroSection />
        <TopCategories />
        <FeaturedProducts products={products.slice(2,5)} />
       <Collections /> 
        <DiscountBanner />
        {/* <LogoGrid /> */}
        <PartnersPage />
        <DealOfTheDay products={products.slice(0, 2)} />
        <LatestNewsWidget />
        <Newsletter />
      </main>
      {/* <ProductListingUI /> */}
      {/* <Footer /> */}
    </div>
  );
}




 function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with industry leaders to provide the best solutions for our clients.
          </p>
        </div>
        
        <LogoGrid />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <motion.section 
      className="relative bg-red-50 py-16 md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            SUPER COLLECTION FOR WOMEN
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover our exclusive collection designed for the modern woman
          </motion.p>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded">
              SHOP NOW
            </Button>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            className="relative h-64 w-64 md:h-96 md:w-96"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-red-200 rounded-full opacity-30"></div>
            <img
              src="https://placehold.co/600x400/EEE/31343C"
              alt="Hero collection image"
              width={400}
              height={500}
              loading="eager"
              className="object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function TopCategories() {
  const useMediaQuery = (query) => {
    const [matches, setMatches] = React.useState(false);
  
    React.useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
  
      const listener = () => {
        setMatches(media.matches);
      };
  
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [matches, query]);
  
    return matches;
  };
  
  // Define category data
  const categories = [
    { id: 1, name: "WOMEN WEAR", image: "/images/women-wear.jpg" },
    { id: 2, name: "SHOES COLLECTION", image: "/images/shoes.jpg" },
    { id: 3, name: "BAG COLLECTION", image: "/images/bags.jpg" },
    { id: 4, name: "WATCH HARE", image: "/images/watches.jpg" },
    { id: 5, name: "ACCESSORIES", image: "/images/accessories.jpg" },
    { id: 6, name: "SUNGLASSES", image: "/images/sunglasses.jpg" },
    { id: 7, name: "MEN WEAR", image: "/images/men-wear.jpg" },
    { id: 8, name: "KIDS WEAR", image: "/images/kids-wear.jpg" },
  ];
  
  // Define promo section data
  const promoSections = [
    {
      id: "mens",
      title: "The Latest Men's Trends",
      subtitle: "This Season",
      discount: "Special 50% Discount",
      buttonText: "View Collections",
      buttonLink: "/collections/mens",
    },
    {
      id: "kids",
      title: "LATEST KIDS TRENDS",
      subtitle: "THIS SEASON",
      discount: "TRENDING DISCOUNT",
      buttonText: "Shop Now",
      buttonLink: "/collections/kids",
    },
    {
      id: "womens",
      title: "Latest Women's Trends",
      subtitle: "This Season",
      discount: "Special 50% Discount",
      buttonText: "View Collections",
      buttonLink: "/collections/womens",
    },
  ];

  const containerRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = isSmallScreen ? 200 : 400;
      const scrollDirection = direction === "left" ? -scrollAmount : scrollAmount;
      containerRef.current.scrollBy({ left: scrollDirection, behavior: "smooth" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Categories section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6 flex-col">
          <motion.div>

       
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold tracking-tight"
          >
            BEST FOR YOUR CATEGORIES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-500"
          >
            29 categories belonging to a total 15,872 products
          </motion.p>   </motion.div>
          <motion.div></motion.div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex o snap-x snap-mandatory gap-4 pb-4 overflow-hidden"
            ref={containerRef}
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover="hover"
                className="flex-shrink-0 snap-start"
                style={{ width: isSmallScreen ? "160px" : isMediumScreen ? "180px" : "200px" }}
              >
                <motion.div
                  variants={cardHoverVariants}
                  className={`relative overflow-hidden rounded-lg ${
                    category.id === 1 ? "border-2 border-red-500" : "border border-gray-200"
                  }`}
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "tween", duration: 0.5 }}
                    >
                      <img
                        src={'https://placehold.co/500x400/EEE/31343C' || "https://placehold.co/600x400/EEE/31343C"}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                  <div
                    className={`py-2 text-center font-medium text-sm ${
                      category.id === 1
                        ? "bg-red-500 text-white"
                        : "bg-gray-50 text-gray-800"
                    }`}
                  >
                    {category.name}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 md:block hidden"
          >
            <Button
              onClick={() => scroll("left")}
              size="icon"
              variant="outline"
              className="rounded-full h-10 w-10 bg-white shadow-md hover:bg-gray-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 md:block hidden"
          >
            <Button
              onClick={() => scroll("right")}
              size="icon"
              variant="outline"
              className="rounded-full h-10 w-10 bg-white shadow-md hover:bg-gray-100"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Promo Sections */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {promoSections.map((promo) => (
          <motion.div
            key={promo.id}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative overflow-hidden rounded-lg"
          >
            <Card className="h-full border-0 shadow-md overflow-hidden">
              <CardContent className="p-6 relative h-full min-h-48">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-100/40 to-transparent -z-10"
                  initial={{ rotate: -5, scale: 1.2 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                />
                
                <div className="space-y-4">
                  <p className="text-sm font-medium text-red-500">{promo.discount}</p>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">{promo.title}</h3>
                    <p className="text-lg">{promo.subtitle}</p>
                  </div>
                  
                  {promo.id === "kids" && (
                    <p className="text-sm text-gray-500">Don't miss the special offer this week</p>
                  )}
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="mt-4 rounded-full border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <span>{promo.buttonText}</span>
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

function FeaturedProducts({ products }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          GET YOUR FASHION STYLE
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.product_id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative">
          <img
            src={'https://placehold.co/800x400/EEE/31343C' || 'https://placehold.co/600x400/EEE/31343C'}
            alt={product.name}
            width={400}
            height={500}
            className="object-cover w-full h-64"
            loading="lazy"
          />
          {product.discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              -{product.discount}%
            </Badge>
          )}
          <button className="absolute top-2 left-2 p-2 bg-white rounded-full text-gray-500 hover:text-red-500">
            <HeartIcon size={16} />
          </button>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={16}
                  className={cn(
                    i < Math.floor(product.rating) ? "fill-yellow-400" : "fill-gray-200",
                    "stroke-yellow-400"
                  )}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              ({product.reviews?.length})
            </span>
          </div>
         <Link href={'/shop/product'} target="_blank"><h3 className="font-medium text-lg mb-1">{product.name}</h3></Link> 
          <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
          <div className="flex items-center">
            {product.discount > 0 ? (
              <>
                <span className="text-red-500 font-bold mr-2">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
        </CardContent>
        {/* <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-gray-800 hover:bg-red-500 transition-colors">
            Add to Cart
          </Button>
        </CardFooter> */}
      </Card>
    </motion.div>
  );
}

function DiscountBanner() {
  return (
    <>
    <motion.section 
      className="bg-red-500 py-8 md:py-12 text-white text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-4xl font-bold mb-4"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          -15% OFF DISCOUNT ALL HERE
        </motion.h2>
        <Button className="bg-white text-red-500 hover:bg-gray-100 px-8 py-2 rounded">
          SHOP NOW
        </Button>
      </div>
    </motion.section></>
  );
}

function DealOfTheDay({ products }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          DEAL OF THE DAY
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.product_id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 mb-4 md:mb-0">
                <img
                  src={'https://placehold.co/600x400/EEE/31343C' || 'https://placehold.co/600x400/EEE/31343C'}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-48 md:h-full rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="md:w-2/3 md:pl-6">
                <Badge className="mb-2 bg-red-500">HOT DEAL</Badge>
                <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        size={16}
                        className={cn(
                          i < Math.floor(product.rating) ? "fill-yellow-400" : "fill-gray-200",
                          "stroke-yellow-400"
                        )}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.reviews.length})
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                <div className="flex items-center mb-4">
                  <span className="text-red-500 font-bold text-xl mr-2">
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2">
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestNewsWidget() {
  const news = [
    {
      title: "Summer Fashion Trends",
      excerpt: "Discover what's hot this season in women's fashion.",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Sustainable Fashion Guide",
      excerpt: "How to build an eco-friendly wardrobe.",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Celebrity Style Inspiration",
      excerpt: "Get inspired by the latest celebrity fashion choices.",
      image: "/api/placeholder/300/200"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          OUR LATEST NEWS INSIGHT
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={'https://placehold.co/600x400/EEE/31343C' || 'https://placehold.co/600x400/EEE/31343C'}
                alt={item.title}
                width={300}
                height={200}
                className="object-cover w-full h-48"
                loading="lazy"
              />
              <div className="p-4">
                <div className="flex items-center mb-2 ">
             
                <CalendarDays className="text-red-500 mr-2" /> March 15,2025

                <Tags className="text-red-500 ml-12 mr-2 "/> OIL CHANGE
                </div>
                <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.excerpt}</p>
                <Button variant="link" className="text-red-500 hover:text-red-600 p-0 mt-2">
                  Read More <ArrowRight />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <motion.section 
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-500 mb-6">Stay updated with our latest offers and news</p>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

