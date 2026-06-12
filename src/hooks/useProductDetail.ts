import { useState, useEffect } from 'react';
import { ProductDetail } from '../models/product/productDetail';
import { AsyncState } from '../models/shared/asyncState';
import { getProductById } from '../services/productService';

function useProductDetail(id: string) {
  const [state, setState] = useState<AsyncState<ProductDetail | null>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setState(prev => ({ ...prev, loading: true }));
      try {
        const data = await getProductById(id);
        setState({ data, loading: false, error: null });
      } catch {
        setState(prev => ({ ...prev, loading: false, error: 'PRODUCTO: Error al cargar el producto' }));
      }
    };

    fetchProduct();
  }, [id]);

  return { product: state.data, loading: state.loading, error: state.error };
}

export default useProductDetail;