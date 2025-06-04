import React, { useEffect, useState } from 'react';
import { useGetOrdersQuery } from './checkoutApi';

function OrderDetails() {
  const [orders, setOrders] = useState([]);
 const { data: ordersDetails, isLoading, refetch } = useGetOrdersQuery();
  // Replace with real API call
  useEffect(() => {
    const fetchOrders = async () => {
      const mockOrders = [
        {
          id: 'ORD12345',
          date: '2025-06-01',
          total: 950,
          shippingAddress: {
            name: 'Dipika Epili',
            street: '300 MK Bhavan, Shahid Bhagat Singh Rd',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            phone: '+91 9876543210'
          },
          items: [
            { id: 1, name: 'Brown Bread', quantity: 2, price: 150 },
            { id: 2, name: 'Smoothie Mango', quantity: 1, price: 200 },
          ]
        },
        {
          id: 'ORD12346',
          date: '2025-05-25',
          total: 400,
          shippingAddress: {
            name: 'Dipika Epili',
            street: '12 Market Street',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411001',
            phone: '+91 9876543210'
          },
          items: [
            { id: 3, name: 'Banana Cake', quantity: 1, price: 250 },
            { id: 4, name: 'Orange Juice', quantity: 1, price: 150 },
          ]
        }
      ];
      setOrders(mockOrders);
    };

    fetchOrders();
  }, []);
  
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border rounded-xl p-4 mb-6 shadow-sm bg-white">
            <div className="mb-3">
              <p className="text-lg font-semibold">Order ID: <span className="text-blue-600">{order.id}</span></p>
              <p className="text-sm text-gray-500">Date: {order.date}</p>
              <p className="text-sm text-gray-700 font-medium">Total: ₹{order.total}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-md font-semibold mb-1">Shipping Address:</h4>
              <div className="text-sm text-gray-600 leading-5">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>

            <div className="border-t pt-3">
              <h4 className="text-md font-semibold mb-2">Items:</h4>
              <ul className="space-y-2">
                {order.items.map(item => (
                  <li key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold">₹{item.price * item.quantity}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderDetails;
