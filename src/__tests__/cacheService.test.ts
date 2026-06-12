import { setCache, getCache } from '../services/cacheService';

const TEST_KEY = 'test_key';
const TEST_DATA = { name: 'test', value: 42 };

describe('cacheService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  describe('setCache', () => {
    it('guarda los datos en localStorage', () => {
      setCache(TEST_KEY, TEST_DATA);
      const stored = localStorage.getItem(TEST_KEY);
      expect(stored).not.toBeNull();
    });

    it('guarda los datos con un timestamp', () => {
      setCache(TEST_KEY, TEST_DATA);
      const stored = JSON.parse(localStorage.getItem(TEST_KEY)!);
      expect(stored.data).toEqual(TEST_DATA);
      expect(stored.timestamp).toBeDefined();
    });
  });

  describe('getCache', () => {
    it('devuelve los datos si no han expirado', () => {
      setCache(TEST_KEY, TEST_DATA);
      const result = getCache(TEST_KEY);
      expect(result).toEqual(TEST_DATA);
    });

    it('devuelve null si la clave no existe', () => {
      const result = getCache('non_existent_key');
      expect(result).toBeNull();
    });

    it('devuelve null y elimina la entrada si ha expirado', () => {
      setCache(TEST_KEY, TEST_DATA);

      // Simula que han pasado 2 horas
      jest.spyOn(Date, 'now').mockReturnValue(Date.now() + 2 * 60 * 60 * 1000);

      const result = getCache(TEST_KEY);
      expect(result).toBeNull();
      expect(localStorage.getItem(TEST_KEY)).toBeNull();
    });
  });
});