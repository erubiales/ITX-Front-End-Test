import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';
import './PLP.css';

function PLP() {
  return (
    <div className="plp">
      <Header />
      <main className="plp__content">
        <ProductList />
      </main>
    </div>
  );
}

export default PLP;