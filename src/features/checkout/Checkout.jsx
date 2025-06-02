import { useGetCartProductsMutation } from "../cart/cartApi";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../app/api/apiSlice";
import { useState, useEffect } from "react";

function Checkout() {
  //showing cart details
  const [getCartDetails] = useGetCartProductsMutation();
  const products = useSelector((state) => state.cartSlice?.products) || [];
  const email = useSelector((state) => state.auth?.email) || [];
  const user_id = useSelector((state) => state.auth?.user_id) || [];
  const [cartItems, setCartItems] = useState([]);
  const fetchCartData = async () => {
    try {
      const response = await getCartDetails({
        cart: products,
        user_id,
      }).unwrap();
      setCartItems(response.cartItems || []);
      console.log("cart items backend response: ", response.cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, []);

  const subtotal = cartItems
    .filter((item) => item.quantity > 0)
    .reduce((acc, item) => acc + item.quantity * item.price_at_purchase, 0);

  const taxRate = 0.18;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  //cart details end here

  //to send checkout form 

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">FoodMart-Test</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow space-y-6">
            {/* Contact */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Contact</h2>
              <input
                type="email"
                placeholder={email}
                className="w-full border border-gray-300 rounded px-4 py-2"
                disabled
              />
            </div>

            <form action="" method="post">
              {/* Delivery */}
              <div>
                <h2 className="font-semibold text-lg mb-2">Delivery</h2>
                <select className="w-full border border-gray-300 rounded px-4 py-2 mb-2">
                  <option>India</option>
                </select>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <input
                    type="text"
                    placeholder="First name"
                    className="border border-gray-300 rounded px-4 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border border-gray-300 rounded px-4 py-2 mb-2"
                />
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full border border-gray-300 rounded px-4 py-2 mb-2"
                />
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <input
                    type="text"
                    placeholder="City"
                    defaultValue="Navi Mumbai"
                    className="border border-gray-300 rounded px-4 py-2"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    defaultValue="Maharashtra"
                    className="border border-gray-300 rounded px-4 py-2"
                  />
                  <input
                    type="text"
                    placeholder="PIN code"
                    defaultValue="400703"
                    className="border border-gray-300 rounded px-4 py-2"
                  />
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="font-semibold text-lg mb-2">Payment</h2>
                <p className="text-sm text-gray-500 mb-2">
                  All transactions are secure and encrypted.
                </p>

                <div className="border-blue-300 rounded p-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Card number"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Expiration date (MM / YY)"
                      className="border border-gray-300 rounded px-4 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Security code"
                      className="border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Name on card"
                    defaultValue="dipika Epili"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                  <select className="w-full border border-gray-300 rounded px-4 py-2 mb-2">
                    <option value="1" disabled>
                      Select Transaction status
                    </option>
                    <option value="1">successful Transaction</option>
                    <option value="2">Declined</option>
                    <option value="3">Gateway Failure</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded mt-4"
              >
                Pay now
              </button>
            </form>
          </div>

          {/* Right Section (Cart Summary) */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            {cartItems
              .filter((item) => item.quantity > 0)
              .map((item, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between border-b pb-4"
                >
                  <div className="flex gap-3">
                    <img
                      src={`${BASE_URL}/${item.Product?.image_path}` || ""}
                      alt={item.Product?.name || "Product"}
                      className="w-16 h-16 rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {item.Product?.name || "Product"}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹{item.price_at_purchase} ×{item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ₹{item.quantity * item.price_at_purchase}
                  </p>
                </div>
              ))}

            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated taxes (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
