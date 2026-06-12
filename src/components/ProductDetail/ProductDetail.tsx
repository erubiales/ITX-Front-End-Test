import React from 'react';
import { ProductDetail as ProductDetailModel } from '../../models/product/productDetail';
import ProductActions from '../ProductActions/ProductActions';
import './ProductDetail.css';

interface ProductDetailProps {
  product: ProductDetailModel;
}

function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="product-detail">
      <div className="product-detail__image">
        <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
      </div>

      <div className="product-detail__info">
        <div className="product-detail__description">
          <h2>{product.brand} {product.model}</h2>
          <ul>
            <li><strong>Precio:</strong> {product.price} €</li>
            <li><strong>CPU:</strong> {product.cpu}</li>
            <li><strong>RAM:</strong> {product.ram}</li>
            <li><strong>Sistema Operativo:</strong> {product.os}</li>
            <li><strong>Resolución:</strong> {product.displayResolution}</li>
            <li><strong>Batería:</strong> {product.battery}</li>
            <li><strong>Cámara principal:</strong> {product.primaryCamera.join(', ')}</li>
            <li><strong>Cámara secundaria:</strong> {product.secondaryCmera.join(', ')}</li>
            <li><strong>Dimensiones:</strong> {product.dimentions}</li>
            <li><strong>Peso:</strong> {product.weight} g</li>
          </ul>
        </div>

        <ProductActions product={product} />
      </div>
    </div>
  );
}

export default ProductDetail;