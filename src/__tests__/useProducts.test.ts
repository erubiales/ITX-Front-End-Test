import { renderHook, waitFor } from '@testing-library/react';
import useProducts from '../hooks/useProducts';
import * as productService from '../services/productService';
import { Product } from '../models/product/product';

const mockProducts: Product[] = [
  { id: '1', brand: 'Apple', model: 'iPhone 14', price: '999', imgUrl: '' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S23', price: '899', imgUrl: '' },
  { id: '3', brand: 'Apple', model: 'iPhone 13', price: '799', imgUrl: '' },
];

describe('useProducts', () => {
  beforeEach(() => {
    jest.spyOn(productService, 'getProducts').mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('devuelve todos los productos con searchTerm vacío', async () => {
    const { result } = renderHook(() => useProducts(''));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toHaveLength(3);
  });

  it('filtra por marca correctamente', async () => {
    const { result } = renderHook(() => useProducts('Apple'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toHaveLength(2);
  });

  it('filtra por modelo correctamente', async () => {
    const { result } = renderHook(() => useProducts('Galaxy'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].model).toBe('Galaxy S23');
  });

  it('el filtrado es case-insensitive', async () => {
    const { result } = renderHook(() => useProducts('apple'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toHaveLength(2);
  });

  it('devuelve error si el servicio falla', async () => {
    jest.spyOn(productService, 'getProducts').mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useProducts(''));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).not.toBeNull();
  });
});