// File: components/CartItem.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ product_id: item.product_id, quantity: newQuantity }));
    }
  };
  
  const handleRemove = () => {
    dispatch(removeFromCart(item.product_id));
  };
  
  const discountedPrice = item.discount 
    ? item.price - (item.price * item.discount / 100) 
    : item.price;
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center py-6 border-b border-gray-200"
    >
      <button 
        onClick={handleRemove}
        className="text-gray-500 hover:text-red-500 transition-colors mr-4"
      >
        <X size={20} />
      </button>
      
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={'https://placehold.co/600x400.png' || "/api/placeholder/100/100"}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <motion.p 
            layout
            className="ml-4"
            key={item.quantity}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ${(discountedPrice * item.quantity).toFixed(2)}
          </motion.p>
        </div>
        
        {item.discount > 0 && (
          <div className="flex items-center mt-1">
            <span className="text-sm line-through text-gray-500 mr-2">${item.price.toFixed(2)}</span>
            <span className="text-sm font-medium text-red-600">${discountedPrice.toFixed(2)} ({item.discount}% off)</span>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="sm"
              className="px-2 py-1 h-8"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </Button>
            <motion.span 
              key={item.quantity}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mx-2 w-8 text-center"
            >
              {item.quantity}
            </motion.span>
            <Button 
              variant="ghost" 
              size="sm"
              className="px-2 py-1 h-8"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            ${discountedPrice.toFixed(2)} each
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;