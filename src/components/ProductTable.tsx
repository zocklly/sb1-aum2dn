import React, { useState } from 'react';
import { Edit2, ShoppingCart, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../styles/Home.module.css';
import { Product } from '../types';
import { useProducts } from '../contexts/ProductContext';
import ProcessOrderModal from './ProcessOrderModal';

interface ProductTableProps {
  products: Product[];
}

function ProductTable({ products }: ProductTableProps) {
  const { updateProduct } = useProducts();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (editForm) {
      updateProduct(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleInputChange = (field: keyof Product, value: string | number) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        [field]: typeof editForm[field] === 'number' ? Number(value) : value,
      });
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleProcessOrder = (product: Product) => {
    setSelectedProduct(product);
  };

  // Desktop view
  const DesktopTable = () => (
    <table className={`${styles.table} hidden md:table`}>
      <thead className={styles.tableHeader}>
        <tr>
          {["Brand", "Model", "Part", "Color", "Stock", "Retail Price", "Wholesale Price", "Part Price", "Actions"].map((header) => (
            <th key={header} className={styles.tableHeaderCell}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {products.map((product) => (
          <tr key={product.id} className={styles.tableRow}>
            {editingId === product.id ? (
              <>
                <td className={styles.tableCell}>
                  <input
                    type="text"
                    value={editForm?.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className={styles.editInput}
                  />
                </td>
                <td className={styles.tableCell}>
                  <input
                    type="text"
                    value={editForm?.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className={styles.editInput}
                  />
                </td>
                <td className={styles.tableCell}>
                  <input
                    type="text"
                    value={editForm?.part}
                    onChange={(e) => handleInputChange('part', e.target.value)}
                    className={styles.editInput}
                  />
                </td>
                <td className={styles.tableCell}>
                  <input
                    type="text"
                    value={editForm?.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className={styles.editInput}
                  />
                </td>
                <td className={styles.tableCell}>
                  <input
                    type="number"
                    value={editForm?.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    className={styles.editInput}
                  />
                </td>
                <td className={styles.tableCell}>
                  <input
                    type="number"
                    value={editForm?.retailPrice}
                    onChange={(e) => handleInputChange('retailPrice', e.target.value)}
                    className={styles.editInput}
                  />
                </td>
                <td className={styles.tableCell}>
                  <input
                    type="number"
                    value={editForm?.wholesalePrice}
                    onChange={(e) => handleInputChange('wholesalePrice', e.target.value)}
                    className={styles.editInput}
                  />
                </td>
                <td className={styles.tableCell}>
                  <input
                    type="number"
                    value={editForm?.partPrice}
                    onChange={(e) => handleInputChange('partPrice', e.target.value)}
                    className={styles.editInput}
                  />
                </td>
                <td className={styles.actionButtons}>
                  <button onClick={saveEdit} className={styles.saveButton}>
                    <Check className="h-5 w-5" />
                  </button>
                  <button onClick={cancelEditing} className={styles.cancelButton}>
                    <X className="h-5 w-5" />
                  </button>
                </td>
              </>
            ) : (
              <>
                <td className={styles.tableCellBrand}>{product.brand}</td>
                <td className={styles.tableCell}>{product.model}</td>
                <td className={styles.tableCell}>{product.part}</td>
                <td className={styles.tableCell}>{product.color}</td>
                <td className={styles.tableCell}>{product.stock}</td>
                <td className={styles.tableCell}>${product.retailPrice}</td>
                <td className={styles.tableCell}>${product.wholesalePrice}</td>
                <td className={styles.tableCell}>${product.partPrice}</td>
                <td className={styles.actionButtons}>
                  <button onClick={() => startEditing(product)} className={styles.editButton}>
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleProcessOrder(product)} 
                    className={styles.processButton}
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Mobile view
  const MobileTable = () => (
    <div className="md:hidden space-y-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    {product.brand} {product.model}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => startEditing(product)}
                      className={styles.editButton}
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleProcessOrder(product)}
                      className={styles.processButton}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {product.part} - {product.color}
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleExpand(product.id)}
              className="mt-2 flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              {expandedId === product.id ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  <span>Show more</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
          </div>
          
          {expandedId === product.id && (
            <div className="px-4 pb-3 space-y-2 border-t border-gray-100 mt-2 pt-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Stock:</div>
                <div className="text-gray-900">{product.stock}</div>
                <div className="text-gray-500">Retail Price:</div>
                <div className="text-gray-900">${product.retailPrice}</div>
                <div className="text-gray-500">Wholesale Price:</div>
                <div className="text-gray-900">${product.wholesalePrice}</div>
                <div className="text-gray-500">Part Price:</div>
                <div className="text-gray-900">${product.partPrice}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.tableContainer}>
      <DesktopTable />
      <MobileTable />
      <ProcessOrderModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        itemDetails={selectedProduct}
      />
    </div>
  );
}

export default ProductTable;