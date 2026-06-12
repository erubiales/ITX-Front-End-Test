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

  // Evitar cargar de nuevo la funcion
  const addItem = useCallback(async (item: CartItem) => {
    setLoading(true);
    setError(null);
    try {
      await addToCart(item);
      //Incremento porque el servidor devuelve count 1
      setCartCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem(CART_COUNT_KEY, newCount.toString());
        return newCount;
      });
    } catch {
      setError('CARRITO: Error al agregar al carrito');
    } finally {
      setLoading(false);
    }
  }, []);

  return { cartCount, addItem, loading, error };
}

export default useCart;