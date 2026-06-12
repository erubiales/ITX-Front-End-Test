import { useState, useCallback } from 'react';
import { CartItem } from '../models/cart/cartItem';
import { addToCart } from '../services/cartService';

const CART_COUNT_KEY = 'cartCount';

function useCart() {
  const [cartCount, setCartCount] = useState<number>(() => {
    const stored = localStorage.getItem(CART_COUNT_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = useCallback(async (item: CartItem) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addToCart(item);
      setCartCount(response.count);
      localStorage.setItem(CART_COUNT_KEY, response.count.toString());
    } catch {
      setError('Error al añadir al carrito');
    } finally {
      setLoading(false);
    }
  }, []);

  return { cartCount, addItem, loading, error };
}

export default useCart;