"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

interface Product {
  name: string;
  price: number;
  image: string;
  slug: string;
  badge?: "Sale" | "New";
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Product[]>([]);

  // LocalStorage key depends on current logged-in user
  const cartKey = user ? `cart_${user.email}` : "cart_guest";

  // Load cart whenever user changes (login/logout)
  useEffect(() => {
    const saved = localStorage.getItem(cartKey);
    setCart(saved ? JSON.parse(saved) : []);
  }, [cartKey]);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  // Add product to cart (duplicates allowed)
  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  // Remove only the first instance of a product
  const removeFromCart = (slug: string) => {
    const index = cart.findIndex((p) => p.slug === slug);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
