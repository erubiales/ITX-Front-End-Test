import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza la aplicación sin errores', () => {
  render(<App />);
  expect(screen.getByText('MobileShop')).toBeInTheDocument();
});