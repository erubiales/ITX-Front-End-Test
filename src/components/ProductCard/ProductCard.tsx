import React from 'react';
import { Product } from '../../models/product/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div className="product-card" onClick={() => onClick(product.id)}>
      <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
      <div className="product-card__info">
        <span className="product-card__brand">{product.brand}</span>
        <span className="product-card__model">{product.model}</span>
        <span className="product-card__price">{product.price} €</span>
      </div>
    </div>
  );
}

export default ProductCard;