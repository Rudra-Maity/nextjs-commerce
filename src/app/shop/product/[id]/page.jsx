"use client";
import React, { useEffect, useState ,use } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Share, ShoppingCart, Heart, PlayCircle, Minus, Plus, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import axios from 'axios';

export default function ProductPage({params}) {
  const { id } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
const {addItem}=useCart()

  const [product, setProducts] = useState({
      product_id: 21,
      name: "Tony Gold Necklaces",
      description: "Eget lacili odio cum habitant egestas condube turpis pharelitre, ante pariaturir donec dues primis non faucibus augue malesuada venenatis",
      price: 260.00,
      // oldPrice: 340.00,
      unit: "Piece",
      image: ['https://placehold.co/600x400/EEE/31343C', 'https://placehold.co/600x400/EEE/31343C', 'https://placehold.co/600x400/EEE/31343C'],
      discount: 10,
      availability: true,
      brand: "MODERN DRESS",
      category: "Jewelry",
      rating: 5,
      stock: 15,
      reviews: [
        {
          user_id: 1,
          rating: 5,
          comment: "Great product with excellent quality!"
        }
      ]
    })
// console.log(params.id);
useEffect(()=>{
 
  try {
    async function FetchProduct() {
      const res=await axios.get('https://fake-store-api.mock.beeceptor.com/api/products')
      if(res.data.length>0){
        // setProducts(res.data)
        const data=res.data.find((item)=>item.product_id==id)
        data.image=['https://placehold.co/600x400/EEE/31343C', 'https://placehold.co/600x500/EEE/31343C', 'https://placehold.co/600x400/EEE/31343C']
        console.log(data);
        setProducts(data ||{})
        
      }
    } 
    FetchProduct()
  } catch (error) {
    
  }
 
},[])
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity(prev => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className=" mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images Section */}
        <div className="flex flex-wrap gap-4 ">
        <div className="flex gap-2 overflow-x-auto pb-2 flex-row sm:flex-col ">
            {product.image.map((img, index) => (
              <motion.div
                key={index}
                className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === index ? 'border-black' : 'border-transparent'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={img || "https://via.placeholder.com/100"} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
          <div 
            className="relative overflow-hidden rounded-lg bg-gray-100 h-96"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              className="w-full h-full"
              style={{
                scale: isHovering ? 1.5 : 1,
                transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`
              }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <img 
                src={product.image[selectedImage] || "https://via.placeholder.com/500"} 
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in"
              />
            </motion.div>
            {isHovering && (
              <div className="absolute top-2 right-2 bg-white p-2 rounded-full">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="h-5 w-5 text-gray-500" />
                </motion.div>
              </div>
            )}
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                Sale
              </div>
            )}
            <div className="absolute bottom-44 left-4 right-4 flex justify-between">
              <motion.button
                className="bg-white rounded-full p-2 shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : product.image.length - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.button>
              <motion.button
                className="bg-white rounded-full p-2 shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(prev => (prev < product.image.length - 1 ? prev + 1 : 0))}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
          
        
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-red-500 uppercase font-semibold">{product.brand}</p>
            <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({product.reviews.length} customer review)</span>
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            {product.oldPrice && (
              <p className="text-lg text-gray-500 line-through ml-2">${product.oldPrice.toFixed(2)}</p>
            )}
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center text-sm text-gray-500">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                28 people are viewing this right now
              </span>
            </motion.div>
          </div>

          <motion.div 
            className="bg-red-100 rounded-lg p-3 w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-red-500 text-sm font-medium">Only {product.stock} items left in stock!</p>
            <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
              <motion.div 
                className="bg-red-500 h-full" 
                initial={{ width: 0 }}
                animate={{ width: `${(product.stock / 50) * 100}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
          </motion.div>

          <div className="space-y-3">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm">Free returns</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-sm">Free shipping via DHL, fully insured</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm">All taxes and customs duties included</span>
            </motion.div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center border rounded-md">
              <motion.button 
                whileHover={{ backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.95 }}
                className="p-2 border-r"
                onClick={() => handleQuantityChange("decrease")}
              >
                <Minus className="h-4 w-4" />
              </motion.button>
              <span className="px-4">{quantity}</span>
              <motion.button 
                whileHover={{ backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.95 }}
                className="p-2 border-l"
                onClick={() => handleQuantityChange("increase")}
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>
            {console.log(quantity)
            }
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-white text-black font-medium py-2 px-6 rounded-md border border-black flex items-center justify-center gap-2 cursor-pointer"
              onClick={()=>addItem({product_id:product.product_id, name: product.name, price: product.price, quantity:quantity,availability:product.availability, image:product.image[0], discount:product.discount, unit:product.unit,rating:product.rating,reviews:product.reviews},quantity)}
            >
              <ShoppingCart className="h-5 w-5" />
              ADD TO CART
            </motion.button>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-red-500 text-white font-medium py-3 px-6 rounded-md cursor-pointer"
          >
        <Link href={'/checkout'}>BUY THE ITEM NOW</Link>    
          </motion.button>
          
          <div className="flex items-center justify-between pt-4 text-sm">
            <button className="flex items-center text-gray-500">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              Compare
            </button>
            
            <button className="flex items-center text-gray-500">
              <HelpCircle className="w-5 h-5 mr-1" />
              Ask a question
            </button>
            
            <button className="flex items-center text-gray-500">
              <Share className="w-5 h-5 mr-1" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Product Info Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="description" className="text-base">Description</TabsTrigger>
            <TabsTrigger value="additional" className="text-base">Additional information</TabsTrigger>
            <TabsTrigger value="reviews" className="text-base">Reviews (2)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="text-gray-600">
                <p className="mb-4">
                  Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet, consectetur 
                  adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Lorem ipsum dolor sit 
                  amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
                </p>
                <p>
                  Lobortis rhoncus libero pretium tempor mattis purus, auctor dia massa enim tincideous. Torquent senectus 
                  dui vehicula libero cum vitae natoque magna commodo quam.
                </p>
              </div>
              
              <div className="rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center h-64">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/80 backdrop-blur-sm rounded-full p-4"
                >
                  <PlayCircle className="h-12 w-12 text-black" />
                </motion.button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="additional" className="pt-6">
            <div className="text-gray-600">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Brand</td>
                    <td className="py-3">{product.brand}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Category</td>
                    <td className="py-3">{product.category}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Material</td>
                    <td className="py-3">Gold Plated</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Weight</td>
                    <td className="py-3">32g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Customer {review.user_id}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">1 week ago</p>
                  </div>
                  <p className="mt-3 text-gray-600">{review.comment}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}