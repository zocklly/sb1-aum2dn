import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Unlock from './pages/Unlock';
import Quote from './pages/Quote';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import { ProductProvider } from './contexts/ProductContext';
import { UnlockDeviceProvider } from './contexts/UnlockDeviceContext';
import { OrderProvider } from './contexts/OrderContext';
import { QuoteProvider } from './contexts/QuoteContext';

function App() {
  return (
    <ProductProvider>
      <UnlockDeviceProvider>
        <OrderProvider>
          <QuoteProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/unlock" element={<Unlock />} />
                    <Route path="/quote" element={<Quote />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>
              </div>
            </BrowserRouter>
          </QuoteProvider>
        </OrderProvider>
      </UnlockDeviceProvider>
    </ProductProvider>
  );
}

export default App;