import React, { createContext, useContext, useState } from 'react';

export type OrderStatus = 'new' | 'in-progress' | 'completed' | 'canceled';

export interface Order {
  id: string;
  orderNumber: string;
  orderType: string;
  userName: string;
  timestamp: string;
  customerName: string;
  customerPhone: string;
  itemDetails: any;
  status: OrderStatus;
  comments: string[];
  cancellationReason?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber'>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addComment: (id: string, comment: string) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  cancelOrder: (id: string, reason: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const generateOrderNumber = () => {
    const prefix = 'ORD';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber'>) => {
    const newOrder = {
      ...orderData,
      id: crypto.randomUUID(),
      orderNumber: generateOrderNumber(),
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  const addComment = (id: string, comment: string) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, comments: [...order.comments, comment] } : order
    ));
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order =>
      order.id === id ? { ...order, ...updates } : order
    ));
  };

  const cancelOrder = (id: string, reason: string) => {
    setOrders(prev => prev.map(order =>
      order.id === id ? { ...order, status: 'canceled', cancellationReason: reason } : order
    ));
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      updateOrderStatus, 
      addComment, 
      updateOrder,
      cancelOrder 
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}