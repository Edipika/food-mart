import React, { useEffect, useState } from "react";
import { useGetOrdersQuery } from "./checkoutApi";
import { useSelector } from "react-redux";
import Layout from "../../common/user/Layout";

function OrderDetails() {
  // const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth?.user_id) || [];
  console.log(userId);
  const { data: orders, isLoading, refetch } = useGetOrdersQuery(userId);

  console.log(orders);

  if (isLoading) return <p>Loading...</p>;
  return (
    <Layout>
      <>
        <div className="max-w-5xl mx-auto p-4">
          <h2 className="text-3xl font-bold mb-6">Your Orders</h2>

          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            orders.orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-xl p-4 mb-6 shadow-sm bg-white"
              >
                <div className="mb-3">
                  <p className="text-lg font-semibold">
                    Order ID:{" "}
                    <span className="text-blue-600">
                      {order.transaction_id}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {order.created_at}
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    Total: ₹{order.total_amount}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-1">
                    Shipping Address:
                  </h4>
                  <div className="text-sm text-gray-600 leading-5">
                    <p>
                      {order.address.first_name} {order.address.last_name}
                    </p>
                    <p>
                      {order.address.address1},{order.address.address2}
                    </p>
                    <p>
                      {order.address.city}, {order.address.state} -{" "}
                      {order.address.pincode}
                    </p>
                    {/* <p>Phone:</p> */}
                  </div>
                </div>

                <div className="border-t pt-3">
                  <h4 className="text-md font-semibold mb-2">Items:</h4>
                  <ul className="space-y-2">
                    {order.order_items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center bg-gray-50 p-2 rounded"
                      >
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-semibold">
                          ₹{item.price * item.quantity}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </>
    </Layout>
  );
}

export default OrderDetails;
