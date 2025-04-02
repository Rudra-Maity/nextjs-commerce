// File: store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subtotal: 0,
  shipping: 'free',
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.items.findIndex(item => item.product_id === action.payload.product_id);
      console.log(action);
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        state.items[existingItemIndex].quantity += action.payload.quantity || 1;
      } else {
        // Add new item to array
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1
        });
      }
      
      updateCartTotals(state);
      saveCartToLocalStorage(state);
    },
    
    updateQuantity: (state, action) => {
      const { product_id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.product_id === product_id);
      
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = quantity;
        updateCartTotals(state);
        saveCartToLocalStorage(state);
      }
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.product_id !== action.payload);
      updateCartTotals(state);
      saveCartToLocalStorage(state);
    },
    
    setShippingMethod: (state, action) => {
      state.shipping = action.payload;
      updateCartTotals(state);
      saveCartToLocalStorage(state);
    },
    
    loadCart: (state) => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          // Make sure we're getting an array for items
          state.items = Array.isArray(parsedCart.items) ? parsedCart.items : [];
          state.shipping = parsedCart.shipping || 'free';
          updateCartTotals(state);
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
        // Reset to defaults if there's an error
        state.items = [];
        state.shipping = 'free';
        updateCartTotals(state);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      updateCartTotals(state);
      localStorage.removeItem('cart');
    },
    
    applyCoupon: (state, action) => {
      // Implementation for coupon logic would go here
      // For now, we'll just update the state and save
      updateCartTotals(state);
      saveCartToLocalStorage(state);
    },
  },
});

// Helper functions
function updateCartTotals(state) {
  // Calculate subtotal
  state.subtotal = state.items.reduce((total, item) => {
    const price = item.price;
    const discountedPrice = item.discount ? price - (price * item.discount / 100) : price;
    return total + (discountedPrice * item.quantity);
  }, 0);
  
  // Calculate total based on shipping method
  state.total = state.subtotal;
  if (state.shipping === 'flat') {
    state.total += 10; // $10 flat rate shipping
  }
  
  // Round to 2 decimal places
  state.subtotal = Math.round(state.subtotal * 100) / 100;
  state.total = Math.round(state.total * 100) / 100;
}

function saveCartToLocalStorage(state) {
  try {
    localStorage.setItem('cart', JSON.stringify({
      items: state.items,
      shipping: state.shipping,
    }));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
}

export const { 
  addToCart, 
  updateQuantity, 
  removeFromCart,
  setShippingMethod,
  loadCart,
  clearCart,
  applyCoupon
} = cartSlice.actions;

export default cartSlice.reducer;
