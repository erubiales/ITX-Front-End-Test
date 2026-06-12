import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import useDebounce from '../../hooks/useDebounce';
import ProductCard from '../ProductCard/ProductCard';
import SearchBar from '../SearchBar/SearchBar';
import './ProductList.css';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { products, loading, error } = useProducts(debouncedSearch);
  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  if (loading) return <div className="product-list__status">Cargando...</div>;
  if (error) return <div className="product-list__status">{error}</div>;

  return (
    <div className="product-list">
      <div className="product-list__toolbar">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      <div className="product-list__grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onClick={handleProductClick} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;