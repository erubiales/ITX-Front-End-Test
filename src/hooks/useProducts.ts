import { useState, useEffect } from 'react';
import { Product } from '../models/product/product';
import { AsyncState } from '../models/shared/asyncState';
import { getProducts } from '../services/productService';

function useProducts(searchTerm: string) {
  const [state, setState] = useState<AsyncState<Product[]>>({
    data: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setState(prev => ({ ...prev, loading: true }));
      try {
        const data = await getProducts();
        setState({ data, loading: false, error: null });
      } catch {
        setState(prev => ({ ...prev, loading: false, error: 'PRODUCTO: Error al cargar los productos' }));
      }
    };

    fetchProducts();
  }, []);

  // Se filtra en memoria para no llamar a la api
  const filteredProducts = state.data.filter(p =>
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return { products: filteredProducts, loading: state.loading, error: state.error };
}

export default useProducts;