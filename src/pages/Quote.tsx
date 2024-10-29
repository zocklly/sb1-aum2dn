import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import QuoteTable from '../components/QuoteTable';
import { useQuotes } from '../contexts/QuoteContext';

function Quote() {
  const [searchTerm, setSearchTerm] = useState("");
  const { quotes } = useQuotes();

  const filteredQuotes = quotes.filter(quote =>
    quote.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Quote Management</h2>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search quotes..."
      />

      <QuoteTable quotes={filteredQuotes} />
    </div>
  );
}

export default Quote;