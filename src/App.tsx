import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import SplashScreen from './components/SplashScreen/SplashScreen';
import PLP from './pages/PLP';
import PDP from './pages/PDP';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<PLP />} />
          <Route path="/product/:id" element={<PDP />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;