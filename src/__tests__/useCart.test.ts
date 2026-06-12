import { renderHook, act } from '@testing-library/react';
import useCart from '../hooks/useCart';
import * as cartService from '../services/cartService';

describe('useCart', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('inicializa cartCount a 0 si no hay nada en localStorage', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.cartCount).toBe(0);
  });

  it('recupera el cartCount persistido en localStorage', () => {
    localStorage.setItem('cartCount', '5');
    const { result } = renderHook(() => useCart());
    expect(result.current.cartCount).toBe(5);
  });

  it('incrementa el cartCount al añadir un item', async () => {
    jest.spyOn(cartService, 'addToCart').mockResolvedValue({ count: 1 });
    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.addItem({ id: '1', colorCode: 1000, storageCode: 2000 });
    });

    expect(result.current.cartCount).toBe(1);
  });

  it('persiste el cartCount en localStorage tras añadir', async () => {
    jest.spyOn(cartService, 'addToCart').mockResolvedValue({ count: 1 });
    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.addItem({ id: '1', colorCode: 1000, storageCode: 2000 });
    });

    expect(localStorage.getItem('cartCount')).toBe('1');
  });

  it('establece error si el servicio falla', async () => {
    jest.spyOn(cartService, 'addToCart').mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.addItem({ id: '1', colorCode: 1000, storageCode: 2000 });
    });

    expect(result.current.error).not.toBeNull();
  });
});