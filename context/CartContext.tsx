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

/** Cart item = product + quantity + optional variant */
export interface CartItem extends Product {
  qty: number;
  selectedVariant?: {
    color: string;
    size: string;
    stock: number;
  };
}

interface CartContextType {
  cart: CartItem[];
  /** Add product to cart. Pass a variant if user selected one */
  addToCart: (product: Product, selectedVariant?: CartItem["selectedVariant"]) => void;
  /** Decrease quantity or remove if qty is 1 */
  removeFromCart: (slug: string, selectedVariant?: CartItem["selectedVariant"]) => void;
  /** Empty entire cart */
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Storage key depends on current logged-in user
  const cartKey = user ? `cart_${user.email}` : "cart_guest";

  // Load cart on login/logout
  useEffect(() => {
    const saved = localStorage.getItem(cartKey);
    setCart(saved ? JSON.parse(saved) : []);
  }, [cartKey]);

  // Persist cart whenever it changes
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  /** Add product – increment qty if same slug+variant already exists */
  const addToCart = (product: Product, selectedVariant?: CartItem["selectedVariant"]) => {
    setCart(prev => {
      const existing = prev.find(
        p =>
          p.slug === product.slug &&
          JSON.stringify(p.selectedVariant ?? null) === JSON.stringify(selectedVariant ?? null)
      );

      if (existing) {
        return prev.map(p =>
          p === existing ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1, selectedVariant }];
    });
  };

  /** Remove one quantity (matching slug + variant) or remove item if qty is 1 */
  const removeFromCart = (slug: string, selectedVariant?: CartItem["selectedVariant"]) => {
    setCart(prev =>
      prev.flatMap(item =>
        item.slug === slug &&
        JSON.stringify(item.selectedVariant ?? null) === JSON.stringify(selectedVariant ?? null)
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
