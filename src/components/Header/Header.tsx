import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartContext } from '../../context/CartContext';
import './Header.css';

function Header() {
  const { cartCount } = useCartContext();
  const { pathname } = useLocation();

  const isDetail = pathname.startsWith('/product/');

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        MobileShop
      </Link>

      <nav className="header__breadcrumbs">
        <Link to="/">Inicio</Link>
        {isDetail && (
          <>
            <span className="header__breadcrumbs-separator">/</span>
            <span>Detalle del producto</span>
          </>
        )}
      </nav>

      <div className="header__cart">
        <span className="header__cart-icon">Cart</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={cartCount}
            className="header__cart-count"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 0.3, ease: 'easeInOut' as const }}
          >
            {cartCount}
          </motion.span>
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;