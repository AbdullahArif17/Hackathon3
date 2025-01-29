"use client";

import { createContext, useContext, useState } from "react";

// Cart Item interface
interface CartItem {
  id: string;
  heading: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

// Cart context interface
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

// Creating CartContext with default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add items to the cart
  const addToCart = (item: CartItem) => {
    console.log("Adding item:", item);
    setCart((prevCart) => {
      // Check if item already exists in the cart
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.selectedColor === item.selectedColor &&
          cartItem.selectedSize === item.selectedSize
      );

      // If item exists, update quantity
      if (existingItem) {
        console.log("Item already in cart, updating quantity");
        return prevCart.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.selectedColor === item.selectedColor &&
          cartItem.selectedSize === item.selectedSize
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      // If item doesn’t exist, add it to the cart
      console.log("New item added to cart");
      return [...prevCart, { ...item, quantity: 1 }];
    });

    alert("Added to cart successfully!");
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
    alert("Removed from cart successfully!");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use Cart context
export const useCart = () => {
  const context = useContext(CartContext);

  // Error handling if useCart is used outside CartProvider
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
