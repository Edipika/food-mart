import React from 'react';

export default function OrderConfirmation() {
  // Sample product data
  const orderedProducts = [
    {
      id: 1,
      name: 'Onion',
      image: '/onion.jpg',
      quantity: 1,
      price: 49.0,
    },
    {
      id: 2,
      name: 'Tomato',
      image: '/tomato.jpg',
      quantity: 2,
      price: 30.0,
    },
  ];

  const subtotal = orderedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Main Confirmation Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Thank you, Dipika!</h2>
            <p className="text-sm text-gray-600">Your order is confirmed</p>
            <p className="text-xs text-blue-500 mt-1">
              You’ll receive a confirmation email with your order number shortly.
            </p>
          </div>

          {/* Order & Billing Details */}
          <div className="bg-white shadow rounded-lg p-6 grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Order details</h3>
              <p><span className="font-medium">Email:</span> dipikaepili08@gmail.com</p>
              <p className="mt-2"><span className="font-medium">Shipping Address:</span><br />
                Dipika Epili<br />
                Navi Mumbai Marriott Hotel Thane - Belapur Road<br />
                MIDC Industrial Area Turbhe<br />
                400703 Navi Mumbai MH, India
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Billing & Payment</h3>
              <p><span className="font-medium">Payment Method:</span> 🔶 •••• ₹141.60</p>
              <p className="mt-2"><span className="font-medium">Billing Address:</span><br />
                Dipika Epili<br />
                Navi Mumbai Marriott Hotel Thane - Belapur Road<br />
                MIDC Industrial Area Turbhe<br />
                400703 Navi Mumbai MH, India
              </p>
            </div>
          </div>
        </div>

        {/* 🧾 Order Summary (Sidebar) */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          {/* Ordered Products */}
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {orderedProducts.map(product => (
              <div key={product.id} className="flex items-center gap-4 border-b pb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                </div>
                <p className="font-semibold">₹{product.price * product.quantity}</p>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-4 border-t pt-2 text-sm">
            <p><span className="font-medium">Paid via:</span> UPI / Card</p>
            <p><span className="font-medium">Transaction ID:</span> #123456789</p>
          </div>
        </div>
      </div>
    </div>
  );
}
