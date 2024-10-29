import React, { useState } from 'react';
import { useOrders, OrderStatus } from '../contexts/OrderContext';
import SearchBar from '../components/SearchBar';
import { MessageSquare, ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';
import EditOrderModal from '../components/EditOrderModal';
import DeleteOrderModal from '../components/DeleteOrderModal';

function Orders() {
  const { orders, updateOrderStatus, addComment } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [deletingOrder, setDeletingOrder] = useState<any>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || order.timestamp.includes(dateFilter);
    return matchesSearch && matchesDate;
  });

  const ordersByStatus = (status: OrderStatus) =>
    filteredOrders.filter((order) => order.status === status);

  const handleAddComment = (orderId: string) => {
    if (newComment.trim()) {
      addComment(orderId, newComment);
      setNewComment('');
    }
  };

  const OrderCard = ({ order }: { order: (typeof orders)[0] }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">
            {order.itemDetails.brand} {order.itemDetails.model} -{' '}
            {order.orderType}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Order #{order.orderNumber}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(order.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setEditingOrder(order)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setDeletingOrder(order)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedId === order.id ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {expandedId === order.id && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Customer</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{order.customerPhone}</p>
            </div>
            <div>
              <p className="text-gray-500">Processed by</p>
              <p className="font-medium">{order.userName}</p>
            </div>
            {order.status === 'canceled' && (
              <div className="col-span-2">
                <p className="text-gray-500">Cancellation Reason</p>
                <p className="font-medium text-red-600">{order.cancellationReason}</p>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium mb-2">Item Details</h4>
            <div className="text-sm text-gray-600">
              <p>Brand: {order.itemDetails.brand}</p>
              <p>Model: {order.itemDetails.model}</p>
              {order.itemDetails.version && (
                <p>Version: {order.itemDetails.version}</p>
              )}
              <p>Order Type: {order.orderType}</p>
            </div>
          </div>

          {order.status !== 'canceled' && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium mb-2">Status</h4>
              <select
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus(order.id, e.target.value as OrderStatus)
                }
                className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium mb-2">Comments</h4>
            <div className="space-y-2 mb-4">
              {order.comments.map((comment, index) => (
                <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                  {comment}
                </div>
              ))}
            </div>
            {order.status !== 'canceled' && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => {
                      if (e.target.value.length <= 250) {
                        setNewComment(e.target.value);
                      }
                    }}
                    maxLength={250}
                    placeholder="Add a comment... (max 250 characters)"
                    className="flex-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleAddComment(order.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Add
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  {250 - newComment.length} characters remaining
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by order number..."
          />
        </div>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">New Orders</h2>
          {ordersByStatus('new').map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </section>

        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            In Progress
          </h2>
          {ordersByStatus('in-progress').map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </section>

        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Completed</h2>
          {ordersByStatus('completed').map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </section>

        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Canceled Orders</h2>
          {ordersByStatus('canceled').map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </section>
      </div>

      <EditOrderModal
        isOpen={!!editingOrder}
        onClose={() => setEditingOrder(null)}
        order={editingOrder}
      />

      <DeleteOrderModal
        isOpen={!!deletingOrder}
        onClose={() => setDeletingOrder(null)}
        order={deletingOrder}
      />
    </div>
  );
}

export default Orders;