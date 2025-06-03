import { useGetCartProductsMutation } from "../cart/cartApi";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../app/api/apiSlice";
import { useState, useEffect, useMemo } from "react";
import { useCheckoutMutation } from "./checkoutApi";

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

  const subtotal = useMemo(() => {
    return cartItems
      .filter((item) => item.quantity > 0)
      .reduce((acc, item) => acc + item.quantity * item.price_at_purchase, 0);
  }, [cartItems]);

  const tax = useMemo(() => subtotal * 0.18, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      amount_from_frontend: total,
    }));
  }, [total]);

  //to send checkout form
  const [sendCheckoutForm] = useCheckoutMutation();

  const [formData, setFormData] = useState({
    user_id: user_id,
    amount_from_frontend: 0,
    email: email,
    first_name: "",
    last_name: "", 
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    cardNumber: "",
    expiry: "",
    securityCode: "",
    nameOnCard: "",
    transactionStatus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      amount_from_frontend: total,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user_id",formData.user_id)
    const checkoutFormData = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      checkoutFormData.append(key, value);
    }
    // checkoutFormData.append("user_id", formData.user_id);
    // checkoutFormData.append("amount_from_frontend", formData.amount_from_frontend);
    // for (let pair of data.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    try {
      const response = await sendCheckoutForm(formData).unwrap();
      console.log("Checkout successful:", response);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

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

            <form onSubmit={handleSubmit}>
              {/* Delivery */}
              {/* <div> */}
              <h2 className="font-semibold text-lg mb-2">Delivery</h2>
              <select className="w-full border border-gray-300 rounded px-4 py-2 mb-2">
                <option>India</option>
              </select>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="firstName"
                  className="border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="lastName"
                  className="border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full border border-gray-300 rounded px-4 py-2 mb-2"
                />

                <div className="grid grid-cols-3 gap-4 mb-2">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="border border-gray-300 rounded px-4 py-2"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="border border-gray-300 rounded px-4 py-2"
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="PIN code"
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
                    type="number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Card number"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="Expiration date (MM / YY)"
                      className="border border-gray-300 rounded px-4 py-2"
                    />
                    <input
                      type="number"
                      name="securityCode"
                      value={formData.securityCode}
                      onChange={handleInputChange}
                      placeholder="Security code"
                      className="border border-gray-300 rounded px-4 py-2"
                    />
                  </div>
                  <input
                    type="text"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    placeholder="Name on card"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                  <select
                    name="transactionStatus"
                    value={formData.transactionStatus}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-2"
                  >
                    <option value="" disabled>
                      Select Transaction status
                    </option>
                    <option value="1">Successful Transaction</option>
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
