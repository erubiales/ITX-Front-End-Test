import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header/Header';
import * as CartContext from '../context/CartContext';

const mockUseCartContext = (cartCount: number) => {
  jest.spyOn(CartContext, 'useCartContext').mockReturnValue({
    cartCount,
    addItem: jest.fn(),
    loading: false,
    error: null
  });
};

describe('Header', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renderiza el título de la aplicación', () => {
    mockUseCartContext(0);
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText('MobileShop')).toBeInTheDocument();
  });

  it('muestra el contador del carrito', () => {
    mockUseCartContext(5);
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('muestra solo "Inicio" en la ruta principal', () => {
    mockUseCartContext(0);
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.queryByText('Detalle del producto')).not.toBeInTheDocument();
  });

  it('muestra breadcrumb de detalle en ruta /product/:id', () => {
    mockUseCartContext(0);
    render(
      <MemoryRouter initialEntries={['/product/123']}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText('Detalle del producto')).toBeInTheDocument();
  });
});