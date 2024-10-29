import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useOrders } from '../contexts/OrderContext';

interface ProcessOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemDetails: any;
}

function ProcessOrderModal({ isOpen, onClose, itemDetails }: ProcessOrderModalProps) {
  const { addOrder } = useOrders();
  const [formData, setFormData] = useState({
    userName: '',
    customerName: '',
    customerPhone: '',
    orderType: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder({
      ...formData,
      timestamp: new Date().toISOString(),
      itemDetails,
      status: 'new',
      comments: [],
    });
    onClose();
    setFormData({
      userName: '',
      customerName: '',
      customerPhone: '',
      orderType: '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Process Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Order Type</label>
            <input
              type="text"
              required
              placeholder="e.g., Repair, Unlock, Screen Replacement"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.orderType}
              onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">User Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Phone</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Save Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProcessOrderModal;