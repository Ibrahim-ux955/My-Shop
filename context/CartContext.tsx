"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

/** Base product type */
interface Product {
  name: string;
  price: number;
  image: string;
  slug: string;
  badge?: "Sale" | "New";
}

/** Cart item = product + quantity */
export interface CartItem extends Product {
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  // key depends on current logged-in user
  const cartKey = user ? `cart_${user.email}` : "cart_guest";

  // Load cart when user changes (login/logout)
  useEffect(() => {
    const saved = localStorage.getItem(cartKey);
    setCart(saved ? JSON.parse(saved) : []);
  }, [cartKey]);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  /** Add product – increment qty if already in cart */
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.slug === product.slug);
      if (existing) {
        return prev.map(p =>
          p.slug === product.slug ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  /** Remove one quantity, or remove item if qty is 1 */
  const removeFromCart = (slug: string) => {
    setCart(prev =>
      prev.flatMap(item =>
        item.slug === slug
          ? item.qty > 1
            ? [{ ...item, qty: item.qty - 1 }]
            : []
          : [item]
      )
    );
  };

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
