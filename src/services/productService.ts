import { environment } from '../config/environment';
import { Product } from '../models/product/product';
import { ProductDetail } from '../models/product/productDetail';
import { getCache, setCache } from './cacheService';
import { fetchWithTimeout } from './httpService';

const PRODUCTS_CACHE_KEY = 'products';
const PRODUCT_DETAIL_CACHE_KEY = (id: string) => `product_${id}`;


export async function getProducts(): Promise<Product[]> {
    const cached = getCache<Product[]>(PRODUCTS_CACHE_KEY);
    if (cached) return cached;

    const response = await fetchWithTimeout(`${environment.apiUrl}${environment.products}`);
    const data: Product[] = await response.json();

    setCache(PRODUCTS_CACHE_KEY, data);
    return data;
}

export async function getProductById(id: string): Promise<ProductDetail> {
    const cacheKey = PRODUCT_DETAIL_CACHE_KEY(id);
    const cached = getCache<ProductDetail>(cacheKey);
    if (cached) return cached;

    const response = await fetchWithTimeout(`${environment.apiUrl}${environment.productDetail}${id}`);
    const data: ProductDetail = await response.json();

    setCache(cacheKey, data);
    return data;
}