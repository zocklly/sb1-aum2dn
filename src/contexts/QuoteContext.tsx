import React, { createContext, useContext, useState } from 'react';
import { Quote } from '../types';

interface QuoteContextType {
  quotes: Quote[];
  addQuote: (quote: Omit<Quote, 'id'>) => void;
  updateQuote: (quote: Quote) => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: 1,
      product: "iPhone 13 Screen",
      price: 150,
      retailPrice: 199,
      wholesalePrice: 175,
      unitPrice: 145,
      shipping: 15,
      link: "https://supplier.com/iphone-13-screen"
    },
    {
      id: 2,
      product: "Samsung S21 Battery",
      price: 45,
      retailPrice: 65,
      wholesalePrice: 55,
      unitPrice: 40,
      shipping: 8,
      link: "https://supplier.com/s21-battery"
    }
  ]);

  const addQuote = (quote: Omit<Quote, 'id'>) => {
    setQuotes(prev => [...prev, { ...quote, id: prev.length + 1 }]);
  };

  const updateQuote = (updatedQuote: Quote) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === updatedQuote.id ? updatedQuote : quote
    ));
  };

  return (
    <QuoteContext.Provider value={{ quotes, addQuote, updateQuote }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuotes must be used within a QuoteProvider');
  }
  return context;
}