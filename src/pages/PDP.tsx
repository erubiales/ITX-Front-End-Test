import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import useProductDetail from '../hooks/useProductDetail';
import './PDP.css';

function PDP() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProductDetail(id ?? '');

  return (
    <div className="pdp">
      <Header />
      <main className="pdp__content">
        <Link to="/" className="pdp__back">← Volver al listado</Link>
        {loading && <div className="pdp__status">Cargando...</div>}
        {error && <div className="pdp__status">{error}</div>}
        {product && <ProductDetail product={product} />}
      </main>
    </div>
  );
}

export default PDP;