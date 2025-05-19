import React from 'react';
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useGetCartProductsMutation } from '../../features/cart/cartApi';
import { BASE_URL } from '../../app/api/apiSlice';
import { saveTocart } from '../../features/cart/cartSlice';
import { useState } from 'react';

function CartPanel({ isOpen, setIsOpen }) {
    const token = useSelector(state => state.auth.token);
    const [cartData, setCartData] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();

    const [getCartDetails] = useGetCartProductsMutation();
    const products = useSelector(state => state.cartSlice?.products || []);
    const user_id = useSelector(state => state.auth?.user_id || []);
    const fetchCartData = async () => {
        try {
            const response = await getCartDetails({ cart: products, user_id }).unwrap();
            setCartData(response.cart);
            setCartItems(response.cartItems || []);
            // console.log("cart items backend response: ", response.cartItems)

        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    // console.log("Response from the result", cartItems);
    const increment = (productId, quantity) => {
        dispatch(saveTocart({ productId, quantity: quantity + 1 }));
        fetchCartData();
    };
    const decrement = (productId, quantity) => {
        dispatch(saveTocart({ productId, quantity: quantity - 1 }));
        fetchCartData();
    };
    useEffect(() => {
        // console.log("products", products)
        fetchCartData();
    }, [products])
    // console.log("cart items variable: ", cartItems);
    if (!isOpen) return null;
    // return (


    //     <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-4 transition-transform transform translate-x-0">
    //         <div className="flex justify-between items-center border-b pb-2">
    //             <h2 className="text-lg font-semibold">Your Cart</h2>
    //             <IoClose className="cursor-pointer" size={24} onClick={() => setIsOpen(false)} />
    //         </div>
    //         <div className="mt-4">
    //             {cartItems && cartItems.length > 0 ? (
    //                 <>
    //                     {cartItems
    //                         .filter((item) => item.quantity > 0)
    //                         .map((item, index) => (
    //                             <div key={index} className="flex items-center justify-between border-b py-4">
    //                                 <img src={`${BASE_URL}/${item.Product?.image_path}` || ""} alt="Product" className="w-12 h-12 rounded" />
    //                                 <div className="flex-1 ml-4">
    //                                     <h3 className="font-medium text-sm">{item.Product?.name || "Product"}</h3>
    //                                     <p className="text-gray-500 text-xs">{item.Product?.quantity_per_unit || "per quant desc"}</p>
    //                                     <div className="flex items-center mt-2">
    //                                         <button
    //                                             onClick={() => decrement(item.product_id, item.quantity)}
    //                                             className="px-2 py-1 text-sm bg-gray-200 rounded">-</button>
    //                                         <span className="px-3 text-sm">{item.quantity}</span>
    //                                         <button
    //                                             onClick={() => increment(item.product_id, item.quantity)}
    //                                             className="px-2 py-1 text-sm bg-gray-200 rounded">+</button>
    //                                     </div>
    //                                 </div>
    //                                 <div className="text-right">
    //                                     <p className="font-medium text-sm">₹{item.price_at_purchase}</p>
    //                                 </div>
    //                             </div>
    //                         ))
    //                     }
    //                     <div className="font-semibold mt-4 text-right text-lg">
    //                         ₹{cartData?.total_price}
    //                     </div>
    //                 </>
    //             ) : (
    //                 <p className="text-gray-600">Your cart is currently empty.</p>
    //             )}
    //         </div>
    //     </div>
    // );

    return (
        <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-4 transition-transform transform translate-x-0 z-50">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <IoClose className="cursor-pointer" size={24} onClick={() => setIsOpen(false)} />
            </div>

            <div className="mt-4">
                {!token ? (
                    <div className="mt-4 text-center">
                        <p className="text-gray-600 mb-2">You must be logged in to view your cart.</p>
                        <a
                            href="/login"
                            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Go to Login
                        </a>
                    </div>
                ) : cartItems && cartItems.length > 0 ? (
                    <>
                        {cartItems
                            .filter((item) => item.quantity > 0)
                            .map((item, index) => (
                                <div key={index} className="flex items-center justify-between border-b py-4">
                                    <img
                                        src={`${BASE_URL}/${item.Product?.image_path}` || ""}
                                        alt="Product"
                                        className="w-12 h-12 rounded object-cover"
                                    />
                                    <div className="flex-1 ml-4">
                                        <h3 className="font-medium text-sm">{item.Product?.name || "Product"}</h3>
                                        <p className="text-gray-500 text-xs">{item.Product?.quantity_per_unit || "per quant desc"}</p>
                                        <div className="flex items-center mt-2">
                                            <button
                                                onClick={() => decrement(item.product_id, item.quantity)}
                                                className="px-2 py-1 text-sm bg-gray-200 rounded"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => increment(item.product_id, item.quantity)}
                                                className="px-2 py-1 text-sm bg-gray-200 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-sm">₹{item.price_at_purchase}</p>
                                    </div>
                                </div>
                            ))}
                        <div className="font-semibold mt-4 text-right text-lg">
                            ₹{cartData?.total_price}
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600">Your cart is currently empty.</p>
                )}
            </div>
        </div>
    );
}


export default CartPanel;
