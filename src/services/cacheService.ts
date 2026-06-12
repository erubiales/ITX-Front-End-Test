// Exigido en la prueba, cache expira en 1 hora, se hace la conversion multiplicando
// para evitar numeros enormes
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000;


interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

export function setCache<T>(key: string, data: T): void {
    try {
        const entry: CacheEntry<T> = {
            data,
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(entry));
    } catch {
        console.warn('CACHE: No se pudo guardar en cache');
    }
}

export function getCache<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(key);
        if (!item) return null;

        const entry: CacheEntry<T> = JSON.parse(item);

        if (Date.now() - entry.timestamp < CACHE_EXPIRATION_TIME) {
            return entry.data;
        }

        localStorage.removeItem(key);
        return null;
    } catch {
        console.warn('CACHE: Error al obtener de cache');
        return null;
    }
}