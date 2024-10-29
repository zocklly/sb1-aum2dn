import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProductTable from '../components/ProductTable';
import { useProducts } from '../contexts/ProductContext';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products } = useProducts();

  const filteredProducts = products.filter(product =>
    Object.values(product).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search products..."
      />
      <ProductTable products={filteredProducts} />
    </div>
  );
}

export default Home;