import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard/ProductCard';
import { Product } from '../models/product/product';

const mockProduct: Product = {
  id: '1',
  brand: 'Apple',
  model: 'iPhone 14',
  price: '999',
  imgUrl: 'https://example.com/iphone.jpg'
};

describe('ProductCard', () => {
  it('renderiza la marca del producto', () => {
    render(<ProductCard product={mockProduct} onClick={jest.fn()} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('renderiza el modelo del producto', () => {
    render(<ProductCard product={mockProduct} onClick={jest.fn()} />);
    expect(screen.getByText('iPhone 14')).toBeInTheDocument();
  });

  it('renderiza el precio del producto', () => {
    render(<ProductCard product={mockProduct} onClick={jest.fn()} />);
    expect(screen.getByText('999 €')).toBeInTheDocument();
  });

  it('llama onClick con el id al hacer click', () => {
    const handleClick = jest.fn();
    render(<ProductCard product={mockProduct} onClick={handleClick} />);
    fireEvent.click(screen.getByText('iPhone 14'));
    expect(handleClick).toHaveBeenCalledWith('1');
  });
});