import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
        <span className="header__cart-icon">🛒</span>
        <span className="header__cart-count">{cartCount}</span>
      </div>
    </header>
  );
}

export default Header;