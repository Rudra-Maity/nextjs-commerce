// ShopGridHeader.jsx
"use client";

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function ShopGridHeader() {
    const pathname=usePathname()
    console.log(pathname);
    const getNames=pathname.split('/')
    console.log(getNames);
    
    
  return (
    <>
    {pathname!=='/' &&
    <div className="relative w-full h-48 md:h-64 overflow-hidden bg-gray-50">
      {/* Curved background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-red-50 rounded-full scale-[2.5] translate-x-[20%] translate-y-[10%]"
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 2.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Page title */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Shop Grid
          </motion.h1>
          
          {/* Breadcrumb */}
          <motion.nav 
            className="flex items-center space-x-2 text-sm mt-2 md:mt-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
              Home
            </Link>

            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{
                getNames.map((name, index) => (
                    index!==0&&(
                    name + (index!==getNames.length-1?' > ':'')
                    )
                ))
                } </span>
          </motion.nav>
        </div>
      </div>
    </div>}</>
  );
}