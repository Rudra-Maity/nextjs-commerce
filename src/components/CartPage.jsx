// File: components/CartPage.jsx
"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { loadCart, applyCoupon, setShippingMethod } from '@/store/cartSlice';
import CartItem from '@/components/CartItem';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, subtotal, shipping, total } = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState('');
  const [freeShippingProgress, setFreeShippingProgress] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);
  
  useEffect(() => {
    const freeShippingThreshold = 150;
    const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
    setFreeShippingProgress(progress);
  }, [subtotal]);
  
  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setIsUpdating(true);
      
      setTimeout(() => {
        dispatch(applyCoupon(couponCode));
        setIsUpdating(false);
      }, 800);
    }
  };
  
  const handleShippingChange = (value) => {
    dispatch(setShippingMethod(value));
  };
  
  const handleUpdateCart = () => {
    setIsUpdating(true);
    
    setTimeout(() => {
      setIsUpdating(false);
    }, 800);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 rounded-full bg-gray-100 mb-4"
          >
            <ShoppingBag size={48} className="text-gray-400" />
          </motion.div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button>Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Free shipping progress */}
            {freeShippingProgress < 100 && (
              <div className="mb-6">
                <p className="text-sm mb-2">
                  Add ${(150 - subtotal).toFixed(2)} more to qualify for free shipping
                </p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}
            
            {/* Cart items */}
            <Card>
              <CardHeader className="pb-0">
                <div className="">
                  <CardTitle>Items</CardTitle>
                
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 text-sm font-medium py-4">
                  <div className="col-span-2">PRODUCTS</div>
                  <div className="text-center">QUANTITY</div>
                  <div className="text-right">SUBTOTAL</div>
                </div>
                <Separator />
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem key={item.product_id} item={item} />
                  ))}
                </AnimatePresence>
                
                <div className="mt-6">
                  <div className="flex items-center gap-4">
                    <Input
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="mr-2"
                    />
                    <Button 
                      variant="outline" 
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim() || isUpdating}
                       className='bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded cursor-pointer'
                    >
                      {isUpdating ? 'Applying...' : 'Apply Coupon'}
                    </Button>
                    <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleUpdateCart}
                    disabled={isUpdating}
                    className='bg-red-500 hover:bg-red-600 hover:text-white text-white cursor-pointer'
                  >
                    {isUpdating ? (
                      <>
                        <RefreshCw size={16} className="mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Cart'
                    )}
                  </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Cart totals */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Cart Totals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <motion.span 
                      key={subtotal}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="font-medium"
                    >
                      ${subtotal.toFixed(2)}
                    </motion.span>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Shipping</h3>
                    <RadioGroup 
                      value={shipping} 
                      onValueChange={handleShippingChange}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="free" id="free" />
                        <Label htmlFor="free">Free Shipping</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="flat" id="flat" />
                        <Label htmlFor="flat">Flat Rate: $10.00</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="local" id="local" />
                        <Label htmlFor="local">Local Pickup</Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-gray-500 mt-2">
                      Shipping options will be updated during checkout
                    </p>
                    <Button variant="link" className="p-0 h-auto text-sm mt-1">
                      Calculate Shipping
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <motion.span 
                      key={total}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ${total.toFixed(2)}
                    </motion.span>
                  </div>
                  
                  <Button className="w-full bg-red-500 text-white hover:bg-red-600 cursor-pointer">
                    Proceed to Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;