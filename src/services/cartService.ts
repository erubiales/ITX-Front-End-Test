import { environment } from '../config/environment';
import { CartItem } from '../models/cart/cartItem';
import { CartResponse } from '../models/cart/cartResponse';
import { fetchWithTimeout } from './httpService';

export async function addToCart(item: CartItem): Promise<CartResponse> {
    const response = await fetchWithTimeout(`${environment.apiUrl}${environment.cart}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });

    return response.json();
}