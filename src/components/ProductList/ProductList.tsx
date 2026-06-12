import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import useDebounce from '../../hooks/useDebounce';
import ProductCard from '../ProductCard/ProductCard';
import SearchBar from '../SearchBar/SearchBar';
import './ProductList.css';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [slowLoad, setSlowLoad] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { products, loading, error } = useProducts(debouncedSearch);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      setSlowLoad(false);
      return;
    }
    const timer = setTimeout(() => setSlowLoad(true), 8000);
    return () => clearTimeout(timer);
  }, [loading]);

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  if (loading) return (
    <div className="product-list__status">
      <div className="product-list__spinner" />
      <p>Cargando productos...</p>
      {slowLoad && (
        <p className="product-list__status-hint">
          El servidor está iniciando, puede tardar hasta 30 segundos la primera vez...
        </p>
      )}
    </div>
  );
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