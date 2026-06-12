import React, { useState } from 'react';
import { ProductDetail } from '../../models/product/productDetail';
import { useCartContext } from '../../context/CartContext';
import './ProductActions.css';

interface ProductActionsProps {
  product: ProductDetail;
}

function ProductActions({ product }: ProductActionsProps) {
  const { options } = product;
  const [selectedColor, setSelectedColor] = useState(options.colors[0]?.code ?? 0);
  const [selectedStorage, setSelectedStorage] = useState(options.storages[0]?.code ?? 0);
  const { addItem, loading, error } = useCartContext();

  const handleAddToCart = async () => {
    await addItem({
      id: product.id,
      colorCode: selectedColor,
      storageCode: selectedStorage
    });
  };

  return (
    <div className="product-actions">
      <div className="product-actions__selectors">
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(Number(e.target.value))}
          className="product-actions__select"
        >
          {options.colors.map(color => (
            <option key={color.code} value={color.code}>{color.name}</option>
          ))}
        </select>

        <select
          value={selectedStorage}
          onChange={(e) => setSelectedStorage(Number(e.target.value))}
          className="product-actions__select"
        >
          {options.storages.map(storage => (
            <option key={storage.code} value={storage.code}>{storage.name}</option>
          ))}
        </select>
      </div>

      {error && <span className="product-actions__error">{error}</span>}

      <button
        className="product-actions__button"
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? 'Añadiendo...' : 'Añadir al carrito'}
      </button>
    </div>
  );
}

export default ProductActions;