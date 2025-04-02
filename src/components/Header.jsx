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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCart, applyCoupon, setShippingMethod } from '@/store/cartSlice';
import ShopGridHeader from "./ShopGridHeader";
// import {Link} from 'next/link';
export default function Header({ isMobile }) {
  const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    // console.log(JSON.parse(localStorage.getItem("cart")).items.length);
  // const cartItemsCount=JSON.parse(localStorage.getItem("cart"))?.items?.length ||0
      const { items, subtotal, shipping, total } = useSelector((state) => state.cart);
        useEffect(() => {
          dispatch(loadCart());
        }, [dispatch]);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  console.log(items);
  
    const topBarLinks = [
      { title: "About", href: "/about" },
      { title: "My Account", href: "/auth/login" },
      { title: "Wishlist", href: "/wishlist" },
      { title: "Checkout", href: "/checkout" }
    ];
  
    const mainNavLinks = [
      { title: "HOME", href: "/" },
      { title: "SHOP", href: "/shop" },
      { title: "WOMEN", href: "/women" },
      { title: "MEN", href: "/men" },
      { title: "PAGES", href: "/pages" },
      { title: "BLOG", href: "/blog" },
      { title: "CONTACT", href: "/contact" },
      { title: "FAQ", href: "/faq" }
    ];
  
    return (
      <>
      <header className="sticky top-0 z-50 w-full">
        {/* Announcement Bar */}
        <motion.div 
          className="bg-red-500 text-white px-4 py-2 flex justify-between items-center text-sm"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex space-x-4 overflow-x-auto md:overflow-visible whitespace-nowrap">
            {topBarLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:underline hidden sm:inline-block"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="flex-1 text-center hidden md:block">
            <p>Free shipping for all orders of 150$</p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="hidden sm:block">
              <Link href="/store-location">Store Location</Link>
            </div>
            <span className="hidden sm:inline-block">|</span>
            <div className="flex items-center">
              <span>Language</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
            <span className="hidden sm:inline-block">|</span>
            <div className="flex items-center">
              <span>Currency</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
          </div>
        </motion.div>
  
        {/* Main Navigation */}
        <motion.div 
          className="bg-white px-4 py-4 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <motion.div 
                  className="text-red-500"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 10 }}
                >
                  <ShoppingCart className="h-6 w-6" />
                </motion.div>
                <span className="font-bold text-xl tracking-wide">ROISER</span>
              </Link>
            </motion.div>
  
            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
              <div className="relative w-full flex items-center">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-400 text-sm">All Categories</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
                </div>
                <Input
                  type="text"
                  placeholder="Search Keywords..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-32 pr-16 py-2 border rounded-md w-full"
                />
                <Button 
                  className="absolute right-0 bg-red-500 hover:bg-red-600 text-white px-4"
                >
                  SEARCH HERE
                </Button>
              </div>
            </div>
  
            {/* Contact and Cart */}
            <div className="hidden md:flex items-center space-x-6">
              <motion.div className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-gray-500">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Call Us Now:</div>
                  <div className="font-medium">+(258) 2159-2159</div>
                </div>
              </motion.div>
  
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-700 relative"
                >
                  <Heart className="h-6 w-6" />
                </motion.div>
  
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-700 relative"
                > 
                <Link href={'/cart'}><ShoppingCart className="h-6 w-6 cursor-pointer" /> 
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span></Link>  
                </motion.div>
  
                <div className="text-right">
                  <div className="text-xs text-gray-500">Your cart</div>
                  <div className="font-medium">$1280.00</div>
                </div>
              </motion.div>
            </div>
  
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="text-gray-700"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>
  
        {/* Main Navigation Links */}
        <motion.div 
          className="bg-gray-900 text-white hidden md:block"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex">
              {mainNavLinks.map((link) => (
                <motion.div 
                  key={link.title}
                  whileHover={{ backgroundColor: "#374151" }}
                  className="relative group"
                >
                  <Link href={link.href} className="px-6 py-4 block font-medium">
                    {link.title}
                  </Link>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-red-500 w-0 group-hover:w-full"
                    transition={{ duration: 0.2 }}
                    initial={false}
                    animate={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                  />
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="bg-red-500 px-6 py-4 font-medium flex items-center"
              whileHover={{ backgroundColor: "#EF4444" }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/discount" className="text-sm">
                Get 30% Discount Now
              </Link>
              <span className="ml-2 px-2 py-0.5 bg-white text-red-500 text-xs rounded">
                SALE
              </span>
            </motion.div>
          </div>
        </motion.div>
  
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="bg-white border-t md:hidden absolute w-full shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-3">
                <div className="relative mb-4">
                  <Input
                    type="text"
                    placeholder="Search Keywords..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pr-10"
                  />
                  <Button 
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 p-1 h-8 w-8"
                  >
                    <Search className="h-4 w-4 text-white" />
                  </Button>
                </div>
  
                <div className="space-y-0 mb-4">
                  {mainNavLinks.map((link) => (
                    <motion.div
                      key={link.title}
                      whileHover={{ backgroundColor: "#F3F4F6" }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link 
                        href={link.href} 
                        className="block px-3 py-2 border-b border-gray-100 last:border-0"
                      >
                        {link.title}
                      </Link>
                    </motion.div>
                  ))}
                </div>
  
                <div className="flex flex-col space-y-3 pt-2 border-t">
                  <div className="flex justify-between">
                    <Link href="/account" className="text-sm">My Account</Link>
                    <Link href="/wishlist" className="text-sm">Wishlist</Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">+(258) 2159-2159</span>
                    </div>
                    <Link href="/checkout" className="text-sm">Checkout</Link>
                  </div>
                  <div className="flex justify-between pt-2 border-t text-sm">
                    <div>Your cart: <span className="font-medium">$1280.00</span></div>
                    <div className="flex items-center">
                   <Link href={'/cart'}>  <ShoppingCart className="h-4 w-4 mr-1 cursor-pointer" /></Link> 
                      <span>{items.length} items</span>
                    </div>
                  </div>
                </div>
  
                <motion.div 
                  className="bg-red-500 text-white py-2 px-4 rounded text-center mt-4 w-full"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link href="/discount" className="block">
                    Get 30% Discount Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <ShopGridHeader />
      </>
    );
  }