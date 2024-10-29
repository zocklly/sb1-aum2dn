import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: number;
  brand: string;
  model: string;
  part: string;
  color: string;
  stock: number;
  retailPrice: number;
  wholesalePrice: number;
  partPrice: number;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      brand: "Samsung",
      model: "A12",
      part: "Screen",
      color: "Black",
      stock: 1,
      retailPrice: 1300,
      wholesalePrice: 999,
      partPrice: 600,
    },
  ]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...product, id: prev.length + 1 }]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}