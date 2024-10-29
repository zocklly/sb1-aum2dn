import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useUnlockDevices } from '../contexts/UnlockDeviceContext';
import { X, Plus } from 'lucide-react';

const brands = [
  "Xiaomi", "Samsung", "Huawei", "Oppo", "LG", "Nokia", 
  "iPhone", "Motorola", "Vortex", "Mediatek", "Blu"
];

function Settings() {
  const [activeTab, setActiveTab] = useState<'products' | 'unlock'>('products');
  const { addProduct } = useProducts();
  const { addDevice } = useUnlockDevices();

  const [productForm, setProductForm] = useState({
    brand: '',
    model: '',
    part: '',
    color: '',
    stock: 0,
    retailPrice: 0,
    wholesalePrice: 0,
    partPrice: 0,
  });

  const [unlockForm, setUnlockForm] = useState({
    brand: brands[0],
    model: '',
    version: '',
    security: '',
    baseband: '',
    googleLock: false,
    canUnlock: false,
    versionOptions: [''],
    securityOptions: [''],
    basebandOptions: [''],
  });

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(productForm);
    alert('Product Added');
    setProductForm({
      brand: '',
      model: '',
      part: '',
      color: '',
      stock: 0,
      retailPrice: 0,
      wholesalePrice: 0,
      partPrice: 0,
    });
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      ...unlockForm,
      version: unlockForm.versionOptions[0],
      security: unlockForm.securityOptions[0],
      baseband: unlockForm.basebandOptions[0],
    };
    addDevice(formData);
    alert('Device Added');
    setUnlockForm({
      brand: brands[0],
      model: '',
      version: '',
      security: '',
      baseband: '',
      googleLock: false,
      canUnlock: false,
      versionOptions: [''],
      securityOptions: [''],
      basebandOptions: [''],
    });
  };

  const handleOptionChange = (
    type: 'versionOptions' | 'securityOptions' | 'basebandOptions',
    index: number,
    value: string
  ) => {
    setUnlockForm(prev => ({
      ...prev,
      [type]: prev[type].map((opt: string, i: number) => i === index ? value : opt),
    }));
  };

  const addOption = (type: 'versionOptions' | 'securityOptions' | 'basebandOptions') => {
    setUnlockForm(prev => ({
      ...prev,
      [type]: [...prev[type], ''],
    }));
  };

  const removeOption = (type: 'versionOptions' | 'securityOptions' | 'basebandOptions', index: number) => {
    setUnlockForm(prev => ({
      ...prev,
      [type]: prev[type].filter((_: string, i: number) => i !== index),
    }));
  };

  const renderOptionInputs = (
    type: 'versionOptions' | 'securityOptions' | 'basebandOptions',
    label: string
  ) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {unlockForm[type].map((option: string, index: number) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(type, index, e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder={`Enter ${label.toLowerCase()}`}
            required
          />
          {unlockForm[type].length > 1 && (
            <button
              type="button"
              onClick={() => removeOption(type, index)}
              className="p-1 text-red-600 hover:text-red-800"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addOption(type)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add {label}
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'products'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-50'
            }`}
          >
            Add Products
          </button>
          <button
            onClick={() => setActiveTab('unlock')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'unlock'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-50'
            }`}
          >
            Add Unlock Devices
          </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <form onSubmit={handleProductSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                value={productForm.brand}
                onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Model</label>
              <input
                type="text"
                value={productForm.model}
                onChange={(e) => setProductForm({ ...productForm, model: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Part</label>
              <input
                type="text"
                value={productForm.part}
                onChange={(e) => setProductForm({ ...productForm, part: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="text"
                value={productForm.color}
                onChange={(e) => setProductForm({ ...productForm, color: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                value={productForm.stock}
                onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Retail Price</label>
              <input
                type="number"
                value={productForm.retailPrice}
                onChange={(e) => setProductForm({ ...productForm, retailPrice: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wholesale Price</label>
              <input
                type="number"
                value={productForm.wholesalePrice}
                onChange={(e) => setProductForm({ ...productForm, wholesalePrice: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Part Price</label>
              <input
                type="number"
                value={productForm.partPrice}
                onChange={(e) => setProductForm({ ...productForm, partPrice: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Product
          </button>
        </form>
      ) : (
        <form onSubmit={handleUnlockSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Add New Unlock Device</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <select
                value={unlockForm.brand}
                onChange={(e) => setUnlockForm({ ...unlockForm, brand: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Model</label>
              <input
                type="text"
                value={unlockForm.model}
                onChange={(e) => setUnlockForm({ ...unlockForm, model: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-6">
            {renderOptionInputs('versionOptions', 'Version Options')}
            {renderOptionInputs('securityOptions', 'Security Options')}
            {renderOptionInputs('basebandOptions', 'Baseband Options')}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Google Lock</label>
              <select
                value={unlockForm.googleLock.toString()}
                onChange={(e) => setUnlockForm({ ...unlockForm, googleLock: e.target.value === 'true' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Can Unlock</label>
              <select
                value={unlockForm.canUnlock.toString()}
                onChange={(e) => setUnlockForm({ ...unlockForm, canUnlock: e.target.value === 'true' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Device
          </button>
        </form>
      )}
    </div>
  );
}

export default Settings;